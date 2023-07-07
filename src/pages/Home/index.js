import React, { useState, useCallback, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import CardBanck from '../../components/CardBanck';
import CardCredit from '../../components/CardCredit';
import CardMeta from '../../components/CardMeta';
import CardInitial from '../../components/CardInitial';
import CardInitialMeta from '../../components/CardInitialMeta';
import CardInitialAccountShimmer from '../../components/CardInitialAccountShimmer';

import formatNumber from '../../utils/formatNumber';

import { 
    Container, 
    Header, 
    AreaInfo,
    AreaPerfil,
    AreaImgPerfil, 
    AreaTitle, 
    Img, 
    TextPresentation, 
    TitleUser,
    AreaNotification, 
    AreaTotalBalance,
    TitleBalance,
    DescriptionBalance,
    ButtonEye,
    ButtonNotification,
    AreaNotificationCount,
    NotificationText,
    LineBalance,
    AreaBody,
    ContainerCard,
    AreaList,
    List,
} from './styles';

const Home = () => {

    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const { user, handlerMeta } = useAuth();
    const [isAccountLoading, setIsAccountLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [valueAccount, setValueAccount] = useState(null);
    const [balanceEye, setBalanceEye] = useState(false);
    const [bank, setBank] = useState([]);
    const [card, setCard] = useState([]);
    const [meta, setMeta] = useState([]);
    const [notification, setNotification] = useState([]);
    const [notificationCount, setNotificationCount] = useState(null);

    useEffect(() => {
        OneSignal.setLogLevel(6, 0)
        OneSignal.setAppId('88d61bea-830c-4198-8957-b045e807b780');
        OneSignal.setNotificationOpenedHandler( notification => {
            console.log('result: '+ notification);
        });
    }, []);

    const handlerIdDevice = async () => {

        const { userId } = await OneSignal.getDeviceState();

        try {
            await api.post('device', {
                id_devices: userId
            });
        } catch (error) {
            console.log('device already registered');
        }
    }

    const sendNotification = async (textMsn) => {

        const { userId } = await OneSignal.getDeviceState();

        const notificationObj = {
            contents: {en: textMsn},
            include_player_ids: [userId],
        };

        const jsonString = JSON.stringify(notificationObj);

        OneSignal.postNotification(jsonString, (success) => {
            console.log("Success:", success);
          }, (error) => {
            console.log("Error:", error );
        });
    }

    useEffect(() => {
        handlerIdDevice();
        getCardStatus();
        getMeta();
        getNotification();
    }, []);
 
    const getNotification = async () => {
        
        try {
            let notification = await api.get('notification');

            notification = notification.data.filter(e => e.status === false);
            setNotification(notification);   
            setNotificationCount(notification.length);

        } catch (error) {
            console.log(error)
        }
    }

    const getMeta = async () => {
        try {

            let date = new Date();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let metas = await api.get(`meta/${month}&${year}`);

            let id = metas.data.map(e => {
                return e.category.id
            });
            
            handlerMeta(id);
            setMeta(metas.data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const getCardStatus = async () => {
        
        let date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
       
        try {
        
            let res = await api.get('/cardcreditreleases');
            let card = await api.get('/cardcredit');
            res = res.data.filter(e => e.statuscard != 4 && e.month === month && e.year === year);

            if(res.length > 0) {
                card = card.data.filter(e => e.id === res[0].id_card_credit);
                let createdCard = new Date(card[0].createdAt);
    
                let createdMonth = createdCard.getMonth() + 1;
                let createdYear = createdCard.getFullYear();
    
                if(month === createdMonth && year === createdYear) return false; 
    
                let statuscloses = res.filter(e => e.statuscard != 2 && e.statuscard != 3 && Number(e.closes_day) < Number(day));
                let statuswins = res.filter(e => e.statuscard != 3 && Number(e.wins_day) < Number(day));
    
                if(statuscloses.length > 0) {
                    statuscloses = statuscloses.map(e => e.id);
                    await api.put(`/cardcreditreleases/${statuscloses.toString()}`, { statuscard: 2 });
                } 
    
                if(statuswins.length > 0) {
                    statuswins = statuswins.map(e => e.id);
                    await api.put(`/cardcreditreleases/${statuswins.toString()}`, { statuscard: 3 });
                }  
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    const getAccount = async () => {
        
        try {

            const response = await api.get('/account');
            const value = response.data.reduce((total, element) => {
                return total + Number(element.value);
            }, 0);

            setValueAccount(value);

        } catch (error) {
            console.log(error);
        }   
    }

    const getBank = async () => {

        try {

            setIsAccountLoading(true);

            const response = await api.get('account');

            const resIsFiledFilter = response.data.filter(item => item.is_filed == false);
            setBank(resIsFiledFilter);


            setIsAccountLoading(false)
        } catch (error) {
            setIsAccountLoading(false);
            console.log(error);
        }   

    }

    const getCard = async () => {

        try {
            const response = await api.get('/cardcredit');
            const resFilterFiled = response.data.filter((item) => item.is_filed == false);
            setCard(resFilterFiled);
        } catch (error) {
            console.log(error);
        }
    }

    const balanceEyeHandler = useCallback(() => {
        if(balanceEye) {
            setBalanceEye(false)
        } else {
            setBalanceEye(true)
        }
    }, [balanceEye]);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            exploreRefresh();
        });
        return unsubscribe;
    }, [navigation]);

    const exploreRefresh = () => {
        setUserInfo(user);
        getAccount();
        getBank();
        getCard();
        getMeta();
        getNotification();
    }

    return(
        <Container>
             
            <Header>
                <AreaInfo>

                    <AreaPerfil activeOpacity={0.8} onPress={()=> navigation.navigate('HomeRoutes', {
                        screen: 'PerfilScreen'
                    })}>

                        <AreaImgPerfil>

                            {user.avatar ? (
                                <Img source={{ uri: user.avatar.url }} />
                            ) : (
                                <Ionicons name='person' size={32} color="#2F323D" />
                            )}
                            
                        </AreaImgPerfil>

                        <AreaTitle>
                            <TextPresentation>Olá,</TextPresentation>
                            <TitleUser>{user.name}</TitleUser>
                        </AreaTitle>
                    
                    </AreaPerfil>

                    <AreaNotification>
                
                        <ButtonEye activeOpacity={0.8} onPress={balanceEyeHandler}>
                            {balanceEye ? 
                                (   
                                    <Ionicons name="md-eye-off-outline" size={24} color="#FF872C" /> 
                                )
                                :
                                (
                                    <Ionicons name="md-eye-outline" size={24} color="#FF872C" />
                                )
                            }
                        </ButtonEye>

                        <ButtonNotification activeOpacity={0.8} onPress={()=> navigation.navigate('HomeRoutes', {
                            screen: 'PerfilScreen'
                        })}>
                            <FontAwesome name="gear" size={24} color="#FF872C" />
                        </ButtonNotification>
                        
                        <ButtonNotification activeOpacity={0.8} onPress={()=> navigation.navigate('HomeRoutes', { 
                            screen: 'NotificationScreen'
                        })}>
                            {notification.length > 0 && 
                                <AreaNotificationCount>
                                    <NotificationText>{notificationCount}</NotificationText>
                                </AreaNotificationCount>
                            }
                            <Feather name="bell" size={24} color="#FF872C" />
                        </ButtonNotification>

                    </AreaNotification>
                
                </AreaInfo>
                
                <AreaTotalBalance>

                    <TitleBalance>Saldo geral</TitleBalance>
                    
                    {balanceEye ? (
                        <LineBalance />
                    ) : (
                        <DescriptionBalance>R$ {formatNumber(valueAccount)}</DescriptionBalance>
                    )}
                
                </AreaTotalBalance>

            </Header> 

            <AreaBody showsVerticalScrollIndicator={false}>

                {isAccountLoading === true ? (
                    <CardInitialAccountShimmer />
                    ) : (

                        <ContainerCard>
                     
                    <AreaList>
                        <List
                            data={bank}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"
                            scrollEventThrottle={16}
                            snapToOffsets={[...Array(bank.length)].map(
                                (x, i) => i * (width * 0.8 -40) + (i - 1) * 40,
                            )}
                            renderItem={({item}) => <CardBanck data={item} />}
                            keyExtractor={item => item.id}
                        />
                    </AreaList>
                

                  
                    {card.length <= 0 ? 
                        (
                            <>
                                <CardInitial 
                                    handlerCard={()=> navigation.navigate('HomeRoutes', {
                                        screen: 'CardCreditScreenCreate'
                                    })}
                                />
                            </>
                        )
                        :
                        (
                            <>                   
                                <AreaList>
                                    <List
                                        data={card}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        decelerationRate="fast"
                                        scrollEventThrottle={16}
                                        snapToOffsets={[...Array(card.length)].map(
                                            (x, i) => i * (width * 0.8 -40) + (i - 1) * 40,
                                        )}
                                        renderItem={({item}) => <CardCredit data={item}  />}
                                        keyExtractor={item => item.id}
                                    />
                                </AreaList>
                            </>
                        )
                    }               

                    {meta.length <= 0 ?
                        (
                            <CardInitialMeta 
                                handlerMeta={() => navigation.navigate('MetaRoutes')}
                            />
                        ) 
                        :
                        (
                            <AreaList>
                                <List
                                    data={meta}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    decelerationRate="fast"
                                    scrollEventThrottle={16}
                                    snapToOffsets={[...Array(meta.length)].map(
                                        (x, i) => i * (width * 0.8 -40) + (i - 1) * 40,
                                    )}
                                    renderItem={({item}) => <CardMeta data={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </AreaList> 
                        )
                    }
                    
                </ContainerCard>
                       
                )}          
            </AreaBody>
        </Container>
    )
}

export default Home;