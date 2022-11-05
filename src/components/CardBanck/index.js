import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { listIconAccount } from '../../utils/listIconAccount';
import formatNumber from '../../utils/formatNumber';

import { 
    Container, 
    AreaTitle, 
    TitieCard, 
    AreaIconBanck,
    Icon,
    IconImage,
    AreaNameBanck,
    Title, 
    Description, 
    ButtonAdd, 
    AreaValue,
    ValueText 
} from './styles';

const CardBanck = ({ data }) => {

    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

    const [url, setUrl] = useState(null);

    useEffect(() => {

        const icon = listIconAccount.filter(item => item.id === Number(data.type_id));
        setUrl(icon[0].url);

    }, []);

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
                <TitieCard>Contas</TitieCard>
                <ButtonAdd activeOpacity={0.8} onPress={()=>navigation.navigate('HomeRoutes', {
                            screen: 'Bank'
                        })}>
                    <FontAwesome5 name="plus" size={14} color="#fff" />
                </ButtonAdd>
            </AreaTitle>
            
            <AreaIconBanck>
                <Icon  style={{backgroundColor: data.color_hex}}>
                    <IconImage source={url} />
                </Icon>
                <AreaNameBanck>
                    <Title>{data.name}</Title>
                    <Description>{data.type}</Description>
                </AreaNameBanck>

                <AreaValue>
                    <ValueText>R$ {formatNumber(data.value)}</ValueText>
                </AreaValue>
            </AreaIconBanck> 
            
        </Container>
    )
}

export default CardBanck;



{/* 
            
            
            
            */}