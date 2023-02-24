import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';

import { useAuth } from '../../hooks/auth';

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

    async function handlerDeleteprofile() {
        alert('apaga tudo')
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