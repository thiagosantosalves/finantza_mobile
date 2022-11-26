import React from 'react';
import Entypo  from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { 
    Container,
    AreButton,
} from './styles';

const ButtonHeaderComponents = (props) => {

    return (
        <Container>

            <AreButton activeOpacity={0.6} onPress={() => props.onPress(1)}>
                <Entypo name='magnifying-glass' size={25} color="#FFF" />
            </AreButton>

            <AreButton activeOpacity={0.6} onPress={() => props.onPress(2)}>
                <MaterialCommunityIcons name='filter-variant' size={25} color="#FFF" />
            </AreButton>

            <AreButton activeOpacity={0.6} onPress={() => props.onPress(3)}>
                <Ionicons name='ellipsis-vertical-sharp' size={25} color="#FFF" />
            </AreButton>

        </Container>
    );
}

export default ButtonHeaderComponents;