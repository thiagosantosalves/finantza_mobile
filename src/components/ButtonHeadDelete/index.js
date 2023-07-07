import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

const ButtonAddHeader = (props) => {
    return (
        <Container activeOpacity={0.8} onPress={props.onPress}>
            <MaterialIcons name="delete" size={30} color="#FFF" />
        </Container>
    );
}

export default ButtonAddHeader;