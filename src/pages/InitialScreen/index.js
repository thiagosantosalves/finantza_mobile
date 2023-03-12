import React, { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { WToast } from 'react-native-smart-tip';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api'

import { 
    Container, 
    AreaLogo,
    Logo, 
    AreaTitle, 
    Title, 
    AreaDescription, 
    Description,
    AreaButtonGoogle,
    ButttonGoogle,
    LogoGoogle,
    TitleButtonGoogle,
    AreaFooter,
    IconMail,
    AreaButtonMail,
    ButttonMail,
    TitleButtonMail,
    ButtonSignIn,
    TitleSignIn,
    AreaSignIn
} from './styles';

const InitialScreen = ({ navigation }) => {

    const { signIn } = useAuth();

    useEffect(() => {
        GoogleSignin.configure({
          scopes: [],
          webClientId: '329329954626-t524ik17gecl5islvmsq4rsb9gi33o12.apps.googleusercontent.com',
          offlineAccess: true
        });
    }, []); 

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
    
    const signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const users = await api.get('user');
            const res = users.data.filter(e => e.id_google === userInfo.user.id);

            if(res.length > 0) {

                try {
                    await signIn({ email: users.data[0].email, password: userInfo.user.id}); 
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabRoutes' }],
                    });
                } catch (error) {
                    toatsError('Erro não foi possível conectar ao servidor');
                }
            
            } else {

                try {
                    await api.post('/user', {
                        name: userInfo.user.name,
                        email: userInfo.user.email,
                        password: userInfo.user.id,
                        id_google: userInfo.user.id
                        
                    }); 
    
                    await signIn({ email: userInfo.user.email, password: userInfo.user.id }); 
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabRoutes' }],
                    });
                } catch (error) {
                    toatsError('Erro não foi possível conectar ao servidor');
                }
            }

        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            toatsError("Login com google cancelado!");
          } else if (error.code === statusCodes.IN_PROGRESS) {
            toatsError('Erro não foi possível conectar ao servidor');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            toatsError('Erro não foi possível conectar ao servidor');
          } else {
            toatsError('Erro não foi possível conectar ao servidor');
          }
        }
    };

    return(
        <Container>
            <AreaLogo>
                <Logo source={require('../../assets/icon_finantza_white/finantza_Icon_1x.png')} />
            </AreaLogo>
            
            <AreaTitle>
                <Title>Controle suas</Title>
                <Title>finanças de forma</Title>
                <Title>muito simples</Title>
            </AreaTitle>
            
            <AreaDescription>
                <Description>Criei sua conta com</Description>
                <Description>uma das opções abaixo.</Description>
            </AreaDescription>

            <AreaButtonGoogle>
                <ButttonGoogle activeOpacity={0.8} onPress={()=> signInGoogle()}>
                    <LogoGoogle source={require('../../assets/social_icon/google_icon.png')}/>
                    <TitleButtonGoogle>Entrar com Google</TitleButtonGoogle>
                </ButttonGoogle>
            </AreaButtonGoogle>

            <AreaFooter>

            <AreaButtonMail>
                <ButttonMail activeOpacity={0.8} onPress={()=> navigation.navigate('SignUp')}>
                    <IconMail name="email" size={30} color="#000" />
                    <TitleButtonMail>Criar com email</TitleButtonMail>
                </ButttonMail>
            </AreaButtonMail>

            <AreaSignIn>
                <ButtonSignIn activeOpacity={0.8} onPress={()=> navigation.navigate('SignIn') }>
                    <TitleSignIn>Já tenho conta</TitleSignIn>
                </ButtonSignIn>
            </AreaSignIn>
            
            </AreaFooter>
        </Container>
    )
}

export default InitialScreen;