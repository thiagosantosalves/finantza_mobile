import React, { useState, useEffect } from 'react';
import { listIconDp } from '../../utils/listIconDp';

import formatNumber from '../../utils/formatNumber';

import { 
    Container,
    Title,
    AreaInfoCategory,
    AreaIcon,
    Icon,
    AreaValue,
    Value,
} from './styles';

const CardMetaSelectValue = (props) => {

    const [url, setUrl] = useState(null);

    useEffect(() => {
        let icon_url = listIconDp.filter(i => i.id === props.data.id_icon);
        setUrl(icon_url[0].url);
    },[]);

    return (
        <Container 
            onPress={() => props.onpenModal(props.data.id)}
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
            }}
        >
            <AreaInfoCategory>
                <AreaIcon style={{ backgroundColor: props.data.color_hex }}>
                    <Icon source={url}  />
                </AreaIcon>

                <Title>{props.data.name}</Title>
            </AreaInfoCategory>

            <AreaValue>
                <Value>R$ {formatNumber(props.data.value)}</Value>
            </AreaValue>

        </Container>
    )
}

export default CardMetaSelectValue;