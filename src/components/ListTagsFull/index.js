import React from 'react';

import { Container, Title } from './styles';

const ListTagsFull = ({ data, ...rest }) => {
    return (
        <Container onPress={() => rest.onAction(data.id)}>
            <Title>{data.name}</Title>
        </Container>
    )
}

export default ListTagsFull;