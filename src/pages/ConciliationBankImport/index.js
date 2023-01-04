import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { WToast } from 'react-native-smart-tip';

import CardImportOfx from '../../components/CardImportOfx';
import ButtonPatternAdd from '../../components/ButtonPatternAdd';
import ListBankFull from '../../components/ListBankFull';
import ListCategoryRcFull from '../../components/ListCategoryRcFull';
import ListCategoryDpFull from '../../components/ListCategoryDpFull';
import { listIconAccount } from '../../utils/listIconAccount';
import { listIconRc } from '../../utils/listIconRc';
import { listIconDp } from '../../utils/listIconDp';

import api from '../../services/api';

import { 
    Container,
    AreaTitle,
    Title,
    AreaDescription,
    TextDescription,
    AreaBank,
    TitleBank,
    AreaInfoBank,
    Icon,
    IconeBank,
    NameBank,
    List,
    AreaButton,
    ModalArea,
    BodyModalBank,
    AreaTitleModal,
    TitleModal,
    ListBank,
    BodyModalCategory,
    AreaModalDescription,
    BodyModalDescription,
    AreaModalInput,
    InputModal,
    AreaButtonModal,
    ButtonModalCancel,
    ButtonModalCancelText,
    ButttonModalFinish,
    ButttonModalFinishText,
} from './styles';

