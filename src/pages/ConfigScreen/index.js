import React, { useState } from 'react';
import { WToast } from 'react-native-smart-tip';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { 
    Container,
    AreaButton,
    ButtonDelete,
    ButtonDeleteText,
    Check,
    ButtonPrimary,
    ButtonPrimaryText,
    AreaFooter,
    ButtonExit,
    ButtonExitText,
} from './styles';

const ConfigScreen = ({ navigation }) => {

    const { signOut } = useAuth();

    const [activeDelete, setActiveDelete] = useState(false);

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

    async function handlerDeleteprofile() {

        try {
            await api.post('historydelete');
        } catch (error) {
            toatsError('Erro não foi possível conectar ao servidor');
        }
    }

    async function handlerExit() {

        if(activeDelete) {
            handlerDeleteprofile();
        }

        signOut();

        navigation.reset({
            index: 0,
            routes: [{ name: 'SignOutRoutes' }],
        });
    }

    return (
        <Container>

            <AreaButton>

                <ButtonDelete>
                    <ButtonDeleteText>Excluir tudo e começar do zero</ButtonDeleteText>
                </ButtonDelete>

                <Check 
                    style={{ backgroundColor: activeDelete ? '#FF872C': '#FFF' }} 
                    activeOpacity={0.8}
                    onPress={() => {
                        activeDelete ?  setActiveDelete(false) : setActiveDelete(true);
                    }}
                />

            </AreaButton>

            <AreaButton>
                <ButtonPrimary>
                    <ButtonPrimaryText>Indique</ButtonPrimaryText>
                </ButtonPrimary>
            </AreaButton>

            <AreaButton>
                <ButtonPrimary>
                    <ButtonPrimaryText>Avalie</ButtonPrimaryText>
                </ButtonPrimary>
            </AreaButton>

            <AreaFooter>
            
                <ButtonExit
                    activeOpacity={0.8}
                    onPress={() => handlerExit()}
                >
                    <ButtonExitText>SAIR</ButtonExitText>
                </ButtonExit>
            </AreaFooter>


        </Container>
    )
}

export default ConfigScreen;