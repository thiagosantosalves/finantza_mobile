import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import  RNFetchBlob  from 'rn-fetch-blob';
import { VictoryPie, VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { format, subMonths, addMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { WToast } from 'react-native-smart-tip';

import CardReportShimmer from '../../components/CardReportShimmer';
import CardListReport from '../../components/CardListReport';
import ButtonHeaderReportComponents from '../../components/ButtonHeaderReportComponents';

import api from '../../services/api';
import formatNumber from '../../utils/formatNumber';

import {
    Container,
    TextType,
    DateFilter,
    DateFilterRows,
    AreaTitleDateFilter,
    DateFilterTitle,
    AreaSwitch,
    SwiperGraphics,
    ButtonSwiper,
    ImageGraphics,
    AreaCharts,
    ButtonFilter,
    ButtonFilterText,
    AreaListReport,
    CardList,
    ListCategory,
    AreaBodyOps,
    TitleOps,
    DescriptionOps,
    AreaModalExport,
    BodyModalExport,
    AreaTitleExport,
    TitleExport,
    AreaButtonExport,
    ButtonExport,
    TitleButtonExport,
    AreaModalFilter,
    BodyModalFilterYear,
    AreaFilterYear,
    BodyAreaFilter,
    AreaTypeFilter,
    ButtonFilterYear,
    ButtonFilterYearTitle
} from './styles';

const Reports = ({ navigation }) => {

    let today = new Date();
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const { width } = Dimensions.get('window');
    const [typeData, setTypeData] = useState('1');
    const [isTypeAccount, setIsTypeAccount] = useState('0'); 
    const [nameType, setNameType] = useState('Receita por categoria')
    const [data, setData] = useState([]);
    const [dataLine, setDataLine] = useState([]);
    const [selected, setSelected] = useState();
    const [modalFilter, setModalFilter] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [typeFilter, setTypeFilter] = useState(1);
    const [calcTotal, setCalcTotal] = useState(0);
    const [activeDebitFilter, setActiveDebitFilter] = useState(true);
    const [activeCreditFilter, setActiveCreditFilter] = useState(false);
    const [activeDebitAccountFilter, setActiveDebitAccountFilter] = useState(false);
    const [activeCreditAccountFilter, setActiveCreditAccountFilter] = useState(false);
    const [activeDebitCardFilter, setActiveDebitCardFilter] = useState(false);
    const [activePieGraphics, setActivePieGraphics] = useState(true);
    const [activeBarGraphics, setActiveBarGraphics] = useState(false);
    const [activeChartGraphics, setActiveChartGraphics] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderReportComponents 
                    onPress={ async (e) => {
                        if(e === 1) setModalFilter(true);
                        if(e === 2) setModalExport(true);
                    }}
                />
            )
        });
    }, [navigation]);

    const resetActionButton = () => {
        setActiveCreditAccountFilter(false);
        setActiveDebitAccountFilter(false);
        setActiveCreditFilter(false);
        setActiveDebitCardFilter(false);
        setActiveDebitFilter(false);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getReleases();
            resetActionButton();
        });
        return unsubscribe;
    }, []);

    const handlerCardOnPress = (id) => {
        setSelected(prev => prev === id ? "" : id);
    }

    const getReleases = async () => {
        
        if(typeFilter === 1) {
            handlerCredit();
        }

        if(typeFilter === 2) {
            handlerDebit();
        }

        if(typeFilter === 3) {
            handlerAccountCredit();
        }

        if(typeFilter === 4) {
            handlerAccountDebit();
        }

        if(typeFilter === 5) {
            handlerCardDebit();
        }
    }

    const handlerCredit = async () => {
        setIsLoading(true);
        setTypeFilter(1);
        setTypeData('1');
        setNameType('Receita por categoria');

        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {
            let month = selectedMonth + 1;
            let res = await api.get(`reportFilter/${month}&${selectedYear}&1&0`);
    
            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);    
        } catch (error) {
            console.log(error);
        }

        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);

        setActiveDebitFilter(true);
        setIsLoading(false);
    }

    const handlerDebit = async () => {
        setIsLoading(true);
        setTypeFilter(2);
        setTypeData('2');
        setNameType('Despesas por categoria');

        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {
            let month = selectedMonth + 1;
            let res = await api.get(`reportFilter/${month}&${selectedYear}&2&0`);

            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);
    
        } catch (error) {
            console.log(error);
        }
        
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
    
        setActiveCreditFilter(true);
        setIsLoading(false);
    }

    const handlerAccountCredit = async () => {
        
        setIsLoading(true);
        setTypeFilter(3);
        setTypeData('1');
        setIsTypeAccount('1');
        setNameType('Receita por conta');

        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {
            let month = selectedMonth + 1;
            let res = await api.get(`reportFilter/${month}&${selectedYear}&1&1`);

            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);
    
        } catch (error) {
            console.log(error);
        }
        
        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
        setActiveCreditAccountFilter(true);
        setIsLoading(false);
    }

    const handlerAccountDebit = async () => {
        setIsLoading(true);
        setTypeFilter(4);
        setTypeData('2');
        setIsTypeAccount('1');
        setNameType('Despesas por conta');

        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {
            let month = selectedMonth + 1;
            let res = await api.get(`reportFilter/${month}&${selectedYear}&2&1`);

            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);
    
        } catch (error) {
            console.log(error);
        }
        
        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
        setActiveDebitAccountFilter(true);
        
        setIsLoading(false);
    }

    const handlerCardDebit = async () => {
        setIsLoading(true);
        setTypeFilter(5);
        setTypeData('2');
        setIsTypeAccount('2');
        setNameType('Despesas por cartão');
        const formattedDate = format(
            date, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );

        setCurrentDate(formattedDate);

        try {
            let month = selectedMonth + 1;
            let res = await api.get(`reportFilter/${month}&${selectedYear}&2&2`);

            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);
    
        } catch (error) {
            console.log(error);
        }

        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        setActiveDebitCardFilter(true);
        
        setIsLoading(false);
    }

    const handlerFilterYear = () => {
        const year = format(date, 'yyyy');
        let yearNumber = Number(year);
        setSelectedYear(yearNumber);
        setModalFilter(false);
    }
   

    const handlerExportExel = async () => {
        
        let newData = data.map((item) => {

            let value_porent = item.value * 100 / calcTotal;
            value_porent = value_porent.toFixed(2);

            let r = {
                label: item.label,
                porcent: value_porent+'%',
                value: formatNumber(item.value)
            }
            return r;
        });

        try {

            let res = await api.post('reportfullexel', newData);
            
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: "Storage Permission",
                  message: "App needs access to memory to download the file "
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              } else {
            }  

            let dirs = Platform.OS == 'ios'
            ? RNFetchBlob.fs.dirs.DocumentDir
            : RNFetchBlob.fs.dirs.DCIMDir;

            RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                mime: 'application/pdf',
                title: res.data.nameCSV,
                path: `${dirs}/${res.data.nameCSV}`,
                },
            // Adicionar quando estiver com o backend ativo.
            }).fetch('GET', res.data.url, {})
            //}).fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
            .then((res) => {
                console.log('The file saved to ', res.path());
                RNFetchBlob.android.actionViewIntent(res.path());
            }).catch((e) => {
                console.log(e)
            }); 
        } catch (error) {
            console.log(error);
        }
    }

    const handlerExportPdf = async () => {
        
        let res = data.map((item) => {

            let value_porent = item.value * 100 / calcTotal;
            value_porent = value_porent.toFixed(2);

            let r = {
                label: item.label,
                porcent: value_porent,
                value: formatNumber(item.value)
            }

            return r;
        });
        let newData = {
            report: res,
            calc_total: formatNumber(calcTotal),
            month: selectedMonth + 1,
            year: selectedYear
        }

        try {

            let res = await api.post('reportfullpdf', newData);

            console.log(res.data.url)

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                title: "Storage Permission",
                message: "App needs access to memory to download the file "
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                } else {
            }  
            
            let dirs = Platform.OS == 'ios'
            ? RNFetchBlob.fs.dirs.DocumentDir
            : RNFetchBlob.fs.dirs.DCIMDir;

            RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                mime: 'application/pdf',
                title: res.data.namePDF,
                path: `${dirs}/${res.data.namePDF}`,
                },

            // Adicionar quando estiver com o backend ativo.
            //}).fetch('GET', res.data.url, {})
            }).fetch('GET', res.data.url, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
                RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf');
            }).catch((e) => {
                console.log(e)
            }); 
        } catch (error) {
            console.log(error);
        }
    }

    function toatsError(res) {
        const toastOpts = {
          data: res,
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT, 
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts);
    }


    const handlerDateAdd = async () => {

        setIsLoading(true);

        const result = addMonths(date, 1)
        setDate(result);
        setData([]);

        let month = result.getMonth() + 1;
        let year = result.getFullYear();
        
        try {      

            let res = await api.get(`reportFilter/${month}&${year}&${typeData}&${isTypeAccount}`);

            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);
    
        } catch (error) {
            setIsLoading(false);
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

            let res = await api.get(`reportFilter/${month}&${year}&${typeData}&${isTypeAccount}`);

            setDataLine(res.data.dataLine);
            setCalcTotal(res.data.valueSum);
            setData(res.data.newRes);
           
        } catch (error) {
            setIsLoading(false);
        } 
     
        setIsLoading(false)
        const formattedDate = format(
            result, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );
        setCurrentDate(formattedDate); 
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

           
            {isLoading === true ? (
                <CardReportShimmer />
            ) : (
                <>
                
                {data.length <= 0 ? (
                <AreaBodyOps>
                    <Fontisto name="arrow-swap" size={70} color="#000" />
                    <TitleOps>Ops!</TitleOps>
                    <DescriptionOps>Nenhum lançamento em</DescriptionOps>
                    <DescriptionOps>{nameType}</DescriptionOps>
                </AreaBodyOps> 
            ) : (
                <>
                    <AreaSwitch>
                        <SwiperGraphics>
                            <ButtonSwiper 
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: activePieGraphics ? '#FF872C' : '#C4C4C4'
                                }}
                                onPress={() => {
                                    if(activeBarGraphics) {
                                        setActiveBarGraphics(false)
                                    }

                                    if(activeChartGraphics) {
                                        setActiveChartGraphics(false)
                                    }
                                    
                                    setActivePieGraphics(true)
                                }}
                            >
                                <ImageGraphics source={require('../../assets/icon_graphics/pie-chart.png')} />
                            </ButtonSwiper>

                            <ButtonSwiper  
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: activeBarGraphics ? '#FF872C' : '#C4C4C4'
                                    }}
                                    onPress={() => {

                                        if(activePieGraphics) {
                                            setActivePieGraphics(false)
                                        }

                                        if(activeChartGraphics) {
                                            setActiveChartGraphics(false)
                                        }

                                        setActiveBarGraphics(true)
                                    }}
                                >
                                <ImageGraphics source={require('../../assets/icon_graphics/bar-chart.png')} />
                            </ButtonSwiper>

                            <ButtonSwiper 
                                activeOpacity={0.8}
                                style={{
                                    backgroundColor: activeChartGraphics ? '#FF872C' : '#C4C4C4'
                                }}
                                onPress={() => {

                                    if(activePieGraphics) {
                                        setActivePieGraphics(false)
                                    }

                                    if(activeBarGraphics) {
                                        setActiveBarGraphics(false)
                                    }

                                    setActiveChartGraphics(true)
                                }}
                            >
                                <ImageGraphics source={require('../../assets/icon_graphics/chart.png')} />
                            </ButtonSwiper>
                        </SwiperGraphics>
                    </AreaSwitch>
                    
                    <AreaCharts>

                        {activePieGraphics &&
                            <VictoryPie 
                                data={data}
                                x="label"
                                y="value"
                                innerRadius={20}
                                padAngle={2}
                                height={280}
                                width={280}
                                animate={{
                                    duration: 500,
                                    easing: "bounce"
                                }}
                                style={{
                                    labels: {
                                        fill: 'none',
                                    },
                                    data: {
                                        fill: ({ datum }) => datum.color,
                                        fillOpacity: ({ datum }) => (datum.id === selected || selected === '') ? 1 : 0.7,
                                        stroke: ({ datum }) => datum.id === selected ? datum.color : 'none',
                                        strokeOpacity: 0.5,
                                        strokeWidth: 10,
                                    }
                                }}
                            />  
                        }

                        {activeBarGraphics && 

                            <VictoryBar 
                                data={data}
                                x="label"
                                y="value"
                                alignment="start"
                                height={280}
                                width={280}
                                animate={{
                                    duration: 500,
                                    easing: "bounce"
                                }}
                                style={{
                                    data: {
                                        fill: ({ datum }) => datum.color,
                                        fillOpacity: ({ datum }) => (datum.id === selected || selected === '') ? 1 : 0.7,
                                        stroke: ({ datum }) => datum.id === selected ? datum.color : 'none',
                                        strokeOpacity: 0.5,
                                        strokeWidth: 10,
                                    },
                                    labels: {
                                        fill: 'none'
                                    }
                                }}
                            
                            />
                        }

                        {activeChartGraphics && 
                         
                            <VictoryChart  
                                theme={VictoryTheme.material}
                            >
                                <VictoryLine
                                    style={{
                                        data: { stroke: "tomato" }
                                    }}
                                    data={dataLine}
                                    x="key"
                                    y="b"
                                />

                            </VictoryChart>
                        }
                        
                    </AreaCharts>

                    <AreaListReport>

                        <TextType>{nameType}</TextType>

                        <CardList style={{
                            width: width - 30,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.00,
                            elevation: 1,
                        }}>
                            <ListCategory 
                                data={data}
                                renderItem={({item}) => <CardListReport data={item} calc={calcTotal} onPress={(id) => handlerCardOnPress(id)} />}
                                keyextractor={item => item.id}
                            />
                        </CardList>

                    </AreaListReport>
                </>
            )}
                </>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalFilter}
                onRequestClose={()=> { 
                    setModalFilter(false) 
                }}>
                    <AreaModalFilter activeOpacity={1}> 
                                
                        <BodyModalFilterYear>
                            
                            <AreaFilterYear>

                                <BodyAreaFilter>
                                    <AreaTypeFilter>
                                        <ButtonFilter style={{ backgroundColor: activeDebitFilter ? '#FF872C' : '#c4c4c4' }} onPress={() => handlerCredit()}>
                                            <ButtonFilterText>Receitas por categoria</ButtonFilterText>
                                        </ButtonFilter>

                                        <ButtonFilter style={{ backgroundColor: activeCreditFilter ? '#FF872C' : '#c4c4c4' }} onPress={() => handlerDebit()}>
                                            <ButtonFilterText>Despesas por categoria</ButtonFilterText>
                                        </ButtonFilter> 
                                    </AreaTypeFilter>

                                    <AreaTypeFilter>

                                        <ButtonFilter style={{ backgroundColor: activeCreditAccountFilter ? '#FF872C' : '#c4c4c4' }} onPress={() => handlerAccountCredit()}>
                                            <ButtonFilterText>Receitas por conta</ButtonFilterText>
                                        </ButtonFilter>

                                        <ButtonFilter style={{ backgroundColor: activeDebitAccountFilter ? '#FF872C' : '#c4c4c4' }} onPress={() => handlerAccountDebit()}>
                                            <ButtonFilterText>Despesas por conta</ButtonFilterText>
                                        </ButtonFilter>

                                    </AreaTypeFilter>

                                    <AreaTypeFilter>
                                    <ButtonFilter style={{ backgroundColor: activeDebitCardFilter ? '#FF872C' : '#c4c4c4', marginRight: 15 }} onPress={() => handlerCardDebit()}>
                                            <ButtonFilterText>Despesas por cartão</ButtonFilterText>
                                        </ButtonFilter>
                                    </AreaTypeFilter>
                                </BodyAreaFilter>

                                <ButtonFilterYear 
                                    activeOpacity={0.8}
                                    onPress={() => { handlerFilterYear() }}
                                >
                                    <ButtonFilterYearTitle>Concluir</ButtonFilterYearTitle>
                                </ButtonFilterYear>

                            </AreaFilterYear>

                        </BodyModalFilterYear>

                    </AreaModalFilter>
                </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExport}
                onRequestClose={()=> {
                    setModalExport(false);}
                }
            >
                    <AreaModalExport activeOpacity={1}> 
                                
                        <BodyModalExport>
                            <AreaTitleExport>
                                <TitleExport>Exportar lançamento</TitleExport>
                            </AreaTitleExport>

                            <AreaButtonExport>

                                <ButtonExport 
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handlerExportExel();
                                        setModalExport(false);
                                    }}
                                >
                                    <TitleButtonExport>Planilha</TitleButtonExport>
                                </ButtonExport>

                                <ButtonExport
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handlerExportPdf();
                                        setModalExport(false);
                                    }}
                                >
                                    <TitleButtonExport>PDF</TitleButtonExport>
                                </ButtonExport>

                            </AreaButtonExport>
                        </BodyModalExport>

                    </AreaModalExport>
                </Modal>

        </Container>
    );
}

export default Reports;