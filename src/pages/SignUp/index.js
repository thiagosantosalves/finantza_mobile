import React, { useState, useCallback } from 'react';
import { WToast } from 'react-native-smart-tip';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Title,
    Input,
    ButtonSignUp,
    ButtonSignUpTitle

} from './styles';

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useAuth();

    const toatsError = (text) => {

        const toastOpts = {
          data: text,
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT, 
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts) 
    }

    const handleSignUp = async () => {

        try {

            await api.post('/user', {
                name,
                email,
                password
            });

            await signIn({
                email,
                password
            }); 
     
            
        } catch (error) {
            console.log(error);
            toatsError('Erro não foi possível conectar ao servidor.');
        }
    };
    

    return(
        <Container>

            <Title>Crie sua conta grátis</Title>

            <Input 
                placeholder="Digite seu nome" 
                placeholderTextColor="#7E7E7E" 
                maxLength={35}
                onChangeText={text => setName(text)} 
                value={name}
                returnKeyType="next" 
            />

            <Input 
                keyboardType="email-address" 
                placeholder="Digite seu email" 
                placeholderTextColor="#7E7E7E" 
                maxLength={35} 
                value={email}
                onChangeText={text => setEmail(text)} 
                returnKeyType="next" 
            />

            <Input  
                placeholder="Digite sua senha" 
                placeholderTextColor="#7E7E7E" 
                secureTextEntry={true} 
                maxLength={20} 
                value={password}
                onChangeText={text => setPassword(text)} 
                returnKeyType="go"  
            />
            
            <ButtonSignUp onPress={handleSignUp}>
                <ButtonSignUpTitle>Cadastro</ButtonSignUpTitle>
            </ButtonSignUp>

        </Container>
    )
}

export default SignUp;