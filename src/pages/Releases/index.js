import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Modal, PermissionsAndroid, Platform } from 'react-native';
import { addMonths, subMonths, format } from 'date-fns';
import { FlashList } from "@shopify/flash-list";
import ptBR from 'date-fns/locale/pt-BR';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob  from 'rn-fetch-blob';
import { WToast } from 'react-native-smart-tip';

import CardReleaseShimmer from '../../components/CardReleaseShimmer';
import CardReleases from '../../components/CardReleases';
import PatternInput from '../../components/PatternInput';
import ReleasesFilterComponet from '../../components/ReleasesFilterComponet';
import ButtonHeaderComponents from '../../components/ButtonHeaderComponents';

import formatNumber from '../../utils/formatNumber';
import { listIconAccount } from '../../utils/listIconAccount';
import { institution } from '../../utils/institution';

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
    AreaRelease,
    AreaCardInfo,
    CardInfo,
    TitleCard,
    ValueCardRc,
    ValueCardDp,
    ValueCardTotal,
    AreaModal,
    BodyModalSearch,
    AreaModalFilter,
    BodyModalFilter,
    AreaTitleSearch,
    TitleSearch,
    AreaInputSearch,
    AreaButtonSearch,
    ButtonSearch,
    ButtonSearchText,
    BodyModalExport,
    AreaTitleExport,
    TitleExport,
    AreaModalExport,
    AreaButtonExport,
    ButtonExport,
    TitleButtonExport,
    AreaModalRealeses,
    BodyModalRealeses,
    AreaTitleRealeses,
    TitleRealeses,
    AreaHeaderRealese,
    AreaNameIconRealese,
    IconRealese,
    IconType,
    AreaNameRealese,
    DescriptionRealese,
    NameBankRealese,
    AreaButtonUpdate,
    ButtonUpdate,
    AreaBodyRealese,
    AsideRealese,
    AreaTitleRealese,
    TextTitleRealese,
    TextSubTitleRealese,
    AreaAnexo,
    ImgAnexo,
    AreaButtonPay,
    ButtonPay,
    ButtonPayText,
    AreaButtonOk,
    ButtonOk,
} from './styles';