const ConciliationBankImport = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const [idBank, setIdBank] = useState('');
    const [nameBank, setNomeBank] = useState('Conta Inicial');
    const [description, setDescription] = useState('');
    const [colorBank, setColorBank] = useState('#17BA89');
    const [urlIcon, setUrlIcon] = useState(require('../../assets/icon_account/bank_while.png'));
    const [bank, setBank] = useState({});
    const [categoryRc, setCategoryRc] = useState([]);
    const [categoryDp, setCategoryDp] = useState([]);
    const [modalBank, setModalBank] = useState(false);
    const [modalCategoryRc, setModalCategoryRc] = useState(false);
    const [modalCategoryDp, setModalCategoryDp] = useState(false);
    const [modalDescription, setModalDescription] = useState(false);

    const [id, setId] = useState('');
    

    useEffect(() => {
        handlerData();
        handlerAccount();
        handlerRcCategory();
        handlerDpCategory();
    },[]);

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


    const handlerData = () => {
        
        const res = route.params.data.sort((x,y) => {
            let a = new Date(x.date);
            let b = new Date(y.date);
            return a - b;
        });

        setData(res);
    }

    const handlerAccount = async () => {

        try {
          const res = await api.get('account');
          
          const respFilter = res.data.sort((x, y) => {
            let a = new Date(x.createdAt);
            let b = new Date(y.createdAt);
    
            return a - b;
          });
    
          setBank(respFilter);

        } catch (error) {
          console.log(error)
        }
    
    }

    const handlerRcCategory = async () => {

        try {
          const res = await api.get('rccategory');
    
          const resFilter =res.data.sort((x, y) => {
            let a = new Date(x.createdAt);
            let b = new Date(y.createdAt);
    
            return a - b;
          });
          setCategoryRc(resFilter);
        } catch (error) {
          console.log(error)
        }
    }

    const handlerDpCategory = async () => {

        try {
          const res = await api.get('dpcategory');
    
          const resFilter =res.data.sort((x, y) => {
            let a = new Date(x.createdAt);
            let b = new Date(y.createdAt);
    
            return a - b;
          });
          setCategoryDp(resFilter);
        } catch (error) {
          console.log(error)
        }
    }

    const handlerBankId = (id) => {

        const account = bank.filter(e => e.id === id);
        const icon = listIconAccount.filter(item => item.id === Number(account[0].type_id));
        
        setIdBank(id);
        setUrlIcon(icon[0].url);
        setNomeBank(account[0].name);
        setColorBank(account[0].color_hex);
        setModalBank(false);
    }

    const handlerDescriptionId = (id) => {
        setModalDescription(true);
        setId(id);
    }

    const handlerDescription = () => {
        const newData = data.map((i) => {

            if(i.id === id) {
                return { ...i, description: description }
            }  
            
            return i;

        });
        setData(newData);
        setDescription('');
        setModalDescription(false);
    }

    const handleCategoryRcId = (info) => {

        const category = categoryRc.filter(e => e.id === info);
        const icon = listIconRc.filter(item => item.id === Number(category[0].id_icon));

        const newData = data.map((i) => {
            if(i.id === id) {
                return { 
                    ...i, 
                    category_id: category[0].id,
                    category_name: category[0].name,
                    category_hex: category[0].color_hex,
                    category_icon: icon[0].url,
                }
            }

            return i;
        });

        setData(newData);
        setModalCategoryRc(false);
    }

    const handleCategoryDpId = (info) => {

        const category = categoryDp.filter(e => e.id === info);
        const icon = listIconDp.filter(item => item.id === Number(category[0].id_icon));

        const newData = data.map((i) => {
            if(i.id === id) {
                return { 
                    ...i, 
                    category_id: category[0].id,
                    category_name: category[0].name,
                    category_hex: category[0].color_hex,
                    category_icon: icon[0].url,
                }
            }

            return i;
        });

        setData(newData);
        setModalCategoryDp(false);
    }

    const handlerCategoryId = (id, type) => {

        if(type === 1 ) {
            setId(id);
            setModalCategoryRc(true);
        }

        if(type === 0 ) {
            setId(id);
            setModalCategoryDp(true);
        }

    }

    const handlerImport = async () => {


        let isValid = data.filter(e => e.category_id === null);


        const newData = data.map(e => {

            let res = {

                description: '',
                value: 0,
                rc_category_id: null || 1,
                dp_category_id: null || 1,
                type_payer: false,
                account_id: 1,
                account_origin: null,
                account_destiny: null,
                card_credit_id: null,
                day: 3,
                month: 1,
                year: 2022,
                fixo: false,
                installments: false,
                value_installments: 0,
                qd_installments: '' - 1,
                attachment_img: false,
                attachment_img_id: null,
                tag: false,
                type: "2", // se for debito deixar como 2, se for 1 e credito
                tag_id: null,
                paying_account_name: 'nome do banco',
                meta_id: 1,
                meta: 'se tiver meta true se não false'
            }

            return res;

        });


        console.log(newData)

        if(isValid.length === 0) {

            toatsError('Pode fazer a ação !');

            //await api.post('', newData);

        } else {
            toatsError('Os campos de categoria são obrigatórios para importação. Por favor, preencha-os para continuar.')
        }

    }

    return (
        <Container>

            <AreaTitle>
                <Title>Categorização de lançamentos</Title>
            </AreaTitle>
            
            <AreaDescription>
                <TextDescription>Selecione os lançamentos da sua conciliação bancária</TextDescription>
                <TextDescription>e vincule-os à conta e categorias desejadas para</TextDescription>
                <TextDescription>ter um melhor controle do seu orçamento.</TextDescription>
            </AreaDescription>

            <AreaBank>

                <TitleBank>Conta</TitleBank>

                <AreaInfoBank activeOpacity={0.8} onPress={() => setModalBank(true)}>
                    <Icon style={{ backgroundColor: colorBank }}>
                        <IconeBank source={urlIcon}  />
                    </Icon>
                    <NameBank>{nameBank}</NameBank>
                </AreaInfoBank>
            </AreaBank>

            <List 
               
                data={data}
                keyextractor={item => item.id}
                renderItem={({item}) => <CardImportOfx
                    data={item} 
                    handlerDescription={(id, type) => handlerDescriptionId(id, type)}
                    hadlerCategory={(id, type) => handlerCategoryId(id, type)}
                />}
            />

            <AreaButton>
                <ButtonPatternAdd title="CONCLUIR" onPress={() => handlerImport()} />
            </AreaButton>

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
                            data={bank}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => 
                            <ListBankFull
                                data={item} 
                                onAction={(id) => handlerBankId(id)}                       
                            />} 
                        />

                    </BodyModalBank>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalDescription}
                onRequestClose={()=> setModalDescription(false)}
            >
                <AreaModalDescription>
                    <BodyModalDescription>

                        <AreaTitleModal>
                            <TitleModal>Nova descrição</TitleModal>
                        </AreaTitleModal>

                        <AreaModalInput>
                            <InputModal 
                                placeholderTextColor="#7E7E7E"
                                maxLength={18}
                                onChangeText={(text)=> setDescription(text)}
                                defaultValue="Digite aqui"
                                value={description} 
                            />
                        </AreaModalInput>

                        <AreaButtonModal>
                            
                            <ButtonModalCancel activeOpacity={0.8} onPress={() => setModalDescription(false)}>
                                <ButtonModalCancelText>CANCELAR</ButtonModalCancelText>
                            </ButtonModalCancel>
                            
                            <ButttonModalFinish activeOpacity={0.8} onPress={() => handlerDescription()}>
                                <ButttonModalFinishText>CONCLUIR</ButttonModalFinishText>
                            </ButttonModalFinish>

                        </AreaButtonModal>


                    </BodyModalDescription>
                </AreaModalDescription>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalCategoryRc}
                onRequestClose={()=>setModalCategoryRc(false)}
            >
                <ModalArea>
                    <BodyModalCategory>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma categoria</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                            data={categoryRc}
                            renderItem={({item}) => 
                            <ListCategoryRcFull
                                data={item} 
                                onAction={(info) => handleCategoryRcId(info)}                       
                            />} 
                            keyExtractor={item => item.id}
                        />

                    </BodyModalCategory>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalCategoryDp}
                onRequestClose={()=> setModalCategoryDp(false)}
            >
                <ModalArea>
                    <BodyModalCategory>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma categoria</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                            data={categoryDp}
                            renderItem={({item}) => 
                            <ListCategoryDpFull
                                data={item} 
                                onAction={(id) => handleCategoryDpId(id)}                       
                            />} 
                            keyExtractor={item => item.id}
                        />

                    </BodyModalCategory>
                </ModalArea>
            </Modal>

        </Container>
    )
}

export default ConciliationBankImport;
