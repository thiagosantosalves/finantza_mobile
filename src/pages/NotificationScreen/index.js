import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal } from 'react-native';
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
    AreaModal,
    BodyModalDelete,
    AreaTitleModalNotification,
    TitleModalNotification,
    AreaDescriptionModalNotification,
    NameCategoryDel,
    DescriptionModalNotification,
    AreaButtonModalNotification,
    ButtonModalNotification,
    TextButtonModalNotification,
} from './styles';

const NotificationScreen = ({ navigation }) => {

    const [notification, setNotification] = useState([]);
    const [modal, setModal] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AreaIconDelete acttiveOpacity={0.8} onPress={() => setModal(true)}>
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
      
        setModal(false);
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

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={()=>{
                    setModal(false)
                }}
            >
                <AreaModal>
                    <BodyModalDelete>

                        <AreaTitleModalNotification>
                            <TitleModalNotification>Notificações</TitleModalNotification>
                        </AreaTitleModalNotification>

                        <AreaDescriptionModalNotification>
                            <DescriptionModalNotification>Deseja apagar todas as notificações?</DescriptionModalNotification>
                        </AreaDescriptionModalNotification>

                        <AreaButtonModalNotification>
                            
                            <ButtonModalNotification activeOpacity={0.8} onPress={() => setModal(false) }>
                                <TextButtonModalNotification>CANCELAR</TextButtonModalNotification>
                            </ButtonModalNotification>

                            <ButtonModalNotification activeOpacity={0.8} onPress={() => handlerDelete() }>
                                <TextButtonModalNotification>OK</TextButtonModalNotification>
                            </ButtonModalNotification>
                            
                        </AreaButtonModalNotification>

                    </BodyModalDelete>
                </AreaModal>
            </Modal>
        </Container>
    )
}

export default NotificationScreen;