const Releases = ({ navigation }) => {
    
    let today = new Date();
    const [date, setDate] = useState(today);
    const [currentDate, setCurrentDate] = useState('');
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [isLoading, setIsLoading] = useState(false);
    const [revenue, setRevenue] = useState({});
    const [debt, setDebt] = useState(0);
    const [total, setTotal] = useState(0);
    const [iconAccount, setIconAccount] = useState();
    const [iconCard, setIconCard] = useState();
    const [isCard, setIsCard] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [modalSearch, setModalSearch] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [modalRealeses, setModalRealeses] = useState(false);
    const [account, setAccount] = useState({});
    const [selectAccountOrigen, setSelectAccountOrigen] = useState({});
    const [selectAccountDestiny, setSelectAccountDestiny] = useState({});

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonHeaderComponents 
                    onPress={ async (e) => {
                        if(e === 1) setModalSearch(true);
                        if(e === 2) setModalFilter(true);
                        if(e === 3) setModalExport(true);     
                    }}
                />
            )
        });
    }, [navigation]);

    const [realese, setRealese] = useState({
        account:{
            color_hex:"#fff",
        },
        rc_category: {
            name: ''
        },
        dp_category: {
            name: ''
        },
        anexo_img: {
            url: ''
        }
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            getReleases();
            setSearchText('');
        });
        return unsubscribe;
    }, []);

    const handlerCalc = (data) => {

        const resRc = data.filter(item => item.type === 1 && item.installments === false);
        const resRcInstallments = data.filter(item => item.type === 1 && item.installments === true);
        const resDp = data.filter(item => item.type === 2 && item.installments === false);
        const resDpInstallments = data.filter(item => item.type === 2 && item.installments === true);
        const sum = resRc.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value), 0)
        const sumParc = resRcInstallments.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value_installments), 0);
        const sumD = resDp.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value), 0)
        const sumParcD = resDpInstallments.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value_installments), 0);

        const sumRc = Number(sumParc) + Number(sum);
        const sumDp = Number(sumD) + Number(sumParcD);
 
        setRevenue(sumRc);
        setDebt(sumDp);
        setTotal( Number(sumRc) - Number(sumDp));
    }

    const getReleasesFilter = async (data) => {

        try {
            setData([]);

            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const res = await api.get(`releases/${month}&${year}`);
            let result = res.data.releases;

            if(data.all === true && data.idBank === null && data.idCardCredit === null && data.idCatDp === null && data.idCatRc === null &&
                data.idTag === null && data.isFixo === null && data.isInstallments === null && data.isFixo === null) {
                toatsError('Nenhum filtro foi selecionado!');

                handlerCalc(result);
                setData(result)
                return false;
            } 
    
            if(data.type) {
                result = result.filter(item => Number(item.type) === Number(data.type));
            }

            if(data.isInstallments) {
                result = result.filter(item => item.installments === data.isInstallments);
            }

            if(data.isFixo) {
                result = result.filter(item => item.fixo === true);
            }
            
            if(data.idBank) {
                result = result.filter(item => Number(item.account_id) === Number(data.idBank));
            }

            if(data.idCardCredit) {
                result = result.filter(item => Number(item.card_credit_id) === Number(data.idCardCredit));
            }

            if(data.idCatRc) {
                result = result.filter(item => Number(item.rc_category_id) === Number(data.idCatRc));
            }
            
            if(data.idCatDp) {
                result = result.filter(item => Number(item.dp_category_id) === Number(data.idCatDp));
            }

            if(data.idTag) {
                result = result.filter(item => Number(item.tag_id) === Number(data.idTag));
            }
            
            handlerCalc(result);
            setData(result)

        } catch (error) {
            toatsError('Erro ao se comunicar com o servidor !');
        }
    }

    const getReleases = async (t) => {

        const date = new Date();

        try {

            setIsLoading(true);
            setData([]);

            let month = selectedMonth + 1;
            const res = await api.get(`releases/${month}&${selectedYear}`);
            
            const formattedDate = format(
                date, 
                "MMMM"+" "+"YYY",
                { locale: ptBR }
            );

            setCurrentDate(formattedDate);
            handlerCalc(res.data.releases);
            setData(res.data.releases);
            setIsLoading(false);

        } catch (error) {
            setTimeout(() => {
                setIsLoading(false);
                toatsError('Erro ao se comunicar com o servidor !');
            }, 500);
           
        }
    }

    const handlerDateAdd = async () => {
        setIsLoading(true);

        const result = addMonths(date, 1)
        setDate(result);
        setData([]);

        let month = result.getMonth() + 1;
        let year = result.getFullYear();
        
        try {

            const res = await api.get(`releases/${month}&${year}`);
            handlerCalc(res.data.releases);
            setData(res.data.releases);
            
        } catch (error) {
        
            setIsLoading(false);
            toatsError('Erro ao se comunicar com o servidor !');
       
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

            const res = await api.get(`releases/${month}&${year}`);
            handlerCalc(res.data.releases);
            setData(res.data.releases);
           
        } catch (error) {
            setIsLoading(false);
            toatsError('Erro ao se comunicar com o servidor !');
        } 
     
        setIsLoading(false)
        const formattedDate = format(
            result, 
            "MMMM"+" "+"YYY",
            { locale: ptBR }
        );
        setCurrentDate(formattedDate);
        
        
    }

    useEffect(() => {
        if(searchText === '') {
            getReleases();
        } else {
            const res = data.filter(item => (item.description.toLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1));
            handlerCalc(res);
            setData(res);
        }
    }, [searchText]);

    const openModalRelease = (id) => {

        const res = data.filter(item => item.id === id);
        setRealese(res[0]);

        if(res[0].type === 3) {

            const resAccountOrigen = account.filter(item => item.id === res[0].account_origin);
            const resAccountDestiny = account.filter(item => item.id === res[0].account_destiny);

            setSelectAccountOrigen(resAccountOrigen[0]);
            setSelectAccountDestiny(resAccountDestiny[0]);
        }

        if(res[0].card_credit != null) {
            let cardIcon = institution.filter(e => e.id === Number(res[0].card_credit.id_institution));
            setIconCard(cardIcon[0]);
            setIsCard(true);
        } else {
            const icon = listIconAccount.filter(e => Number(e.id) === Number(res[0].account.type_id));
            setIconAccount(icon[0].url);
            setIsCard(false);
        }
        
        setModalRealeses(true); 
    }

    const handlerUpdateRealese = (id) => {

        const response = data.filter(item => item.id === id);

        if(response[0].type === 1) {

            setModalRealeses(false);

            navigation.navigate('ActionScreens', {
                screen: 'ScreenCreditEdit',
                params: { data: response[0] } 
            });

        }

        if(response[0].type === 2) {

            setModalRealeses(false);

            navigation.navigate('ActionScreens', {
                screen: 'ScreenDebitEdit',
                params: { data: response[0] } 
            });
        }

        if(response[0].type === 3) {

            const resAccountOrigen = account.filter(item => item.id === response[0].account_origin);
            const resAccountDestiny = account.filter(item => item.id === response[0].account_destiny);

            setModalRealeses(false);

            navigation.navigate('ActionScreens', {
                screen: 'ScreenTransferEdit',
                params: { 
                    data: response[0],
                    resAccountOrigen,
                    resAccountDestiny
                } 
            }); 
        }
    }

    const handlerExportExel = async () => {

        let report = data;
        if(total === 0) {
            toatsError('Ops! nenhum lançamento.');  
        } else {
            try {
                const res = await api.post('reportexel', report);
    
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
                    mime: 'application/csv',
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
    }   
   
    const handlerExportPdf = async () => {

        let month = ['Janeiro', 'Fevereiro', 'Março', 
        'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',  'Outubro', 'Novembro', 'Dezembro'];

        let monthName = month[selectedMonth];

        let report = data;
        if(total === 0) {
            toatsError('Ops! nenhum lançamento.');
        } else {

            let reportRevenue = formatNumber(revenue);
            let reportDebt = formatNumber(debt);
            let reportTotal = revenue - debt;
            reportTotal = formatNumber(reportTotal);
            try {
                const res = await api.post('reportpdf', {
                    report,
                    reportRevenue,
                    reportDebt,
                    reportTotal,
                    date: {
                        monthName,
                        selectedYear
                    } 
                }); 

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

    return(
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
                <CardReleaseShimmer />
            }

            {data.length <= 0 && isLoading === false ? (

                <AreaBodyOps>
                    <Fontisto name="arrow-swap" size={70} color="#000" />
                    <TitleOps>Ops!</TitleOps>
                    <DescriptionOps>Nenhum lançamento.</DescriptionOps>
                </AreaBodyOps>
             
            ) : (
                <AreaRelease>

                    <FlashList 
                        data={data}
                        renderItem={({item}) => <CardReleases data={item} 
                            onAction={(id) => openModalRelease(id)}
                        />}
                        keyextractor={item => item.id}
                        estimatedItemSize={180}
                    />

                    <AreaCardInfo>

                        <CardInfo>
                            <TitleCard>Receitas</TitleCard>
                            <ValueCardRc>{formatNumber(revenue)}</ValueCardRc>
                        </CardInfo>

                        <CardInfo>
                            <TitleCard>Despesas</TitleCard>
                            <ValueCardDp>{formatNumber(debt)}</ValueCardDp>
                        </CardInfo>

                        <CardInfo>
                            <TitleCard>Saldo</TitleCard>
                            <ValueCardTotal>{formatNumber(total)}</ValueCardTotal>
                        </CardInfo>

                    </AreaCardInfo>

                </AreaRelease>
            )}    

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalSearch}
                onRequestClose={()=> {
                    setModalSearch(false)
                }}
            >
                <AreaModal>
                    
                    <BodyModalSearch>
                        <AreaTitleSearch>
                            <TitleSearch>Pesquisar</TitleSearch>
                        </AreaTitleSearch>

                        <AreaInputSearch>
                            <PatternInput 
                                placeholder="Digite aqui sua palavra chave" 
                                placeholderTextColor="#7E7E7E" 
                                maxLength={20} 
                                value={searchText}
                                onChangeText={text => setSearchText(text)} 
                                returnKeyType="go"
                            />
                        </AreaInputSearch>

                        <AreaButtonSearch>

                            <ButtonSearch 
                                activeOpacity={0.8}
                                onPress={() => {
                                    setModalSearch(false);
                                }}
                            >
                                <ButtonSearchText>Concluir</ButtonSearchText>
                            </ButtonSearch>

                        </AreaButtonSearch>
                    
                    </BodyModalSearch>
                        
                </AreaModal>

            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalFilter}
                onRequestClose={()=>{
                    setModalFilter(false)
                }}
            >
               
                <AreaModalFilter onPress={() => {
                        setModalFilter(false)}
                    }>
                    <BodyModalFilter>

                        <ReleasesFilterComponet 
                            onChangeModal={() => {
                                setModalFilter(false);
                            }}
                            onChangeFilter={(data) => getReleasesFilter(data)}
                        />

                    </BodyModalFilter>

                </AreaModalFilter>
                          
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExport}
                onRequestClose={()=> {
                    setModalExport(false);
                }}
            >
                <AreaModalExport activeOpacity={0.8} onPress={() => {
                        setModalExport(false);
                    }}> 
                               
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
                                    setModalExport(false);
                                    handlerExportPdf();
                                }}
                            >
                                <TitleButtonExport>PDF</TitleButtonExport>
                            </ButtonExport>

                        </AreaButtonExport>
                    </BodyModalExport>

                </AreaModalExport>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalRealeses}
                onRequestClose={()=> setModalRealeses(false)}
            >
                <AreaModalRealeses>
                  
                    {realese.type === 3 ? (
                        <>
                         <BodyModalRealeses>

                            <AreaTitleRealeses>
                                <TitleRealeses>Lançamento</TitleRealeses>
                            </AreaTitleRealeses>

                            <AreaHeaderRealese>
                                <AreaNameIconRealese>
                                    <IconRealese style={{ backgroundColor: selectAccountDestiny.color_hex }} />
                                    <AreaNameRealese>
                                        <DescriptionRealese>{realese.description}</DescriptionRealese>
                                        <NameBankRealese>Transferência</NameBankRealese>
                                    </AreaNameRealese>
                                </AreaNameIconRealese>

                                <AreaButtonUpdate>
                                    <ButtonUpdate 
                                        activeOpacity={0.8} 
                                        onPress={() => handlerUpdateRealese(realese.id)}
                                    >
                                        <Feather name="edit-2" color="#c4c4c4" size={30} />
                                    </ButtonUpdate>
                                </AreaButtonUpdate>

                            </AreaHeaderRealese>

                            <AreaBodyRealese>

                                <AsideRealese>

                                    <AreaTitleRealese>
                                        <TextTitleRealese>Conta de origem</TextTitleRealese>
                                        <TextSubTitleRealese>{selectAccountOrigen.name}</TextSubTitleRealese>
                                    </AreaTitleRealese>

                                    <AreaTitleRealese>
                                        <TextTitleRealese>Data</TextTitleRealese>
                                        <TextSubTitleRealese>{`${realese.day}/${realese.month}/${realese.year}`}</TextSubTitleRealese>
                                    </AreaTitleRealese>

                                    {realese.tags ? (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Tags</TextTitleRealese>
                                            <TextSubTitleRealese>{realese.tags.name}</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    ) : (<></>)}

                                    <AreaTitleRealese>
                                        <TextTitleRealese>Valor</TextTitleRealese>
                                        <TextSubTitleRealese>{formatNumber(realese.value)}</TextSubTitleRealese>
                                    </AreaTitleRealese>

                                </AsideRealese>

                                <AsideRealese style={{ marginLeft: 20 }}>

                                    <AreaTitleRealese>
                                        <TextTitleRealese>Conta de destino</TextTitleRealese>
                                        <TextSubTitleRealese>{selectAccountDestiny.name}</TextSubTitleRealese>
                                    </AreaTitleRealese>

                                    {realese.attachment_img_id &&
                                        <AreaAnexo>
                                            <ImgAnexo
                                                source={{ uri: realese.anexo_img.url}} 
                                                //source={{ uri: 'https://avatars.githubusercontent.com/u/73440909?v=4' }}
                                                resizeMode="cover"
                                            />
                                        </AreaAnexo>
                                    }
                                </AsideRealese>
                                
                            </AreaBodyRealese>

                            <AreaButtonOk>
                                <ButtonOk 
                                    activeOpacity={0.8} 
                                    onPress={() => setModalRealeses(false)}
                                >
                                    <Feather name="check" size={26} color="#fff" />
                                </ButtonOk>
                            </AreaButtonOk>


                         </BodyModalRealeses>
                        </>
                    ) : (
                    
                        <BodyModalRealeses>

                            <AreaTitleRealeses>
                                <TitleRealeses>Lançamento</TitleRealeses>
                            </AreaTitleRealeses>
        
                            <AreaHeaderRealese> 
                                <AreaNameIconRealese>

                                    {isCard ? (
                                        <>
                                            <IconRealese style={{ width: 42, height: 42,  }}>
                                                <IconType style={{ width: 40, height: 40, }} source={iconCard.url} />
                                            </IconRealese>
                                            <AreaNameRealese>
                                                <DescriptionRealese>{realese.description}</DescriptionRealese>
                                                <NameBankRealese>Nubank</NameBankRealese>
                                            </AreaNameRealese>
                                        </>
                                    ): (
                                        <>
                                        <IconRealese style={{ backgroundColor: realese.account.color_hex }}>
                                                <IconType source={iconAccount} />
                                            </IconRealese>
                                            <AreaNameRealese>
                                                <DescriptionRealese>{realese.description}</DescriptionRealese>
                                                <NameBankRealese>{realese.account.name}</NameBankRealese>
                                            </AreaNameRealese>
                                        </>
                                    )}

                                </AreaNameIconRealese>

                                <AreaButtonUpdate>

                                    <ButtonUpdate 
                                        activeOpacity={0.8} 
                                        onPress={() => handlerUpdateRealese(realese.id)}
                                    >
                                        <Feather name="edit-2" color="#c4c4c4" size={30} />
                                    </ButtonUpdate>
                                </AreaButtonUpdate>

                            </AreaHeaderRealese> 

                            <AreaBodyRealese>
                                
                                <AsideRealese>

                                    <AreaTitleRealese>
                                        <TextTitleRealese>Data</TextTitleRealese>
                                        <TextSubTitleRealese>{`${realese.day}/${realese.month}/${realese.year}`}</TextSubTitleRealese>
                                    </AreaTitleRealese>

                                    {isCard ? 
                                    (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Cartão de credito</TextTitleRealese>
                                            <TextSubTitleRealese>{iconCard.name}</TextSubTitleRealese>
                                        </AreaTitleRealese>

                                    ): (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Conta</TextTitleRealese>
                                            <TextSubTitleRealese>{realese.account.name}</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    )}
                                    
                                    <AreaTitleRealese>
                                        <TextTitleRealese>Categoria</TextTitleRealese>
                                        {realese.type === 1 ? (
                                            <TextSubTitleRealese>{realese.rc_category.name}</TextSubTitleRealese>
                                        ) : (
                                            <TextSubTitleRealese>{realese.dp_category.name}</TextSubTitleRealese>
                                        )}
                                    </AreaTitleRealese>
                                    
                                    {realese.tags ? (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Tags</TextTitleRealese>
                                            <TextSubTitleRealese>{realese.tags.name}</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    ) : (<></>)}

                                    {realese.fixo ? (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Fixo</TextTitleRealese>
                                            <TextSubTitleRealese>lançamento fixo</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    ) : (<></>)}

                                    {realese.installments ? (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Parcelado</TextTitleRealese>
                                            <TextSubTitleRealese>{`falta ${realese.qd_installments} parcelas de ${formatNumber(realese.value_installments)}`}</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    ) : (<></>)}

                                    {realese.installments ? (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Valor total parcelado</TextTitleRealese>
                                            <TextSubTitleRealese>{formatNumber(realese.value)}</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    ) : (
                                        <AreaTitleRealese>
                                            <TextTitleRealese>Valor</TextTitleRealese>
                                            <TextSubTitleRealese>{formatNumber(realese.value)}</TextSubTitleRealese>
                                        </AreaTitleRealese>
                                    )}

                                </AsideRealese>

                                <AsideRealese style={{ marginLeft: 20 }}>

                                    <AreaTitleRealese>


                                        {realese.type_payer && !isCard &&
                                            <>
                                                <TextTitleRealese>Status</TextTitleRealese>
                                                <TextSubTitleRealese>A pagar</TextSubTitleRealese>
                                            </>
                                        }

                                        {!realese.type_payer && !isCard &&
                                            <>
                                                <TextTitleRealese>Status</TextTitleRealese>
                                                <TextSubTitleRealese>pago</TextSubTitleRealese>
                                            </>
                                        }

                                    </AreaTitleRealese>
                                    
                                    {realese.attachment_img_id &&
                                        <AreaAnexo>
                                            <ImgAnexo
                                                source={{ uri: realese.anexo_img.url}} 
                                                //source={{ uri: 'https://avatars.githubusercontent.com/u/73440909?v=4' }}
                                                resizeMode="cover"
                                            />
                                        </AreaAnexo>
                                    }

                                    {realese.type_payer && !isCard &&
                                        <AreaButtonPay>
                                        
                                            <ButtonPay activeOpacity={0.8}>
                                                <ButtonPayText>PAGAR</ButtonPayText>
                                            </ButtonPay>
                                            
                                        </AreaButtonPay>
                                    }

                                </AsideRealese>

                            </AreaBodyRealese>
                        
                            <AreaButtonOk>
                                    
                                <ButtonOk 
                                    activeOpacity={0.8} 
                                    onPress={() => setModalRealeses(false)}
                                >
                                    <Feather name="check" size={26} color="#fff" />
                                </ButtonOk>

                            </AreaButtonOk>
                        </BodyModalRealeses>

                    )}
                </AreaModalRealeses>
            </Modal>
                       
        </Container>
    )
}

export default Releases;