import React from 'react';

import { Container, AreaIcon } from './styles';

const ListColorComponent = (props) => {
    return (
        <Container>
            <AreaIcon 
                onPress={() => props.onPress(props.data)}
                activeOpacity={0.8}
                style={{backgroundColor: props.data.nameColor}}
            >
            </AreaIcon>
        </Container>
    )
}

export default ListColorComponent;