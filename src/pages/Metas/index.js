import React, { useState, useEffect, useLayoutEffect } from 'react';
import { RefreshControl, Modal  } from 'react-native';
import { format } from 'date-fns';

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
    const [modal, setModal] = useState(false);
    const [meta, setMeta] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [valueTotal, setValueTotal] = useState(0);
    const [valueUsed, setValueUsed] = useState(0);
    const [modalYear, setModalYear] = useState(false);

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
    }, [navigation, modal]);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            getMeta();
            exploreRefresh();
        });
        return unsubscribe;
    }, [navigation]);

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

    const getMeta = async () => {

        try {

            //const response = await api.get('cardcredit');

        } catch (error) {
            console.log(error);
        }   
 
        let data = [
            {
                id: 1,
                name: 'Alimentação',
                month: 10,
                year: 2022,
                id_category: 161, 
                id_icon: 1,
                color_hex: '#D65A3F',
                value: 500,
                usedValue: 50,
                porcent: 10,
                status: false
            },
            {
                id: 2,
                name: 'Casa',
                month: 10,
                year: 2022,
                id_category: 161, 
                id_icon: 1,
                color_hex: '#D63F75',
                value: 500,
                usedValue: 500,
                porcent: 100,
                status: true
            },
        ];
        let sumCategory = data.reduce((a, b) => a + b.value, 0);
        let sumUsedCategory = data.reduce((a, b) => a + b.usedValue, 0);

        let valueUsed = sumCategory - sumUsedCategory;
        setValueTotal(sumCategory);
        setValueUsed(valueUsed);

        let res = data.filter(e => e.year === selectedYear && e.month === selectedMonth + 1);


        setMeta(res); 

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
                            <ValueRemains>restam</ValueRemains>
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