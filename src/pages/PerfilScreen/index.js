import React, { useLayoutEffect, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useAuth } from '../../hooks/auth';

import { 
    Container, 
    ButtonGear,
    AreaPerfil,
    ImagePerfil,
    Avatar,
    AreaNamePerfil,
    Name,
    ButtonPerfil,
    ButtonPerfilText,
    AreaButtonPremiun,
    ButtonPremium,
    IconPremium,
    ButtonPremiumText,
    AreaBody,
    AreaConfig,
    TitleConfig,
    AreaSection,
    TitleSection,
    AreaLine,
    Line,

} from './styles';

const PerfilScreen = ({ navigation, ...rest }) => {

    const { width } = Dimensions.get('window');
    const { user } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonGear activeOpacity={0.8} onPress={() => navigation.navigate('configScreen')}>
                    <Evillcons name="gear" size={30} color="#FFF" />
                </ButtonGear>
            )
        })
    }, [navigation]);

    useEffect(() => {
        console.log(user.avatar);
    }, []);

    return (
        <Container>
            
            <AreaPerfil>

                <ImagePerfil>   
                    {user.Avatar ? (
                         <Avatar source={{ uri: user.avatar.url }} />
                    ) : (   
                        <Ionicons name='person' size={42} color="#2F323D" />
                    )}
                </ImagePerfil>

                <AreaNamePerfil>
                    <Name>{user.name}</Name>
                    <ButtonPerfil activeOpacity={0.8} onPress={() => navigation.navigate('perfilEdit')} >
                        <ButtonPerfilText>Editar perfil</ButtonPerfilText>
                    </ButtonPerfil>
                </AreaNamePerfil>
            </AreaPerfil>

            <AreaButtonPremiun>

                <ButtonPremium activeOpacity={0.8} onPress={() => navigation.navigate('premium')}>
                    <IconPremium source={require('../../assets/icon_premium.png')} />
                    <ButtonPremiumText>Seja Premium</ButtonPremiumText>
                </ButtonPremium>
            
            </AreaButtonPremiun>

            <AreaBody>

                <AreaConfig style={{
                        width: width - 40,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 1.00,
                        elevation: 1,
                    }}
                >
                    <TitleConfig>Configurações</TitleConfig>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('bank')}>
                       
                        <FontAwesome name="bank" size={27} color="#2F323D" /> 
                        <TitleSection>Contas</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('CardCreditScreen')}>
                        <AntDesign name="creditcard" size={32} color="#2F323D" />
                        <TitleSection>Cartões de crédito</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('categoryRevenue')}>
                        <MaterialIcons name="category" size={33} color="#2F323D" />
                        <TitleSection>Categoria de receitas</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('categoryDebit')}>
                        <MaterialIcons name="category" size={33} color="#2F323D" />
                        <TitleSection>Categoria de despesas</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('ConciliationBank')}>
                        <MaterialCommunityIcons name="bank-transfer-out" size={36} color="#2F323D" />
                        <TitleSection>Conciliação Bancária</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('tags')}>
                        <AntDesign name="tags" size={33} color="#2F323D" />
                        <TitleSection>Tags</TitleSection>
                    </AreaSection>                    
                
                </AreaConfig>
            </AreaBody>
        </Container>
    );
}

export default PerfilScreen;