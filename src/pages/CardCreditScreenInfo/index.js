import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { WToast } from 'react-native-smart-tip';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, subMonths, addMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import CardCreditReleaseShimmier from '../../components/CardCreditReleaseShimmer';
import CardCreditInfo from '../../components/CardCreditInfo';
import ButtonHeaderComponentsCard from '../../components/ButtonHeaderComponentsCard';
import MonthPicker from '../../components/MonthPicker';

import api from '../../services/api';

import { 
    Container, 
    DateFilter,
    DateFilterRows,
    AreaTitleDateFilter,
    DateFilterTitle,
    AreaBodyOps,
    TitleOps,
    DescriptionOps,
    ListCard,
    AreaModal,
    BodyModal,
    AreaTitleExport,
    TitleExport,
    AreaButtonExport,
    ButtonExport,
    TitleButtonExport,
    BodyModalYear,
    AreaTitleYear,
    TitleYear,
    AreaButtonYear,
    FlalistYear,
    ButtonFilterYear,
    ButtonFilterYearTitle,
} from './styles';


const CardCreditScreenInfo = ({ route, navigation }) => {

    let today = new Date();
    const [data, setData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [date, setDate] = useState(today);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState('Janeiro 2023');
    const [modal, setModal] = useState(false);
    const [modalYear, setModalYear] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderComponentsCard 
                    onPress={(e) => {
                        if(e === 2) setModal(true);
                    }}
                />
            )
        });
    }, [navigation, modal]);

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getCardCredit();
        });
        return unsubscribe;
    }, []);

    const handlerFilterYear = () => {

        const year = format(date, 'yyyy');
        let yearNumber = Number(year);

        setSelectedYear(yearNumber);
        setModalYear(false);
    }

    const handlerExportExel = () => {
        setModal(false);rr
    }

    const handlerExportPdf = () => {
        setModal(false);
    }
    
    const handlerDateAdd = async () => {
        setIsLoading(true);

        const result = addMonths(date, 1)
        setDate(result);
        setData([]);

        let month = result.getMonth() + 1;
        let year = result.getFullYear();
        
        try {

            const card = route.params.cardCredit;

            const resData = await api.get(`cardcreditreleases/${month}&${year}`);
            let res = resData.data.filter(e => e.card_credit.id === card.id);
            setData(res);
            
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

    const handlerDateSub = async () => {
        setIsLoading(true)

        const result = subMonths(date, 1)
        setDate(result);
        setData([]);

        let month = result.getMonth() + 1;
        let year = result.getFullYear();

        try {

            const card = route.params.cardCredit;

            const resData = await api.get(`cardcreditreleases/${month}&${year}`);
            let res = resData.data.filter(e => e.card_credit.id === card.id);
            setData(res);
        
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false);
                toatsError('Erro ao se comunicar com o servidor !');
            }, 1000);
        } 
    
        setIsLoading(false)
        const formattedDate = format(
            result, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );
        setCurrentDate(formattedDate);
    }

    const getCardCredit = async () => {

        const date = new Date();
        setDate(date);

        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {

            setIsLoading(true);
            setData([]);

            const card = route.params.cardCredit;
            let month = selectedMonth + 1;

            const resData = await api.get(`cardcreditreleases/${month}&${selectedYear}`);
            let res = resData.data.filter(e => e.card_credit.id === card.id);
            setData(res); 
            setIsLoading(false);
            
        } catch (error) {
            toatsError('Error, não foi possível se conectar ao servidor!');
        }
    }

    const cardCreditPay = async (info) => {

        try {

            await api.put(`/cardcreditreleases/${info.id}`, { 
                statuscard: 4,
                pay: true
            });

            let card = await api.get(`/cardcredit/${info.id_card_credit}`);

            let totalCard = Number(card.data.invoice_amount) - Number(info.invoice_amount)

            await api.put(`/cardcredit/${info.id_card_credit}`, {
                invoice_amount: totalCard
            });

            let account = await api.get(`/account/${info.id_account}`);
            let totalAccount = Number(account.data.value) - Number(info.invoice_amount);
            await api.put(`/account/${info.id_account}`, {
                value: totalAccount
            });

            getCardCredit();
            
        } catch (error) {
            toatsError('Error, não foi possível se conectar ao servidor!');
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
                <CardCreditReleaseShimmier />
            }

            {data.length <= 0 && isLoading === false  ? (
                <AreaBodyOps>
                    <Fontisto name="arrow-swap" size={70} color="#000" />
                    <TitleOps>Ops!</TitleOps>
                    <DescriptionOps>Nenhum lançamento.</DescriptionOps>
                </AreaBodyOps>
            ) : (

                <ListCard
                    data={data}
                    renderItem={({item}) => <CardCreditInfo 
                        data={item} 
                        onPress={(info) => cardCreditPay(info)}
                    /> }
                    keyextractor={item => item.id}
                />
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={()=> {
                    setModal(false)
                }}
            >
                <AreaModal>
                    <BodyModal>

                        <AreaTitleExport>
                            <TitleExport>Exportar lançamento</TitleExport>
                        </AreaTitleExport>

                        <AreaButtonExport>

                            <ButtonExport 
                                activeOpacity={0.8}
                                onPress={() => {
                                    setModal(false);
                                    handlerExportExel();
                                }}
                            >
                                <TitleButtonExport>Planilha</TitleButtonExport>
                            </ButtonExport>

                            <ButtonExport
                                activeOpacity={0.8}
                                onPress={() => {
                                    setModal(false);
                                    handlerExportPdf();
                                }}
                            >
                                <TitleButtonExport>PDF</TitleButtonExport>
                            </ButtonExport>

                        </AreaButtonExport>

                    </BodyModal>
                </AreaModal>
            </Modal>

        </Container>
    )
}

export default CardCreditScreenInfo;