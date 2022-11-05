import React, { useState, useEffect } from 'react';

import { listIconAccount } from '../../utils/listIconAccount';

import { 
    Container, 
    Title, 
    Icon, 
    IconImage
} from './styles';

const ListBankFull = (props) => {

    const [idIcon, setIdIcon] = useState(null);

    useEffect(() => {
        const res = listIconAccount.filter(e => e.id === Number(props.data.type_id));
        setIdIcon(res[0].url)
    }, []);

    return (
        <>
            <Container activeOpacity={0.8} onPress={() => props.onAction(props.data.id)} >
                <Icon style={{ backgroundColor: props.data.color_hex }}>
                    <IconImage source={idIcon} />
                </Icon>
                <Title>{props.data.name}</Title>
            </Container> 
        </>
        
    )
}

export default ListBankFull;