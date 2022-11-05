import React, { useState } from 'react';

import { Container, Title, AreaIcon, Icon, AreaLine, Line } from './styles';

import { institution } from '../../utils/institution';

const ListCardCreditFull = (props) => {

    const iconInfo = institution.filter(e => e.id === props.data.id_institution);

    return (
        <>
            <Container activeOpacity={0.8} onPress={() => props.onAction(props.data.id)} >
                <AreaIcon>
                    <Icon source={iconInfo[0].url} />
                </AreaIcon>
                
                <Title>{props.data.name}</Title>
            </Container>

            <AreaLine>
                <Line />
            </AreaLine>       
        </>
    )
}

export default ListCardCreditFull;