import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import { 
    Container,
    AreButton,
} from './styles';

const ButtonHeaderComponentsMeta = (props) => {
    return (
        <Container>
            <AreButton style={{
            }} activeOpacity={0.6} onPress={() => props.onPress(2)}>
                <Entypo name='plus' size={25} color="#FFF" />
            </AreButton>
        </Container>
    );
}

export default ButtonHeaderComponentsMeta;