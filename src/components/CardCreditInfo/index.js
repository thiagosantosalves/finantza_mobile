import React, { useState, useEffect } from 'react';
import { Dimensions, } from 'react-native';
import { WToast } from 'react-native-smart-tip';

import { institution } from '../../utils/institution';
import { listIconAccount } from '../../utils/listIconAccount';
import formatNumber from '../../utils/formatNumber';

import { 
    Container,
    HeaderCard,
    AreaCardInfo,
    Icon,
    AreaAccountName,
    CardName,
    NameInstitution,
    AreaStatus,
    TextStatus,
    TextStatusInfo,
    BodyAccount,
    AreaAccount,
    TitleAccount,
    AreaAccountInfo,
    AreaAccountIcon,
    AccountIcon,
    AccountName,
    AreaLimitAvailable,
    TitleLimit,
    LimitAvailableText,
    AreaDate,
    TitleDate,
    TextDate,
    AreaInvoice,
    TitleInvoice,
    InvoiceValue,
    AreaDueDate,
    AreaButton,
    ButtonCardPay,
    ButtonCardPayTitle
} from './styles';

const CardCreditInfo = (props) => {

    const { width } = Dimensions.get('window');
    const [institutionUrl, setInstitutionUrl] = useState({});
    const [accountSelect, setAccountSelect] = useState({});

    function toatsError(text) {
        const toastOpts = {
            data: text,
            textColor: '#ffffff',
            backgroundColor: '#36393F',
            duration: WToast.duration.SHORT,
            position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    useEffect(() => {

        const  data = institution.filter(item => item.id ===  props.data.card_credit.id_institution);
        const dataAccount = listIconAccount.filter(item => item.id === Number(props.data.account.type_id));

        setAccountSelect(dataAccount[0].url);
        setInstitutionUrl(data[0].url);
    }, []);

    return (
        <Container style={{
            width: width  - 30,
            marginHorizontal: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 1,
        }}>
            
            <HeaderCard>
            
               <AreaCardInfo>
                    <Icon source={institutionUrl} />

                    <AreaAccountName>
                        <CardName>{props.data.card_credit.name}</CardName>
                        <NameInstitution>{props.data.card_credit.institution}</NameInstitution>
                    </AreaAccountName>

                </AreaCardInfo>

                <AreaStatus>
                    <TextStatus>Status:</TextStatus>
                    {props.data.statuscard === 1 && (
                        <TextStatusInfo>Em aberto</TextStatusInfo>
                    )}
                    {props.data.statuscard === 2 && (
                       <TextStatusInfo style={{color: '#FF872C'}}>Fechado</TextStatusInfo>
                    )}
                    {props.data.statuscard === 3 && (
                        <TextStatusInfo style={{color: '#E83F5B'}}>Vencido</TextStatusInfo>
                    )}
                    {props.data.statuscard === 4  && (
                        <TextStatusInfo style={{color: '#0BCECE'}}>Pago</TextStatusInfo>
                    )}
                </AreaStatus>

            </HeaderCard>

            <BodyAccount>
                
                <AreaAccount>
                    <TitleAccount>Conta para pagamento</TitleAccount>
                    <AreaAccountInfo>
                        <AreaAccountIcon style={{ backgroundColor: props.data.account.color_hex }}>
                            <AccountIcon source={accountSelect} />
                        </AreaAccountIcon>
                        <AccountName>Conta Inicial</AccountName>
                    </AreaAccountInfo>
                </AreaAccount>

                <AreaLimitAvailable>
                    <TitleLimit>Limite disponível</TitleLimit>
                    
                    <LimitAvailableText>R$ {formatNumber(props.data.limit_card)}</LimitAvailableText>
                </AreaLimitAvailable>

            </BodyAccount>

            <AreaDueDate>
                <AreaDate>
                    <TitleDate>Valor da fatura</TitleDate>
                    <TextDate>Fecha em {`${props.data.closes_day}/${props.data.month}/${props.data.year}`}</TextDate>
                    <TextDate>Vence em {`${props.data.wins_day}/${props.data.month}/${props.data.year}`}</TextDate>
                </AreaDate>

                <AreaInvoice>
                    <TitleInvoice>Valor da fatura</TitleInvoice>
                    <InvoiceValue>R$ {formatNumber(props.data.invoice_amount)}</InvoiceValue>
                </AreaInvoice>
            </AreaDueDate>

            <AreaButton>
                
                {props.data.pay ? (
                    <ButtonCardPay onPress={() => toatsError('Aviso, fatura do cartão já foi paga!')} activeOpacity={0.8} style={{ backgroundColor: '#0BCECE' }}>
                        <ButtonCardPayTitle>PAGO</ButtonCardPayTitle>
                    </ButtonCardPay>
                ) : (
                    <ButtonCardPay onPress={() => props.onPress(props.data)} activeOpacity={0.8}>
                        <ButtonCardPayTitle>PAGAR</ButtonCardPayTitle>
                    </ButtonCardPay>
                )}
            
            </AreaButton>

        </Container>
    );
}

export default CardCreditInfo;