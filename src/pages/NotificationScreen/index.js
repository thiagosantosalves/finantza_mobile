import React, { useState, useEffect, useLayoutEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { WToast } from 'react-native-smart-tip';

import CardNotification from '../../components/CardNotification';

import { 
    Container,
    AreaIconDelete,
    ListNotification,
    AreaTitle,
    TitleOps,
    Title,
    AreaBodyOps,
} from './styles';

const NotificationScreen = ({ navigation }) => {

    const [notification, setNotification] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AreaIconDelete acttiveOpacity={0.8} onPress={() => handlerDelete()}>
                    <MaterialCommunityIcons name="delete" size={30} color="#FFF"  />
                </AreaIconDelete>
            )
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            handlerNotification();
        });
        return unsubscribe;
    }, [notification]);

    useEffect(() => {
        handlerNotification();
    }, []);


    const handlerDelete = async () => {
        alert("Teste")
    }

    const handlerNotification = async () => {
        const data = [
            {
                id: 1,
                name: 'Lançamento não pago!',
                status: false
            },
            {
                id: 2,
                name: 'Fatura do cartão já esta vencida.',
                status: false
            },
            {
                id: 3,
                name: 'Promoção de natal pro plano anual, somente 55 reais!',
                status: true
            },
        ]

        setNotification(data);
    }

    function toatsError(text) {
        const toastOpts = {
        data: text,
        textColor: '#ffffff',
        backgroundColor: '#36393F',
        duration: WToast.duration.SHORT, 
        position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    return (
        <Container>
            {notification.length <= 0 ? (
                <AreaBodyOps>
                    <MaterialCommunityIcons name="bell" size={80} color="#c4c4c4" />
                    <AreaTitle>
                        <TitleOps>Ops!</TitleOps>
                        <Title>Nenhuma notificação.</Title>
                    </AreaTitle>
                </AreaBodyOps> 
            ):(
                <ListNotification
                    data={notification}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <CardNotification
                        data={item} 
                    />}
                />
            )}
        </Container>
    )
}

export default NotificationScreen;