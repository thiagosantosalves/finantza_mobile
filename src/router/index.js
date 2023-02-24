import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loading from '../pages/loading';
import AuthRoutes from './auth.routes';
import SignOutRoutes from './signOut.routes';
import TabRoutes from './tab.routes';
import HomeRoutes from './home.routes';
import MetaRoutes from './meta.routes';

import ActionScreens from './actionscreens.routes';


import { useAuth } from '../hooks/auth';

const RootStack = createNativeStackNavigator();

import { WRootToastApp } from 'react-native-smart-tip'

const Routes = () => {
    const { user, loading } = useAuth();
    return (
        <WRootToastApp>

            <RootStack.Navigator  screenOptions={{
                headerShadowVisible: false,
                headerShown: false
            }}>
                {loading ? (
                    <RootStack.Screen name="Loading" component={Loading} />
                ) : user ? (
                    <RootStack.Screen name="TabRoutes" component={TabRoutes} />
                ) : (
                    <RootStack.Screen name="AuthRoutes" component={AuthRoutes} />
                )}

                <RootStack.Screen name="SignOutRoutes" component={SignOutRoutes} /> 

                <RootStack.Screen name="ActionScreens" component={ActionScreens} />
                <RootStack.Screen name="HomeRoutes" component={HomeRoutes} />
                <RootStack.Screen name="MetaRoutes" component={MetaRoutes} /> 
            </RootStack.Navigator>
                
        </WRootToastApp>
        
    );
}

export default Routes;
