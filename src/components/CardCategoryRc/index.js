import React from 'react';
import { Dimensions } from 'react-native'; 

import { 
    Container, 
    AreaTitle,
    Icon,
    Title,
    AreaEdit,
    ButtonEdit,
    ButtonEditText,
    IconImage,
 } from './styles';

const CardCategory = ({ data, ...rest }) => {
    const { width } = Dimensions.get('window');

    return (
        <Container style={{
            width: width - 20,
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
                <Icon style={{backgroundColor: data.color_hex}}>
                    <IconImage source={data.icon_info.url} />
                </Icon>
                <Title>{data.name}</Title>
            </AreaTitle>

            <AreaEdit>

                <ButtonEdit activeOpacity={0.8} onPress={() => rest.onEdit(data.id)}>
                    <ButtonEditText>Editar</ButtonEditText>
                </ButtonEdit>

            </AreaEdit>
            
        </Container>
    );
}

export default CardCategory;