import React from 'react';

import { 
    Container,
    AreaTitle,
    Icon,
    Title,
} from './styles';

const CardNotification = (props) => {
    return (
        <Container activeOpacity={0.8} onPress={() => props.getNotification(props.data.id)}>
            <AreaTitle>
                <Icon style={{ backgroundColor: props.data.status ? '#c4c4c4' : '#FF872C' }} />
                <Title>{props.data.description}</Title>
            </AreaTitle>
        </Container>
    )
}

export default CardNotification;