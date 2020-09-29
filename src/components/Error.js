import React from 'react';
import { Text, View } from 'react-native';
import { getScaledValue, StyleSheet } from 'renative';
import { themeStyles } from '../theme';
import { SMT_WRONG } from '../../assets/strings';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: getScaledValue(20),
        justifyContent: 'center'
    }
});

const Error = () => (
    <View style={styles.container}>
        <Text numberOfLines={2} style={themeStyles.textH3}>
            {SMT_WRONG}
        </Text>
    </View>
);

export default Error;
