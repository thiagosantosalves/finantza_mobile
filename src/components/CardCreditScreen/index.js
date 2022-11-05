import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

import { institution } from '../../utils/institution';
import formatNumber from '../../utils/formatNumber';

import { 
    Container,
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
    AreaEdit,
    AreaButton,
    Button,
    TitleButton
} from './styles';

const CardCreditScreen = ({ data, ...rest }) => {

    const { width } = Dimensions.get('window');

    const [url, setUrl] = useState(null);

    useEffect(() => {

        const icon_url = institution.filter(item => item.id === data.id_institution)
        setUrl(icon_url[0].url);

    }, []);

    return (
        <Container style={{
                width: width - 25,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
            }}>
                    
            <AreaNameCard>

                <AreaIcon>
                    <Img source={url} />
                </AreaIcon>

                <AreaName>
                    <NameText>{data.name}</NameText>
                    <NameInstitute>{data.institution}</NameInstitute>
                </AreaName>
            </AreaNameCard>

            <AreaValue>
                <AreaValueLimit>
                    <TitleValue>Limite disponível</TitleValue>
                    <ValueTextLimit>R$ {formatNumber(data.limit_card)}</ValueTextLimit>
                </AreaValueLimit>

                <AreaValueInvoice>
                    <TitleValue>Valor da fatura</TitleValue>
                    <ValueTextInvoice>R$ {formatNumber(data.invoice_amount)}</ValueTextInvoice>
                </AreaValueInvoice>
            </AreaValue>
           
            <AreaEdit>
                <AreaButton>
                    <Button activeOpacity={0.8} onPress={()=> rest.onInfo(data.id)}>
                        <TitleButton>Detalhes</TitleButton>
                    </Button>
                </AreaButton>

                <AreaButton>
                    <Button activeOpacity={0.8} onPress={()=> rest.onEdite(data.id)}>
                        <TitleButton>Editar</TitleButton>
                    </Button>
                </AreaButton>

                <AreaButton>
                    <Button activeOpacity={0.8} onPress={() => rest.onArquive(data.id)}>
                        <TitleButton>Arquivar</TitleButton>
                    </Button>
                </AreaButton>
            </AreaEdit>
        </Container>
    );
}

export default CardCreditScreen;