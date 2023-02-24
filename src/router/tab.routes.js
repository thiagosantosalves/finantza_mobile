import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';

import Home from '../pages/Home';
import Releases from  '../pages/Releases';

import Reports from '../pages/Reports';
import Metas from '../pages/Metas';
import EmptyScreen from '../pages/EmptyScreen';

import FloatButton from '../components/FloatButton';

const Tab = createBottomTabNavigator();

const colorPrimary = '#2C3CD1';

const TabRouter = () => (
    <Tab.Navigator 

        initialRouteName="Home"
        screenOptions={{
            tabBarStyle: {
               borderTopColor: 'transparent',
            },
            tabBarActiveTintColor: colorPrimary,
            headerShown: false,
            tabBarShowLabel: false
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
                tabBarIcon: ({ color, size }) => (
                  <Foundation name="home" color={color} size={size} />
                ),
            }}
        />
    
        <Tab.Screen 
            name="Releases" 
            component={Releases} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Fontisto name="arrow-swap" color={color} size={size} />
                ),
                title: 'Lançamentos', 
                headerTintColor: '#FFF',
                headerShown: true,
            
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                    elevation: 0,
                    shadowOpacity: 0, 
                    borderBottomWidth: 0
                    
                },
            }} 
        /> 

        <Tab.Screen 
            name="EmptyScreen" 
            component={EmptyScreen} 
            options={{
                tabBarIcon: () => (
                    <FloatButton />
                )
            }}
            listeners={() => ({
                tabPress: (e) => {
                    e.preventDefault();
                },
            })}
            
        /> 

        <Tab.Screen
            name="Reports" 
            component={Reports} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="graph-pie" color={color} size={size} />
                ),
                title: 'Relatórios', 
                headerTintColor: '#FFF',
                headerShown: true,
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }}
        />
        
        <Tab.Screen 
            name="Metas" 
            component={Metas}
           
            options={{
                title: 'Metas', 
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="target" color={color} size={size} />
                ),
                headerTintColor: '#FFF',
                headerShown: true,
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                tabBarHideOnKeyboard: true
                
            }}
        />
    </Tab.Navigator>
)

export default TabRouter;


