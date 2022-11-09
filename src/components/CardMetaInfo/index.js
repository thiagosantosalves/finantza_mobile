import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native'
import { listIconDp } from '../../utils/listIconDp';

import formatNumber from '../../utils/formatNumber';

import { 
    Container,
    TitleStatus,
    BoxInfo,
    AreaIcon,
    Icon,
    AreaInfoCategory,
    CategoryName,
    AreaValue,
    TextValueUsed,
    TextValueTotal,
    AreaPorcentTotal,
    AreaPorcent,
} from './styles';

const CardMetaInfo = (props) => {

    let { width } = Dimensions.get('screen');
    const [url, setUrl] = useState(null);

    useEffect(() => {
        let icon_url = listIconDp.filter(i => i.id === props.data.category.id_icon);

        console.log(icon_url)
        setUrl(icon_url[0].url);
    },[]);
    
    return (
        <Container
            style={{
                width: width - 40,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
            }}
        >
            {props.data.status ? (
                <TitleStatus>Limite de gasto excedido</TitleStatus>
            ) : (
                <TitleStatus>Disponível</TitleStatus>
            )}
            
            <BoxInfo>
                <AreaIcon style={{ backgroundColor: props.data.category.color_hex }} >
                    <Icon source={url} />
                </AreaIcon>

                <AreaInfoCategory>
                    <CategoryName>{props.data.category.name}</CategoryName>
                    <AreaValue>
                        <TextValueUsed>R$ {formatNumber(props.data.usedValue)}</TextValueUsed>
                        <TextValueTotal> /R$ {formatNumber(props.data.value)}</TextValueTotal>
                    </AreaValue>
                </AreaInfoCategory>
            </BoxInfo>

            <AreaPorcentTotal>
                <AreaPorcent style={{ width: `${props.data.porcent}%` }} />
            </AreaPorcentTotal>

        </Container>
    );
}

export default CardMetaInfo;