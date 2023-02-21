import React from 'react';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { 
    Container,
    AreButton,
} from './styles';

const ButtonHeaderComponents = (props) => {
    return (
        <Container>
           {/*  <AreButton style={{
                width: 15
            }} activeOpacity={0.6} onPress={() => props.onPress(2)}>
                <Ionicons name='ellipsis-vertical-sharp' size={25} color="#FFF" />
            </AreButton> */}
        </Container>
    );
}

export default ButtonHeaderComponents;