import React, { useState, useEffect } from 'react';
import { Modal, Alert } from 'react-native';

import api from '../../services/api';

import PatternInput from '../../components/PatternInput';
import ButtonPatternAdd from '../../components/ButtonPatternAdd';

import { institution } from '../../utils/institution';
import { listIconAccount } from '../../utils/listIconAccount';

import ListInstitutionComponent from '../../components/ListInstitutionComponent';
import CalendaryDay from '../../components/CalendaryDay';
import ListBankFull from '../../components/ListBankFull';

import formatNumber from '../../utils/formatNumber';

import { 
    Container, 
    Title,
    AreaInput,
    AreaInputDay,
    ButtonDay,
    TitleButtonDay,
    AreaIcon,
    Icon,
    TextDescription,
    AreaButtonAdd,
    InputLimit,
    ModalArea,
    BodyModalInstitution,
    AreaIconBank,
    IconBank,
    ModalAreaDay,
    BodyModalDay,
    BodyModalBank,
    ListInstitution,
    ListBank,
    AreaTitleModal,
    TitleModal,
} from './styles';

const CardCreditScreenEdit = ({ route, navigation }) => {

    const [name, setName] = useState(route.params.cardCredit.name);
    const [limit, setLimit] = useState(route.params.cardCredit.limit_card);
    const [limitFormat, setLimitFormat] = useState('');
    const [idInstitution, setIdInstitution] = useState(route.params.cardCredit.id_institution);
    const [iconAccount, setIconAccount] = useState();
    const [urlInstitution, setUrlInstitution] = useState(null);
    const [nameInstitution, setNameInstitution] = useState('');
    const [closesDay, setClosesDay] = useState(route.params.cardCredit.closes_day);
    const [winsDay, setWinsDay] = useState(route.params.cardCredit.wins_day);
    const [bankId, setBankId] = useState(route.params.cardCredit.account.id);
    const [bankFull, setBankFull] = useState([]);
    const [bankSelect, setBankSelect] = useState(route.params.cardCredit.account);
    const [modalInstitution, setModalInstitution] = useState(false);
    const [modalClosesDay, setModalClosesDay] = useState(false);
    const [modalWinsDay, setModalWinsDay] = useState(false);
    const [modalBank, setModalBank] = useState(false);

    useEffect(() => {
        const institutionFilter = institution.filter(item => item.id === route.params.cardCredit.id_institution);
        const value = route.params.cardCredit.limit_card;
        const icon = listIconAccount.filter(e => e.id === Number(route.params.cardCredit.account.type_id)); 

        setIconAccount(icon[0].url);
        setUrlInstitution(institutionFilter[0].url);
        setNameInstitution(institutionFilter[0].name);

        transformNumber(formatNumber(value));
    }, []);

    const getListBank = async () => {
        try {
            const list = await api.get('/account');
            setBankFull(list.data);
        } catch (error) {
            console.log(error)
        }
    }
    
    useState(() => {
        getListBank();
    }, []);
 
    const transformNumber = (value) => {

        let v = value.toString().replace(/\D/g, '');
        v = (v/100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        value = v; 

        setLimitFormat("R$  "+value);
    }

    const setInputLimit = (number) => {
        const value = number.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');

        const v = value.replace('R$', '');
        let b = parseInt(v);
        b = (b/100).toFixed(2);

        setLimit(b);

        transformNumber(value);
    }

    const handleInstitution = (id) => {
        const data = institution.filter(item => item.id === id);

        setUrlInstitution(data[0].url);
        setNameInstitution(data[0].name);
        setIdInstitution(id);

        setModalInstitution(false);
    }

    const handlerClosesDay = (n) => {
        setClosesDay(n);
        setModalClosesDay(false);
    }

    const handlerWinsDay = (n) => {
        setWinsDay(n);
        setModalWinsDay(false);
    }

    const handleBankId = (id) => {

        setBankId(id);

        const IsBank = bankFull.filter(i => i.id === id);
        const icon = listIconAccount.filter(e => e.id === Number(IsBank[0].type_id));
        
        setIconAccount(icon[0].url);
        setBankSelect(IsBank[0]);
        setModalBank(false);
    }

    const handleEdit = async () => {

        const cardcredit = {
            name: name,
            id_institution:idInstitution,
            institution: nameInstitution,
            limit_card: limit,
            closes_day: closesDay,
            wins_day: winsDay,
            account_id: bankId
        }

        if(name && limit && nameInstitution && bankId) {

            try {
                await api.put(`/cardcredit/${route.params.cardCredit.id}`, cardcredit);
                navigation.navigate('CardCreditScreen');
            } catch (error) {
                console.log(error)          
            }

        } else {
            Alert.alert(
                'Erro, campos não foram preenchidos.', 
                'Os campos do cadastro de cartão são obrigatório!', 
            );
        }
    }

    return (
        <Container>
            <AreaInput>
                <Title>Nome do cartão</Title>

                <PatternInput 
                    placeholder="Digite o nome do cartão" 
                    placeholderTextColor="#7E7E7E"
                    maxLength={35}
                    onChangeText={(name)=>setName(name)}
                    value={name} 
                />
         
            </AreaInput>

            <AreaInput>
                <Title>Instituição financeira</Title>

                <AreaIcon activeOpacity={0.8} onPress={()=>setModalInstitution(true)}>

                    {urlInstitution ?  
                        
                        <Icon source={urlInstitution} />
                        : 
                        <Icon source={require('../../assets/card_img/icontrasejado.png')} /> 
                    }   

                    {urlInstitution ?  
                        <TextDescription style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#2F323D'
                        }}>{nameInstitution}</TextDescription>
                        :
                        <TextDescription>Selecionar sua instituição financeira</TextDescription>
                    }

                </AreaIcon>
            </AreaInput>

            <AreaInput>
                <Title>Limite</Title>

                <InputLimit 
                    placeholderTextColor="#7E7E7E"
                    maxLength={18}
                    keyboardType="numeric"
                    onChangeText={(number)=> setInputLimit(number)}
                    defaultValue="R$ 0,00"
                    value={limitFormat} 
                />
               
            </AreaInput>

            <AreaInputDay>

                <AreaInput>
                    <Title>Fecha dia</Title>

                    <ButtonDay activeOpacity={0.8} onPress={()=>setModalClosesDay(true)}>
                        <TitleButtonDay>{closesDay}</TitleButtonDay>
                    </ButtonDay>
                </AreaInput>

                <AreaInput>
                    <Title>Vence dia</Title>

                    <ButtonDay activeOpacity={0.8} onPress={()=>setModalWinsDay(true)}>
                        <TitleButtonDay>{winsDay}</TitleButtonDay>
                    </ButtonDay>
                </AreaInput>
                
            </AreaInputDay>

            <AreaInput>
                <Title>Conta de pagamento</Title>

                <AreaIcon activeOpacity={0.8} onPress={()=>setModalBank(true)}>

                    {bankSelect ? 
                        <>
                            <AreaIconBank style={{backgroundColor: bankSelect.color_hex}}>
                                <IconBank source={iconAccount} />
                            </AreaIconBank>
                            <TextDescription style={{
                                fontFamily: 'Poppins-Regular',
                                color: '#2F323D'
                            }} >{bankSelect.name}</TextDescription>
                        </>
                        : 
                        <>
                            <Icon source={require('../../assets/card_img/icontrasejado.png')} />
                            <TextDescription>Selecionar conta de pagamento</TextDescription>
                        </>
                    }

                </AreaIcon>
            </AreaInput>

            <AreaButtonAdd>
                <ButtonPatternAdd title="Concluir" onPress={() => handleEdit()} />
            </AreaButtonAdd>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalInstitution}
                onRequestClose={()=>setModalInstitution(false)}
                >
                <ModalArea>
                    <BodyModalInstitution>

                        <AreaTitleModal>
                            <TitleModal>Instituição financeira</TitleModal>
                        </AreaTitleModal>
                       
                        <ListInstitution
                            data={institution}
                            renderItem={({item}) => 
                            <ListInstitutionComponent
                                data={item} 
                                onAction={(id) => handleInstitution(id)}                       
                            />}
                            keyExtractor={item => item.id}
                        /> 

                    </BodyModalInstitution>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalClosesDay}
                onRequestClose={()=>setModalClosesDay(false)}
                >
                <ModalAreaDay>
                    <BodyModalDay>

                        <CalendaryDay 
                            onPress={(n) => handlerClosesDay(n)}
                            onCancel={() => setModalClosesDay(false)}
                        />

                    </BodyModalDay>
                </ModalAreaDay>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalWinsDay}
                onRequestClose={()=>setModalWinsDay(false)}
                >
                <ModalAreaDay>
                    <BodyModalDay>

                        <CalendaryDay 
                            onPress={(n) => handlerWinsDay(n)}
                            onCancel={() => setModalWinsDay(false)}
                        />

                    </BodyModalDay>
                </ModalAreaDay>
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
                            <TitleModal>Conta de pagamento</TitleModal>
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

        </Container>
    )
}

export default CardCreditScreenEdit;