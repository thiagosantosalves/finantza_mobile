import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import KeyboardPattern from '../../components/KeyboardPattern';
import transformNumber from '../../utils/transformNumber';

import { 
  Container,
  Header,
  AreaValue,
  BodyKeyboard,
  TextValue,
  AreaButton,
  ButtonCreate,
} from './styles';

const ScreenCredit = ({ navigation }) => {

  const [number, setNumber] = useState('0,00');

  const AddValue = (n) => {
    let s = '';
    
    if(number == '0,00'){
        setNumber('');
    }

    if(number.length >= 14) {
    } else {
      s = number + n;

      let v = s.replace(/\D/g, '');
      v = (v/100).toFixed(2) + '';
      v = v.replace(".", ",");
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
      v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
      s = v;
      setNumber(s);
    }
  }

  const removeValue = () => {
    let s = '';
    let v = number.replace(/\D/g, '');
    let len = v.length - 1;     
    let newNumber = v.substring(0, len);   
    v = newNumber;
    v = (v/100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    s = v;
    setNumber(s);
  }

  const getNumber = () => {
    
    const value = transformNumber(number);

    if(value != 0.00) {
      navigation.navigate('ScreenSetCredit', { value: value });
    } else {
     
    }
  }


  return(
    <Container>

      <Header>
        <AreaValue>
          <TextValue>R$</TextValue>
          <TextValue>{number}</TextValue>
        </AreaValue>
      </Header> 

      <BodyKeyboard>

        <KeyboardPattern 
          getValue={(n) => AddValue(n)}
          remove={()=> removeValue()}
          colorNUmber="#0BCECE"
        /> 

      </BodyKeyboard>

     <AreaButton>
 
        <ButtonCreate activeOpacity={0.8} onPress={() => getNumber()}>
          <FontAwesome name="check" size={30} color="#FFF" />
        </ButtonCreate>

      </AreaButton>

    </Container>
  )
}

export default ScreenCredit;