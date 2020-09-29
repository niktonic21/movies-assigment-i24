import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import { StyleSheet } from 'renative';
import Theme from '../theme';
import * as str from '../../assets/strings';

import CloseButton from './CloseButton';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'grey',
        marginVertical: 20,
        paddingLeft: 10,
        marginHorizontal: 15,
        ...Platform.select({
            ios: { borderRadius: 4, height: 36 },
            android: {
                height: 48,
                borderRadius: 50,
                borderWidth: 1
            }
        })
    },
    searchStyle: {
        flex: 1,
        color: 'white',
        alignSelf: 'stretch',
        marginLeft: 10,
        maxHeight: 50,
        fontSize: 18
    }
});

export const SearchBar = ({ onChangeTermText, searchTerm }) => {
    const _onChangeTermText = (text: string): void => {
        onChangeTermText(text);
    };

    const _clearText = (): void => {
        _onChangeTermText('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={Theme.color5}
                selectionColor={Theme.color5}
                style={styles.searchStyle}
                numberOfLines={1}
                placeholder={str.PLACEHOLDER}
                onChangeText={onChangeTermText}
                value={searchTerm}
                testID={'searchbar-id'}
            />
            {searchTerm.length > 0 ? <CloseButton onPress={_clearText} /> : null}
        </View>
    );
};
