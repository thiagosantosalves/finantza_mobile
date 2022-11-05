import React from 'react';

import { Container, Title, ImageIcon, AreaLine, Line } from './styles';

const ListInstitutionComponent = (props) => {

    return (
        <>
            <Container activeOpacity={0.8} onPress={() => props.onAction(props.data.id)}>
                <ImageIcon  style={{
                    resizeMode: 'contain',
                }} source={props.data.url} />
                <Title>{props.data.name}</Title>
            </Container>

            <AreaLine>
                <Line />
            </AreaLine>
        </>
        
    )
}

export default ListInstitutionComponent;