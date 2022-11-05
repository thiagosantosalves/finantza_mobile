import React from 'react';
import { Dimensions } from 'react-native';

import { 
    Container, 
    AreaTitle,
    Icon,
    Title,
    ButtonDelete,
    ButtonDeleteText,
 } from './styles';

const ListTagsComponent = ({ data, ...rest }) => {

    const { width } = Dimensions.get('window');

    return (
        <Container style={{
            width: width - 20,
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
                <Icon />
                <Title>{data.name}</Title>
            </AreaTitle>

            <ButtonDelete activeOpacity={0.8} onPress={() => rest.onDelete(data.id)}>
                <ButtonDeleteText>Excluir</ButtonDeleteText>
            </ButtonDelete>
            
        </Container>
    )
}

export default ListTagsComponent;