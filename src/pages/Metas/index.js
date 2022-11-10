import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl, Modal  } from 'react-native';
import { format } from 'date-fns';
import { WToast } from 'react-native-smart-tip';

import formatNumber from '../../utils/formatNumber';
import MonthScroll from '../../components/MonthScroll';
import CardMetaInfo from '../../components/CardMetaInfo';
import ButtonHeaderComponentsMeta from '../../components/ButtonHeaderComponentsMeta';
import MonthPicker from '../../components/MonthPicker';

import api from '../../services/api';

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
} from './styles';

const Metas = ({ navigation }) => { 

    let today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [date, setDate] = useState(new Date());
    const [titleStatus, setTitleStatus] = useState('restam');
    const [meta, setMeta] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [valueTotal, setValueTotal] = useState(0);
    const [valueUsed, setValueUsed] = useState(0);
    const [modalYear, setModalYear] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderComponentsMeta 
                    onPress={(e) => {
                        if(e === 1) setModalYear(true);
                        if(e === 2) {
                            navigation.navigate('MetaRoutes', {
                                screen: 'MetaInitial'
                            });
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

            newData = newData.sort((x, y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);
        
                return a - b;
            });

            setMeta(newData);  

        } catch (error) {
            toatsError('Erro, não foi possível se conectar ao servidor');
        } 
    }

    const handlerModal = (id) => {

        alert(id);
    }

    return(
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
                            onPress={(id) => handlerModal(id)}
                        />} 
                    />  
                </>
            )}
            
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