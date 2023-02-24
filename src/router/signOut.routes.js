import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InitialScreen from '../pages/InitialScreen';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const SignOut = createNativeStackNavigator();
const colorPrimary = '#2C3CD1';

const AuthRoutes = () => (
    <SignOut.Navigator 
       screenOptions={{
        headerShadowVisible: false
      }}
    >   
      <SignOut.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }}  /> 
      
      <SignOut.Screen name="SignIn" component={SignIn} options={{ 
            title: 'Login', 
            headerTintColor: '#FFF',
            headerStyle: { 
                backgroundColor: colorPrimary,
                shadowColor: "transparent",
            }
        }} />

        <SignOut.Screen name="SignUp" component={SignUp} options={{ 
            title: 'Cadastro',
            headerTintColor: '#FFF',
            headerTransparent: true,
            headerStyle: { 
                backgroundColor: colorPrimary,
            }
        }}/>   

    </SignOut.Navigator>
);

export default AuthRoutes;