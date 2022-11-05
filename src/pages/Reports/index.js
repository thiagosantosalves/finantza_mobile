import React, { useState, useEffect } from 'react';
import { Modal, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import  RNFetchBlob  from 'rn-fetch-blob';
import { WToast } from 'react-native-smart-tip';
import { VictoryPie, VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { format } from 'date-fns';

import MonthScroll from '../../components/MonthScroll';
import CardListReport from '../../components/CardListReport';
import MonthPicker from '../../components/MonthPicker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import formatNumber from '../../utils/formatNumber';

import {
    Container,
    AreaYear,
    TitleHeaderYear,
    Header,
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

    //Modal - export
    AreaModalExport,
    BodyModalExport,
    AreaTitleExport,
    TitleExport,
    AreaButtonExport,
    ButtonExport,
    TitleButtonExport,

    //Modal - filterYear
    AreaModalFilter,
    BodyModalFilterYear,
    AreaFilterYear,
    FlalistYear,
    BodyAreaFilter,
    AreaTypeFilter,
    ButtonFilterYear,
    ButtonFilterYearTitle

} from './styles';


const Reports = ({ navigation }) => {

    let today = new Date();

    const [date, setDate] = useState(new Date());
    const { width, height } = Dimensions.get('window');

    const [data, setData] = useState([]);

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

    const { 
        openModalFilterReport,
        handlerModalFilterReport,
        openModalReport,
        handlerModalReport,
    } = useAuth();

    const resetActionButton = () => {
        setActiveCreditAccountFilter(false);
        setActiveDebitAccountFilter(false);
        setActiveCreditFilter(false);
        setActiveDebitCardFilter(false);
        setActiveDebitFilter(true);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getReleases();
            resetActionButton();
        });
        return unsubscribe;
    }, [selectedMonth]);

    useEffect(() => { 
        getReleases();
        resetActionButton();
    }, [selectedMonth]);

    useEffect(() => {
        getReleases();
        resetActionButton();
    }, [selectedYear]);

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
        
        setTypeFilter(1);

        let res = await api.get('releases');
        res = res.data.filter(item => item.year === selectedYear);
        res = res.filter(item => item.month === selectedMonth + 1);
       
        res = res.filter(item => item.type === 1);

        let valueSum = res.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

        setCalcTotal(valueSum);
       
        res = res.reduce((soma, cur) => {
 
            let id = cur.rc_category.id;
            let repetido = soma.find(elem => elem.rc_category.id === id);
    
            if (repetido) {
                repetido.value += cur.value;
            } else {
                soma.push(cur);
            }

            return soma;
        }, []);


        const newRes = res.map(elem => {

            let release = {
                id: elem.id,
                label: elem.rc_category.name,
                value: elem.value,
                color: elem.rc_category.color_hex,
                idIcon: elem.rc_category.id_icon,
                type: elem.type,
                account: false,
                card_credit: false
            }

            return release;
        });

        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
        setActiveDebitFilter(true);
        setData(newRes);
    }

    const handlerDebit = async () => {
        setTypeFilter(2);

        let res = await api.get('releases');
        res = res.data.filter(item => item.year === selectedYear);
        res = res.filter(item => item.month === selectedMonth + 1);

        res = res.filter(item => item.type === 2);

        let valueSum = res.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

        setCalcTotal(valueSum);
       
        res = res.reduce((soma, cur) => {
 
            let id = cur.dp_category.id;
            let repetido = soma.find(elem => elem.dp_category.id === id);
    
            if (repetido) {
                repetido.value += cur.value;
            } else {
                soma.push(cur);
            }

            return soma;
        }, []);


        const newRes = res.map(elem => {

            let release = {
                id: elem.id,
                label: elem.dp_category.name,
                value: elem.value,
                color: elem.dp_category.color_hex,
                idIcon: elem.dp_category.id_icon,
                type: elem.type,
                account: false,
                card_credit: false
            }

            return release;
        });

        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
        setActiveCreditFilter(true);
        setData(newRes); 
    }

    const handlerAccountCredit = async () => {

        setTypeFilter(3);

        let res = await api.get('releases');
        res = res.data.filter(item => item.year === selectedYear);
        res = res.filter(item => item.month === selectedMonth + 1);

        res = res.filter(item => item.type === 1);

        let valueSum = res.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

        setCalcTotal(valueSum);

        res = res.reduce((soma, cur) => {
 
            let id = cur.account.id;
            let repetido = soma.find(elem => elem.account.id === id);
    
            if (repetido) {
                repetido.value += cur.value;
            } else {
                soma.push(cur);
            }

            return soma;
        }, []);

        const newRes = res.map(elem => {

            let release = {
                id: elem.id,
                label: elem.account.name,
                value: elem.value,
                color: elem.account.color_hex,
                idIcon: elem.account.type_id,
                type: elem.type,
                account: true,
                card_credit: false
            }

            return release;
        }); 

        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
        setActiveCreditAccountFilter(true);
        setData(newRes); 
    }

    const handlerAccountDebit = async () => {
        setTypeFilter(4);
        let res = await api.get('releases');
        res = res.data.filter(item => item.year === selectedYear);
        res = res.filter(item => item.month === selectedMonth + 1);

        res = res.filter(item => item.type === 2);
        res = res.filter(item => item.account != null);


        let valueSum = res.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

        setCalcTotal(valueSum);
        
        res = res.reduce((soma, cur) => {
 
            let id = cur.account.id;
            let repetido = soma.find(elem => elem.account.id === id);
    
            if (repetido) {
                repetido.value += cur.value;
            } else {
                soma.push(cur);
            }

            return soma;
        }, []);

        const newRes = res.map(elem => {

            let release = {
                id: elem.id,
                label: elem.account.name,
                value: elem.value,
                color: elem.account.color_hex,
                idIcon: elem.account.type_id,
                type: elem.type,
                account: true,
                card_credit: false
            }

            return release;
        });
        
        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitCardFilter) setActiveDebitCardFilter(false);
        setActiveDebitAccountFilter(true);
        setData(newRes); 
    }

    const handlerCardDebit = async () => {
        setTypeFilter(5);
        let res = await api.get('releases');
        res = res.data.filter(item => item.year === selectedYear);
        res = res.filter(item => item.month === selectedMonth + 1);

        res = res.filter(item => item.type === 2);
        res = res.filter(item => item.card_credit != null);

        let valueSum = res.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

        setCalcTotal(valueSum);
        
        res = res.reduce((soma, cur) => {
 
            let id = cur.card_credit.id;
            let repetido = soma.find(elem => elem.card_credit.id === id);
    
            if (repetido) {
                repetido.value += cur.value;
            } else {
                soma.push(cur);
            }

            return soma;
        }, []);

        const newRes = res.map(elem => {

            let release = {
                id: elem.id,
                label: elem.card_credit.name,
                value: elem.value,
                color: elem.card_credit.color_hex,
                idIcon: elem.card_credit.id_institution,
                type: elem.type,
                account: false,
                card_credit: true
            }

            return release;
        });


        if(activeCreditFilter) setActiveCreditFilter(false);
        if(activeDebitFilter) setActiveDebitFilter(false);
        if(activeCreditAccountFilter) setActiveCreditAccountFilter(false);
        if(activeDebitAccountFilter) setActiveDebitAccountFilter(false);
        setActiveDebitCardFilter(true);
        setData(newRes); 
    }

    useEffect(() => {
        if(openModalFilterReport) {
            setModalFilter(true);
        } 
    }, [openModalFilterReport]);

    useEffect(() => {
        if(openModalReport) {
            setModalExport(true);
        } 
    }, [openModalReport]);

    const handlerFilterYear = () => {

        const year = format(date, 'yyyy');
        let yearNumber = Number(year);

        setSelectedYear(yearNumber);
        handlerModalFilterReport();
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


    return (
        <Container>
            <AreaYear>
                <TitleHeaderYear>{selectedYear}</TitleHeaderYear>
            </AreaYear>

            <Header>
                <MonthScroll 
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />  
            </Header>

            {data.length <= 0 ? (
                <AreaBodyOps>
                    <Fontisto name="arrow-swap" size={70} color="#000" />
                    <TitleOps>Ops!</TitleOps>
                    <DescriptionOps>Nenhum lançamento.</DescriptionOps>
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
                                height={height - 150}
                                width={width - 140}
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
                                height={300}
                                width={350}
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
                                    data={data}
                                    x="label"
                                    y="value"
                                    animate={{
                                        duration: 500,
                                        easing: "bounce"
                                    }}
                                    style={{
                                        data: { 
                                            stroke: "#c43a31"
                                        },
                                        parent: { border: "1px solid #ccc"},
                                        labels: {
                                            fill: 'none'
                                        }
                                    }}
                                    
                                />
                            </VictoryChart>
                        }
                        
                    </AreaCharts>

                    <AreaListReport>

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

            {/*  Modals  */ }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalFilter}
                onRequestClose={()=> { 
                    handlerModalFilterReport();
                    setModalFilter(false) 
                }}>
                    <AreaModalFilter activeOpacity={1}> 
                                
                        <BodyModalFilterYear>
                            <AreaTitleExport>
                                <TitleExport>Filtrar por ano</TitleExport>
                            </AreaTitleExport>

                            <AreaFilterYear>

                                <FlalistYear 
                                    horizontal={true}
                                    ListHeaderComponent={<MonthPicker 
                                        date={date} 
                                        onChange={(newDate) => setDate(newDate)}
                                    />}
                                />
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
                    handlerModalReport();
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
                                        handlerModalReport();
                                        setModalExport(false);
                                    }}
                                >
                                    <TitleButtonExport>Planilha</TitleButtonExport>
                                </ButtonExport>

                                <ButtonExport
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handlerExportPdf();
                                        handlerModalReport();
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