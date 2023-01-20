import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
    Container,
} from './styles';

const Loading =   () => {
    return(
        <Container>
            <ActivityIndicator size={37} color="#FFF" />
        </Container>
    )
}

export default Loading;