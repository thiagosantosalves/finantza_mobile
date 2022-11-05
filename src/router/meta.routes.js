import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MetaInitial from '../pages/MetaInitial';
import MetaCreate from '../pages/MetaCreate';

const Meta = createNativeStackNavigator();

const colorPrimary = '#2C3CD1';

const MetaRoutes = () => (
    <Meta.Navigator 
    screenOptions={{
        headerShadowVisible: false,
        }}
    >  
        <Meta.Screen name="MetaInitial" component={MetaInitial} options={{
            title: 'Nova meta', 
            headerTintColor: '#FFF',
            headerStyle: { 
                backgroundColor: colorPrimary,
                shadowColor: "transparent",
            },
        }}/>

        <Meta.Screen name="MetaCreate" component={MetaCreate} options={{
            title: 'Nova meta', 
            headerTintColor: '#FFF',
            headerStyle: { 
                backgroundColor: colorPrimary,
                shadowColor: "transparent",
            },
        }}/>

       
    </Meta.Navigator>
);

export default MetaRoutes; 