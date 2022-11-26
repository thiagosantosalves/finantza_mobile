import React from 'react';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { 
    Container,
    AreButton,

} from './styles';

const ButtonHeaderReportComponents = (props) => {
   
    return (
        <Container>

            <AreButton activeOpacity={0.6} onPress={() => props.onPress(1)}>
                <MaterialCommunityIcons name='filter-variant' size={25} color="#FFF" />
            </AreButton>

            <AreButton activeOpacity={0.6} onPress={() => props.onPress(2)}>
                <Ionicons name='ellipsis-vertical-sharp' size={25} color="#FFF" />
            </AreButton>

        </Container>
    );
}

export default ButtonHeaderReportComponents;