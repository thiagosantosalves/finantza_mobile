import React from 'react';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';

import { 
    Container,
    AreButton,
} from './styles';

const ButtonHeaderComponentsMeta = (props) => {
    return (
        <Container>
            
            <AreButton style={{
            }} activeOpacity={0.6} onPress={() => props.onPress(1)}>
                <MaterialCommunityIcons name='filter-variant' size={25} color="#FFF" />
            </AreButton>

            <AreButton style={{
            }} activeOpacity={0.6} onPress={() => props.onPress(2)}>
                <Entypo name='plus' size={25} color="#FFF" />
            </AreButton>

        </Container>
    );
}

export default ButtonHeaderComponentsMeta;