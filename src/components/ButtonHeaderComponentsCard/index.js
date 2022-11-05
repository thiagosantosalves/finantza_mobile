import React from 'react';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { 
    Container,
    AreButton,
} from './styles';

const ButtonHeaderComponents = (props) => {
    return (
        <Container>

            <AreButton style={{
                marginRight: 10
            }} activeOpacity={0.6} onPress={() => props.onPress(1)}>
                <MaterialCommunityIcons name='filter-variant' size={25} color="#FFF" />
            </AreButton>

            <AreButton style={{
                width: 15
            }} activeOpacity={0.6} onPress={() => props.onPress(2)}>
                <Ionicons name='ellipsis-vertical-sharp' size={25} color="#FFF" />
            </AreButton>

        </Container>
    );
}

export default ButtonHeaderComponents;