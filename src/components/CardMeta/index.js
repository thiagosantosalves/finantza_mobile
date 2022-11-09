import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import { 
  Container,
  AreaTitle,
  TitleCard,
  ButtonAdd,
  StatusText,
  AreaInfo,
  Icon,
  AreaInfoTitle,
  NameCategory,
  AreaValue,
  ValueTotal,
  Valueremain,
  AreaLoading,
  Loading,
} from './styles';

const CardMeta = ({ data }) => {

  const [ statusText, setStatusText ] = useState('Disponível');
  const [negativo, setNegativo] = useState(true);
  const [isFull, setIsFull] = useState(false);

  const { width } = Dimensions.get('window');

  let valueUsed = data.valueremain;
  let valueLimite = data.valueTotal;

  let atual = valueUsed;
  let total = valueLimite;
  
  let percentual = atual / total;
  percentual = percentual * 100;

  useEffect(()=> {

    if(Number(valueUsed) >= Number(valueLimite)) {

      setStatusText('Limite de gasto excedido');
      setIsFull(true);
      percentual = 100;
      
    } else {
      setStatusText('Disponível');
      setIsFull(false);
    }

    if(data.valueLimite < 0) {
      setNegativo(true);
    } else {
      setNegativo(false);
    }
  });

  return (
      <Container style={{
          width: width * 0.8 - 20,
          marginHorizontal: 10,

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
            <TitleCard>Metas Teste</TitleCard>

            <ButtonAdd activeOpacity={0.8} onPress={()=>alert('abre a screen de cadastro de meta')}>
                <FontAwesome5 name="plus" size={14} color="#fff" />
            </ButtonAdd>
        </AreaTitle>

        <StatusText>{statusText}</StatusText>

        <AreaInfo>
          <Icon style={{ backgroundColor: data.iconColor }} />
          <AreaInfoTitle>
            <NameCategory>{data.category}</NameCategory>
            <AreaValue>
              <ValueTotal>R$ {data.valueTotal} </ValueTotal>
              <Valueremain> / {`R$ `+data.valueremain}</Valueremain>
            </AreaValue>
          </AreaInfoTitle>
        </AreaInfo>

        <AreaLoading>
          <Loading style={{width:isFull? '100%': percentual+'%'}} />
        </AreaLoading>

      </Container>
  );
}

export default CardMeta;