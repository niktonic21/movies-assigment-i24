import React, { useState, useEffect } from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { getScaledValue, StyleSheet, useNavigate } from 'renative';
import { usePaginatedQuery } from 'react-query';
import Theme, { themeStyles, hasWebFocusableUI } from './theme';
import * as str from '../assets/strings';
import { getEndPoint, getImageEndPoint, getSearchSuffix } from './utils/apiUtils';
import Error from './components/Error';
import { SearchBar } from './components/SearchBar';

const ITEM_WIDTH = getScaledValue(100);
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        marginBottom: getScaledValue(30),
        width: getScaledValue(83),
        height: getScaledValue(97)
    },
    imageTumbnail: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT
    },
    itemContainer: {
        marginHorizontal: getScaledValue(15),
        flexDirection: 'row',
        height: ITEM_HEIGHT,
        alignItems: 'center',
        backgroundColor: '#333333'
    },
    itemTextContainer: {
        flex: 1,
        alignSelf: 'flex-start',
        margin: getScaledValue(8)
    },
    itemName: {
        color: 'white',
        fontSize: 18
    },
    itemDescp: {
        fontSize: 16,
        color: Theme.color5,
        paddingTop: getScaledValue(5)
    },
    separator: {
        flex: 1,
        height: getScaledValue(15)
    }
});

const Separator = () => <View style={styles.separator} />;

const _keyExtractor = (item, index) => index;

const ScreenSearch = props => {
    const navigate = useNavigate(props);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);
    const { error, resolvedData } = usePaginatedQuery(['search', page, searchTerm], () =>
        fetch(getEndPoint(str.END_SEARCH, page, getSearchSuffix(searchTerm))).then(res =>
            res.json()
        )
    );

    useEffect(() => {
        if (resolvedData && resolvedData.results) {
            if (page > 1) {
                const newData = data.concat(resolvedData.results);
                setData(newData);
            } else {
                setData(resolvedData.results);
            }
        }
    }, [resolvedData]);

    const _onChangeTermText = text => {
        setSearchTerm(text);
    };

    const _onEndReached = () => {
        setPage(page + 1);
    };

    const _renderItem = ({ item, index }) => {
        const _onPress = () => {
            navigate('Detail', { replace: false }, { item });
        };

        return (
            <TouchableOpacity key={index} style={styles.itemContainer} onPress={_onPress}>
                <Image
                    style={styles.imageTumbnail}
                    source={{ uri: getImageEndPoint(item.poster_path) }}
                />
                <View style={styles.itemTextContainer}>
                    <Text numberOfLines={2} style={styles.itemName}>
                        {item.title || item.name}
                    </Text>
                    <Text numberOfLines={4} style={styles.itemDescp}>
                        {item.overview}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={themeStyles.screen}>
            <SearchBar searchTerm={searchTerm} onChangeTermText={_onChangeTermText} />
            {data ? (
                <FlatList
                    style={styles.container}
                    data={data}
                    keyExtractor={_keyExtractor}
                    ItemSeparatorComponent={() => <Separator />}
                    renderItem={_renderItem}
                    onEndReached={_onEndReached}
                    onEndReachedThreshold={0}
                />
            ) : error ? (
                <Error />
            ) : null}
        </View>
    );
};

export default hasWebFocusableUI ? withFocusable()(ScreenSearch) : ScreenSearch;
