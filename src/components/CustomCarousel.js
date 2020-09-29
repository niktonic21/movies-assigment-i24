import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { getScaledValue, StyleSheet } from 'renative';
import { usePaginatedQuery } from 'react-query';
import Carousel from 'react-native-snap-carousel';
import Error from './Error';
import Theme, { themeStyles } from '../theme';
import { getEndPoint, getImageEndPoint } from '../utils/apiUtils';

const ITEM_WIDTH = getScaledValue(150);
const ITEM_HEIGHT = getScaledValue(300);

const styles = StyleSheet.create({
    appContainerScroll: {
        paddingTop: getScaledValue(50),
        flex: 1
    },
    image: {
        flex: 1,
        marginBottom: getScaledValue(30),
        width: getScaledValue(83),
        height: getScaledValue(97)
    },
    imageTumbnail: {
        width: getScaledValue(150),
        height: getScaledValue(150) * 1.5
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        backgroundColor: 'floralwhite'
    },
    itemTextContainer: {
        alignSelf: 'flex-start',
        margin: getScaledValue(3)
    },
    itemName: {
        fontSize: 18
    },
    itemCategory: {
        color: Theme.color6,
        paddingTop: getScaledValue(3)
    },
    carouselContainer: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        marginVertical: 20,
        textAlign: 'left',
        alignItems: 'flex-start'
    }
});

const CustomCarousel = ({ categoryEndpoint = '', categoryName = '', extras = '', onPressItem }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const { error, resolvedData } = usePaginatedQuery([categoryName, page], () =>
        fetch(getEndPoint(categoryEndpoint, page, extras)).then(res => res.json())
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

    const _onEndReached = () => {
        setPage(page + 1);
    };

    const _renderItem = ({ item, index }) => {
        const _onPress = () => onPressItem(item);
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
                    <Text style={styles.itemCategory}>{categoryName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <Text style={[themeStyles.textH2, styles.title]}>{categoryName}</Text>
            {data ? (
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={data}
                        sliderWidth={ITEM_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        renderItem={_renderItem}
                        onEndReached={_onEndReached}
                        onEndReachedThreshold={0}
                    />
                </View>
            ) : error ? (
                <Error />
            ) : null}
        </>
    );
};

export default CustomCarousel;
