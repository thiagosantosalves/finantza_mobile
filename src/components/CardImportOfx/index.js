import React from 'react';

import formatNumber from '../../utils/formatNumber';

import { 
    Container,
    AreaDescription,
    IconType,
    DateText,
    ButtonDescription,
    Description,
    AreaValue,
    ValueText,
    AreaIconCategory,
    AreaIcon,
    Icon,
    IconCategory,
    NameCategory,
} from './styles';

const CardImportOfx = (props) => {

    return  (
        <Container>
            
            <AreaDescription>

                <IconType style={{ backgroundColor: props.data.type === 0 ? '#E83F5B' : '#0BCECE' }} />
                <DateText>{props.data.day+'/'+props.data.month+'/'+props.data.year}</DateText>
                <ButtonDescription onPress={() => props.handlerDescription(props.data.id)}>
                    <Description>{props.data.description}</Description>
                </ButtonDescription>
               
                <AreaValue>
                    <ValueText style={{ color: props.data.type === 0 ? '#E83F5B' : '#0BCECE' }}>R$ {formatNumber(props.data.value)}</ValueText>
                </AreaValue>
                
            </AreaDescription>

            {props.data.category_id ? (
                <AreaIconCategory onPress={() => props.hadlerCategory(props.data.id, props.data.type)}>
                   <AreaIcon style={{ backgroundColor: props.data.category_hex }}>
                    <Icon source={props.data.category_icon} />
                   </AreaIcon>

                    <NameCategory>{props.data.category_name}</NameCategory>    
                </AreaIconCategory>

            ) : (
                <AreaIconCategory onPress={() => props.hadlerCategory(props.data.id, props.data.type)}>
                    <IconCategory source={require('../../assets/card_img/icontrasejado.png')} />
                    <NameCategory>Selecione uma categoria</NameCategory>    
                </AreaIconCategory>
            )}
           
          
        </Container>
    )
}

export default CardImportOfx;