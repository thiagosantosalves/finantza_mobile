import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

import { listIconAccount } from '../../utils/listIconAccount';
import formatNumber from '../../utils/formatNumber';

import { 
    Container, 
    Area,
    Title,
    AreaIconTitle,
    AreaIcon,
    Icon,
    IconImage,
    AreaTitle,
    Description,
    AreaValue,
    ValueText,
    AreaArchive,
    ButtonArchive,
    ArchiveText,
} from './styles';


const CardBankScreen = (props) => {
    const { width } = Dimensions.get('window');
    const [url, setUrl] = useState(null);

    useEffect(() => {

        const icon = listIconAccount.filter(item => item.id === Number(props.data.type_id));
        setUrl(icon[0].url);

    }, []);

    return (
        <Container style={{
            width: width - 40,
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
            <Area>
                <AreaIconTitle>
                    <AreaIcon>
                        <Icon style={{ backgroundColor: props.data.color_hex }}>
                            <IconImage source={url} />
                        </Icon>
                    </AreaIcon>

                    <AreaTitle>
                        <Title>{props.data.name}</Title>
                        <Description>{props.data.type}</Description>
                    </AreaTitle>
                </AreaIconTitle>
                
                {props.data.id === 1 ? (
                    <AreaValue style={{ marginBottom: 20 }}>     
                        <ValueText>R$ {formatNumber(props.data.value)}</ValueText>
                    </AreaValue>
                ) : (
                    <AreaValue>     
                        <ValueText>R$ {formatNumber(props.data.value)}</ValueText>
                    </AreaValue>
                )}
           
            </Area>

            <AreaArchive>
                {props.data.id === 1 ? (
                    <>
                    </>
                ) : (
                   <>
                        <ButtonArchive activeOpacity={0.8} onPress={() => props.onEdite(props.data.id)}>
                            <ArchiveText>Editar</ArchiveText>
                        </ButtonArchive> 
                        
                        <ButtonArchive activeOpacity={0.8} onPress={() => props.onArquive(props.data.id)}>
                            <ArchiveText>Arquivar</ArchiveText>
                        </ButtonArchive>
                   </>
                )}
            </AreaArchive>
        
        </Container>
    )
}

export default CardBankScreen;