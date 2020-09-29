import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Button, getScaledValue, useNavigate, StyleSheet } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { hasWebFocusableUI } from './theme';
import { getImageEndPoint } from './utils/apiUtils';

const styles = StyleSheet.create({
    container: { flex: 1 },
    buttonContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 10,
        opacity: 1,
        width: getScaledValue(30),
        height: getScaledValue(30),
        marginLeft: 50,
        top: -10,
        right: 15,
        borderWidth: 0
    },
    button: {
        marginTop: -15,
        marginLeft: 10
    },
    itemTextContainer: {
        opacity: 0.9,
        padding: getScaledValue(15),
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end'
    },
    itemName: {
        fontSize: 18
    },
    itemCategory: {
        color: Theme.color6,
        paddingTop: getScaledValue(3)
    }
});

const DeatilPage = props => {
    const { item } = props.route.params;
    const navigate = useNavigate(props);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: getImageEndPoint(item.poster_path) }}
                style={styles.image}
            >
                <View style={styles.itemTextContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            to="modal"
                            iconFont="ionicons"
                            className="materialIcons"
                            iconName="ios-play-circle"
                            iconColor={Theme.color2}
                            iconSize={getScaledValue(50)}
                            style={styles.button}
                            onPress={() => {
                                navigate('modal');
                            }}
                            onEnterPress={() => {
                                navigate('modal');
                            }}
                        />
                    </View>
                    <View>
                        <Text numberOfLines={2} style={styles.itemName}>
                            {item.title || item.name}
                        </Text>
                        <Text style={styles.itemCategory}>{item.overview}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default hasWebFocusableUI ? withFocusable()(DeatilPage) : DeatilPage;
