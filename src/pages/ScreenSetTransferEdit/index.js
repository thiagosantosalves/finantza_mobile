import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PatternInput from '../../components/PatternInput';
import ListBankFull from '../../components/ListBankFull';
import ListTagsFull from '../../components/ListTagsFull';
import { WToast } from 'react-native-smart-tip';

import formatNumber from '../../utils/formatNumber';
import formatDateMonth from '../../utils/formatDateMonth';

import { listIconAccount } from '../../utils/listIconAccount';

import api from '../../services/api';

import { 
  Container,
  Header,
  AreaValue,
  TextValue,
  AreaSection,
  Section,
  TitleSection,
  IconPattern,
  AreaIconBank,
  IconBank,
  IconUrl,
  TitleIconBank,
  TitleIconCategory,
  AreaDate,
  ButtonSelectPattern,
  ButtonSelectPatternText,
  AreaButton,
  ButtonCreate,
  ModalArea,
  BodyModalBank,
  AreaTitleModal,
  TitleModal,
  ListBank,
  TitleX,
  ButtonImageInfo,
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
  ButtonAnexoClose
} from './styles';

const ScreenSetCredit = ({ route, navigation }) => {

    const [response, setResponse] = useState({});

    const [description, setDescription] = useState(route.params.data.description);

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const [bankFull, setBankFull] = useState({});

    const [bankDestiny, setBankDestiny] = useState(route.params.resAccountDestiny[0]);
    const [idIconBankDestiny, setIdIconBankDestiny] = useState(null);

    const [bankOrigin, setBankOrigin] = useState(route.params.resAccountOrigen[0]);
    const [idIconBanOrigin, setIdIconBankOrigin] = useState(null);

    const [ativeButtonDateToday, setAtiveButtonDateToday] = useState(true);
    const [ativeButtonDateYesterday, setAtiveButtonDateYesterday] = useState(false);
    const [ativeButtonDateOther, setAtiveButtonDateOther] = useState(false);

    const [dateFinal, setDateFinal] = useState(null);

    const [anexoPhoto, setAnexoPhoto] = useState(route.params.data.anexo_img);
    const [typePhoto, setTypePhoto] = useState(null);
    const [colorButtonAdd, setColorButtonAdd] = useState(false);

    const [tagsFull, setTagsFull] = useState(null);
    const [tag, setTag] = useState(route.params.data.tags);
    const [colorButtonTags, setColorButtonTags] = useState(false);

    const [modalBankOrigin, setModalBankOrigin] = useState(false);
    const [modalBankDestiny, setModalBankDestiny] = useState(false);

    const [modalAnexos, setModalAnexos] = useState(false);
    const [modalTags, setModalTags] = useState(false);

    const [attachment, setAttachment] = useState(route.params.data.attachment_img);
    const [imgId, setImgId] = useState(route.params.data.attachment_img_id);

    useEffect(() => {

        const res = route.params.data;
        setResponse(res);
        
    }, [response]);
  
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
        const idOrigin = listIconAccount.filter(e => e.id === Number(route.params.data.account_destiny));
        const idDestiny = listIconAccount.filter(e => e.id === Number(route.params.data.account_origin));

        setIdIconBankOrigin(idOrigin[0].url);
        setIdIconBankDestiny(idDestiny[0].url);
    }

    useEffect(() => {
        getBank();
        getTags();
        actionDayIntial();
        getIcon();
    }, []);

    const handleBankOriginId = async (id) => {

        const bankSelect = await api(`account/${id}`);
        const idIcon = listIconAccount.filter(e => e.id === Number(bankSelect.data.type_id));

        setBankOrigin(bankSelect.data);
        setIdIconBankOrigin(idIcon[0].url);
        setModalBankOrigin(false);
    }

    const handleBankDestinyId = async (id) => {

        const bankSelect = await api(`account/${id}`);
        const idIcon = listIconAccount.filter(e => e.id === Number(bankSelect.data.type_id));

        setBankDestiny(bankSelect.data);
        setIdIconBankDestiny(idIcon[0].url);
        setModalBankDestiny(false);
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
        data: 'Preencha os dados, descrição e conta origem e conta destino são obrigatorios!',
        textColor: '#ffffff',
        backgroundColor: '#36393F',
        duration: WToast.duration.SHORT,
        position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    function toatsAccount() {
        const toastOpts = {
        data: 'Saldo insuficiente da conta de origem pra transferência!',
        textColor: '#ffffff',
        backgroundColor: '#36393F',
        duration: WToast.duration.SHORT,
        position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    function toatsAccountEqual() {
        const toastOpts = {
        data: 'A conta de origem não pode ser a igual a conta de destino!',
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

    const closeActionAnexo = () => {
        console.log(anexoPhoto.id)

        setAnexoPhoto(null);
        setAttachment(false);
        setImgId(null);
    }

    const closeActionTags = () => {
        setTag(null);
    }

    const createTr =  async () => {

        const value = route.params.value; 
        
        let tagIsTrue = false;
        let tagId = null;

        if(description && bankOrigin && bankDestiny) {
        if(anexoPhoto) {
            
            try {

                const data = new FormData();
    
                data.append("file", {
                    uri: anexoPhoto.uri,
                    type: anexoPhoto.type,
                    name: anexoPhoto.fileName,
                });  

                const config = {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                };
                
                const file = await api.post('files', data, config);
                setImgId(file.data.id);
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
        
        const newReleases = {
            description,
            value: value,
            account_origin: bankOrigin.id,
            account_destiny: bankDestiny.id,
            day: day,
            month: month,
            year: year,
            attachment_img: attachment,
            attachment_img_id: imgId,
            tag: tagIsTrue,
            tag_id: tagId,
        }


        if(bankOrigin.value >= Number(value) || bankOrigin.value === Number(value)) {

            if(bankOrigin.id === bankDestiny.id) {

                toatsAccountEqual();

            } else {

                let previousValueOrigin =  Number(route.params.resAccountOrigen[0].value) - Number(route.params.data.value);
                let previousValueDestiny = Number(route.params.data.value) + Number(route.params.resAccountDestiny[0].value);
            
                let valueOrigin =  Number(bankOrigin.value) - Number(value);
                let valueDestiny = Number(value) + Number(bankDestiny.value);

                try {

                    await api.put(`account/${route.params.resAccountOrigen[0].id}`, {
                        value: previousValueOrigin
                    });

                    await api.put(`account/${route.params.resAccountDestiny[0].id}`, {
                        value: previousValueDestiny
                    });

                    await api.put(`account/${bankOrigin.id}`, {
                        value: valueOrigin
                    });

                    await api.put(`account/${bankDestiny.id}`, {
                        value: valueDestiny
                    });  

                    await api.put(`releases/${response.id}`, newReleases);

                } catch (error) {
                    console.log(error)
                } 

                navigation.navigate('TabRoutes', {
                    screen: 'Releases'
                });
            }
        
        } else {
            toatsAccount();
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

            <TitleSection>Conta origem</TitleSection>

            {bankOrigin ? (
                <AreaIconBank activeOpacity={0.8} onPress={() => setModalBankOrigin(true)}>

                <IconBank style={{backgroundColor: bankOrigin.color_hex}}>
                    <IconUrl source={idIconBanOrigin} />
                </IconBank>
                <TitleIconBank>{bankOrigin.name}</TitleIconBank>
                
                </AreaIconBank>
            ) : (
                <AreaIconBank activeOpacity={0.8} onPress={() => setModalBankOrigin(true)}>

                <IconPattern source={require('../../assets/card_img/icontrasejado.png')} />
                <TitleIconCategory>Selecione um conta origem</TitleIconCategory>

                </AreaIconBank>
            )}

            </Section>

            <Section>

            <TitleSection>Conta destino</TitleSection>

            {bankDestiny ? (
                <AreaIconBank activeOpacity={0.8} onPress={() => setModalBankDestiny(true)}>

                <IconBank style={{backgroundColor: bankDestiny.color_hex}}>
                    <IconUrl source={idIconBankDestiny} />
                </IconBank>
                <TitleIconBank>{bankDestiny.name}</TitleIconBank>
                
                </AreaIconBank>
            ) : (

                <AreaIconBank activeOpacity={0.8} onPress={() => setModalBankDestiny(true)}>

                <IconPattern source={require('../../assets/card_img/icontrasejado.png')} />
                <TitleIconCategory>Selecione um conta destino</TitleIconCategory>

                </AreaIconBank>
            )}

            </Section>

            <Section>

            <TitleSection>Data</TitleSection>

            <AreaDate>

                <ButtonSelectPattern 
                style={{backgroundColor: ativeButtonDateToday ? '#FF872C' : '#C4C4C4'}}
                activeOpacity={0.8}
                onPress={actionDay}
                >
                <ButtonSelectPatternText>Hoje</ButtonSelectPatternText>
                </ButtonSelectPattern>

                <ButtonSelectPattern
                style={{backgroundColor: ativeButtonDateYesterday ? '#FF872C' : '#C4C4C4'}}
                activeOpacity={0.8}
                onPress={yesterday}
                >
                <ButtonSelectPatternText>Ontem</ButtonSelectPatternText>
                </ButtonSelectPattern>

                <ButtonSelectPattern 
                style={{backgroundColor: ativeButtonDateOther ? '#FF872C' : '#C4C4C4'}}
                activeOpacity={0.8}
                onPress={showDatePicker}
                >
                <ButtonSelectPatternText>Outro</ButtonSelectPatternText>
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
                        <ButtonAnexoClose 
                            activeOpacity={0.8}
                            
                            onPress={() => closeActionAnexo()}
                        >
                            <FontAwesome name="close" size={10} color="#FFF" />
                        </ButtonAnexoClose>   
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

                        <ButtonAnexoClose 
                            activeOpacity={0.8}
                            onPress={() => closeActionTags()}
                        >
                            <FontAwesome name="close" size={10} color="#FFF" />
                        </ButtonAnexoClose>
                        
                        <ButtonSelectPatternText>{tag.name}</ButtonSelectPatternText>
                    </ButtonImageInfo>
                </>
                }

            </AreaDate>

            </Section>

            <AreaButton>
            <ButtonCreate activeOpacity={0.8} onPress={() => createTr()}>
                <FontAwesome name="check" size={30} color="#FFF" />
            </ButtonCreate>
            </AreaButton>

        </AreaSection>

        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalBankOrigin}
            onRequestClose={()=>setModalBankOrigin(false)}
        >
            <ModalArea>
                <BodyModalBank>

                    <AreaTitleModal>
                        <TitleModal>Selecione uma conta origem</TitleModal>
                    </AreaTitleModal>

                    <ListBank 
                    data={bankFull}
                    renderItem={({item}) => 
                    <ListBankFull
                        data={item} 
                        onAction={(id) => handleBankOriginId(id)}                       
                    />} 
                    keyExtractor={item => item.id}
                    />

                </BodyModalBank>
            </ModalArea>
        </Modal>

        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalBankDestiny}
            onRequestClose={()=>setModalBankDestiny(false)}
        >
            <ModalArea>
                <BodyModalBank>

                    <AreaTitleModal>
                        <TitleModal>Selecione uma conta destino</TitleModal>
                    </AreaTitleModal>

                    <ListBank 
                    data={bankFull}
                    renderItem={({item}) => 
                    <ListBankFull
                        data={item} 
                        onAction={(id) => handleBankDestinyId(id)}                       
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

    </Container>
  )
}

export default ScreenSetCredit;