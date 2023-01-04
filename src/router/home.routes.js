import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ButtonAddHeader from '../components/ButtonAddHeader';
import Bank from '../pages/Bank';
import BankCreate from '../pages/BankCreate';
import BankEdit from '../pages/BankEdit';
import CardCreditScreen from '../pages/CardCreditScreen';
import CardCreditScreenCreate from '../pages/CardCreditScreenCreate';
import CardCreditScreenInfo from '../pages/CardCreditScreenInfo';
import CardCreditScreenEdit from '../pages/CardCreditScreenEdit';
import PerfilScreen from '../pages/PerfilScreen';
import PerfilEdit from '../pages/PerfilEdit';
import PremiumScreem from '../pages/PremiumScreem';
import ConfigScreen from '../pages/ConfigScreen';
import CategoryDebit from '../pages/CategoryDebit';
import CategoryDebitCreate from '../pages/CategoryDebitCreate';
import CategoryDebitEdit from '../pages/CategoryDebitEdit';
import CategoryRevenue from '../pages/CategoryRevenue';
import CategoryRevenueCreate from '../pages/CategoryRevenueCreate';
import CategoryRevenueEdit from '../pages/CategoryRevenueEdit';
import Tags from '../pages/Tags';
import TagsCreate from '../pages/TagsCreate';
import ConciliationBank from '../pages/ConciliationBank';
import ConciliationBankImport from '../pages/ConciliationBankImport';
import NotificationScreen from '../pages/NotificationScreen';

import { useNavigation } from '@react-navigation/native';

const HomeRoute = createNativeStackNavigator();

const HomeRoutes = () => {

    const navigation = useNavigation();

    const colorPrimary = '#2C3CD1';

    return (
        <HomeRoute.Navigator 
            screenOptions={{
                headerShadowVisible: false,    
                
                }}
            > 

            <HomeRoute.Screen name="bank" component={Bank} options={{
                title: 'Contas', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
                headerRight: () => <ButtonAddHeader onPress={()=>navigation.navigate('bankCreate')} />
            }}/>

            <HomeRoute.Screen name="bankCreate" component={BankCreate} options={{
                title: 'Cadastro', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="BankEdit" component={BankEdit} options={{
                title: 'Editar', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="CardCreditScreen" component={CardCreditScreen} options={{
                title: 'Cartões de crédito', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
                headerRight: () => <ButtonAddHeader onPress={()=>navigation.navigate('CardCreditScreenCreate')} />
            }}/>

            <HomeRoute.Screen name="CardCreditScreenCreate" component={CardCreditScreenCreate} options={{
                title: 'Cadastro de cartão', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="CardCreditScreenInfo" component={CardCreditScreenInfo} options={{
                title: 'Detalhes do cartão', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="CardCreditScreenEdit" component={CardCreditScreenEdit} options={{
                title: 'Cartões de crédito', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="PerfilScreen" component={PerfilScreen} options={{
                title: 'Perfil', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/> 

            <HomeRoute.Screen name="perfilEdit" component={PerfilEdit} options={{
                title: 'Editar perfil', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/> 

            <HomeRoute.Screen name="premium" component={PremiumScreem} options={{
                title: 'Seja premium', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/> 

            <HomeRoute.Screen name="categoryDebit" component={CategoryDebit} options={{
                title: 'Categoria de despesas', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
                headerRight: () => <ButtonAddHeader onPress={()=>navigation.navigate('categoryDebitCreate')} />
            }}/>

            <HomeRoute.Screen name="categoryDebitCreate" component={CategoryDebitCreate} options={{
                title: 'Cadastro categoria', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="categoryDebitEdit" component={CategoryDebitEdit} options={{
                title: 'Editar categoria', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="categoryRevenue" component={CategoryRevenue} options={{
                title: 'Categoria de receitas', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
                headerRight: () => <ButtonAddHeader onPress={()=>navigation.navigate('categoryRevenueCreate')} />
            }}/>

            <HomeRoute.Screen name="categoryRevenueCreate" component={CategoryRevenueCreate} options={{
                title: 'Cadastro categoria', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/> 

            <HomeRoute.Screen name="categoryRevenueEdit" component={CategoryRevenueEdit} options={{
                title: 'Editar categoria', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/> 

            <HomeRoute.Screen name="configScreen" component={ConfigScreen} options={{
                title: 'Configurações', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/> 

            <HomeRoute.Screen name="tags" component={Tags} options={{
                title: 'Tags', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
                headerRight: () => <ButtonAddHeader onPress={()=>navigation.navigate('tagsCreate')} />
            }}/>

            <HomeRoute.Screen name="tagsCreate" component={TagsCreate} options={{
                title: 'Cadastro tags', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="ConciliationBank" component={ConciliationBank} options={{
                title: 'Conciliação Bancária', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="ConciliationBankImport" component={ConciliationBankImport} options={{
                title: 'Importar OFX', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

            <HomeRoute.Screen name="NotificationScreen" component={NotificationScreen} options={{
                title: 'Notificações', 
                headerTintColor: '#FFF',
                headerStyle: { 
                    backgroundColor: colorPrimary,
                    shadowColor: "transparent",
                },
            }}/>

        </HomeRoute.Navigator>
    )
};


export default HomeRoutes;