import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Modal, Switch } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addMonths } from 'date-fns';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import formatNumber from '../../utils/formatNumber';
import transformNumber from '../../utils/transformNumber';
import PatternInput from '../../components/PatternInput';
import { institution } from '../../utils/institution';

import formatDateMonth from '../../utils/formatDateMonth';

import ButtonHeadDelete from '../../components/ButtonHeadDelete';
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
    ModalAreaIsInstalmentsEdit,
    BodyModalIsInstalmentsEdit,
    AreaTitleModalIsInstalmentsEdit,
    TitleModalIsInstalmentsEdit,
    AreaModalButtonIsInstalmentsEdit,
    ButtonIsInstalmentsEdit,
    ButtonIsInstalmentsCancel,
    ButtonTextIsInstalmentsEdit,
    ModalAreaDelete,
    BodyModalDelete,
    AreaTitleModalDelete,
    TitleModalDelete,
    AreaModalButtonDelete,
    ButtonEntraceDelete,
    ButtonEntraceDeleteCancel,
    ButtonTextDelete,
    AreaModalTextDelete,
    DeleteModalText,
    AreaModalOutherButtonDelete
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
    const [qdValue, setQdValue] = useState(null);
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
    const [installmentText, setInstallmentText] = useState('');
    const [isInstalmentsEdit, setIsInstalmentsEdit] = useState(false);
    const [instalmentsEditModal, setInstalmentsEditModal] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalOutherDelete, setModalOutherDelete] = useState(false);

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

        if(route.params.data.card_credit) {
            let resEdit = await api.get(`cardcredit/${route.params.data.card_credit.id}`);
            setCardCreditSelect(resEdit.data);
        }
        
        setCardCreditFull(respoFilter);
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
        setIsFixed(false);
    }

    const handleCardId = async (id) => {
        const res = await api(`cardcredit/${id}`);
        const cardIcon = institution.filter(e => e.id === res.data.id_institution);
        
        setCardCreditSelect(res.data);
        setCardCreditIcon(cardIcon[0]);
        setModalCard(false);
        setIsFixed(true);
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

            let valor = route.params.value;
            let sum = valor / 2;
            
            setQdValue(sum);
        }

        setModalInstallments(false);
    }

    const actionPickerInstallments = (itemValue, itemIndex) => {
        let valor = route.params.value;
        let qd = itemIndex + 2
        let sum = valor / qd;
        setQdValue(sum);
        
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

    const updateDb =  async (number) => {

        const value = route.params.value; 

        let newFixed = false;

        if(isFixed) {
          newFixed = false
        }
    
        if(fixed && isFixed === false) {
          newFixed = true;
        }
    
        let valueP = 0;
        let qdP = '';
        let id_img = null;
        let attachment = false;
        let tagIsTrue = false;
        let tagId = null;
        let bankId = null;
        let cardId = null;
        let payingName = '';
        let idFixed = null;

        let dateCurrent = dateFinal.split(' ');
        let monthCurrent = dateCurrent[1];
        let yearCurrent = dateCurrent[2];

        let previousValue = route.params.data.value;
        let previousMonth = route.params.data.month;
        let previousYear = route.params.data.year;
        let itWasBank = route.params.data.card_credit ? false : true;
        let itWasCard = route.params.data.card_credit ? true : false;
        let itWasInstallments = route.params.data.instalments_release_id ? true : false;
        let itWasGoal = route.params.data.meta ? true : false;
        let itFixo = route.params.data.fixo;

        if(itFixo) {
            await api.delete(`fixedrelease/${route.params.data.id_fixed_release}`);
        } 

        if(itWasInstallments && itWasCard) { 
           
            if(!isInstalmentsEdit) {

                let text = route.params.data.instalments_text;
                text = 'cartão ('+text+')';

                setInstallmentText(text);
                setIsInstalmentsEdit(true);
                setInstalmentsEditModal(true);
                return false;
            } else {

                let releaseInstalments = await api.get(`releasesInstalmentsFilter/${route.params.data.instalments_release_id}`);

                releaseInstalments = releaseInstalments.data.map(e => {
                    let date = e.split('-')
                    return date;
                });

                let statusCard = [];

                for (let index = 0; index < releaseInstalments.length; index++) {
                    const element = releaseInstalments[index];
                    let dataCardRelease = await api.get(`cardcreditreleasefilter/${route.params.data.card_credit.id}-${element[1]}-${element[2]}`);
                    dataCardRelease = dataCardRelease.data.filter(e => e.statuscard != 1);
                    
                    if(dataCardRelease.length > 0) {
                        statusCard.push(dataCardRelease);
                    }
                }

                if(statusCard.length > 0) {
                    setInstalmentsEditModal(false);
                    toatsErrorCardReleases(`O cartão já foi pago ou está vencido/fechado em uma das datas informadas para o parcelamento desse lançamento.`);
                    return false;
                }

                const card = await api.get(`cardcredit/${route.params.data.card_credit.id}`);

                let valueLimit = Number(card.data.invoice_amount) - Number(route.params.data.value);

                await api.put(`cardcredit/${route.params.data.card_credit.id}`, {
                    invoice_amount: valueLimit
                });
                
                let listCardRelease = [];

                for (let index = 0; index < releaseInstalments.length; index++) {
                    const element = releaseInstalments[index];
                    let dataCardRelease = await api.get(`cardcreditreleasefilter/${route.params.data.card_credit.id}-${element[1]}-${element[2]}`);
                    listCardRelease.push(...dataCardRelease.data);
                }   

                for (let index = 0; index < listCardRelease.length; index++) {
                    const element = listCardRelease[index];

                    let instalmentsReleaseValue =  Number(element.invoice_amount) - Number(route.params.data.value_installments);
                    instalmentsReleaseValue = instalmentsReleaseValue.toFixed(2);

                    await api.put(`cardcreditreleases/${element.id}`, { invoice_amount: instalmentsReleaseValue });
                }

                for (let index = 0; index < releaseInstalments.length; index++) {
                    const element = releaseInstalments[index];
                    await api.delete(`releases/${element[0]}`);
                }

                setInstalmentsEditModal(false);
            }
        }

        if(itWasCard && itWasInstallments === false) {

            let previousCardId = route.params.data.card_credit.id;
            let previousCardName = route.params.data.card_credit.name
            let previousCardRelease = await api.get(`cardcreditreleasefilter/${previousCardId}-${previousMonth}-${previousYear}`);

            if(previousCardRelease.data[0].statuscard === 2) {
                toatsErrorCardReleases(`O cartão "${previousCardName}" esta fechado, não podera mais fazer a edição desse lançamento de cartão!`);
                return false;
            }

            if(previousCardRelease.data[0].statuscard === 3) {
                toatsErrorCardReleases(`O cartão "${previousCardName}" esta vencido para essa data, não podera mais fazer a edição desse lançamento de cartão!`);
                return false;
            }

            if(previousCardRelease.data[0].statuscard === 4) {
                toatsErrorCardReleases(`O lançamento já consta pago na fatura do cartão "${previousCardName}", não podera mais fazer a edição desse lançamento de cartão!`);
                return false;
            }

            if(route.params.data.month != monthCurrent || route.params.data.year != yearCurrent) {

                let currentCardRelease = await api.get(`cardcreditreleasefilter/${cardCreditSelect.id}-${monthCurrent}-${yearCurrent}`);
                
                if(currentCardRelease.data.length > 0) {
                    if(currentCardRelease.data[0].statuscard === 2) {
                        toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta fechado, não podera mais fazer a edição desse lançamento de cartão!`);
                        return false;
                    }
        
                    if(currentCardRelease.data[0].statuscard === 3) {
                        toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta vencido para essa data, não podera mais fazer a edição desse lançamento de cartão!`);
                        return false;
                    }
        
                    if(currentCardRelease.data[0].statuscard === 4) {
                        toatsErrorCardReleases(`O lançamento já consta pago na fatura do cartão "${cardCreditSelect.name}", não podera mais fazer a edição desse lançamento de cartão!`);
                        return false;
                    }
                }

            }

            const card = await api.get(`cardcredit/${cardCreditSelect.id}`);
            let valueLimit = Number(card.data.limit_card) - Number(card.data.invoice_amount);

            if(Number(valueLimit) >= Number(value)) { 


                const previousCard = await api.get(`cardcredit/${previousCardId}`);
                let previousCardValue =  Number(previousCard.data.invoice_amount) - Number(previousValue);

                await api.put(`cardcredit/${previousCardId}`, {
                    invoice_amount: previousCardValue
                });   

                let previousCardReleaseValue =  Number(previousCardRelease.data[0].invoice_amount) - Number(previousValue);
                
                await api.put(`cardcreditreleases/${previousCardRelease.data[0].id}`, { invoice_amount: previousCardReleaseValue });
            } else {
                toatsCardLimit();
            } 
        }

        if(itWasBank && itWasInstallments) {
            
            
            if(!isInstalmentsEdit) {

                let text = route.params.data.instalments_text;
                text = 'banco ('+text+')';
        
                setInstallmentText(text);
                setIsInstalmentsEdit(true);
                setInstalmentsEditModal(true);
                return false;
            } else {
                let id = route.params.data.instalments_release_id;
                await api.delete(`instalmentsReleases/${id}`);
                setInstalmentsEditModal(false);
            }
              
        }

        if(itWasBank) {

            let value = itWasInstallments ? route.params.data.value_installments : previousValue;
            let previousAccount = await api.get(`account/${route.params.data.account.id}`);
            let sumPreviousAccount = Number(previousAccount.data.value) + Number(value); 
            
            await api.put(`account/${route.params.data.account.id}`, { value: sumPreviousAccount });  
        }

        if(itWasGoal) {

            let isMetaEdit = await api.get(`metafilter/${route.params.data.meta_id}`);
            isMetaEdit = isMetaEdit.data;

            let sumMetaEdit = Number(isMetaEdit[0].used_value) - Number(previousValue);

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
 
        if(categorySelect && description) { 
            
            if(qdInstallments.length > 0) {
                valueP = qdInstallments.split(' ');
                qdP = valueP[0].split('x');
                qdP = Number(qdP[0]);
                valueP = qdValue;
            } else {
                if(itWasInstallments) {
                    const qd = route.params.data.instalments_text.split('/');
                    qdP = Number(qd[1]);
                    valueP = route.params.data.value_installments;

                    if(route.params.data.value != value) {
                        valueP = value / qdP;
                    } 
                }
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
                attachment = true;
              } catch (error) {
                console.log(error);
              }
            }
        
            if(tag) {
              tagIsTrue = true;
              tagId = tag.id
            }
      
            if(!isSwitch) {
              bankId = bank.id;
              payingName = bank.name;
            }
      
            if(isSwitch) {
                cardId = cardCreditSelect.id;
                bankId = cardCreditSelect.account.id;
                payingName = cardCreditSelect.name;
            }

            let date = dateFinal.split(' ');
            let day = date[0];
            let month = date[1];
            let year = date[2];
      
            const resMeta = await api.get(`meta/${month}&${year}`);
            let isMeta = resMeta.data.filter(e => e.category.id === categorySelect.id);
      
            let meta_id = null;
            let metaIsTrue = false; 
      
            if(isMeta.length > 0) {
              meta_id = isMeta[0].id;
              metaIsTrue = true;
            }
            
            if(newFixed) {
      
                const infoFixedRelease = {
                    day: day,
                    description,
                    value: value,
                    rc_category_id: null,
                    dp_category_id: categorySelect.id,
                    account_id: bank.id,
                    card_credit_id: cardId,
                    type: "2",
                    paying_account_name: payingName,
                    meta_id: meta_id,
                    meta: metaIsTrue
                }
      
                try {
                    let fixedRelease = await api.post('fixedrelease', infoFixedRelease);
                    idFixed = fixedRelease.data.id;
                } catch (error) {
                    console.log(error)
                } 
            }

            try {

                if(isMeta.length > 0) {
      
                    let newValue = installments ? valueP : value;
        
                    let usedValue = Number(newValue) + Number(isMeta[0].used_value);
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
                        await api.put(`metareleases/${isMeta[0].id}`, {notification: false});
                        } catch (error) {
                            console.log(error)
                        }
                    }
      
                    try {
                        
                    await api.put(`metareleases/${isMeta[0].id}`, {
                        used_value: usedValue,
                        porcent: newPorcent.toFixed(2),
                        status: status
                    });
        
                    } catch (error) {
                        console.log(error);
                    } 
                }

                let newInstallmentInfoId = null;
                const installmentText = qdP - 1+'/'+qdP;
                
                if(bankId && !isSwitch) { 

                    if(installments) {

                        let instalmentsInfo = {
                            day: day,
                            description,
                            value:  valueP,
                            rc_category_id: null,
                            dp_category_id: categorySelect.id,
                            account_id: bankId,
                            card_credit_id: cardId,
                            type: 2,
                            paying_account_name: payingName,
                            amount_instalemts: qdP,
                            remaining_amount: qdP - 1,
                            instalments_text: installmentText
                        }

                        newInstallmentInfoId = await api.post('instalmentsReleases', instalmentsInfo);
                        newInstallmentInfoId = newInstallmentInfoId.data.id;
                    }


                    let sum = installments ? valueP : value;
                    const account = await api.get(`account/${bank.id}`);
                    sum =  Number(account.data.value) - Number(sum);
      
                    await api.put(`account/${account.data.id}`, { value: sum });
                    await api.put(`releases/${route.params.data.id}`, releases);

                    navigation.navigate('TabRoutes', {
                        screen: 'Home'
                    }); 
                } 

                const releases = {
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
                    fixo: newFixed,
                    installments: installments,
                    instalments_release_id: newInstallmentInfoId,
                    value_installments: valueP,
                    qd_installments: qdP - 1,
                    attachment_img: attachment,
                    attachment_img_id: id_img,
                    tag: tagIsTrue,
                    type: "2",
                    tag_id: tagId,
                    paying_account_name: payingName,
                    meta_id: meta_id,
                    meta: metaIsTrue,
                    instalments_text: installmentText
                }

                if(cardCreditSelect && isSwitch === true) {
                
                    const card = await api.get(`cardcredit/${cardCreditSelect.id}`);
                    let valueLimit = Number(card.data.limit_card) - Number(card.data.invoice_amount);
      
                    if(Number(valueLimit) >= Number(value)) {
      
                    
                        let resCardRelease = await api.get('cardcreditreleases');
                        let cardStatus2 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 2 && e.month === Number(month) && e.year === Number(year));
                        let cardStatus3 = resCardRelease.data.filter(e => e.id_card_credit === cardCreditSelect.id && e.statuscard === 3 && e.month === Number(month) && e.year === Number(year));
        
                        if(cardStatus2.length > 0) {
                            toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta fechado para essa data, troque a data do lançamento!`);
                            return false;
                        }
      
                        if(cardStatus3.length > 0) {
                            toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta vencido para essa data, troque a data do lançamento!`);
                            return false;
                        }
                        
                        let sum_limit = Number(card.data.invoice_amount) + Number(value);
      
                        resCardRelease = resCardRelease.data.filter(e => e.id_card_credit === Number(cardId) && e.month === Number(month) && e.year === Number(year));
                        let resCardReleasePay = resCardRelease.filter(e => e.statuscard === 4 && e.month === Number(month));
        
                        if(resCardReleasePay.length > 0) {
                            toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta pago para essa data, troque a data do lançamento!`);
                            return false;
                        }
      
                    if(installments) {

                        const date = new Date();
                        let dateCardRelease = [];
                        let isCard = 0;

                        for (let i = 0; i < qdP; i++) {
    
                            const resultDate = addMonths(date, i);
                            let month = resultDate.getMonth() + 1;
                            let year = resultDate.getFullYear();
      
                            dateCardRelease.push(month+'-'+year);
                        }

                        let installmentsRelease = await api.get('cardcreditreleases');

                        dateCardRelease.forEach(element => {
        
                            let date = element.split('-');
                            let res = installmentsRelease.data.filter(e => 
                            e.id_card_credit === cardCreditSelect.id 
                            && e.statuscard != 1                    
                            && e.month === Number(date[0])
                            && e.year === Number(date[1])
                            );
                            isCard = isCard + res.length;
                        });

                        if(isCard > 0) {
                            toatsErrorCardReleases(`O cartão "${cardCreditSelect.name}" esta vencido/fechado ou pago para essa data, troque a data do lançamento!`)
                        } else {
                      
                        let dateUpdate = [];
                        let dateCreate = [];
      
                        dateCardRelease.forEach((element, index )=> {
      
                          let date = element.split('-');
                          let res = installmentsRelease.data.filter(e => 
                            e.id_card_credit === cardCreditSelect.id 
                            && e.statuscard === 1                    
                            && e.month === Number(date[0])
                            && e.year === Number(date[1])
                          );
      
                          if(res.length > 0) {
                            dateUpdate.push(element)
                          } else {
                            dateCreate.push(element);
                          }
                        });

                        if(dateUpdate.length > 0) {

                            for (let i = 0; i < dateUpdate.length; i++) { 
      
                                try {
        
                                    let date = dateUpdate[i].split('-');
        
                                    let resUpdate = installmentsRelease.data.filter(e => 
                                        e.id_card_credit === cardCreditSelect.id 
                                        && e.month === Number(date[0])
                                        && e.year === Number(date[1])
                                    );
        
                                    let sumCardReleases = Number(resUpdate[0].invoice_amount) + Number(valueP);
                                    await api.put(`cardcreditreleases/${resUpdate[0].id}`, { invoice_amount: sumCardReleases });
                              
                                } catch (error) {
                                    console.log(error);
                                } 
                            }
                        }
                        
                        if(dateCreate.length > 0) {
       
                            let resCreate = dateCreate.map(element => {
                                let date = element.split('-');

                                let res = {
                                    statuscard: 1,
                                    month: date[0],
                                    year: date[1],
                                    pay: false,
                                    limit_card: cardCreditSelect.limit_card,
                                    invoice_amount: valueP,
                                    closes_day: cardCreditSelect.closes_day,
                                    wins_day: cardCreditSelect.wins_day,
                                    id_card_credit: cardCreditSelect.id,
                                    id_account: cardCreditSelect.account.id
                                }
      
                                return res;
      
                            });

                            try {
                                await api.post('cardcreditreleasesbulkcreate', resCreate);
                            } catch (error) {
                                console.log(error)
                            } 
                        }

                        try {
                            await api.put(`cardcredit/${card.data.id}`, { invoice_amount: sum_limit });
                        } catch (error) {
                          console.log(error)
                        }
      
                        let dateRelease = dateUpdate.concat(dateCreate);
      
                        const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
                        const uniqId = random(1000, 50000000000);
      
                        for (let i = 0; i < dateRelease.length; i++) { 
      
                          let date = dateRelease[i].split('-');
                          const qd = i + 1;
                          const installmentText = qd+'/'+qdP;
      
                          const installmentsReleases = {
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
                            month: date[0],
                            year: date[1],
                            fixo: newFixed,
                            installments: installments,
                            value_installments: valueP,
                            qd_installments: qdP - 1,
                            attachment_img: attachment,
                            attachment_img_id: id_img,
                            tag: tagIsTrue,
                            type: "2",
                            tag_id: tagId,
                            paying_account_name: payingName,
                            meta_id: meta_id,
                            meta: metaIsTrue,
                            instalments_release_id: uniqId,
                            instalments_text: installmentText
                          }

                          try {
                            await api.post('releases', installmentsReleases);
                          } catch (error) {
                            console.log(error)
                          }
      
                        }
                            navigation.navigate('TabRoutes', {
                            screen: 'Home'
                            });
                        } 
                
                    } else {
                    
                        if(resCardRelease.length > 0) {
      
                            let sumCardReleases = Number(resCardRelease[0].invoice_amount) + Number(value);
                            sumCardReleases = sumCardReleases.toFixed(2);
        
                            try {
                                await api.put(`cardcreditreleases/${resCardRelease[0].id}`, { invoice_amount: sumCardReleases });
                            } catch (error) {
                                console.log(error)
                            }
                        
                        } else {

                            const createReleaseCard = await api.get(`cardcredit/${cardCreditSelect.id}`);
        
                            const cardInfoReleases = {
                                statuscard: 1,
                                month: month,
                                year: year,
                                pay: false,
                                limit_card: createReleaseCard.data.limit_card,
                                invoice_amount: value,
                                closes_day: createReleaseCard.data.closes_day,
                                wins_day: createReleaseCard.data.wins_day,
                                id_card_credit: createReleaseCard.data.id,
                                id_account: bankId
                            }

                            try {
                                await api.post('cardcreditreleases', cardInfoReleases);
                            } catch (error) {
                                console.log(error)
                            }
                        }
        
                        await api.put(`cardcredit/${card.data.id}`, { invoice_amount: sum_limit });
                        await api.put(`releases/${route.params.data.id}`, releases);
                       
                        navigation.navigate('TabRoutes', {
                            screen: 'Home'
                        });
                    }

                  } else {
                    toatsCardLimit();
                  }
                } 
              } catch (error) {
                console.log(error); 
            } 
        } else {
            toatsError();
        }
    }

    const deleteEntrance = async (params) => {

        let id = route.params.data.id;
        let sum = route.params.data.installments ? route.params.data.value_installments : route.params.data.value;

        //Fixo
        if(params === 1) {
            await api.delete(`fixedrelease/${route.params.data.id_fixed_release}`);
        }

        //Meta
        if(route.params.data.meta) {

            let id = route.params.data.meta_id;
            const meta = await api.get(`metafilter/${id}`);

            let usedValue = sum - meta.data[0].used_value;
            usedValue = usedValue;

            let newPorcent = usedValue * 100;
            newPorcent =  Number(newPorcent) / Number(meta.data[0].value);  
            
            let status = false;

            if(newPorcent >= 100 ) {
                newPorcent = 100;
                status = true;
            } 

            await api.put(`metareleases/${id}`, {
                used_value: usedValue,
                porcent: newPorcent,
                status: status
            });
        }

         //Meta full
        if(params === 2) {
            await api.put(`releasemetaupdate/${route.params.data.id}`);
        }

        if(route.params.data.card_credit) {
            let month = route.params.data.month;
            let year = route.params.data.year;

            let dataCardRelease = await api.get(`cardcreditreleasefilter/${route.params.data.card_credit.id}-${month}-${year}`);

            if(dataCardRelease.data[0].statuscard != 1) {

                setModalDelete(false);
                setModalOutherDelete(false);
                toatsErrorCardReleases('O cartão já foi pago ou está vencido, não será possível deletar esse lançamento.')

                return false
            }

            let card = cardCreditFull.filter(e => e.id === route.params.data.card_credit.id);

            let sumCard = sum - card[0].invoice_amount;
            let sumCardRelease = sum -  dataCardRelease.data[0].invoice_amount;
            sumCardRelease = Math.abs(sumCardRelease);
            sumCard = Math.abs(sumCard);

            if(params === 0 && route.params.data.installments === false) {

                await api.put(`cardcredit/${card[0].id}`, {
                    invoice_amount: sumCard.toFixed(2)
                });

                await api.put(`cardcreditreleases/${dataCardRelease.data[0].id}`, {
                    invoice_amount: sumCardRelease.toFixed(2)
                });
            }

            if(params === 0 && route.params.data.installments) {

                await api.put(`cardcredit/${card[0].id}`, {
                    invoice_amount: sumCard.toFixed(2)
                });

                await api.put(`cardcreditreleases/${dataCardRelease.data[0].id}`, {
                    invoice_amount: sumCardRelease.toFixed(2)
                });  
             
                await api.put(`releaseInstallmentAdjustment/${id},${route.params.data.instalments_release_id}`);
            }

            if(params === 2 && route.params.data.installments) {
                
                //Apagar todos os releases
                let resDelete = await api.delete(`releaseInstallmentAdjustment/${route.params.data.instalments_release_id}`);

                if(resDelete.data.status === 1) {
                    setModalDelete(false);
                    setModalOutherDelete(false);
                    toatsErrorCardReleases('O cartão já foi pago ou está vencido, não será possível deletar esse lançamento.')
                }

                if(resDelete.data.status === 0) {
                    setModalDelete(false);
                    setModalOutherDelete(false);
                    navigation.navigate('TabRoutes', {
                        screen: 'Home'
                    });  
                }

                return false;
            }   

            await api.delete(`/releases/${id}`);

            setModalDelete(false);
            setModalOutherDelete(false);

            navigation.navigate('TabRoutes', {
                screen: 'Home'
            }); 
        
            return false;
        }

        //Parcelado atual sem cartão
        if(params === 0 && route.params.data.installments && route.params.data.card_credit === null) {

            let id = route.params.data.instalments_release_id;
            await api.delete(`instalmentsReceitaRelease/${id}-${route.params.data.id}-2`);

            setModalDelete(false);
            setModalOutherDelete(false);
  
            navigation.navigate('TabRoutes', {
                screen: 'Home'
            }); 
        
            return false;
        }

        //Parcelado sem cartão
        if(params === 2 && route.params.data.card_credit === null) {
            let id =route.params.data.instalments_release_id;
            await api.delete(`instalmentsReleases/${id}-2`);

            setModalDelete(false);
            setModalOutherDelete(false);

            navigation.navigate('TabRoutes', {
                screen: 'Home'
            });
        
            return false;
        } 
         
        const account = await api.get(`account/${route.params.data.account.id}`);
        sum = Number(sum) + Number(account.data.value);
        sum = Math.abs(sum);
  
        await api.put(`account/${account.data.id}`, { value: sum });
        await api.delete(`/releases/${id}`);
  
        setModalDelete(false);
        setModalOutherDelete(false);

        navigation.navigate('TabRoutes', {
            screen: 'Home'
        }); 

      }
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <ButtonHeadDelete 
              onPress={() => {
    
                if(route.params.data.fixo || route.params.data.installments) {
                  setModalOutherDelete(true);
                } else {
                  setModalDelete(true)
                }
          
              }}
            />
          )
        });
    }, [navigation]);

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
                            setIsFixed(false);
                        } else {
                            setIsSwitch(true);
                            setIsFixed(true);
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
                            setIsFixed(false);
                        } else {
                            setIsSwitch(true);
                            setIsFixed(true);
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

                    {isFixed ? (
                            <ButtonSelectPattern style={{ backgroundColor:'#C4C4C4'}}
                                activeOpacity={0.8}
                            >
                                <ButtonSelectPatternText>Fixo</ButtonSelectPatternText>
                            </ButtonSelectPattern>
                        )
                        :(  
                        <ButtonSelectPattern style={{ backgroundColor: fixed ? '#FF872C' : '#C4C4C4'}}
                            activeOpacity={0.8}
                            onPress={getFixed}
                        >
                            <ButtonSelectPatternText>Fixo</ButtonSelectPatternText>
                        </ButtonSelectPattern>
                    )}

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
                <ButtonCreate activeOpacity={0.8} onPress={() => updateDb()}>
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
                        <TitleModalAnexos>Adicinar um anexo</TitleModalAnexos>
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
                            updateDb(1)
                            setModalMetaNotification(false);
                        }}>
                            <ButtonTextModalNotification>Concluir</ButtonTextModalNotification>
                        </ButtonModalNotification> 

                        </AreaModalNotificationButton>      

                        <AreaModalNotificationButton style={{ marginBottom: 20 }}>

                            <ButtonCancelModalNotification activeOpacity={0.8} onPress={() => {
                            updateDb(2);
                            setModalMetaNotification(false);
                            }} >
                                <ButtonCancelTextModalNotification>Cancelar alerta referente a essa meta</ButtonCancelTextModalNotification>
                            </ButtonCancelModalNotification>

                        </AreaModalNotificationButton>

                    </AreaModalNotificationInfo>

                </BodyModalNotification>
                </ModalAreaMeta>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={instalmentsEditModal}
                onRequestClose={() => setInstalmentsEditModal(false)}
            >
                <ModalAreaIsInstalmentsEdit>

                    <BodyModalIsInstalmentsEdit>

                        <AreaTitleModalIsInstalmentsEdit>
                            <TitleModalIsInstalmentsEdit>Notificação</TitleModalIsInstalmentsEdit>
                        </AreaTitleModalIsInstalmentsEdit>

                        <AreaModalNotificationDesc>
                            <DescModalNotification style={{ fontSize: 11, marginRight: 10 }}>Esta é uma despesa parcelada no {installmentText}. A alteração irá afetar todos os lançamentos relacionados.</DescModalNotification>
                            <DescModalNotification style={{ marginTop: 7, fontSize: 11 }}>Deseja continuar?</DescModalNotification>
                        </AreaModalNotificationDesc>
                        
                        <AreaModalButtonIsInstalmentsEdit>

                            <ButtonIsInstalmentsCancel activeOpacity={0.8} onPress={() => {
                                setInstalmentsEditModal(false)
                                setTimeout(() => {
                                    navigation.navigate('Releases')
                                }, 300);
                               
                            }}>
                                <ButtonTextIsInstalmentsEdit style={{ color: '#E83F5B' }}>CANCELAR</ButtonTextIsInstalmentsEdit>
                            </ButtonIsInstalmentsCancel>

                            <ButtonIsInstalmentsEdit activeOpacity={0.8} onPress={() => updateDb()}>
                                <ButtonTextIsInstalmentsEdit>CONCLUIR</ButtonTextIsInstalmentsEdit>
                            </ButtonIsInstalmentsEdit>

                        </AreaModalButtonIsInstalmentsEdit>

                    </BodyModalIsInstalmentsEdit>

                </ModalAreaIsInstalmentsEdit>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalDelete}
                onRequestClose={() => setModalDelete(false)}
            >

                <ModalAreaDelete>
                    <BodyModalDelete>

                        <AreaTitleModalDelete>
                        <TitleModalDelete>Alerta</TitleModalDelete>
                        </AreaTitleModalDelete>

                        <AreaModalTextDelete>
                        <DeleteModalText>Deseja realmente apagar essa receita ?</DeleteModalText>
                        </AreaModalTextDelete>
                        
                        <AreaModalButtonDelete>

                        <ButtonEntraceDeleteCancel activeOpacity={0.8} onPress={() => {
                            setModalDelete(false)
                        }}>
                            <ButtonTextDelete style={{ color: '#E83F5B' }}>CANCELAR</ButtonTextDelete>
                        </ButtonEntraceDeleteCancel>

                        <ButtonEntraceDelete activeOpacity={0.8} onPress={() => deleteEntrance(0)}>
                            <ButtonTextDelete>DELETAR</ButtonTextDelete>
                        </ButtonEntraceDelete>

                        </AreaModalButtonDelete>

                    </BodyModalDelete>
                </ModalAreaDelete>  

            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalOutherDelete}
                onRequestClose={() => setModalOutherDelete(false)}
            >
                <ModalAreaDelete>
                <BodyModalDelete>
                    <AreaTitleModalDelete>
                    <TitleModalDelete>Alerta</TitleModalDelete>
                    </AreaTitleModalDelete>

                    <AreaModalTextDelete>
                    <DeleteModalText>Deseja realmente apagar essa receita ?</DeleteModalText>
                    </AreaModalTextDelete>

                    <AreaModalOutherButtonDelete>

                    <ButtonEntraceDelete style={{marginBottom: 10}} activeOpacity={0.8} onPress={() => deleteEntrance(0)}>
                        <ButtonTextDelete>somente esta</ButtonTextDelete>
                    </ButtonEntraceDelete>

                    {route.params.data.fixo && 
                        <ButtonEntraceDelete style={{marginTop: 10}} activeOpacity={0.8} onPress={() => deleteEntrance(1)}>
                            <ButtonTextDelete>próximos fixos</ButtonTextDelete>
                        </ButtonEntraceDelete>
                    }

                    {route.params.data.installments &&
                        <ButtonEntraceDelete style={{marginTop: 10, width: 150}} activeOpacity={0.8} onPress={() => deleteEntrance(2)}>
                            <ButtonTextDelete>todas as parcelas</ButtonTextDelete>
                        </ButtonEntraceDelete>
                    }

                    <ButtonEntraceDeleteCancel style={{marginTop: 10, marginBottom: 10}} activeOpacity={0.8} onPress={() => {
                        setModalOutherDelete(false);
                    }}>
                        <ButtonTextDelete style={{ color: '#E83F5B' }}>CANCELAR</ButtonTextDelete>
                    </ButtonEntraceDeleteCancel>

                    
                    </AreaModalOutherButtonDelete>
                </BodyModalDelete>

                </ModalAreaDelete>
            </Modal>
        </Container>
    )
}

export default ScreenSetDebit;