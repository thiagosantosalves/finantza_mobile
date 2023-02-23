import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { WToast } from 'react-native-smart-tip';

import { 
    Container,
    AreaInfoPremium,
    AreaTitleInfoPremium,
    TitlePremium,
    AreaDescription,
    DescriptionText,
    AreaInfoPayment,
    InfoPayment,
    ButtonCircle,
    Circle,
    AreaspacePayment,
    InfoPaymentAreaText,
    InfoPaymentText,
    InfoPaymentSubText,
    TextValue,
    AreaButtonPayment,
    ButtonPayment,
    ButtonPaymentText,
    AreaInfoPlan,
    AreaTitleInfoPlan,
    TitleInfoPlan,
    SubTitleInfoPlan,
    CardInfoPlan,
    AreaCardInfoPlanTitle,
    AreaCardInfo,
    AreaCardFree,
    CardInfoPlanTitle,
    AreaCardPremium,
    CardInfoPlanTextPremium,
    InfoPlanDescription,
    AreaDescriptionPlan,
    DescriptionPlan,
    AreaTermsOfUse,
    ButtonTermsOfUseText,
    TermsOfUseText,
    AreaImage,
    ImagePremium,
} from './styles';

const PremiumScreem = () => {

    const [typePlain, setTypePlain] = useState(1);

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

    async function handlerPayment() {
        toatsError('assinou opção '+typePlain);
    }

    return (
        <Container>
            
            <AreaInfoPremium>

                <AreaTitleInfoPremium>
                    <TitlePremium>Versão Premium</TitlePremium>
                </AreaTitleInfoPremium>

                <AreaDescription>
                    <DescriptionText>Você no controle das suas  finanças,</DescriptionText>
                    <DescriptionText>sem limitações.</DescriptionText>
                </AreaDescription>

                <AreaDescription>
                    <DescriptionText>Vire premium no finantiza e deixe sua vida</DescriptionText>
                    <DescriptionText>financeira organizada!</DescriptionText>
                </AreaDescription>

                <AreaDescription>
                    <DescriptionText>Cancele a qualquer momento na App Store.</DescriptionText>
                </AreaDescription>

                <AreaInfoPayment>

                    <InfoPayment
                        activeOpacity={0.8}
                        onPress={() => setTypePlain(1)}
                    >

                        <ButtonCircle>
                            {typePlain === 1 &&
                                <Circle />
                            }
                        </ButtonCircle>

                        <AreaspacePayment>
                            <InfoPaymentAreaText>
                                <InfoPaymentText>Plano Anual</InfoPaymentText>
                                <InfoPaymentSubText>60% DE DESCONTO</InfoPaymentSubText>
                            </InfoPaymentAreaText>

                            <TextValue>R$ 64,08</TextValue>
                        </AreaspacePayment>
                    
                    </InfoPayment>

                    <InfoPayment
                        activeOpacity={0.8}
                        onPress={() => setTypePlain(2)}
                    >

                        <ButtonCircle>

                            {typePlain === 2 &&
                                <Circle />
                            }

                        </ButtonCircle>

                        <AreaspacePayment>
                            <InfoPaymentAreaText>
                                <InfoPaymentText>Plano Mensal</InfoPaymentText>
                                <InfoPaymentSubText>SEM DESCONTO</InfoPaymentSubText>
                            </InfoPaymentAreaText>

                            <TextValue>R$ 8,90</TextValue>
                        </AreaspacePayment>

                    </InfoPayment>

                    <AreaButtonPayment>
                        <ButtonPayment activeOpacity={0.8} onPress={() => handlerPayment()}>
                            <ButtonPaymentText>ATIVAR VERSÂO PREMIUM</ButtonPaymentText>
                        </ButtonPayment>
                    </AreaButtonPayment>


                </AreaInfoPayment>

            </AreaInfoPremium>

            <AreaInfoPlan>

                <AreaTitleInfoPlan>
                    <TitleInfoPlan>Plano Free X </TitleInfoPlan>
                    <SubTitleInfoPlan>Premium</SubTitleInfoPlan>
                </AreaTitleInfoPlan>
        
                <CardInfoPlan>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo>
                            <CardInfoPlanTitle>Funcionalidades</CardInfoPlanTitle>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <CardInfoPlanTitle>Free</CardInfoPlanTitle>
                        </AreaCardFree>
                        <AreaCardPremium>
                            <CardInfoPlanTextPremium>Premium</CardInfoPlanTextPremium>
                        </AreaCardPremium>
                        
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo>
                            <InfoPlanDescription>Contas Bancárias</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>2</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#2C3CD1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo style={{ backgroundColor: '#E7E7E7' }}>
                            <InfoPlanDescription>Cartões de Crédito</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>1</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#7D85D1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo>
                            <InfoPlanDescription>Personalizar as Categorias</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>X</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#2C3CD1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo style={{ backgroundColor: '#E7E7E7' }}>
                            <InfoPlanDescription>Alertas</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>X</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#7D85D1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo>
                            <InfoPlanDescription>Tags</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>3</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#2C3CD1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo style={{ backgroundColor: '#E7E7E7' }}>
                            <InfoPlanDescription>Metas mensais</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>1</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#7D85D1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo>
                            <InfoPlanDescription>Anexos</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>5</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#2C3CD1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo style={{ backgroundColor: '#E7E7E7' }}>
                            <InfoPlanDescription>Metas mensais</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>1</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#7D85D1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo>
                            <InfoPlanDescription>Exportar relatórios</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>X</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#2C3CD1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                    <AreaCardInfoPlanTitle>
                        <AreaCardInfo style={{ backgroundColor: '#E7E7E7' }}>
                            <InfoPlanDescription>Conciliação bancária</InfoPlanDescription>
                        </AreaCardInfo>
                        <AreaCardFree>
                            <InfoPlanDescription>X</InfoPlanDescription>
                        </AreaCardFree>
                        <AreaCardPremium style={{ backgroundColor: '#7D85D1' }}>
                            <Entypo name="infinity" size={23}  color="#FFF"  />
                        </AreaCardPremium>
                    </AreaCardInfoPlanTitle>

                </CardInfoPlan>

                <AreaDescriptionPlan>
                    <DescriptionPlan>O pagamento será cobrado por meio da sua</DescriptionPlan>
                    <DescriptionPlan>conta Google na confirmação da assinatura.</DescriptionPlan>
                    <DescriptionPlan>Você pode administrar sua assinatura através</DescriptionPlan>
                    <DescriptionPlan>das configurações da sua conta.</DescriptionPlan>
                </AreaDescriptionPlan>
                
                <AreaTermsOfUse>

                    <ButtonTermsOfUseText 
                        activeOpacity={0.8}
                        onPress={() => toatsError("termo de uso")}
                    >
                        <TermsOfUseText>Termos de uso</TermsOfUseText>
                    </ButtonTermsOfUseText>
                    
                    <ButtonTermsOfUseText
                        activeOpacity={0.8}
                        onPress={() => toatsError("Política de privacidade")}
                    >
                        <TermsOfUseText>Política de privacidade</TermsOfUseText>
                    </ButtonTermsOfUseText>
                  
                </AreaTermsOfUse>

                <AreaImage>
                    <ImagePremium source={require('../../assets/image_screem_premium.png')} />
                </AreaImage> 

            </AreaInfoPlan>
        </Container>
    )
}

export default PremiumScreem;