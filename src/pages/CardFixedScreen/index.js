import React, { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { WToast } from 'react-native-smart-tip';

import formatNumber from '../../utils/formatNumber';
import { listIconDp } from '../../utils/listIconDp';
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
    const [formatDate, setFormatDate] = useState('');
    const [categorySelect, setCategorySelect] = useState({});
    const [idIconCategory, setIconCategory] = useState({});
    const [cardCreditSelect, setCardCreditSelect] = useState({});
    const [cardCreditIcon, setCardCreditIcon] = useState({});
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    useEffect(() => {
        let date = new Date();
        let month = date.getMonth() + 1;
        let format = date.getDate()+'/'+month+'/'+date.getFullYear();
        setFormatDate(format);
        setDateFinal(date);
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
    
    const showDatePicker = () => {

        if(isDatePickerVisible) {
            setIsDatePickerVisible(false);
        } else {
            setIsDatePickerVisible(true);
        }
        
    };

    const handleConfirm = (date) => {

        let month = date.getMonth() + 1;
        let format = date.getDate()+'/'+month+'/'+date.getFullYear();
        setFormatDate(format);

        setDateFinal(date);
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

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

    const handlerFixedRelease = async () => {
        
        let day = dateFinal.getDate();
        let month = dateFinal.getMonth() + 1;
        let year= dateFinal.getFullYear();
        let status = false;

        const card = await api.get(`cardcredit/${props.route.params.data.card_credit_id}`);
        let valueLimit = Number(card.data.limit_card) - Number(card.data.invoice_amount);

           
        if(Number(valueLimit) >= Number(props.route.params.data.value)) {

            let resCardRelease = await api.get('cardcreditreleases');
            let cardStatus2 = resCardRelease.data.filter(e => e.id_card_credit === props.route.params.data.card_credit_id && e.statuscard === 2 && e.month === Number(month) && e.year === Number(year));
            let cardStatus3 = resCardRelease.data.filter(e => e.id_card_credit === props.route.params.data.card_credit_id && e.statuscard === 3 && e.month === Number(month) && e.year === Number(year));

            if(cardStatus2.length > 0) {
                status = true;
                let textMsn = `O cartão ${cardStatus2[0].card_credit.name} esta fechado para essa data, troque a data do lançamento!`
                toatsError(textMsn);
            }

            if(cardStatus3.length > 0) {
                status = true;
                let textMsn = `O cartão ${cardStatus3[0].card_credit.name} esta vencido para essa data, troque a data do lançamento!`;
                toatsError(textMsn);
            }

            let sum_limit = Number(card.data.invoice_amount) + Number(props.route.params.data.value);

            resCardRelease = resCardRelease.data.filter(e => e.id_card_credit === Number(props.route.params.data.card_credit_id) && e.month === Number(month) && e.year === Number(year));
            let resCardReleasePay = resCardRelease.filter(e => e.statuscard === 4 && e.month === Number(month));

            if(resCardReleasePay.length > 0) {
                status = true;
                let textMsn = `O cartão ${resCardReleasePay[0].card_credit.name} esta pago para essa data, troque a data do lançamento!`;
                toatsError(textMsn);
            }

            if(!status) {
                const resMeta = await api.get(`meta/${month}&${year}`);
            
                if(resMeta.data.length > 0) {
        
                    let meta = resMeta.data.find(m => m.category.id === props.route.params.data.dp_category_id);
        
                    if (meta) {
                            
                        let usedValue = Number(value) + Number(meta.used_value);
                        usedValue = usedValue.toFixed(2);
        
                        let newPorcent = usedValue * 100;
                        newPorcent =  Number(newPorcent) / Number(meta.value);  
        
                        let status = false;
        
                        if(newPorcent >= 100 ) {
                            newPorcent = 100;
                            status = true;
                        }
        
                        await api.put(`metareleases/${meta.id}`, {
                            used_value: usedValue,
                            porcent: newPorcent.toFixed(2),
                            status: status
                        }); 
                    }
                }
            }

            if(!status) {

                if(resCardRelease.length > 0) {
                
                    let sumCardReleases = Number(resCardRelease[0].invoice_amount) + Number(props.route.params.data.value);
                    await api.put(`cardcreditreleases/${resCardRelease[0].id}`, { invoice_amount: sumCardReleases });

                } else {

                const cardInfoReleases = {
                    statuscard: 1,
                    month: month,
                    year: year,
                    pay: false,
                    limit_card: card.data.limit_card,
                    invoice_amount: props.route.params.data.value,
                    closes_day: card.data.closes_day,
                    wins_day: card.data.wins_day,
                    id_card_credit: card.data.id,
                    id_account: card.data.account.id
                }
                   await api.post('cardcreditreleases', cardInfoReleases); 
                }

                let release = [{
                    description: props.route.params.data.description,
                    value: props.route.params.data.value,
                    rc_category_id: null,
                    dp_category_id: props.route.params.data.dp_category_id,
                    type_payer: true,
                    account_id: card.data.account_id,
                    account_origin: null,
                    account_destiny: null,
                    card_credit_id: props.route.params.data.card_credit_id,
                    day: day,
                    month: month,
                    year: year,
                    fixo: true,
                    installments: false,
                    value_installments: 0,
                    qd_installments: - 1,
                    attachment_img: false,
                    attachment_img_id: null,
                    tag: false,
                    type: 2,
                    tag_id: null,
                    paying_account_name: props.route.params.data.paying_account_name,
                    id_fixed_release: props.route.params.data.id,
                    user_id: props.route.params.data.user_id
                }];
                
                await api.delete(`notificationIndex/${props.route.params.id}`);

                await api.put(`cardcredit/${card.data.id}`, { invoice_amount: sum_limit });
                await api.post('releasebulkcreate', release);

                props.navigation.navigate('Home');
            }

        } else {
            toatsError('Limite do cartão insuficiente!');
        }
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

                <AreaDescription>
                    <Description>{formatDate}</Description>
                </AreaDescription>

                <AreaDate>
                

                    <ButtonSelectPattern 
                        style={{backgroundColor: '#FF872C' }}
                        onPress={showDatePicker}
                        activeOpacity={0.8}
                    >
                        <ButtonSelectPatternText>nova data</ButtonSelectPatternText>
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