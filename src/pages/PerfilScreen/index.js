import React, { useLayoutEffect } from 'react';
import { Dimensions } from 'react-native';

import Evillcons from 'react-native-vector-icons/EvilIcons';

import { 
    Container, 
    ButtonGear,
    AreaPerfil,
    ImagePerfil,
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
    IconSection,
    TitleSection,
    AreaLine,
    Line,

} from './styles';


const PerfilScreen = ({ navigation, ...rest }) => {

    const { width } = Dimensions.get('window');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonGear activeOpacity={0.8} onPress={() => navigation.navigate('configScreen')}>
                    <Evillcons name="gear" size={30} color="#FFF" />
                </ButtonGear>
            )
        })
    }, [navigation]);

    return (
        <Container>
            
            <AreaPerfil>
                <ImagePerfil source={require('../../assets/perfil.png')} />
                <AreaNamePerfil>
                    <Name>Thiago</Name>
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
                        <IconSection source={require('../../assets/card_img/bank_icon.png')} />
                        <TitleSection>Contas</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('CardCreditScreen')}>
                        <IconSection source={require('../../assets/card_img/credit-card.png')} />
                        <TitleSection>Cartões de crédito</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('categoryRevenue')}>
                        <IconSection source={require('../../assets/card_img/pasta_icon.png')} />
                        <TitleSection>Categoria de receitas</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('categoryDebit')}>
                        <IconSection source={require('../../assets/card_img/pasta_icon.png')} />
                        <TitleSection>Categoria de despesas</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => alert('Abrir tela de planejamento financeiro')}>
                        <IconSection source={require('../../assets/card_img/metas.png')} />
                        <TitleSection>Planejamento financeiro</TitleSection>
                    </AreaSection>

                    <AreaLine>
                        <Line />
                    </AreaLine>

                    <AreaSection activeOpacity={0.8} onPress={() => navigation.navigate('tags')}>
                        <IconSection source={require('../../assets/card_img/tag_icon.png')} />
                        <TitleSection>Tags</TitleSection>
                    </AreaSection>                    
                
                </AreaConfig>

            
            </AreaBody>

        </Container>
    );
}

export default PerfilScreen;