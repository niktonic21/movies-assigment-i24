import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, getScaledValue, useNavigate, StyleSheet } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasHorizontalMenu, hasWebFocusableUI } from './theme';

const styles = StyleSheet.create({
    button: {
        marginHorizontal: hasHorizontalMenu ? getScaledValue(20) : 0,
        marginTop: hasHorizontalMenu ? 0 : getScaledValue(20),
        maxWidth: getScaledValue(400),
        minWidth: getScaledValue(50),
        borderWidth: 0
    },
    buttonText: {
        fontFamily: 'TimeBurner',
        color: '#62DBFB',
        fontSize: getScaledValue(20)
    }
});

const ScreenMyPage = props => {
    const navigate = useNavigate(props);

    return (
        <View style={themeStyles.screen}>
            <ScrollView contentContainerStyle={themeStyles.container}>
                <Text style={themeStyles.textH2}>This is my Page!</Text>
                <Button
                    to="modal"
                    title="My Modal"
                    iconFont="ionicons"
                    className="focusable"
                    iconName="ios-albums"
                    iconColor={Theme.color3}
                    iconSize={Theme.iconSize}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => {
                        navigate('modal');
                    }}
                    onEnterPress={() => {
                        navigate('modal');
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default hasWebFocusableUI ? withFocusable()(ScreenMyPage) : ScreenMyPage;
