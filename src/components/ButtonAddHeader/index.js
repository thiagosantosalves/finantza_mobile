import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import { Container } from './styles';

const ButtonAddHeader = (props) => {
    return (
        <Container activeOpacity={0.8} onPress={props.onPress}>
            <Entypo name="plus" size={30} color="#FFF" />
        </Container>
    );
}

export default ButtonAddHeader;