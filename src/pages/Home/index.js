import React, { useState, useCallback, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import CardBanck from '../../components/CardBanck';
import CardCredit from '../../components/CardCredit';
import CardMeta from '../../components/CardMeta';
import CardInitial from '../../components/CardInitial';
import CardInitialMeta from '../../components/CardInitialMeta';

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
    LineBalance,
    AreaBody,
    ContainerCard,
    AreaList,
    List,
} from './styles';

const Home = () => {

    const { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const { user, handlerMeta } = useAuth();

    const [userInfo, setUserInfo] = useState({});
    const [valueAccount, setValueAccount] = useState(null);
    const [balanceEye, setBalanceEye] = useState(false);
    const [bank, setBank] = useState([]);
    const [card, setCard] = useState([]);
    const [meta, setMeta] = useState([]);

    useEffect(() => {
        getCardStatus();
        getMeta();
    }, []);

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
            console.log("Error: "+error);
        }
    }
    
    const getCardStatus = async () => {
        
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
       
        try {
            
            let res = await api.get('/cardcreditreleases');
            res = res.data.filter(e => e.statuscard != 4);

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

        } catch (error) {
            console.log("Error: "+error);
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
            const response = await api.get('account');

            const resIsFiledFilter = response.data.filter(item => item.is_filed == false);

            const resFilterDateDesc = resIsFiledFilter.sort((x, y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);
                return a - b;
            });

            setBank(resFilterDateDesc);

        } catch (error) {
            console.log(error);
        }   

    }

    const getCard = async () => {
        
        const response = await api.get('/cardcredit');

        const resFilterFiled = response.data.filter((item) => item.is_filed == false);
        const resFilterDateDesc = resFilterFiled.sort((x, y) => {
            let a = new Date(x.createdAt);
            let b = new Date(y.createdAt);

            return a - b;
        });

        setCard(resFilterDateDesc);
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
    }

    return(
        <Container>
             
            <Header>
                <AreaInfo>

                    <AreaPerfil activeOpacity={0.8} onPress={()=> navigation.navigate('HomeRoutes', {
                        screen: 'PerfilScreen'
                    })}>

                        <AreaImgPerfil>
                            <Img source={require('../../assets/perfil.png')} />
                        </AreaImgPerfil>

                        <AreaTitle>
                            <TextPresentation>Olá,</TextPresentation>
                            <TitleUser>{userInfo.name}</TitleUser>
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
            
            </AreaBody>
        </Container>
    )
}

export default Home;