import React from 'react';
import Entypo  from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../../hooks/auth';

import { 
    Container,
    AreButton,

} from './styles';

const ButtonHeaderComponents = () => {

    const { 
        handlerModalReleases, 
        handlerModalFilterReleases,
        handlerModalMenuReleases
    } = useAuth();
   
    return (
        <Container>

            <AreButton activeOpacity={0.6} onPress={() => handlerModalReleases()}>
                <Entypo name='magnifying-glass' size={25} color="#FFF" />
            </AreButton>

            <AreButton activeOpacity={0.6} onPress={() => handlerModalFilterReleases()}>
                <MaterialCommunityIcons name='filter-variant' size={25} color="#FFF" />
            </AreButton>

            <AreButton activeOpacity={0.6} onPress={() => handlerModalMenuReleases()}>
                <Ionicons name='ellipsis-vertical-sharp' size={25} color="#FFF" />
            </AreButton>

        </Container>
    );
}

export default ButtonHeaderComponents;