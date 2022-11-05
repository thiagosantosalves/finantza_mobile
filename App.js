import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/hooks';

import Routes from './src/router';

const App = () => {

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content"  backgroundColor="#2C3CD1" />
            <AppProvider>
                <View style={{ flex: 1, backgroundColor: '#2C3CD1' }}>
                    <Routes />
                </View>
            </AppProvider>
        </NavigationContainer>
  
    )
}

export default App;