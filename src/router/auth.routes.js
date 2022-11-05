import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InitialScreen from '../pages/InitialScreen';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';


const Auth = createNativeStackNavigator();

const colorPrimary = '#2C3CD1';

const AuthRoutes = () => (
    <Auth.Navigator 
       screenOptions={{
        headerShadowVisible: false
      }}
    >   
        <Auth.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }}  />

        <Auth.Screen name="SignIn" component={SignIn} options={{ 
            title: 'Login', 
            headerTintColor: '#FFF',
            headerStyle: { 
                backgroundColor: colorPrimary,
                shadowColor: "transparent",
            }
        }} />

        <Auth.Screen name="SignUp" component={SignUp} options={{ 
            title: 'Cadastro',
            headerTintColor: '#FFF',
            headerTransparent: true,
            headerStyle: { 
                backgroundColor: colorPrimary,
            }
        }}/>
        
    </Auth.Navigator>
);

export default AuthRoutes;