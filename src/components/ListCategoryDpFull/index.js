import React, { useState, useEffect } from 'react';

import { listIconDp } from '../../utils/listIconDp';

import { 
    Container, 
    Title, 
    Icon,
    IconImage
} from './styles';

const ListCategoryDpFull = (props) => {

    const [icon, setIcon] = useState([]);

    useEffect(() => {
        const response = listIconDp.filter(item => item.id === props.data.id_icon);
        setIcon(response[0].url);
    }, []);

    return (
        <>
            <Container activeOpacity={0.8} onPress={() => props.onAction(props.data.id)} >
            
                <Icon style={{ backgroundColor: props.data.color_hex }}>
                    <IconImage source={icon} />
                </Icon>
                <Title>{props.data.name}</Title>
            </Container>       
        </>
    )
}

export default ListCategoryDpFull;