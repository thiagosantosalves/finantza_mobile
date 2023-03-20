import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { WToast } from 'react-native-smart-tip';

import CardNotification from '../../components/CardNotification';

import api from '../../services/api';

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
    DescriptionModalNotification,
    AreaButtonModalNotification,
    AreaButtonModalNotificationInfo,
    ButtonModalNotification,
    TextButtonModalNotification,
} from './styles';

const NotificationScreen = ({ navigation }) => {

    const [notification, setNotification] = useState([]);
    const [infoNotification, setInfoNotification] = useState('');
    const [modal, setModal] = useState(false);
    const [infoModa, setInfoModal] = useState(false);
    const [modalCardCredit, setModalCardCredit] = useState(false);

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
        try {
            await api.delete('notification');
            setNotification([]);
            setModal(false);
        } catch (error) {
            console.log(error)
            setModal(false);
        }
    }

    const handlerNotification = async () => {
        
        try {
            const res = await api.get('notification');

            const resFilter = res.data.sort((x,y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);

                return a - b;
            });

            setNotification(resFilter);
        } catch (error) {
            console.log(error);
        }
       
    }

    const handlerId = (id) => {
        let infoId = notification.find(e => e.id === id);

        if(infoId.id_fixed_release) {
            setInfoNotification(infoId);
            setModalCardCredit(true);
        } else {
            setInfoNotification(infoId);
            setInfoModal(true);
        }

    }

    const handlerCardCredit = async () => {

        try {
            let fixed = await api.get(`fixedfilter/${infoNotification.id_fixed_release}`);
            
            setModalCardCredit(false);
            navigation.navigate('CardFixedScreen', {
                data: fixed.data
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handlerUpdate = async () => {
        try { 

            await api.put(`notification/${infoNotification.id}`, {
                status: true
            });

            handlerNotification();
            setInfoModal(false);
        } catch (error) {
            console.log(error)
        }
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
                        getNotification={(id) => handlerId(id)}
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

            <Modal 
                animationType="slide"
                transparent={true}
                visible={infoModa}
                onRequestClose={()=>{
                    setInfoModal(false)
                }}
            >
                <AreaModal>
                    <BodyModalDelete>

                        <AreaTitleModalNotification>
                            <TitleModalNotification>Notificação</TitleModalNotification>
                        </AreaTitleModalNotification>

                        <AreaDescriptionModalNotification>
                            <DescriptionModalNotification>{infoNotification.description}</DescriptionModalNotification>
                        </AreaDescriptionModalNotification>

                        <AreaButtonModalNotificationInfo>
                            
                            <ButtonModalNotification activeOpacity={0.8} onPress={() => handlerUpdate() }>
                                <TextButtonModalNotification>OK</TextButtonModalNotification>
                            </ButtonModalNotification>
                            
                        </AreaButtonModalNotificationInfo>

                    </BodyModalDelete>
                </AreaModal>
            </Modal>
            
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalCardCredit}
                onRequestClose={()=>{
                    setModalCardCredit(false);
                }}
            >
                <AreaModal>
                    <BodyModalDelete>

                        <AreaTitleModalNotification>
                            <TitleModalNotification>Notificações</TitleModalNotification>
                        </AreaTitleModalNotification>

                        <AreaDescriptionModalNotification>
                            <DescriptionModalNotification>{infoNotification.description}</DescriptionModalNotification>
                        </AreaDescriptionModalNotification>

                        <AreaButtonModalNotification>
                            
                            <ButtonModalNotification activeOpacity={0.8} onPress={() => setModalCardCredit(false) }>
                                <TextButtonModalNotification>CANCELAR</TextButtonModalNotification>
                            </ButtonModalNotification>

                            <ButtonModalNotification activeOpacity={0.8} onPress={() => handlerCardCredit() }>
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