import React from 'react';

import { Container, Title } from './styles';

const ButtonPatternAdd = ({ title, ...rest }) => {
    return (
        <Container activeOpacity={0.8} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
}

export default ButtonPatternAdd;