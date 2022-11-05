import React from 'react';

import { 
    Container, 
    AreaTitle,
    TitleCard, 
    AreaDescription, 
    Description, 
    Img, 
    ButtonAdd, 
    ButtonAddTitle  
} from './styles';

const CardInitial = (props) => {
  return (
      <Container style={{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    }}>

        <AreaTitle>
            <TitleCard>Cartões</TitleCard>
        </AreaTitle>

    
        <AreaDescription>

            <Description>
                Tenha um histórico a longo
                prazo do seu cartão de
                crédito.
            </Description>

            <Img source={require('../../assets/card_img/credit-card.png')} />
        </AreaDescription>

        <ButtonAdd activeOpacity={0.8} onPress={()=> props.handlerCard()}>
            <ButtonAddTitle>Adicionar cartões</ButtonAddTitle>
        </ButtonAdd>
      </Container>
  );
}

export default CardInitial;

