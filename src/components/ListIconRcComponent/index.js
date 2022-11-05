import React from 'react';

import { Container, AreaIcon, Icon } from './styles';

const ListIconRcComponent = (props) => {
    return (
        <Container>
            <AreaIcon 
                onPress={() => props.onPress(props.data.id)}
                activeOpacity={0.8}
                style={{ backgroundColor: '#cecece' }}
            >
                <Icon source={props.data.url} />
            </AreaIcon>
        </Container>
    )
}

export default ListIconRcComponent;