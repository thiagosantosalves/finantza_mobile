import React, { useState, useCallback } from 'react';
import { WToast } from 'react-native-smart-tip';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Title,
    Input,
    ButtonSignUp,
    ButtonSignUpTitle
} from './styles';

const SignIn = ({ navigation }) => {

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

    const handleSignIn = useCallback( async () => {
 
        try {
    
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });
    
            await schema.validate({ email, password }, {
                abortEarly: false
            });
    
            await signIn({ email, password }); 

            navigation.reset({
                index: 0,
                routes: [{ name: 'TabRoutes' }],
            });
    
        }catch(err) {
            toatsError('Ocorreu um erro ao fazer login, cheque as credencias.');
        }   

    }, [email, password]); 
    
    

    return(
        <Container>

            <Title>Acesse sua conta</Title>

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
            
            <ButtonSignUp activeOpacity={0.8} onPress={handleSignIn}>
                <ButtonSignUpTitle>Login</ButtonSignUpTitle>
            </ButtonSignUp>

        </Container>
    )
}

export default SignIn;