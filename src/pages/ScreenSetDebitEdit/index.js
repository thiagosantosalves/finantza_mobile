import React, { useEffect, useState } from 'react';
import { Modal, Switch } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import formatNumber from '../../utils/formatNumber';
import transformNumber from '../../utils/transformNumber';
import PatternInput from '../../components/PatternInput';
import { institution } from '../../utils/institution';

import formatDateMonth from '../../utils/formatDateMonth';

import ListBankFull from '../../components/ListBankFull';
import ListCategoryDpFull from '../../components/ListCategoryDpFull';
import ListTagsFull from '../../components/ListTagsFull';
import ListCardCreditFull from '../../components/ListCardCreditFull';

import { listIconDp } from '../../utils/listIconDp';
import { listIconAccount } from '../../utils/listIconAccount';

import api from '../../services/api';

import { WToast } from 'react-native-smart-tip';

import { 
  Container,
  Header,
  AreaValue,
  TextValue,
  AreaSection,
  Section,
  TitleSection,
  AreaIconCategory,
  IconCategory,
  IconUrl,
  IconPattern,
  AreaIconBank,
  AreaSwitch,
  IconBank,
  TitleIconBank,
  TitleIconCategory,
  AreaDate,
  ButtonSelectPattern,
  ButtonSelectPatternText,
  AreaButton,
  ButtonCreate,
  ModalArea,
  BodyModalCategory,
  BodyModalBank,
  AreaTitleModal,
  TitleModal,
  ListBank,
  TitleModalInstallments,
  BodyModalInstallments,
  ButtonActionInstallments,
  TitleButtonInstallments,
  TitleX,
  ButtonImageInfo,
  BoxModalInstallments,
  HeaderModalAnexo,
  BodyModalAnexos,
  AreaTitle,
  AreaButtonClose,
  TitleModalAnexos,
  ButtonClose,
  BodyButton,
  ButtonCamera,
  ButtonCameraTitle,
  ButtonLauchCamera,
  ButtonLauchCameraTitle,
  ListTags,
  BodyModalTags,
  ModalAreaMeta,
  BodyModalNotification,
  AreaTitleModalNotification,
  TitleModalNotification,
  AreaModalNotificationDesc,
  DescModalNotification,
  AreaModalNotificationCategory,
  DescCategoryModalNotification,
  AreaModalNotificationInfo,
  AreaModalNotificationInfoRow,
  AreaModalNotificationInfoText,
  ButtonModalNotification,
  AreaModalNotificationButton,
  ButtonTextModalNotification,
  ButtonCancelModalNotification,
  ButtonCancelTextModalNotification,
} from './styles';

