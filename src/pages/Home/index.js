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

    const handlerFixo = async () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let id = null;
        let statusCardMeta = false;

        const fixedRelease = await api.get(`fixedrelease/${day}`);  
    
        if(fixedRelease.data.length > 0) {

            let newFixedRelease = fixedRelease.data.map(e => {

                let typePlayer = false;

                if(e.account_id) {
                    typePlayer = false;
                }

                if(e.card_credit_id) {
                    typePlayer = true;
                }

                let res = {
                    id: Math.floor(Math.random() * 256),
                    description: e.description,
                    value: e.value,
                    rc_category_id: e.rc_category_id,
                    dp_category_id: e.dp_category_id,
                    type_payer: typePlayer,
                    account_id: e.account_id,
                    account_origin: null,
                    account_destiny: null,
                    card_credit_id: e.card_credit_id,
                    day: day,
                    month: month,
                    year: year,
                    fixo: true,
                    installments: false,
                    value_installments: 0,
                    qd_installments: - 1,
                    attachment_img: false,
                    attachment_img_id: null,
                    tag: false,
                    type: e.type,
                    tag_id: null,
                    paying_account_name: e.paying_account_name,
                    id_fixed_release: e.id,
                    user_id: e.user_id
                }

                return res;
            });

            try {

                const resMeta = await api.get(`meta/${month}&${year}`);
                let resCardMeta = await api.get('cardcreditreleases');
            
                if(resMeta.data.length > 0) {
                    for (let lancamento of  newFixedRelease) {

                        if(lancamento.type_payer === false) {

                            let meta = resMeta.data.find(m => m.category.id === lancamento.dp_category_id);
 
                            if (meta) {
   
                               let usedValue = Number(lancamento.value) + Number(meta.used_value);
                               usedValue = usedValue.toFixed(2);
   
                               let newPorcent = usedValue * 100;
                               newPorcent =  Number(newPorcent) / Number(meta.value);  
   
                               let status = false;
               
                               if(newPorcent >= 100 ) {
                                   newPorcent = 100;
                                   status = true;
                               }
            
                               await api.put(`metareleases/${meta.id}`, {
                                   used_value: usedValue,
                                   porcent: newPorcent.toFixed(2),
                                   status: status
                               });
                            }
                        }
                        
                        if(lancamento.type_payer === true) {

                            let cardStatusMeta2 = resCardMeta.data.filter(e => e.id_card_credit === lancamento.card_credit_id && e.statuscard === 2 && e.month === Number(month) && e.year === Number(year));
                            let cardStatusMeta3 = resCardMeta.data.filter(e => e.id_card_credit === lancamento.card_credit_id && e.statuscard === 3 && e.month === Number(month) && e.year === Number(year));

                            if(cardStatusMeta2.length > 0) {
                                statusCardMeta = true;
                            }

                            if(cardStatusMeta3.length > 0) {
                                statusCardMeta = true;
                            }
                            
                            resCardMeta = resCardMeta.data.filter(e => e.id_card_credit === Number(lancamento.card_credit_id) && e.month === Number(month) && e.year === Number(year));
                            let resCardMetaPay = resCardMeta.filter(e => e.statuscard === 4);

                            if(resCardMetaPay.length > 0) {
                                statusCardMeta = true;
                            }

                            if(!statusCardMeta) {
                                let meta = resMeta.data.find(m => m.category.id === lancamento.dp_category_id);
 
                                if (meta) {
    
                                    let usedValue = Number(lancamento.value) + Number(meta.used_value);
                                    usedValue = usedValue.toFixed(2);
    
                                    let newPorcent = usedValue * 100;
                                    newPorcent =  Number(newPorcent) / Number(meta.value);  
    
                                    let status = false;
                
                                    if(newPorcent >= 100 ) {
                                        newPorcent = 100;
                                        status = true;
                                    }
                
                                    await api.put(`metareleases/${meta.id}`, {
                                        used_value: usedValue,
                                        porcent: newPorcent.toFixed(2),
                                        status: status
                                    });
                                }
                            }
                        }
                    }
                } 
       
                for(let release of newFixedRelease) {

                    if(release.type_payer === false) {

                        let sum = release.value;
                        const account = await api.get(`account/${release.account_id}`);

                        sum =  Number(account.data.value) - Number(sum);
                        await api.put(`account/${account.data.id}`, { value: sum });
                    }
                }

                let resCardRelease = await api.get('cardcreditreleases');

                for(let release of newFixedRelease) {

                    if(release.type_payer) {
                        
                        let status = false;
                        const card = await api.get(`cardcredit/${release.card_credit_id}`);
                        let valueLimit = Number(card.data.limit_card) - Number(card.data.invoice_amount);

                        if(Number(valueLimit) >= Number(release.value)) {

                            
                            let cardStatus2 = resCardRelease.data.filter(e => e.id_card_credit === release.card_credit_id && e.statuscard === 2 && e.month === Number(month) && e.year === Number(year));
                            let cardStatus3 = resCardRelease.data.filter(e => e.id_card_credit === release.card_credit_id && e.statuscard === 3 && e.month === Number(month) && e.year === Number(year));

                            if(cardStatus2.length > 0) {

                                status = true;
                                id = release.id;

                                let textMsn = `O cartão ${cardStatus2[0].card_credit.name} esta fechado para essa data, troque a data do lançamento!`
                                
                                await api.post('notification', {
                                    description: textMsn,
                                    status: false,
                                    id_fixed_release: fixedRelease.data[0].id,
                                    id_parcel_release: null 
                                });
                                
                                sendNotification(textMsn);
                            }
                
                            if(cardStatus3.length > 0) {

                                status = true;
                                id = release.id;

                                let textMsn = `O cartão ${cardStatus3[0].card_credit.name} esta vencido para essa data, troque a data do lançamento!`;

                                await api.post('notification', {
                                    description: textMsn,
                                    status: false,
                                    id_fixed_release: fixedRelease.data[0].id,
                                    id_parcel_release: null 
                                });

                                sendNotification(textMsn); 
                            }

                            let sum_limit = Number(card.data.invoice_amount) + Number(release.value);

                            resCardRelease = resCardRelease.data.filter(e => e.id_card_credit === Number(release.card_credit_id) && e.month === Number(month) && e.year === Number(year));
                            let resCardReleasePay = resCardRelease.filter(e => e.statuscard === 4);

                            if(resCardReleasePay.length > 0) {

                                status = true;
                                id = release.id;

                                let textMsn = `O cartão ${resCardReleasePay[0].card_credit.name} esta pago para essa data, troque a data do lançamento!`;
                            
                                await api.post('notification', {
                                    description: textMsn,
                                    status: false,
                                    id_fixed_release: fixedRelease.data[0].id,
                                    id_parcel_release: null 
                                });
                                
                                sendNotification(textMsn); 
                            }

                            if(!status) {

                                if(resCardRelease.length > 0) {
                               
                                    let sumCardReleases = Number(resCardRelease[0].invoice_amount) + Number(release.value);
                                    await api.put(`cardcreditreleases/${resCardRelease[0].id}`, { invoice_amount: sumCardReleases });

                                } else {

                                    const cardInfoReleases = {
                                        statuscard: 1,
                                        month: month,
                                        year: year,
                                        pay: false,
                                        limit_card: card.data.limit_card,
                                        invoice_amount: release.value,
                                        closes_day: card.data.closes_day,
                                        wins_day: card.data.wins_day,
                                        id_card_credit: card.data.id,
                                        id_account: card.data.account.id
                                    }

                                    await api.post('cardcreditreleases', cardInfoReleases); 
                                }
                                await api.put(`cardcredit/${card.data.id}`, { invoice_amount: sum_limit });
                            }
                        } else {
                            sendNotification('Limite do cartão insuficiente!');
                        }
                    }
                }

                if(id) {
                    newFixedRelease = newFixedRelease.filter(e => e.id != id);
                }

                if(newFixedRelease.length > 0) {

                    newFixedRelease = newFixedRelease.map(e => {

                        let res = {
                            description: e.description,
                            value: e.value,
                            rc_category_id: e.rc_category_id,
                            dp_category_id: e.dp_category_id,
                            type_payer: e.type_payer,
                            account_id: e.account_id,
                            account_origin: null,
                            account_destiny: null,
                            card_credit_id: e.card_credit_id,
                            day: e.day,
                            month: e.month,
                            year: e.year,
                            fixo: true,
                            installments: false,
                            value_installments: 0,
                            qd_installments: - 1,
                            attachment_img: false,
                            attachment_img_id: null,
                            tag: false,
                            type: e.type,
                            tag_id: null,
                            paying_account_name: e.paying_account_name,
                            id_fixed_release: e.id,
                            user_id: e.user_id
                        }

                        return res;
                    });

                    try {
                        await api.post('releasebulkcreate', newFixedRelease);
                    } catch (error) {
                        console.log(error);
                    }

                    for(let release of newFixedRelease) {

                        let textMsn = `Novo lançamento fixo registrado no valor de ${formatNumber(release.value)}. Agradecemos por utilizar o Finantza!`;            
                        
                        await api.post('notification', {
                            description: textMsn,
                            status: false,
                            id_fixed_release:null,
                            id_parcel_release: null 
                        });

                        sendNotification(textMsn);
                    } 
                }

                getCard();
                getAccount();
                getMeta();
                getNotification();
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function runOncePerDay() {
        /*         
        await AsyncStorage.removeItem('lastRun');
        const lastRun = await AsyncStorage.getItem('lastRun');
        console.log(lastRun);
        */

        const today = new Date().getDate();
        const lastRun = await AsyncStorage.getItem('lastRun');
      
        if (lastRun !== today.toString()) {
            await AsyncStorage.setItem('lastRun', today.toString());
            handlerFixo();
        } else {
            //console.log('Function has already been executed today');
        } 
    }

    useEffect(() => {
        runOncePerDay();
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
            res = res.data.filter(e => e.statuscard != 4 && e.month === month && e.year === year);

            let statuscloses = res.filter(e => e.statuscard != 2 && e.statuscard != 3 && Number(e.closes_day) < Number(day));
            let statuswins = res.filter(e => e.statuscard != 3 && Number(e.wins_day) < Number(day));

            if(statuscloses.length > 0) {
                statuscloses = statuscloses.map(e => e.id);

                console.log(2)

                //await api.put(`/cardcreditreleases/${statuscloses.toString()}`, { statuscard: 2 });
            } 

            if(statuswins.length > 0) {
                statuswins = statuswins.map(e => e.id);

                console.log(3)

                //await api.put(`/cardcreditreleases/${statuswins.toString()}`, { statuscard: 3 });
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