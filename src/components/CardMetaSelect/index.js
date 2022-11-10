import React, { useState, useEffect } from 'react';
import { listIconDp } from '../../utils/listIconDp';

import { 
    Container,
    AreaCategory,
    AreaIcon,
    Icon,
    AreaTitle,
    Title,
    AreaButton,
    ButtonSelect
} from './styles';

const CardMetaSelect = (props) => {

    const [url, setUrl] = useState(null);
    const [selectButton, setSelecButton] = useState(false);

    useEffect(() => {
        let icon_url = listIconDp.filter(i => i.id === props.data.id_icon);
        setUrl(icon_url[0].url);
    },[]);
    
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
            <AreaCategory>
                <AreaIcon style={{ backgroundColor: props.data.color_hex }}>
                    <Icon source={url}  />
                </AreaIcon>

                <AreaTitle>
                    <Title>{props.data.name}</Title>
                </AreaTitle>
            </AreaCategory>

            <AreaButton activeOpacity={0.8} onPress={() => {
                if(!selectButton){
                    setSelecButton(true);
                    props.handlerCategory(props.data.id);
                }

                if(selectButton) {
                    props.deleteId(props.data.id);
                    setSelecButton(false);
                }
            }}>

                <ButtonSelect style={{ backgroundColor:  selectButton ?  '#FF872C' : '#FFFF' }}  />
            
            </AreaButton>

        </Container>
    );
}

export default CardMetaSelect;