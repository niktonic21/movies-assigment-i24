import React from 'react';
import { Button, StyleSheet, getScaledValue } from 'renative';
import Theme from '../theme';

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderWidth: 0
    }
});

const CloseButton = ({ onPress }) => (
    <Button
        iconFont="ionicons"
        className="materialIcons"
        iconName="ios-close"
        iconColor={Theme.color6}
        iconSize={getScaledValue(30)}
        style={styles.button}
        onPress={onPress}
        onEnterPress={onPress}
    />
);

export default CloseButton;
