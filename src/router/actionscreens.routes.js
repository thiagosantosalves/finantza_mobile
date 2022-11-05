import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScreenCredit from '../pages/ScreenCredit';
import ScreenDebit from '../pages/ScreenDebit';
import ScreenTransfer from '../pages/ScreenTransfer';

import ScreenSetCredit from '../pages/ScreenSetCredit';
import ScreenSetDebit from '../pages/ScreenSetDebit';
import ScreenSetTransfer from '../pages/ScreenSetTransfer';

import ScreenTransferEdit from '../pages/ScreenTransferEdit';
import ScreenSetTransferEdit from '../pages/ScreenSetTransferEdit';

import ScreenDebitEdit from '../pages/ScreenDebitEdit';
import ScreenSetDebitEdit from '../pages/ScreenSetDebitEdit';

import ScreenCreditEdit from '../pages/ScreenCreditEdit';
import ScreenSetCreditEdit from '../pages/ScreenSetCreditEdit';

const Auth = createNativeStackNavigator();


const ActionsCreens = () => (
    <Auth.Navigator 
      screenOptions={{
        headerShadowVisible: false,         
      }}
    >   
     
      <Auth.Screen name="ScreenTransfer" component={ScreenTransfer} options={{
        title: 'Transferência', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#426CD7',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenCredit" component={ScreenCredit} options={{
        title: 'Receita', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#0BCECE',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenDebit" component={ScreenDebit} 
        options={{
          title: 'Despesas', 
          headerTintColor: '#FFF',
          headerStyle: { 
              backgroundColor: '#DD2D82',
              shadowColor: "transparent",
          },
        }}/>
      
      <Auth.Screen name="ScreenSetCredit" component={ScreenSetCredit} options={{
        title: 'Receita', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#0BCECE',
            shadowColor: "transparent",
        },
      }} />

      <Auth.Screen name="ScreenSetDebit" component={ScreenSetDebit} options={{
        title: 'Despesas', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#DD2D82',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenSetTransfer" component={ScreenSetTransfer} options={{
        title: 'Transferência', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#426CD7',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenTransferEdit" component={ScreenTransferEdit} options={{
        title: 'Editar transferência', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#426CD7',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenSetTransferEdit" component={ScreenSetTransferEdit} options={{
        title: 'Editar transferência', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#426CD7',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenDebitEdit" component={ScreenDebitEdit} options={{
        title: 'Editar despesa', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#DD2D82',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenSetDebitEdit" component={ScreenSetDebitEdit} options={{
        title: 'Editar despesa', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#DD2D82',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenCreditEdit" component={ScreenCreditEdit} options={{
        title: 'Editar receita', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#0BCECE',
            shadowColor: "transparent",
        },
      }}/>

      <Auth.Screen name="ScreenSetCreditEdit" component={ScreenSetCreditEdit} options={{
        title: 'Editar receita', 
        headerTintColor: '#FFF',
        headerStyle: { 
            backgroundColor: '#0BCECE',
            shadowColor: "transparent",
        },
      }}/>
      
    </Auth.Navigator>
);

export default ActionsCreens;