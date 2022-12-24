import React, { useEffect } from 'react';
import { View } from 'react-native';

import { 
    Container,
    AreaTitle,
    Icon,
    Title,

} from './styles';

const CardNotification = (props) => {

    return (
        <Container>
            <AreaTitle>
                <Icon style={{ backgroundColor: props.data.status ? '#c4c4c4' : '#FF872C' }} />
                <Title>{props.data.name}</Title>
            </AreaTitle>
        </Container>
    )
}

export default CardNotification;