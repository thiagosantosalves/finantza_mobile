import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal, Dimensions } from 'react-native';
import { format, subMonths, addMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { WToast } from 'react-native-smart-tip';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import formatNumber from '../../utils/formatNumber';
import { listIconDp } from '../../utils/listIconDp';
import CardMetaInfo from '../../components/CardMetaInfo';
import ButtonHeaderComponentsMeta from '../../components/ButtonHeaderComponentsMeta';
import CardMetaShimmer from '../../components/CardMetaShimmer';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

let windowHeight = Dimensions.get('window').height;
windowHeight = windowHeight / 2 - 10;

import {
    Container,
    AreaBodyOps,
    ImageOps,
    AreaTitle,
    TitleOps,
    Title,
    AreaButton,
    ButtonHandlerMeta,
    ButtonHandlerMetaText,
    AreaTitleValue,
    TitleValueMeta,
    AreaValuePlanning,
    BoxPlanning,
    ValuePlanning,
    ValueRemains,
    AreaListMeta,
    ListMeta,
    AreaModalCenter,
    BodyModalCenter,
    AreaTitleModal,
    TitleModal,
    AreaCategoryModal,
    AreaIconModal,
    Icon,
    TextCategoryModal,
    AreaModalInput,
    InputModal,
    AreaButtonModal,
    ButtonModalCancel,
    ButtonModalCancelText,
    ButttonModalFinish,
    ButttonModalFinishText,
    BodyModalDelete,
    AreaTitleModalNotification,
    TitleModalNotification,
    AreaDescriptionModalNotification,
    NameCategoryDel,
    DescriptionModalNotification,
    AreaButtonModalNotification,
    ButtonModalNotification,
    TextButtonModalNotification,
    DateFilter,
    DateFilterRows,
    AreaTitleDateFilter,
    DateFilterTitle,
} from './styles';

const Metas = ({ navigation }) => {

    let today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [date, setDate] = useState(today);
    const [titleStatus, setTitleStatus] = useState('restam');
    const [meta, setMeta] = useState({});
    const [limit, setLimit] = useState(0);
    const [idMeta, setIdMeta] = useState(0);
    const [limitFormat, setLimitFormat] = useState('R$ 0,00');
    const [colorCategory, setColorCategory] = useState('');
    const [iconCategory, setIconCategory] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const [valueTotal, setValueTotal] = useState(0);
    const [valueUsed, setValueUsed] = useState(0);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const { handlerMeta, handlerMetaDate } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderComponentsMeta 
                    onPress={ async (e) => {
                        if(e === 2) {
                            navigation.navigate('MetaRoutes', {
                                screen: 'MetaInitial',
                            },);
                        }
                    }}
                />
            )
        });
    }, [navigation]);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            getMeta();

            console.log(windowHeight);
        });
        return unsubscribe;
    }, []);

    const toatsError = (text) => {
        const toastOpts = {
          data: text,
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT, 
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    const handlerCalcMeta = (data) => {

        const sumMetaTotal = data.reduce((a, b) => a + b.value, 0);
        const isMeta = data.filter(e => e.status === false);
        const sumTotalAvailable = isMeta.reduce((a, b) => a + b.value, 0);
        const useDValueTotalAvailable = isMeta.reduce((a, b) => a + b.used_value, 0);

        let value = sumTotalAvailable - useDValueTotalAvailable;
        setValueTotal(sumMetaTotal);

        const excedidoFilter = data.filter(e => e.status === true);
        const exceededValue = excedidoFilter.reduce((a, b) => a + b.value, 0);
        const exceededUsedValue = excedidoFilter.reduce((a, b) => a + b.used_value, 0);
        const subtraction = exceededUsedValue - exceededValue;

        if(value <= 0) {

            setValueUsed(subtraction);
            setTitleStatus('exedeu');

        } else {
            setValueUsed(value);
            setTitleStatus('restam');
        }

        let id = data.map(e => {
            return e.category.id
        });
        
        handlerMeta(id);
    } 

    const getMeta = async () => {

        setIsLoading(true);

        const date = new Date();
        setDate(date);

        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {

            let month = selectedMonth + 1;
            const res = await api.get(`meta/${month}&${selectedYear}`);

            handlerCalcMeta(res.data);
            
            handlerMetaDate(month+'&'+selectedYear);
            setMeta(res.data);  
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toatsError('Erro ao se comunicar com o servidor !');
        }
    }

    const handlerDateAdd = async () => {
        setIsLoading(true);

        const result = addMonths(date, 1)
        setDate(result);
        setMeta([]);  

        let month = result.getMonth() + 1;
        let year = result.getFullYear();
        
        handlerMetaDate(month+'&'+year);

        try {

            const res = await api.get(`meta/${month}&${year}`);
            handlerCalcMeta(res.data);
            setMeta(res.data);  
            
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false);
                toatsError('Erro ao se comunicar com o servidor !');
            }, 1000);
        } 

        const formattedDate = format(
            result, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );
        setCurrentDate(formattedDate);

        setIsLoading(false);
    }

    const handlerDateSub = async () => {
        setIsLoading(true)

        const result = subMonths(date, 1)
        setDate(result);
        setMeta([]);  

        let month = result.getMonth() + 1;
        let year = result.getFullYear();

        try {

            const res = await api.get(`meta/${month}&${year}`);
            handlerCalcMeta(res.data);
            setMeta(res.data);  
           
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false);
                toatsError('Erro ao se comunicar com o servidor !');
            }, 1000);
        } 
     
        setIsLoading(false);

        const formattedDate = format(
            result, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );
        setCurrentDate(formattedDate);
    }

    
    const transformNumber = (value) => {
        let v = value.replace(/\D/g, '');
        v = (v/100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        value = v;

        setLimitFormat("R$  "+value);
    }

    const setInputLimit = (number) => {
        const value = number.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');

        const v = value.replace('R$', '');
        let b = parseInt(v);
        b = (b/100).toFixed(2);

        setLimit(b);

        transformNumber(value);
    }

    const handlerId = (data) => {
        let icon = listIconDp.filter(e => e.id === data.category.id_icon);
        setIconCategory(icon[0].url);
        setColorCategory(data.category.color_hex);
        setNameCategory(data.category.name); 
        setIdMeta(data.id);
        setModalEdit(true);
    }

    const handlerEdit = async () => {
        if(limit > 0) {
            try {

                await api.put(`meta/${idMeta}`, {
                    newValue: limit
                }); 

            } catch (error) {
                console.log(error);
            }

            setLimit(0);
            setLimitFormat('R$ 0,00');

            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const res = await api.get(`meta/${month}&${year}`);

            handlerCalcMeta(res.data);
            handlerMetaDate(month+'&'+year);
            setMeta(res.data);  
    
            setModalEdit(false)
        }
    }   

    const handlerIdDelete = async (data) => {
        setColorCategory(data.category.color_hex);
        setNameCategory(data.category.name); 
        setIdMeta(data.id);
        setModalDelete(true);
    }   

    const handlerDelete = async () => {
        try {
            await api.delete(`meta/${idMeta}`);

            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const res = await api.get(`meta/${month}&${year}`);

            handlerCalcMeta(res.data);
            handlerMetaDate(month+'&'+year);
            setMeta(res.data);  

            setModalDelete(false);
        } catch (error) {

            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const res = await api.get(`meta/${month}&${year}`);

            handlerCalcMeta(res.data);
            handlerMetaDate(month+'&'+year);
            setMeta(res.data);  

            setModalDelete(false);
        }
    }   

    return (
        <Container>

            <DateFilter>
                <DateFilterRows activeOpacity={0.8} onPress={() => handlerDateSub() }>
                    <MaterialCommunityIcons name='chevron-left' color="#fff" size={30} />
                </DateFilterRows>

                <AreaTitleDateFilter>
                    <DateFilterTitle>{currentDate}</DateFilterTitle>
                </AreaTitleDateFilter>
                
                <DateFilterRows activeOpacity={0.8} onPress={() => handlerDateAdd()} >
                    <MaterialCommunityIcons name='chevron-right' color="#fff" size={30} />
                </DateFilterRows>
            </DateFilter>

            {isLoading === true &&
                <CardMetaShimmer />
            }

            {meta.length <= 0 && isLoading === false  ? (
                <AreaBodyOps>
                    <ImageOps source={require('../../assets/card_img/metas.png')} />
                    <AreaTitle>
                        <TitleOps>Ops!</TitleOps>
                        <Title>Nenhuma meta cadastrada.</Title>
                    </AreaTitle>
                    <AreaButton>
                        <ButtonHandlerMeta activeOpacity={0.8} onPress={() => {
                            navigation.navigate('MetaRoutes', {
                                screen: 'MetaInitial'
                            });
                        }}>
                            <ButtonHandlerMetaText>DEFINIR NOVA META</ButtonHandlerMetaText>
                        </ButtonHandlerMeta>
                    </AreaButton>
                </AreaBodyOps> 
            ) : (
                <>

                    {isLoading === false &&
                        <>
                            <AreaTitleValue>
                                <TitleValueMeta>Meta total</TitleValueMeta>
                            </AreaTitleValue>

                            <AreaValuePlanning>

                                <BoxPlanning>
                                    <ValuePlanning>R$ {formatNumber(valueUsed)}</ValuePlanning>
                                    <ValueRemains>{titleStatus}</ValueRemains>
                                </BoxPlanning>

                                <BoxPlanning>
                                    <ValuePlanning>R$ {formatNumber(valueTotal)}</ValuePlanning>
                                    <ValueRemains>total das metas</ValueRemains>
                                </BoxPlanning>
                            
                            </AreaValuePlanning>
                        </>
                    }

                    {isLoading === false &&

                    
                        <AreaListMeta style={{ height: windowHeight}}>
                  
                            <ListMeta 
                                data={meta}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => <CardMetaInfo
                                    data={item} 
                                    onEdit={(data) => handlerId(data)}
                                    onDelete={(data) => handlerIdDelete(data)}
                                />} 
                            /> 
                            
                        </AreaListMeta>
                    
                    }
                </>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDelete}
                onRequestClose={()=> setModalDelete(false)}
            >
                <AreaModalCenter>
                
                    <BodyModalDelete>

                        <AreaTitleModalNotification>
                            <TitleModalNotification>Editar Meta</TitleModalNotification>
                        </AreaTitleModalNotification>

                        <AreaDescriptionModalNotification>
                            <DescriptionModalNotification>Deseja apagar a meta da categoria</DescriptionModalNotification>
                            <NameCategoryDel style={{ color: colorCategory }}> {nameCategory}.</NameCategoryDel>
                        </AreaDescriptionModalNotification>

                        <AreaButtonModalNotification>
                            
                            <ButtonModalNotification activeOpacity={0.8} onPress={() => setModalDelete(false) }>
                                <TextButtonModalNotification>CANCELAR</TextButtonModalNotification>
                            </ButtonModalNotification>

                            <ButtonModalNotification activeOpacity={0.8} onPress={() => handlerDelete() }>
                                <TextButtonModalNotification>OK</TextButtonModalNotification>
                            </ButtonModalNotification>
                            
                        </AreaButtonModalNotification>
                        
                    </BodyModalDelete>

                </AreaModalCenter>
            
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEdit}
                onRequestClose={()=> setModalEdit(false)}
            >
                <AreaModalCenter>

                    <BodyModalCenter>

                        <AreaTitleModal>
                            <TitleModal>Meta</TitleModal>
                        </AreaTitleModal>

                        <AreaCategoryModal>

                            <AreaIconModal style={{ backgroundColor: colorCategory }}>
                                <Icon source={iconCategory} />
                            </AreaIconModal>

                            <TextCategoryModal>{nameCategory}</TextCategoryModal>

                        </AreaCategoryModal>

                        <AreaModalInput>
                            <InputModal 
                                placeholderTextColor="#7E7E7E"
                                maxLength={18}
                                keyboardType="numeric"
                                onChangeText={(number)=> setInputLimit(number)}
                                defaultValue="R$ 0,00"
                                value={limitFormat} 
                            />
                        </AreaModalInput>

                        <AreaButtonModal>
                            
                            <ButtonModalCancel activeOpacity={0.8} onPress={() => setModalEdit(false)}>
                                <ButtonModalCancelText>CANCELAR</ButtonModalCancelText>
                            </ButtonModalCancel>
                            
                            <ButttonModalFinish activeOpacity={0.8} onPress={() => handlerEdit()}>
                                <ButttonModalFinishText>CONCLUIR</ButttonModalFinishText>
                            </ButttonModalFinish>

                        </AreaButtonModal>

                    </BodyModalCenter>

                </AreaModalCenter>
            </Modal>

        </Container>
    )
}
export default Metas;