const ScreenSetDebit = ({ route, navigation }) => {

    const [description, setDescription] = useState(route.params.data.description);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [category, setCategory] = useState('bankFull');
    const [categorySelect, setCategorySelect] = useState(route.params.data.dp_category);
    const [idIconCategory, setIconCategory] = useState(null);
    const [isSwitch, setIsSwitch] = useState(false);
    const [bankFull, setBankFull] = useState({});
    const [bank, setBank] = useState(route.params.data.account);
    const [idIconBank, setIdIconBank] = useState(null);
    const [cardCreditFull, setCardCreditFull] = useState({})
    const [cardCreditSelect, setCardCreditSelect] = useState(route.params.data.card_credit);
    const [cardCreditIcon, setCardCreditIcon] = useState({});
    const [ativeButtonDateToday, setAtiveButtonDateToday] = useState(true);
    const [ativeButtonDateYesterday, setAtiveButtonDateYesterday] = useState(false);
    const [ativeButtonDateOther, setAtiveButtonDateOther] = useState(false);
    const [fixed, setFixed] = useState(route.params.data.fixo);
    const [installments, setInstallments] = useState(route.params.data.installments);
    const [modaInstallments, setModalInstallments] = useState(false);
    const [qdInstallments, setQdInstallments] = useState('');
    const [qd2, setQd2] = useState('');
    const [qd3, setQd3] = useState('');
    const [qd4, setQd4] = useState('');
    const [qd5, setQd5] = useState('');
    const [qd6, setQd6] = useState('');
    const [qd7, setQd7] = useState('');
    const [qd8, setQd8] = useState('');
    const [qd9, setQd9] = useState('');
    const [qd10, setQd10] = useState('');
    const [qd11, setQd11] = useState('');
    const [qd12, setQd12] = useState('');
    const [dateFinal, setDateFinal] = useState(null);
    const [anexoPhoto, setAnexoPhoto] = useState();
    const [typePhoto, setTypePhoto] = useState(null);
    const [colorButtonAdd, setColorButtonAdd] = useState(false);
    const [tagsFull, setTagsFull] = useState(null);
    const [tag, setTag] = useState(route.params.data.tags);
    const [colorButtonTags, setColorButtonTags] = useState(false);
    const [modalCategory, setModalCategory] = useState(false);
    const [modalBank, setModalBank] = useState(false);
    const [modalCard, setModalCard] = useState(false);
    const [modalAnexos, setModalAnexos] = useState(false);
    const [modalTags, setModalTags] = useState(false);
    const [response, setResponse] = useState(route.params.data);
    const [attachment, setAttachment] = useState(route.params.data.attachment_img);
    const [imgId, setImgId] = useState(route.params.data.attachment_img_id);
    const [modalMetaNotification, setModalMetaNotification] = useState(false);
    const [infoMetas, setInfoMetas] = useState({});

    useEffect(() => {
        if(cardCreditSelect) {
            const cardIcon = institution.filter(e => e.id === cardCreditSelect.id_institution);

            setCardCreditIcon(cardIcon[0]);
            setIsSwitch(true);
        }
    }, []);

    const getDbCategory = async () => {

        try {
            const res = await api.get('dpcategory');
        
            const respoFilter = res.data.sort((x, y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);

                return a - b;
            });
        
            setCategory(respoFilter);

        } catch (error) {
            console.log(error)
        }
    
    }

    const getBank = async () => {

        try {
            const res = await api.get('account');
        
            const respoFilter = res.data.sort((x, y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);

                return a - b;
            });

            setBankFull(respoFilter);
        } catch (error) {
            console.log(error)
        }

    }

    const getCard = async () => {
        const res = await api.get('cardcredit');
        
        const respoFilter = res.data.sort((x, y) => {
        let a = new Date(x.createdAt);
        let b = new Date(y.createdAt);

        return a - b;
        });
        setCardCreditFull(respoFilter)
    }

    const getTags = async () => {

        try {
        const tags = await api.get('tags');
        setTagsFull(tags.data);
        } catch (error) {
        console.log(error);
        }

    }

    const getIcon = () => {
        const idIconCategory = listIconDp.filter(e => e.id === route.params.data.dp_category.id_icon);
        const idIconBank = listIconAccount.filter(e => e.id === Number(route.params.data.account.type_id));
        
        setIconCategory(idIconCategory[0].url);
        setIdIconBank(idIconBank[0].url);
    }

    useEffect(() => {
        getDbCategory();
        getBank();
        getCard();
        getTags();
        actionDayIntial();
        getIcon();
    }, []);

    const handleCategoryId = async (id) => {
        
        const category = await api.get(`dpcategory/${id}`);
        const idIcon = listIconDp.filter(e => e.id === category.data.id_icon);

        setCategorySelect(category.data);
        setIconCategory(idIcon[0].url);
        setModalCategory(false);
    }

    const handleBankId = async (id) => {

        const bankSelect = await api(`account/${id}`);
        const idIcon = listIconAccount.filter(e => e.id === Number(bankSelect.data.type_id));

        setBank(bankSelect.data);
        setIdIconBank(idIcon[0].url);
        setModalBank(false);
    }

    const handleCardId = async (id) => {
        const res = await api(`cardcredit/${id}`);
        const cardIcon = institution.filter(e => e.id === res.data.id_institution);
        
        setCardCreditSelect(res.data);
        setCardCreditIcon(cardIcon[0]);
        setModalCard(false);
    }


    const handleConfirm = (date) => {

        let d = date.toString();
        d = d.split(' ');
        let dia = d[2];
        let mes = 1+formatDateMonth(d[1]);
        let ano = d[3];
        let r = dia+' '+mes+' '+ano;

        setIsDatePickerVisible(false);
        setDateFinal(r);
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const actionDayIntial = () => {
        let data = new Date();
        let day = data.getDate();
        let month = 1+data.getMonth();
        let yaer = data.getFullYear();
        let d = day+' '+month+' '+yaer;
        setDateFinal(d);
    }

    const actionDay = () => {
      
        if(ativeButtonDateOther) setAtiveButtonDateOther(false);
        if(ativeButtonDateYesterday) setAtiveButtonDateYesterday(false);
        setAtiveButtonDateToday(true);
    
        let data = new Date();
        let day = data.getDate();
        let month = 1+data.getMonth();
        let yaer = data.getFullYear();
        let d = day+' '+month+' '+yaer;
        setDateFinal(d);
    }
    
    const yesterday = () => {
        
        if(ativeButtonDateOther) setAtiveButtonDateOther(false);
        if(ativeButtonDateToday) setAtiveButtonDateToday(false);
        setAtiveButtonDateYesterday(true);
    
        let data = new Date();
        let day = data.getDate();
        let month = 1+data.getMonth();
        let year = data.getFullYear();
        day = day - 1;
        let d = day+' '+month+' '+year;
        setDateFinal(d);
    }
    
    const showDatePicker = () => {
    
        if(ativeButtonDateYesterday) setAtiveButtonDateYesterday(false);
        if(ativeButtonDateToday) setAtiveButtonDateToday(false);
        
        setAtiveButtonDateOther(true);
        setAtiveButtonDateOther(true);
        setIsDatePickerVisible(true);
    };

    const getFixed = () => {
    
        setQdInstallments('');

        if(!installments) {
        if(fixed) {
            setFixed(false);
        } else {
            setFixed(true);
        }
        } else {
            setInstallments(false);
            setFixed(true);
        }
    }

    const getInstallments = () => {
    
        if(installments) {
            setModalInstallments(true);
        } else {
            
        if(!fixed) {
            
        if(installments) {
            setInstallments(false);
        } else {
            setInstallments(true);
        }
            setModalInstallments(true);
            } else {
                setFixed(false);
                setInstallments(true);
                setModalInstallments(true);
            }
        }  
    }

    const shareValue = (qd) => {

        let valor = route.params.value;

        let s = valor;

        s = s.replace(',', '');
        s = s.replace('.', '');
        s = s.replace('.', '');
        let final = s.substr(-2);
        var myStr = s.slice(0, -2);
        let finalString = myStr+"."+final; 
        let t = Number(finalString); 
        t = t / qd;
        t = t.toFixed(2);

        let v = t.replace(/\D/g, '');
        v = (v/100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        s = v;

        return s;
    }

    const actionCloseModalInstallments = () => {
        
        if(qdInstallments == '') {
        setQdInstallments('2x de '+qd2);
        }

        setModalInstallments(false);
    }

    const actionPickerInstallments = (itemValue, itemIndex) => {
        setQdInstallments(itemValue);
    }

    useEffect(()=> {
        setQd2(shareValue(2));
        setQd3(shareValue(3));
        setQd4(shareValue(4));
        setQd5(shareValue(5));
        setQd6(shareValue(6));
        setQd7(shareValue(7));
        setQd8(shareValue(8));
        setQd9(shareValue(9));
        setQd10(shareValue(10));
        setQd11(shareValue(11));
        setQd12(shareValue(12));
    }, [qdInstallments]);


    const openPicker = () => {

        let options = {
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 1
        }

        launchCamera(options, async (response) => {
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
        
            setAnexoPhoto(response.assets[0]);
            setColorButtonAdd(true);
            
            const type = response.assets[0].type.split('/');

            setTypePhoto(type[1]);
            setModalAnexos(false);
        }
        });
    }
  
    const openPickerLibrary = () => {

        let options = {
            mediaType: 'photo',
            quality: 0.5,
            selectionLimit: 1
        }

        launchImageLibrary(options, (response) => {
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            setAnexoPhoto(response.assets[0]);
            setColorButtonAdd(true);
            
            const type = response.assets[0].type.split('/');

            setTypePhoto(type[1]);
            setModalAnexos(false);
        } 
        });
    }

    const getTagsId = (id) => {
        const tags = tagsFull.filter(item => item.id === id);
        setTag(tags[0])
        setColorButtonTags(true);
        setModalTags(false);
    }

    const handlerIsCard = async () => {

        if(!cardCreditFull.length <= 0) {
        setModalCard(true);
        } else {
        toatsErrorCard();
        }
    }

    function toatsErrorCardReleases(e) {
        const toastOpts = {
          data: e,
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT,
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts);
      }

    function toatsError() {
        const toastOpts = {
        data: 'Preencha os dados, descrição e categoria são obrigatorios!',
        textColor: '#ffffff',
        backgroundColor: '#36393F',
        duration: WToast.duration.SHORT, 
        position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    function toatsErrorCard() {
        const toastOpts = {
        data: 'Nenhum cartão cadastrado!',
        textColor: '#ffffff',
        backgroundColor: '#36393F',
        duration: WToast.duration.SHORT,
        position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    function toatsTags() {
        const toastOpts = {
        data: 'Nenhuma tag foi cadastrada!',
        textColor: '#ffffff',
        backgroundColor: '#36393F',
        duration: WToast.duration.SHORT,
        position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    function toatsCardLimit() {
        const toastOpts = {
          data: 'Limite do cartão insuficiente!',
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT,
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
      }

    const createDb =  async (number) => {

        const value = route.params.value; 
        
        let valueP = 0;
        let qdP = '';
        let tagIsTrue = false;
        let tagId = null;
        let bankId = null;
        let cardId = null;
        let payingName = '';

        if(categorySelect && description) {
        if(qdInstallments.length > 0) {
            valueP = qdInstallments.split(' ');
            qdP = valueP[0].split('x');
            qdP = Number(qdP[0]);
            valueP = transformNumber(valueP[2]);
        }
    
        if(anexoPhoto) {
            const data = new FormData();
    
            data.append("file", {
                uri: anexoPhoto.uri,
                type: anexoPhoto.type,
                name: anexoPhoto.fileName,
            });  
    
            try {

                const config = {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                };
                
                const file = await api.post('files', data, config);
                id_img = file.data.id;
                setAttachment(true);
            } catch (error) {
                console.log(error);
            }
        }
    
        if(tag) {
            tagIsTrue = true;
            tagId = tag.id
        }

        if(bank) {
            bankId = bank.id;
            payingName = bank.name
        }

        if(cardCreditSelect) {
            cardId = cardCreditSelect.id;
            payingName = cardCreditSelect.name;
        }

        let date = dateFinal.split(' ');
        let day = date[0];
        let month = date[1];
        let year = date[2];
        let status = false;

        try {

            if(route.params.data.type_payer === true && isSwitch === false) {  

                let resCardRelease = await api.get('cardcreditreleases');
                let cardStatus2 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 2 );
                let cardStatus3 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 3 );
               
                if(cardStatus2.length > 0) {
                    toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta fechado para essa data!`);
                    return false;
                }
    
                if(cardStatus3.length > 0) {
                    toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta vencido para essa data!`);
                    return false;
                }

                let cardReleases = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 1);
                
                if(cardReleases.length <= 0) {
                    toatsErrorCardReleases(`O lançamento já consta pago na fatura do cartão "${cardCreditSelect.name}"!`);
                    return false;
                }    

                payingName = bank.name;
                cardId = null;

                const cardExchange = await api.get(`cardcredit/${route.params.data.card_credit_id}`);

                let valueInvoiceCardExchange =  Number(cardExchange.data.invoice_amount) - Number(route.params.data.value);

                await api.put(`cardcredit/${route.params.data.card_credit_id}`, {
                    invoice_amount: valueInvoiceCardExchange
                }); 

                let cardReleasesTotal =  Number(cardReleases[0].invoice_amount) - Number(route.params.data.value);
                await api.put(`cardcreditreleases/${cardReleases[0].id}`, { invoice_amount: cardReleasesTotal });
 
                let accountExchange = await api.get(`account/${bank.id}`);
                let AccountSum =  Number(accountExchange.data.value) - Number(route.params.data.value);

                await api.put(`account/${accountExchange.data.id}`, { value: AccountSum });
            }   

            if(route.params.data.type_payer === false && isSwitch === true) {

                let resCardRelease = await api.get('cardcreditreleases');
                let cardStatus2 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 2 );
                let cardStatus3 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 3 );

                if(cardStatus2.length > 0) {
                    toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta fechado para essa data!`);
                    return false;
                }
    
                if(cardStatus3.length > 0) {
                    toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta vencido para essa data!`);
                    return false;
                }

                let cardReleases = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 1);
                
                if(cardReleases.length <= 0) {
                    toatsErrorCardReleases(`O lançamento já consta pago na fatura do cartão "${cardCreditSelect.name}"!`);
                    return false;
                }    

                const cardExchangeIstrue = await api.get(`cardcredit/${cardId}`);

                let valueInvoiceCardExchangeIstrue =  Number(cardExchangeIstrue.data.invoice_amount) + Number(route.params.data.value);
                await api.put(`cardcredit/${cardId}`, {
                    invoice_amount: valueInvoiceCardExchangeIstrue
                });  

                let accountExchangeIstrue = await api.get(`account/${route.params.data.account_id}`);
                let valueExchangeBankIstrue = Number(accountExchangeIstrue.data.value) + Number(route.params.data.value);

                await api.put(`account/${route.params.data.account.id}`, {
                    value: valueExchangeBankIstrue
                });
            }
        } catch(error) {
            console.log(error);
        }

        const resMeta = await api.get(`meta/${month}&${year}`);
        let isMeta = resMeta.data.filter(e => e.category.id === categorySelect.id);

        let meta_id = null;
        let metaIsTrue = false; 
  
       if(isMeta.length > 0) {
          meta_id = isMeta[0].id;
          metaIsTrue = true;
        }
        
        const newReleases = {
            description,
            value: value,
            rc_category_id: null,
            dp_category_id: categorySelect.id,
            type_payer: isSwitch,
            account_id: bankId,
            account_origin: null,
            account_destiny: null,
            card_credit_id: cardId,
            day, day,
            month: month,
            year: year,
            fixo: fixed,
            installments: installments,
            value_installments: valueP,
            qd_installments: qdP - 1,
            attachment_img: attachment,
            attachment_img_id: imgId,
            tag: tagIsTrue,
            tag_id: tagId,
            paying_account_name: payingName,
            meta_id: meta_id,
            meta: metaIsTrue
        }
        
        try {

            let sumMetaEdit = '';
                if(route.params.data.meta) {

                    let isMetaEdit = await api.get(`metafilter/${route.params.data.meta_id}`);
                    isMetaEdit = isMetaEdit.data;

                    sumMetaEdit = Number(isMetaEdit[0].used_value) - Number(route.params.data.value);

                    let porcent = sumMetaEdit * 100;
                    porcent = porcent / isMetaEdit[0].value;

                    let status = false;
                    
                    if(porcent >= 100 ) {
                        porcent = 100;
                        status = true;
                    }

                    await api.put(`metareleases/${isMetaEdit[0].id}`, {
                        used_value: sumMetaEdit,
                        porcent,
                        status
                    });
                }
                
                if(isMeta.length > 0) {

                    let newValue = installments ? valueP : value;

                    let usedValue = Number(newValue) + Number(sumMetaEdit);
                    usedValue = usedValue.toFixed(2);

                    let newPorcent = usedValue * 100;
                    newPorcent =  Number(newPorcent) / Number(isMeta[0].value);  
                    
                    let status = false;

                    let porcentInfo = newPorcent;

                    if(newPorcent >= 100 ) {
                        newPorcent = 100;
                        status = true;
                    }

                    if(number != 1 && number !=2) {
                        if(usedValue > isMeta[0].value && isMeta[0].notification === true) {
                    
                        const infoMeta = {
                            name: isMeta[0].category.name,
                            color: isMeta[0].category.color_hex,
                            value: isMeta[0].value,
                            used_value: usedValue,
                            month: isMeta[0].month,
                            year: isMeta[0].year,
                            porcent: porcentInfo
                        }

                        setInfoMetas(infoMeta);
                        setModalMetaNotification(true);
            
                        return false;
                        }
                    } 
            
                    if(number === 2) {
                        try {
                        await api.put(`metareleases/${isMeta[0].id}`, {
                            notification: false
                        });
                        } catch (error) {
                            console.log(error)
                        }
                    }
                
                    await api.put(`metareleases/${isMeta[0].id}`, {
                        used_value: usedValue,
                        porcent: newPorcent.toFixed(2),
                        status: status
                    });
                }
            
                //ajustar essa rota - criar uma nova que pega pelo id_card_credit exemplo: cardcreditFilterreleases/id_card_credit
                if(bankId && isSwitch === false) {
                    
                    let previousAccount = await api.get(`account/${route.params.data.account.id}`);
                    if(route.params.data.installments) {
                        let sumValueInstallments = Number(previousAccount.data.value) + Number(route.params.data.value_installments);
                        await api.put(`account/${route.params.data.account.id}`, { value: sumValueInstallments }); 
                    } else {
                        let sumPreviousAccount = Number(previousAccount.data.value) + Number(route.params.data.value);
                        await api.put(`account/${route.params.data.account.id}`, { value: sumPreviousAccount }); 
                    }

                    let sum = installments ? valueP : value;
                    const account = await api.get(`account/${bank.id}`);
                    sum =  Number(account.data.value) - Number(sum); 

                    await api.put(`account/${account.data.id}`, { value: sum }); 
                    await api.put(`releases/${response.id}`, newReleases);

                    navigation.navigate('TabRoutes', {
                        screen: 'Releases'
                    });
                } 
                
                if(cardCreditSelect && isSwitch === true) {

                    let resCardRelease = await api.get('cardcreditreleases');
                    let cardStatus2 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 2 );
                    let cardStatus3 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 3 );

                    if(cardStatus2.length > 0) {
                        toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta fechado para essa data!`);
                        return false;
                    }
        
                    if(cardStatus3.length > 0) {
                        toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta vencido para essa data!`);
                        return false;
                    }

                    let cardReleases = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 1);
                    
                    if(cardReleases.length <= 0) {
                        toatsErrorCardReleases(`O lançamento já consta pago na fatura do cartão "${cardCreditSelect.name}"!`);
                        return false;
                    }  

                    if(route.params.data.month != month || route.params.data.year != year) {
                        console.log('entrou na condição de ser datas diferentes');

                        let cardReleasesTotal =  Number(cardReleases[0].invoice_amount) - Number(route.params.data.value);
                        await api.put(`cardcreditreleases/${cardReleases[0].id}`, { invoice_amount: cardReleasesTotal });
                        
                        let resCardEditDateReleaes = resCardRelease.data.filter(e => e.month === Number(month) && e.year === Number(year));

                        if(resCardEditDateReleaes.length === 0) {

                            const cardCreditEdit = await api(`cardcredit/${cardCreditSelect.id}`);
        
                            const cardInfoReleases = {
                                statuscard: 1,
                                month: month,
                                year: year,
                                pay: false,
                                limit_card: cardCreditEdit.data.limit_card,
                                invoice_amount: value,
                                closes_day: cardCreditEdit.data.closes_day,
                                wins_day: cardCreditEdit.data.wins_day,
                                id_card_credit: cardCreditEdit.data.id,
                                id_account: cardCreditEdit.data.account.id
                            }
 
                            await api.post('cardcreditreleases', cardInfoReleases)
                        } else {
                            
                            let cardReleasesEditTotal = Number(resCardEditDateReleaes[0].invoice_amount) + Number(value); 

                            try {
                                await api.put(`cardcreditreleases/${resCardEditDateReleaes[0].id}`, { invoice_amount: cardReleasesEditTotal });
                            } catch (error) {
                                console.log(error);
                            } 
                        }

                    } else {

                        let cardReleasesTotal =  Number(cardReleases[0].invoice_amount) - Number(route.params.data.value);
                        cardReleasesTotal = Number(cardReleasesTotal) + Number(value); 
                        
                        try {
                            await api.put(`cardcreditreleases/${cardReleases[0].id}`, { invoice_amount: cardReleasesTotal });
                        } catch (error) {
                            console.log(error);
                        } 

                    }

                    const card = await api.get(`cardcredit/${cardCreditSelect.id}`);

                    let limit_full = card.data.invoice_amount;

                    let valueInvoiceNew =  Number(card.data.invoice_amount) - Number(route.params.data.value);

                    const newCard = await api.put(`cardcredit/${cardCreditSelect.id}`, {
                        invoice_amount: valueInvoiceNew
                    }); 
 
                    let valueLimit = Number(newCard.data.limit_card) - Number(newCard.data.invoice_amount);

                    if(Number(valueLimit) >= Number(value)) {

                        let sum_limit = Number(newCard.data.invoice_amount) + Number(value);
                        await api.put(`cardcredit/${newCard.data.id}`, { invoice_amount: sum_limit });

                        let cardReleasesTotal =  Number(cardReleases[0].invoice_amount) + Number(route.params.data.value);
                        await api.put(`cardcreditreleases/${cardReleases[0].id}`, { invoice_amount: cardReleasesTotal });

                        await api.put(`releases/${response.id}`, newReleases);

                        navigation.navigate('TabRoutes', {
                            screen: 'Releases'
                        });

                    } else {
                        toatsCardLimit();     
                        await api.put(`cardcredit/${newCard.data.id}`, {
                            invoice_amount: limit_full
                        });
                    } 
                } 

            } catch (error) {
                console.log(error);
            } 
            
        } else {
            toatsError();
        } 
    }

    return(
        <Container>

            <Header>
                <AreaValue>
                <TextValue>R$</TextValue>
                <TextValue>{formatNumber(route.params.value)}</TextValue>
                </AreaValue>
            </Header> 

            <AreaSection 
                showsVerticalScrollIndicator={false}
            >

                <Section>
                <TitleSection>Descrição</TitleSection>
                <PatternInput 
                    placeholder="Digite sua descrição" 
                    placeholderTextColor="#7E7E7E"
                    maxLength={35}
                    onChangeText={(item)=>setDescription(item)}
                    value={description} 
                />

                </Section>

                <Section>

                <TitleSection>Categoria</TitleSection>

                <AreaIconCategory activeOpacity={0.8} onPress={() => setModalCategory(true)}>

                    {categorySelect ? (
                    <>
                        <IconCategory style={{backgroundColor: categorySelect.color_hex}}>
                            <IconUrl source={idIconCategory} />
                        </IconCategory>
                        <TitleIconCategory>{categorySelect.name}</TitleIconCategory>
                    </>
                    ) : (
                    <>
                        <IconPattern source={require('../../assets/card_img/icontrasejado.png')} />
                        <TitleIconCategory>Selecione uma categoria</TitleIconCategory>
                    </>
                    )}

                </AreaIconCategory>

                </Section>

                {isSwitch ? (
                <Section>
                    <TitleSection>Cartão de credito</TitleSection>

                    <AreaSwitch>
                    {cardCreditSelect ? (
                        <>
                            <AreaIconBank activeOpacity={0.8} onPress={() =>  setModalCard(true)}>
                                <IconPattern style={{width: 32, height: 32}} source={cardCreditIcon.url} />
                                <TitleIconCategory>{cardCreditSelect.name}</TitleIconCategory>
                            </AreaIconBank>
                        </>
                    ) : (
                        <>
                            <AreaIconBank activeOpacity={0.8} onPress={() =>  handlerIsCard()}>
                                <IconPattern source={require('../../assets/card_img/icontrasejado.png')} />
                                <TitleIconCategory>Selecione um cartão de credito</TitleIconCategory>
                            </AreaIconBank>
                        </>
                    )}
                    
                    <Switch
                        trackColor={{ false: "#6F6F6F", true: "#DEB3C7" }}
                        thumbColor={isSwitch ? "#DD2D82" : "#CECECE"}
                        ios_backgroundColor="#6F6F6F"
                        style={{marginRight: 25}}
                        onValueChange={() => {
                        if(isSwitch) {
                            setIsSwitch(false);
                        } else {
                            setIsSwitch(true);
                        }
                        }}
                        value={isSwitch}
                    />
                    </AreaSwitch>
                
                </Section>
                ) : (
                <Section>
                    <TitleSection>Conta</TitleSection>

                    <AreaSwitch>
                    {bank ? (
                            <AreaIconBank activeOpacity={0.8} onPress={() =>  setModalBank(true)}>
                                <IconBank style={{backgroundColor: bank.color_hex}}>
                                    <IconUrl source={idIconBank} />
                                </IconBank>
                                <TitleIconBank>{bank.name}</TitleIconBank>
                            </AreaIconBank>

                    ) : (
                        <>

                            <AreaIconBank activeOpacity={0.8} onPress={() =>  setModalBank(true)}>
                                <IconPattern source={require('../../assets/card_img/icontrasejado.png')} />
                                <TitleIconCategory>Selecione uma conta</TitleIconCategory>
                            </AreaIconBank>
                        
                        </>
                    )}

                    <Switch
                        trackColor={{ false: "#6F6F6F", true: "#DEB3C7" }}
                        thumbColor={isSwitch ? "#DD2D82" : "#CECECE"}
                        ios_backgroundColor="#6F6F6F"
                        style={{marginRight: 25}}
                        onValueChange={() => {
                        if(isSwitch) {
                            setIsSwitch(false);
                        } else {
                            setIsSwitch(true);
                        }
                        }}
                        value={isSwitch}
                    />
                    </AreaSwitch>

                </Section>
                )}

                <Section>

                <TitleSection>Data</TitleSection>

                <AreaDate>

                    <ButtonSelectPattern 
                    style={{backgroundColor: ativeButtonDateToday ? '#FF872C' : '#C4C4C4'}}
                    onPress={actionDay}
                    activeOpacity={0.8}
                    >
                    <ButtonSelectPatternText>Hoje</ButtonSelectPatternText>
                    </ButtonSelectPattern>

                    <ButtonSelectPattern
                    style={{backgroundColor: ativeButtonDateYesterday ? '#FF872C' : '#C4C4C4'}}
                    onPress={yesterday}
                    activeOpacity={0.8}
                    >
                    <ButtonSelectPatternText>Ontem</ButtonSelectPatternText>
                    </ButtonSelectPattern>

                    <ButtonSelectPattern 
                    style={{backgroundColor: ativeButtonDateOther ? '#FF872C' : '#C4C4C4'}}
                    onPress={showDatePicker}
                    activeOpacity={0.8}
                    >
                    <ButtonSelectPatternText>Outro</ButtonSelectPatternText>
                    </ButtonSelectPattern>

                </AreaDate>

                </Section>

                <Section>

                <TitleSection>Repetir lançamentos</TitleSection>

                <AreaDate>

                    <ButtonSelectPattern style={{ backgroundColor: fixed ? '#FF872C' : '#C4C4C4'}}
                    onPress={getFixed}
                    activeOpacity={0.8}
                    >
                    <ButtonSelectPatternText>Fixo</ButtonSelectPatternText>
                    </ButtonSelectPattern>

                    <ButtonSelectPattern style={{width: 110, backgroundColor: installments ? '#FF872C' : '#C4C4C4'}}
                    onPress={getInstallments}
                    activeOpacity={0.8}
                    >
                    <ButtonSelectPatternText>Parcelado</ButtonSelectPatternText>
                    </ButtonSelectPattern>

                </AreaDate>

                </Section>

                <Section>

                <TitleSection>Anexos</TitleSection>

                <AreaDate>

                    <ButtonSelectPattern  
                    onPress={() => setModalAnexos(true)}
                    activeOpacity={0.8}
                    style={{backgroundColor: colorButtonAdd ? '#FF872C' : '#C4C4C4'}}
                    >
                    <ButtonSelectPatternText>Add</ButtonSelectPatternText>
                    </ButtonSelectPattern>
                    
                    {anexoPhoto &&
                    <>
                        <TitleX>+</TitleX>

                        <ButtonImageInfo>
                        <ButtonSelectPatternText>Imagem.{typePhoto}</ButtonSelectPatternText>
                        </ButtonImageInfo>
                    </>
                    }

                </AreaDate>

                </Section>

                <Section>

                <TitleSection>Tags</TitleSection>

                <AreaDate>

                    <ButtonSelectPattern activeOpacity={0.8} onPress={() => tagsFull.length > 0 ? setModalTags(true) : toatsTags()}
                    style={{backgroundColor: colorButtonTags ? '#FF872C' : '#C4C4C4'}}>
                    <ButtonSelectPatternText>Tags</ButtonSelectPatternText>
                    </ButtonSelectPattern>

                    {tag &&
                    <>
                        <TitleX>+</TitleX>

                        <ButtonImageInfo>
                        <ButtonSelectPatternText>{tag.name}</ButtonSelectPatternText>
                        </ButtonImageInfo>
                    </>
                    }

                </AreaDate>

                </Section>

                <AreaButton>
                <ButtonCreate activeOpacity={0.8} onPress={() => createDb()}>
                    <FontAwesome name="check" size={30} color="#FFF" />
                </ButtonCreate>
                </AreaButton>

            </AreaSection>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalCategory}
                onRequestClose={()=>setModalCategory(false)}
            >
                <ModalArea>
                    <BodyModalCategory>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma categoria</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                        data={category}
                        renderItem={({item}) => 
                        <ListCategoryDpFull
                            data={item} 
                            onAction={(id) => handleCategoryId(id)}                       
                        />} 
                        keyExtractor={item => item.id}
                        />

                    </BodyModalCategory>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalBank}
                onRequestClose={()=>setModalBank(false)}
            >
                <ModalArea>
                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma conta</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                        data={bankFull}
                        renderItem={({item}) => 
                        <ListBankFull
                            data={item} 
                            onAction={(id) => handleBankId(id)}                       
                        />} 
                        keyExtractor={item => item.id}
                        />

                    </BodyModalBank>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalCard}
                onRequestClose={()=>setModalCard(false)}
            >
                <ModalArea>
                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione um cartão de credito</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                        data={cardCreditFull}
                        renderItem={({item}) => 
                        <ListCardCreditFull
                            data={item} 
                            onAction={(id) => handleCardId(id)}                       
                        />} 
                        keyExtractor={item => item.id}
                        />

                    </BodyModalBank>
                </ModalArea>
            </Modal>
        
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                cancelTextIOS={'Sair'}
                confirmTextIOS={'OK'}
                headerTextIOS={'Selecione uma data'}
            />

            <Modal
                visible={modaInstallments}
                animationType="slide"
                transparent={true}
                onRequestClose={()=>setModalInstallments(false)}
            >
                <ModalArea>
                <BodyModalInstallments>
                    
                    <TitleModalInstallments>Quantas vezes será parcelado?</TitleModalInstallments>

                    <BoxModalInstallments>
                    <Picker
                        selectedValue={qdInstallments}
                        style={{height: 80, width: 300, color: '#000' }}
                        dropdownIconColor="#2F323D"
                        onValueChange={actionPickerInstallments}>
                        <Picker.Item label={`2x de R$ ${qd2}`}  value={'2x de '+qd2} />
                        <Picker.Item label={`3x de R$ ${qd3}`} value={'3x de '+qd3} />
                        <Picker.Item label={`4x de R$ ${qd4}`} value={'4x de '+qd4} />
                        <Picker.Item label={`5x de R$ ${qd5}`} value={'5x de '+qd5} />
                        <Picker.Item label={`6x de R$ ${qd6}`} value={'6x de '+qd6} />
                        <Picker.Item label={`7x de R$ ${qd7}`} value={'7x de '+qd7} />
                        <Picker.Item label={`8x de R$ ${qd8}`} value={'8x de '+qd8} />
                        <Picker.Item label={`9x de R$ ${qd9}`} value={'9x de '+qd9} />
                        <Picker.Item label={`10x de R$ ${qd10}`} value={'10x de '+qd10} />
                        <Picker.Item label={`11x de R$ ${qd11}`} value={'11x de '+qd11} />
                        <Picker.Item label={`12x de R$ ${qd12}`} value={'12x de '+qd12} />
                    </Picker>
                    </BoxModalInstallments>

                    <ButtonActionInstallments 
                    activeOpacity={0.8}
                    onPress={actionCloseModalInstallments}
                    >
                    <TitleButtonInstallments>Concluir</TitleButtonInstallments>
                    </ButtonActionInstallments>

                </BodyModalInstallments>
                            
                </ModalArea>
            </Modal>

            <Modal
                visible={modalAnexos}
                animationType="slide"
                transparent={true}
                onRequestClose={()=>setModalAnexos(false)}
            >
                <ModalArea>
                    <BodyModalAnexos>

                    <HeaderModalAnexo>

                        <AreaTitle>
                        <TitleModalAnexos>Adicinar uma anexo</TitleModalAnexos>
                        </AreaTitle>

                        <AreaButtonClose>

                        <ButtonClose onPress={() => setModalAnexos(false)}
                            activeOpacity={0.8}
                        >
                            <AntDesign name="close" color="#fff" size={20} />
                        </ButtonClose>

                        </AreaButtonClose>

                    </HeaderModalAnexo>

                    <BodyButton>

                        <ButtonCamera onPress={openPicker}
                        activeOpacity={0.8}
                        >
                            <ButtonCameraTitle>Tirar foto</ButtonCameraTitle>
                        </ButtonCamera>

                        <ButtonLauchCamera onPress={openPickerLibrary}
                        activeOpacity={0.8}
                        >
                            <ButtonLauchCameraTitle>Foto da galeria</ButtonLauchCameraTitle>
                        </ButtonLauchCamera>

                    </BodyButton>
                    
                    </BodyModalAnexos>      
                </ModalArea>
            </Modal>
        
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalTags}
                onRequestClose={()=>setModalTags(false)}
            >
                <ModalArea>
                    <BodyModalTags>

                    <AreaTitleModal>
                        <TitleModal>Selecione uma tag</TitleModal>
                    </AreaTitleModal>

                    <ListTags
                        data={tagsFull}
                        renderItem={({item}) => 
                        <ListTagsFull
                            data={item} 
                            onAction={(id) => getTagsId(id)}                       
                        />} 
                        keyExtractor={item => item.id}
                    /> 

                    </BodyModalTags>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalMetaNotification}
                onRequestClose={() => setModalMetaNotification(false)}
            >
                <ModalAreaMeta>

                <BodyModalNotification>

                    <AreaTitleModalNotification>
                        <TitleModalNotification>Notificação meta</TitleModalNotification>
                    </AreaTitleModalNotification>

                    <AreaModalNotificationDesc>
                        <DescModalNotification>Ops! Cuidado com sua meta para a</DescModalNotification>
                        <DescModalNotification style={{ marginTop: 7 }}>{infoMetas.name}!</DescModalNotification>
                    </AreaModalNotificationDesc>

                    <AreaModalNotificationCategory>
                        <DescCategoryModalNotification style={{ color: infoMetas.color }}>{infoMetas.name}!</DescCategoryModalNotification>
                        <DescModalNotification style={{ marginRight: 40 }}>{formatNumber(infoMetas.porcent)}%</DescModalNotification>
                    </AreaModalNotificationCategory>

                    <AreaModalNotificationInfo>

                        <AreaModalNotificationInfoRow>
                            <AreaModalNotificationInfoText>Período</AreaModalNotificationInfoText>
                            <AreaModalNotificationInfoText>{infoMetas.month}/{infoMetas.year}</AreaModalNotificationInfoText>
                        </AreaModalNotificationInfoRow>

                        <AreaModalNotificationInfoRow>
                            <AreaModalNotificationInfoText>Valor da meta</AreaModalNotificationInfoText>
                            <AreaModalNotificationInfoText>R$ {formatNumber(infoMetas.value)}</AreaModalNotificationInfoText>
                        </AreaModalNotificationInfoRow>

                        <AreaModalNotificationInfoRow>
                            <AreaModalNotificationInfoText>Valor gasto</AreaModalNotificationInfoText>
                            <AreaModalNotificationInfoText>R$ {formatNumber(infoMetas.used_value)}</AreaModalNotificationInfoText>
                        </AreaModalNotificationInfoRow>

                        <AreaModalNotificationButton>

                        <ButtonModalNotification activeOpacity={0.8} onPress={() => {
                            createDb(1)
                            setModalMetaNotification(false);
                        }}>
                            <ButtonTextModalNotification>Concluir</ButtonTextModalNotification>
                        </ButtonModalNotification> 

                        </AreaModalNotificationButton>      

                        <AreaModalNotificationButton style={{ marginBottom: 20 }}>

                            <ButtonCancelModalNotification activeOpacity={0.8} onPress={() => {
                            createDb(2);
                            setModalMetaNotification(false);
                            }} >
                                <ButtonCancelTextModalNotification>Cancelar alerta referente a essa meta</ButtonCancelTextModalNotification>
                            </ButtonCancelModalNotification>

                        </AreaModalNotificationButton>

                    </AreaModalNotificationInfo>

                </BodyModalNotification>
                </ModalAreaMeta>
            </Modal>
        </Container>
    )
}

export default ScreenSetDebit;