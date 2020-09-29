import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'renative';
import { View, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasWebFocusableUI } from './theme';
import CustomCarousel from './components/CustomCarousel';
import * as str from '../assets/strings';
import { getEndPoint, getGenreId, getGenreIdSuffix } from './utils/apiUtils';

const ScreenHome = props => {
    const navigate = useNavigate(props);
    const [familyId, setFamilyId] = useState(null);
    const [documentaryId, setDocumentaryId] = useState(null);

    const { data } = useQuery(str.END_GENRE_LIST, () =>
        fetch(getEndPoint(str.END_GENRE_LIST)).then(res => res.json())
    );

    useEffect(() => {
        if (data && data.genres) {
            setFamilyId(getGenreId(data.genres, str.FAMILY));
            setDocumentaryId(getGenreId(data.genres, str.DOCUMENTARY));
        }
    }, [data]);

    let scrollRef;

    if (hasWebFocusableUI) {
        scrollRef = useRef(null);
        const { setFocus } = props;
        useEffect(
            () =>
                function cleanup() {
                    setFocus('menu');
                },
            []
        );
    }

    const _onPressItem = item => {
        navigate('Detail', { replace: false }, { item });
    };

    return (
        <View style={themeStyles.screen}>
            <ScrollView
                style={{ backgroundColor: Theme.color1 }}
                ref={scrollRef}
                contentContainerStyle={themeStyles.container}
                onPressItem={_onPressItem}
            >
                <CustomCarousel
                    categoryEndpoint={str.END_MOVIES_POP}
                    categoryName={str.MOVIES_POP}
                    onPressItem={_onPressItem}
                />
                <CustomCarousel
                    categoryEndpoint={str.END_TV_POP}
                    categoryName={str.TV_POP}
                    onPressItem={_onPressItem}
                />
                {familyId ? (
                    <CustomCarousel
                        categoryName={str.FAMILY}
                        categoryEndpoint={str.END_DISCOVER}
                        extras={getGenreIdSuffix(familyId)}
                        onPressItem={_onPressItem}
                    />
                ) : null}
                {documentaryId ? (
                    <CustomCarousel
                        categoryName={str.DOCUMENTARY}
                        categoryEndpoint={str.END_DISCOVER}
                        extras={getGenreIdSuffix(documentaryId)}
                        onPressItem={_onPressItem}
                    />
                ) : null}
            </ScrollView>
        </View>
    );
};

export default hasWebFocusableUI ? withFocusable()(ScreenHome) : ScreenHome;
