import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getScaledValue } from 'renative';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import SearchButton from '../components/SearchButton';
import ScreenHome from '../screenHome';
import ScreenDetail from '../screenDetail';
import ScreenModal from '../screenModal';
import ScreenSearch from '../screenSearch';
import Theme from '../theme';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const queryCache = new QueryCache();

const styles = StyleSheet.create({
    headerTitle: {
        color: Theme.color3,
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(18)
    },
    header: {
        backgroundColor: Theme.color1,
        borderBottomWidth: 1,
        height: getScaledValue(70)
    }
});

const StackNavigator = ({ navigation }) => (
    <Stack.Navigator
        screenOptions={{
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
            headerTintColor: Theme.color3
        }}
    >
        <Stack.Screen
            name="Discover"
            component={ScreenHome}
            options={{
                headerRight: () => <SearchButton navigation={navigation} />
            }}
        />
        <Stack.Screen name="Detail" component={ScreenDetail} />
        <Stack.Screen name="Search" component={ScreenSearch} />
    </Stack.Navigator>
);

const App = () => {
    React.useEffect(() => {
        StatusBar.setBarStyle(Theme.statusBar);
    }, []);
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <NavigationContainer>
                <ModalStack.Navigator headerMode="none" mode="modal">
                    <ModalStack.Screen name="stack" component={StackNavigator} />
                    <ModalStack.Screen name="modal" component={ScreenModal} />
                </ModalStack.Navigator>
            </NavigationContainer>
        </ReactQueryCacheProvider>
    );
};

export default App;
