import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import formatNumber from '../../utils/formatNumber';

import { 
    Container,
    Border,
    Body,
    AreaTitle,
    AreaValue,
    Title,
    Description,
    ValueText,
} from './styles';

const CardReleases = ({ data, ...rest}) => {
    
    const [colorBorder, setColorBorder] = useState('');
    const [typeName, setTypeName] = useState('');

    const handlerNameAccount = async () => {
        if(data.type_payer === false) {
            //setTypeName(data.account.name);
        }

        if(data.type_payer === true) {
            setTypeName(data.card_credit.name);
        }
        
        if(data.type === 3) {
            const res = await api.get(`account/${data.account_destiny}`);
            setTypeName(res.data.name);
        }
    }

    const hendlerFilterBorderColor = () => {
        if(data.type === 1) return setColorBorder('#0BCECE');
        if(data.type === 2) return setColorBorder('#DD2D82');
        if(data.type === 3) return setColorBorder('#426CD7');
    }

    useEffect(() => {
        handlerNameAccount();
        hendlerFilterBorderColor();
    }, []);

    return (
        <Container 
            onPress={() => rest.onAction(data.id)}
            activeOpacity={0.8} 
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
            }}>

            <Border style={{ backgroundColor: colorBorder }} />
            
            <Body>

                <AreaTitle>
                    <Title>{data.description}</Title>
                    <Description>{typeName}</Description>
                </AreaTitle>

                <AreaValue>
                    {data.installments ? (
                        <ValueText>{formatNumber(data.value_installments)}</ValueText>
                    ) : (
                        <ValueText>{formatNumber(data.value)}</ValueText>
                    )}
                </AreaValue>
                
            </Body>

        </Container>
    )
}

export default CardReleases;