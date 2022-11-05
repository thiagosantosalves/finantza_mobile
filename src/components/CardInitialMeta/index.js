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

const CardInitialMeta = (props) => {
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
            <TitleCard>Meta</TitleCard>
        </AreaTitle>

    
        <AreaDescription>

            <Description>
                Tenha um controle de suas
                metas, adicione uma meta
                agora.
            </Description>

            <Img source={require('../../assets/card_img/metas.png')} />
        </AreaDescription>

        <ButtonAdd activeOpacity={0.8} onPress={()=> props.handlerMeta()}>
            <ButtonAddTitle>Adicionar meta</ButtonAddTitle>
        </ButtonAdd>
      </Container>
  );
}

export default CardInitialMeta;

