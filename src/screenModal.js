import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, getScaledValue, usePop, StyleSheet } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Theme, { themeStyles, hasWebFocusableUI } from './theme';

import videoFile from '../assets/big_buck_bunny.mp4';

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        width: '100%',
        height: getScaledValue(60),
        alignItems: 'flex-start',
        paddingTop: getScaledValue(10)
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    button: {
        marginLeft: 10
    }
});

const ScreenModal = props => {
    const pop = usePop(props);
    const { title } = props.route.params;
    useEffect(() => {
        if (hasWebFocusableUI) {
            Orientation.lockToLandscape();
            return () => {
                Orientation.lockToPortrait();
            };
        }
    }, []);

    useEffect(() => {
        if (hasWebFocusableUI) {
            const { setFocus } = props;
            setFocus('close');

            return function cleanup() {
                setFocus('menu');
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={themeStyles.screenModal}>
            <Video
                source={videoFile}
                resizeMode="stretch"
                controls
                style={styles.backgroundVideo}
            />
            <View style={styles.header}>
                <Button
                    focusKey="close"
                    iconFont="ionicons"
                    iconName="md-close-circle"
                    className="focusable"
                    iconColor={Theme.color6}
                    iconSize={Theme.iconSize}
                    style={styles.button}
                    title={title}
                    to="/"
                    onEnterPress={() => {
                        pop();
                    }}
                    onPress={() => {
                        pop();
                    }}
                />
            </View>
        </View>
    );
};

export default hasWebFocusableUI ? withFocusable()(ScreenModal) : ScreenModal;
