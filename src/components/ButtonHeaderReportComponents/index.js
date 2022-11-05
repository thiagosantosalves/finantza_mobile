import React from 'react';
import Entypo  from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../../hooks/auth';

import { 
    Container,
    AreButton,

} from './styles';

const ButtonHeaderReportComponents = () => {

    const { 
        handlerModalFilterReport,
        handlerModalReport
    } = useAuth();
   
    return (
        <Container>

            <AreButton activeOpacity={0.6} onPress={() => handlerModalFilterReport()}>
                <MaterialCommunityIcons name='filter-variant' size={25} color="#FFF" />
            </AreButton>

            <AreButton activeOpacity={0.6} onPress={() => handlerModalReport()}>
                <Ionicons name='ellipsis-vertical-sharp' size={25} color="#FFF" />
            </AreButton>

        </Container>
    );
}

export default ButtonHeaderReportComponents;