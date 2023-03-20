import React, { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


import formatNumber from '../../utils/formatNumber';
import { listIconDp } from '../../utils/listIconDp';
import { listIconAccount } from '../../utils/listIconAccount';
import { institution } from '../../utils/institution';

import ButtonPatternAdd from '../../components/ButtonPatternAdd';

import api from '../../services/api';

import { 
    Container,
    Header,
    AreaDescription,
    Description,
    AreaValue,
    TextValue,
    AreaSection,
    Section,
    TitleSection,
    AreaIconCategory,
    IconCategory,
    IconUrl,
    TitleIconCategory,
    AreaIconBank,
    IconPattern,
    TitleIconCard,
    AreaDate,
    ButtonSelectPattern,
    ButtonSelectPatternText,
    AreaButtonFixed
} from './styles';

const CardFixedScreen = (props) => {

    const [dateFinal, setDateFinal] = useState(null);

    const [categorySelect, setCategorySelect] = useState({});
    const [idIconCategory, setIconCategory] = useState({});
    const [cardCreditSelect, setCardCreditSelect] = useState({});
    const [cardCreditIcon, setCardCreditIcon] = useState({});

    const [ativeButtonDateToday, setAtiveButtonDateToday] = useState(true);
    const [ativeButtonDateYesterday, setAtiveButtonDateYesterday] = useState(false);
    const [ativeButtonDateOther, setAtiveButtonDateOther] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    useEffect(() => {

        handleCategoryId();
        handleCardId();

    }, []);

    const handleCategoryId = async (id) => {
        const category = await api.get(`dpcategory/${props.route.params.data.dp_category_id}`);
        const idIcon = listIconDp.filter(e => e.id === category.data.id_icon);

        setCategorySelect(category.data);
        setIconCategory(idIcon[0].url);
    }

    const handleCardId = async (id) => {
        const res = await api(`cardcredit/${props.route.params.data.card_credit_id}`);
        const cardIcon = institution.filter(e => e.id === res.data.id_institution);
        
        setCardCreditSelect(res.data);
        setCardCreditIcon(cardIcon[0]);
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

    const handlerFixedRelease = () => {
        alert('teste')
    }

    return (
        <Container>
            <Header>
                <AreaValue>
                <TextValue>R$</TextValue>
                <TextValue>{formatNumber(props.route.params.data.value)}</TextValue>
                </AreaValue>
            </Header> 

            <AreaSection>
                <Section>
                    <TitleSection>Descrição</TitleSection>
                </Section>

                <AreaDescription>
                    <Description>{props.route.params.data.description}</Description>
                </AreaDescription>

                <Section>
                    <TitleSection>Categoria</TitleSection>
                </Section>

                <AreaIconCategory>
                
                    <IconCategory style={{backgroundColor: categorySelect.color_hex}}>
                        <IconUrl source={idIconCategory} />
                    </IconCategory>
                    <TitleIconCategory>{categorySelect.name}</TitleIconCategory>
 
                </AreaIconCategory>

                <Section>
                    <TitleSection>Cartão de credito</TitleSection>
                </Section>

                <AreaIconBank>
                    <IconPattern source={cardCreditIcon.url} />
                    <TitleIconCard>{cardCreditSelect.name}</TitleIconCard>
                </AreaIconBank>

                <Section>
                    <TitleSection>Alterar data</TitleSection>
                </Section>
                
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

            </AreaSection> 

            <AreaButtonFixed>
                <ButtonPatternAdd title="CONCLUIR" onPress={handlerFixedRelease} />
            </AreaButtonFixed> 

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                cancelTextIOS={'Sair'}
                confirmTextIOS={'OK'}
                headerTextIOS={'Selecione uma data'}
            />
        </Container>
    )
}

export default CardFixedScreen;