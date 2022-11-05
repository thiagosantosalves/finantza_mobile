import React,  { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { institution } from '../../utils/institution';
import formatNumber from '../../utils/formatNumber';

import { 
    Container,
    AreaTitle,
    TitleCard,
    ButtonAdd,
    AreaNameCard,
    AreaIcon,
    Img,
    AreaName,
    NameText,
    NameInstitute,
    AreaValue,
    AreaValueLimit,
    TitleValue,
    ValueTextLimit,
    AreaValueInvoice,
    ValueTextInvoice,
} from './styles';

const CardCredit = ({ data }) => {

    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

    const [url, setUrl] = useState(null);

    useEffect(() => {

        const icon_url = institution.filter(item => item.id === data.id_institution);
        setUrl(icon_url[0].url);
      
    }, []);

    return (
        <Container style={{
                width: width * 0.8 - 20,
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
            <AreaTitle>
                <TitleCard>Cartões</TitleCard>

                <ButtonAdd activeOpacity={0.8} onPress={()=> navigation.navigate('HomeRoutes', {
                    screen: 'CardCreditScreen'
                })}>
                    <FontAwesome5 name="plus" size={14} color="#fff" />
                </ButtonAdd>
            </AreaTitle>
            
            <AreaNameCard>

                <AreaIcon>
                    <Img source={url} />
                </AreaIcon>

                <AreaName>
                    <NameText>{data.name}</NameText>
                    <NameInstitute>{data.institution}</NameInstitute>
                </AreaName>
            </AreaNameCard>


            <AreaValue style={{marginTop: 10}}>
                <AreaValueLimit>
                    <TitleValue>Limite total</TitleValue>
                    <ValueTextLimit>R$ {formatNumber(data.limit_card)}</ValueTextLimit>
                </AreaValueLimit>
            </AreaValue>
            
            <AreaValue>
                <AreaValueLimit>
                    <TitleValue>Limite disponível</TitleValue>
                    <ValueTextLimit style={{color: '#DE4639'}}>R$ {formatNumber(data.valueAvailable)}</ValueTextLimit>
                </AreaValueLimit>

                <AreaValueInvoice>
                    <TitleValue>Valor da fatura</TitleValue>
                    <ValueTextInvoice>R$ {formatNumber(data.invoice_amount)}</ValueTextInvoice>
                </AreaValueInvoice>
            </AreaValue>
        </Container>
    );
}

export default CardCredit;