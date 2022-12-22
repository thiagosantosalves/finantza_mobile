import React, { useState, useEffect, useLayoutEffect } from 'react';
import { RefreshControl, Modal } from 'react-native';
import { format } from 'date-fns';
import { WToast } from 'react-native-smart-tip';

import formatNumber from '../../utils/formatNumber';
import { listIconDp } from '../../utils/listIconDp';
import MonthScroll from '../../components/MonthScroll';
import CardMetaInfo from '../../components/CardMetaInfo';
import ButtonHeaderComponentsMeta from '../../components/ButtonHeaderComponentsMeta';
import MonthPicker from '../../components/MonthPicker';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    AreaMonth,
    AreaYear,
    TitleHeaderYear,
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
    ListMeta,
    AreaModal,
    BodyModalYear,
    AreaTitleYear,
    TitleYear,
    AreaButtonYear,
    FlalistYear,
    ButtonFilterYear,
    ButtonFilterYearTitle,
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
} from './styles';

const Metas = ({ navigation }) => {

    let today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [date, setDate] = useState(new Date());
    const [titleStatus, setTitleStatus] = useState('restam');
    const [meta, setMeta] = useState({});
    const [limit, setLimit] = useState(0);
    const [idMeta, setIdMeta] = useState(0);
    const [limitFormat, setLimitFormat] = useState('R$ 0,00');
    const [colorCategory, setColorCategory] = useState('');
    const [iconCategory, setIconCategory] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [valueTotal, setValueTotal] = useState(0);
    const [valueUsed, setValueUsed] = useState(0);
    const [modalYear, setModalYear] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const { handlerMeta } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderComponentsMeta 
                    onPress={ async (e) => {
                        if(e === 1) setModalYear(true);
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
            exploreRefresh();
        });
        return unsubscribe;
    }, [selectedMonth]);

    useEffect(() => { 
        getMeta();
    }, [selectedMonth]);

    useEffect(() => {
        getMeta();
    }, [selectedYear]);

    const handlerFilterYear = () => {

        const year = format(date, 'yyyy');
        let yearNumber = Number(year);

        setSelectedYear(yearNumber);
        setModalYear(false);
    }

    const exploreRefresh = () => {

        setIsLoading(true);
        getMeta();

        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    }

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

    const getMeta = async () => {
        try {

            const res = await api.get('meta');

            const sumMetaTotal = res.data.reduce((a, b) => a + b.value, 0);
            const isMeta = res.data.filter(e => e.status === false);
            const sumTotalAvailable = isMeta.reduce((a, b) => a + b.value, 0);
            const useDValueTotalAvailable = isMeta.reduce((a, b) => a + b.used_value, 0);

            let value = sumTotalAvailable - useDValueTotalAvailable;
            setValueTotal(sumMetaTotal);

            const excedidoFilter = res.data.filter(e => e.status === true);
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

            let newData = res.data.filter(e => e.year === selectedYear && e.month === selectedMonth + 1);

            let id = newData.map(e => {
                return e.category.id
            });
            
            handlerMeta(id);

            newData = newData.sort((x, y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);
        
                return a - b;
            });

            setMeta(newData);  

        } catch (error) {
            console.log(error)
            toatsError('Erro, não foi possível se conectar ao servidor');
        } 
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
            getMeta();
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
            getMeta();
            setModalDelete(false);
        } catch (error) {
            getMeta();
            setModalDelete(false);
        }
    }   

    return (
        <Container>

            <AreaYear>
                <TitleHeaderYear>{selectedYear}</TitleHeaderYear>
            </AreaYear>

            <AreaMonth>
                <MonthScroll 
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />  
            </AreaMonth>

            {meta.length <= 0  ? (
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

                    <ListMeta 
                        refreshControl={
                            <RefreshControl 
                                refreshing={isLoading}
                                onRefresh={exploreRefresh}
                                progressBackgroundColor="#fff"
                                colors={['#2C3CD1']} 
                            />
                        }  
                        data={meta}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <CardMetaInfo
                            data={item} 
                            onEdit={(data) => handlerId(data)}
                            onDelete={(data) => handlerIdDelete(data)}
                        />} 
                    /> 
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
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalYear}
                onRequestClose={()=> {
                    setModalYear(false)
                }}
            >
                <AreaModal>
                    <BodyModalYear>

                        <AreaTitleYear>
                            <TitleYear>Filtrar por ano</TitleYear>
                        </AreaTitleYear>

                        <AreaButtonYear>

                            <FlalistYear 
                                horizontal={true}
                                ListHeaderComponent={<MonthPicker 
                                    date={date} 
                                    onChange={(newDate) => setDate(newDate)}
                                />}
                            />

                            <ButtonFilterYear 
                                activeOpacity={0.8}
                                onPress={() => { handlerFilterYear() }}
                            >
                                    <ButtonFilterYearTitle>Concluir</ButtonFilterYearTitle>
                            </ButtonFilterYear>
                        
                        </AreaButtonYear>

                    </BodyModalYear>
                </AreaModal>
            </Modal>

        </Container>
    )
}
export default Metas;