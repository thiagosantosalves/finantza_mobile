import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { listIconDp } from '../../utils/listIconDp';
import formatNumber from '../../utils/formatNumber';

import { 
  Container,
  AreaTitle,
  TitleCard,
  ButtonAdd,
  StatusText,
  AreaInfo,
  AreaIcon,
  Icon,
  AreaInfoTitle,
  NameCategory,
  AreaValue,
  ValueTotal,
  Valueremain,
  AreaLoading,
  Loading,
} from './styles';

const CardMeta = (props) => {

  const [ statusText, setStatusText ] = useState('');
  const { width } = Dimensions.get('window');
  const [url, setUrl] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {

    if(props.data.status) {
      setStatusText('Limite de gasto exedido');
    } else {
      setStatusText('Disponível');
    }

  }, []);

  useEffect(() => {
    let icon_url = listIconDp.filter(i => i.id === props.data.category.id_icon);
    setUrl(icon_url[0].url);
  },[]);
 
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
            <TitleCard>Meta</TitleCard>
              <ButtonAdd activeOpacity={0.8} onPress={()=> navigation.navigate('MetaRoutes')}>
                  <FontAwesome5 name="plus" size={14} color="#fff" />
              </ButtonAdd>
        </AreaTitle>

        <StatusText>{statusText}</StatusText>

        <AreaInfo>
          <AreaIcon style={{ backgroundColor: props.data.category.color_hex}}>
            <Icon source={url} />
          </AreaIcon>
          
          <AreaInfoTitle>
            <NameCategory>{props.data.category.name}</NameCategory>
            <AreaValue>
              <ValueTotal>R$ {formatNumber(props.data.value)} </ValueTotal>
              <Valueremain> / {formatNumber(props.data.used_value)}</Valueremain>
            </AreaValue>
          </AreaInfoTitle>
        </AreaInfo>

        <AreaLoading>
          <Loading style={{width: `${props.data.porcent}%`}} /> 
        </AreaLoading>

      </Container>
  );
}

export default CardMeta;