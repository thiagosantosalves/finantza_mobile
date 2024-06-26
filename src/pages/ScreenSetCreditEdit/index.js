import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { WToast } from 'react-native-smart-tip';

import ButtonHeadDelete from '../../components/ButtonHeadDelete';
import ListBankFull from '../../components/ListBankFull';
import ListCategoryRcFull from '../../components/ListCategoryRcFull';
import PatternInput from '../../components/PatternInput';
import ListTagsFull from '../../components/ListTagsFull';

import { listIconAccount } from '../../utils/listIconAccount';
import { listIconRc } from '../../utils/listIconRc';
import formatNumber from '../../utils/formatNumber';
import transformNumber from '../../utils/transformNumber';
import formatDateMonth from '../../utils/formatDateMonth';

import api from '../../services/api';

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
  ModalAreaIsInstalmentsEdit,
  BodyModalIsInstalmentsEdit,
  AreaTitleModalIsInstalmentsEdit,
  TitleModalIsInstalmentsEdit,
  AreaModalButtonIsInstalmentsEdit,
  ButtonIsInstalmentsEdit,
  ButtonIsInstalmentsCancel,
  ButtonTextIsInstalmentsEdit,
  AreaModalNotificationDesc,
  DescModalNotification,
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

const ScreenCreditEdit = ({ route, navigation }) => {

  const [description, setDescription] = useState(route.params.data.description);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [category, setCategory] = useState('bankFull');
  const [categorySelect, setCategorySelect] = useState(route.params.data.rc_category);
  const [idIconCategory, setIconCategory] = useState(null);
  const [bankFull, setBankFull] = useState({});
  const [bank, setBank] = useState(route.params.data.account);
  const [idIconBank, setIdIconBank] = useState(null);
  const [isSwitch, setIsSwitch] = useState(false);
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
  const [anexoPhoto, setAnexoPhoto] = useState(null);
  const [typePhoto, setTypePhoto] = useState(null);
  const [colorButtonAdd, setColorButtonAdd] = useState(false);
  const [tagsFull, setTagsFull] = useState(null);
  const [tag, setTag] = useState(route.params.data.tags);
  const [colorButtonTags, setColorButtonTags] = useState(false);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalBank, setModalBank] = useState(false);
  const [modalAnexos, setModalAnexos] = useState(false);
  const [modalTags, setModalTags] = useState(false);
  const [response, setResponse] = useState(route.params.data);
  const [attachment, setAttachment] = useState(route.params.data.attachment_img);
  const [installmentText, setInstallmentText] = useState('');
  const [isInstalmentsEdit, setIsInstalmentsEdit] = useState(false);
  const [instalmentsEditModal, setInstalmentsEditModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalOutherDelete, setModalOutherDelete] = useState(false);

  const getRcCategory = async () => {

    try {
      const res = await api.get('rccategory');

      const respoFilter =res.data.sort((x, y) => {
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

  const getTags = async () => {

    try {
      const tags = await api.get('tags');
      setTagsFull(tags.data);
    } catch (error) {
      console.log(error);
    }

  }

  const getIcon = () => {
    const idIconCategory = listIconRc.filter(e => e.id === route.params.data.rc_category.id_icon);
    const idIconBank = listIconAccount.filter(e => e.id === Number(route.params.data.account.type_id));
    
    setIconCategory(idIconCategory[0].url);
    setIdIconBank(idIconBank[0].url);
  }

  useEffect(() => {
    getRcCategory();
    getBank();
    getTags();
    actionDayIntial();
    getIcon();
  }, []);

  const handleCategoryId = async (id) => {
    
    const category = await api.get(`rccategory/${id}`);
    const idIcon = listIconRc.filter(e => e.id === category.data.id_icon);

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
    let sum = valor / qd;
    return sum.toFixed(2);
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
    setQdValue(sum)

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

  const updateDb =  async () => {

    const value = route.params.value; 
    let valueP = 0;
    let qdP = '';
    let id_img = null;
    let tagIsTrue = false;
    let tagId = null;
    let idFixed = null;
    let itWasInstallments = route.params.data.instalments_release_id ? true : false;
    let instalmentsData = null;

    if(route.params.data.installments) {

      if(!isInstalmentsEdit) {

        let text = route.params.data.instalments_text;
        text = '('+text+')';

        setInstallmentText(text);
        setIsInstalmentsEdit(true);
        setInstalmentsEditModal(true);
        return false;
      } else {
        let id = route.params.data.instalments_release_id;
        instalmentsData = await api.get(`instalmentsIdReleases/${id}`);
        await api.delete(`instalmentsReleases/${id}`);
      }
    }

    if(route.params.data.fixo) {
      await api.delete(`fixedrelease/${route.params.data.id_fixed_release}`);
    }

    if(categorySelect && description && bank) {
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
          setAttachment(true);
        } catch (error) {
          console.log(error);
        }
      }
  
      if(tag) {
        tagIsTrue = true;
        tagId = tag.id
      }

      let date = dateFinal.split(' ');
      let day = date[0];
      let month = date[1];
      let year = date[2];

      if(fixed) {

        const infoFixedRelease = {
          day: day,
          description,
          value: value,
          rc_category_id: categorySelect.id,
          dp_category_id: null,
          account_id: bank.id,
          card_credit_id: null,
          type: "1",
          paying_account_name: bank.name,
          meta_id: null,
          meta: null
        }

        try {
          let fixedRelease = await api.post('fixedrelease', infoFixedRelease);
          idFixed = fixedRelease.data.id;
        } catch (error) {
          console.log(error)
        }
      
      }
      
      let newInstallmentInfo = null;
      const installmentText = "1"+'/'+qdP;

      if(installments) {
           
        if(instalmentsData.data.remaining_amount > 1) {
          console.log('Verificar função quando for alterar na segunda parcela em diante!')
        } else {

          let instalmentsInfo = {
            day: day,
            description,
            value:  valueP,
            rc_category_id: categorySelect.id,
            dp_category_id: null,
            account_id: bank.id,
            card_credit_id: null,
            type: 1,
            paying_account_name: bank.name,
            amount_instalemts: qdP,
            remaining_amount: 1,
            instalments_text: installmentText
          }

          newInstallmentInfo = await api.post('instalmentsReleases', instalmentsInfo);

        }
      }
      
      const newReleases = {
        description,
        value: value,
        rc_category_id: categorySelect.id,
        dp_category_id: null,
        type_payer: isSwitch,
        account_id: bank.id,
        account_origin: null,
        account_destiny: null,
        card_credit_id: null,
        day: day,
        month: month,
        year: year,
        fixo: fixed,
        installments: installments,
        instalments_release_id: newInstallmentInfo.data.id,
        value_installments: valueP,
        qd_installments: qdP - 1,
        attachment_img: attachment,
        attachment_img_id: id_img,
        tag: tagIsTrue,
        tag_id: tagId,
        paying_account_name: bank.name,
        id_fixed_release: idFixed
      }

      try {

        await api.put(`releases/${response.id}`, newReleases);

        let previousAccount = await api.get(`account/${route.params.data.account.id}`);

        if(route.params.data.installments) {
          let sumValueInstallments = Number(previousAccount.data.value) - Number(route.params.data.value_installments);
          await api.put(`account/${route.params.data.account.id}`, { value: sumValueInstallments }); 

        } else {
          let sumPreviousAccount = Number(previousAccount.data.value) - Number(route.params.data.value);
          await api.put(`account/${route.params.data.account.id}`, { value: sumPreviousAccount });
        }

        let sum = installments ? valueP : value

        const account = await api.get(`account/${bank.id}`);
        sum = Number(sum) + Number(account.data.value);

        try {
          await api.put(`account/${account.data.id}`, { value: sum });
        } catch (error) {
          console.log(error)
        }
     
        navigation.navigate('TabRoutes', {
          screen: 'Home'
        });

      } catch (error) {
        console.log(error);
      }

    } else {
      toatsError();
    }
  }

  const deleteEntrance = async (params) => {

    let id = route.params.data.id;

    //Fixo
    if(params === 1) {
      await api.delete(`fixedrelease/${route.params.data.id_fixed_release}`);
    }

    //Parcelado atual
    if(params === 0 && route.params.data.installments) {

      console.log('parcela atual');
      let id = route.params.data.instalments_release_id;
      await api.delete(`instalmentsReceitaRelease/${id}-${route.params.data.id}-1`);

      setModalDelete(false);
      setModalOutherDelete(false);
  
      navigation.navigate('TabRoutes', {
        screen: 'Home'
      });

      return false;
    }

    //Parcelado
    if(params === 2) {

      console.log('deletar todas parcela');
      let id =route.params.data.instalments_release_id;
      await api.delete(`instalmentsReleases/${id}-1`);

      setModalDelete(false);
      setModalOutherDelete(false);

      navigation.navigate('TabRoutes', {
        screen: 'Home'
      });
 
      return false;
    }

    console.log('chegou aqui');

    let sum = route.params.data.installments ? route.params.data.value_installments : route.params.data.value;

    const account = await api.get(`account/${route.params.data.account.id}`);
    sum = Number(sum) - Number(account.data.value);
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

        <Section>

          <TitleSection>Conta</TitleSection>

          {bank ? (
            <AreaIconBank activeOpacity={0.8} onPress={() => setModalBank(true)}>

              <IconBank style={{backgroundColor: bank.color_hex}}>
                <IconUrl source={idIconBank} />
              </IconBank>
              <TitleIconBank>{bank.name}</TitleIconBank>
            
            </AreaIconBank>
          ) : (

            <AreaIconBank activeOpacity={0.8} onPress={() => setModalBank(true)}>

              <IconPattern source={require('../../assets/card_img/icontrasejado.png')} />
              <TitleIconCategory>Selecione uma conta</TitleIconCategory>

            </AreaIconBank>
          )}

        </Section>

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
                  <ListCategoryRcFull
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
        visible={instalmentsEditModal}
        onRequestClose={() => setInstalmentsEditModal(false)}
      >
        <ModalAreaIsInstalmentsEdit>
          <BodyModalIsInstalmentsEdit>

              <AreaTitleModalIsInstalmentsEdit>
                <TitleModalIsInstalmentsEdit>Notificação</TitleModalIsInstalmentsEdit>
              </AreaTitleModalIsInstalmentsEdit>

              <AreaModalNotificationDesc>
                <DescModalNotification style={{ fontSize: 11, marginRight: 10 }}>Esta é uma despesa parcelada no banco {installmentText}. A alteração irá</DescModalNotification>
                <DescModalNotification style={{ marginTop: 7, fontSize: 11 }}>afetar todos os lançamentos relacionados. Deseja continuar?</DescModalNotification>
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

export default ScreenCreditEdit;