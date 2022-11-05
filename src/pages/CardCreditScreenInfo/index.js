import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal, RefreshControl } from 'react-native';
import { format } from 'date-fns';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { WToast } from 'react-native-smart-tip';

import MonthScroll from '../../components/MonthScroll';
import CardCreditInfo from '../../components/CardCreditInfo';
import ButtonHeaderComponentsCard from '../../components/ButtonHeaderComponentsCard';
import MonthPicker from '../../components/MonthPicker';

import api from '../../services/api';

import { 
    Container, 
    AreaMonth,
    AreaYear,
    TitleHeaderYear,
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
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalYear, setModalYear] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderComponentsCard 
                    onPress={(e) => {
                        if(e === 1) setModalYear(true);
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

    const exploreRefresh = () => {
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getCardCredit();
            exploreRefresh();
        });
        return unsubscribe;
    }, [selectedMonth]);

    useEffect(() => { 
        getCardCredit();
    }, [selectedMonth]);

    useEffect(() => {
        getCardCredit();
    }, [selectedYear]);

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

    const getCardCredit = async () => {

        try {

            const card = route.params.cardCredit;
            const resData = await api.get('cardcreditreleases');
            let res = resData.data.filter(e => e.card_credit.id === card.id && e.year === selectedYear && e.month === selectedMonth + 1);
            setData(res); 
            
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

            <AreaYear>
                <TitleHeaderYear>{selectedYear}</TitleHeaderYear>
            </AreaYear>

            <AreaMonth>
                <MonthScroll 
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />  
            </AreaMonth>

            {data.length <= 0 ? (
                <AreaBodyOps>
                    <Fontisto name="arrow-swap" size={70} color="#000" />
                    <TitleOps>Ops!</TitleOps>
                    <DescriptionOps>Nenhum lançamento.</DescriptionOps>
                </AreaBodyOps>

            ) : (

                <ListCard
                   refreshControl={
                        <RefreshControl 
                            refreshing={isLoading}
                            onRefresh={exploreRefresh}
                            progressBackgroundColor="#fff"
                            colors={['#2C3CD1']} 
                        />
                    }
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