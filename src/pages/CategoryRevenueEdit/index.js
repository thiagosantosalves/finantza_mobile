import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';

import PatternInput from '../../components/PatternInput';
import ButtonPatternAdd from '../../components/ButtonPatternAdd';

import ListColorComponent from '../../components/ListColorComponent';
import ListIconRcComponent from '../../components/ListIconRcComponent';

import { listIconRc } from '../../utils/listIconRc';
import { listColor } from '../../utils/listColor';

import api from '../../services/api';


import { 
    Container,
    SectionArea,
    Title,
    AreaIcon,
    AreaUrl,
    IconImageUrl,
    IconImage,
    Icon,
    TitleIcon,
    AreaButton,

    ModalArea,
    BodyModalColor,
    BodyModalIcon,
    ListIconModal,
    ListColorModal

} from './styles';

const CategoryRevenueEdit = ({ navigation, route, ...rest }) => {

    const [name, setName] = useState(route.params.category.name);

    const [ urlIcon, setUrlIcon ] = useState(null);

    const [ color_hex, setColor_hex ] = useState(route.params.category.color_hex);

    const [ modalColor, setModalColor ] = useState(false);
    const [ modalIcon, setModalIcon ] = useState(false);

    useEffect(() => {
        const url = listIconRc.filter(item => item.id === route.params.category.id_icon)
        setUrlIcon(url[0]);
    }, []);

    const handlerIcon = (id) => {  
        const iconInfo = listIconRc.filter(item => item.id === id);

        setUrlIcon(iconInfo[0]);
        setModalIcon(false);
    }

    const handlerColor = (item) => {
        setColor_hex(item.nameColor);
        setModalColor(false);
    } 

    const handleCreate = async () => {
        
        if(name && urlIcon && color_hex) {

            const category = {
                name: name,
                id_icon: urlIcon.id,
                color_hex: color_hex
            }

            await api.put(`rccategory/${route.params.category.id}`, category);

            navigation.navigate("categoryRevenue");

        } else {    
            alert('Preencha os dados ');
        }
    }

    return (
        <Container>

            <SectionArea>

                <Title>Nome da categoria</Title>

                <PatternInput 
                    placeholder="Digite o nome da categoria"
                    placeholderTextColor="#7E7E7E"
                    maxLength={35}
                    onChangeText={(name)=>setName(name)}
                    value={name} 
                />

            </SectionArea>

            <SectionArea>

                <Title>Icone</Title>

                <AreaIcon activeOpacity={0.8} onPress={() => setModalIcon(true)}>

                    {urlIcon ? (
                        <AreaUrl style={{backgroundColor: '#cecece'}}>
                            <IconImageUrl  source={urlIcon.url} />
                        </AreaUrl>
                        
                    ): (
                        <IconImage  source={require('../../assets/card_img/icontrasejado.png')} />
                    )}
                    <TitleIcon>Selecione um icone</TitleIcon>
                
                </AreaIcon>

            </SectionArea>

            <SectionArea>

                <Title>Cor</Title>

                <AreaIcon activeOpacity={0.8} onPress={() => setModalColor(true)}>

                    {color_hex ? (
                        <Icon style={{ backgroundColor: color_hex }} />
                    ) : (
                        <IconImage style={{marginLeft: 12}} source={require('../../assets/card_img/icontrasejado.png')} />
                    )}
                    
                    <TitleIcon>Selecione uma cor</TitleIcon>

                </AreaIcon>
              
            </SectionArea>

            <AreaButton>
                <ButtonPatternAdd title="Concluir" onPress={() => handleCreate()} />
            </AreaButton>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalIcon}
                onRequestClose={()=>setModalIcon(false)}
                >
                <ModalArea>
                    <BodyModalIcon>
                        <ListIconModal
                            data={listIconRc} 
                            keyExtractor={item => item.id}
                            numColumns={6}
                            renderItem={({item}) => <ListIconRcComponent
                                data={item} 
                                onPress={(item) => handlerIcon(item)}
                            /> }
                        />
                    </BodyModalIcon>
                </ModalArea>
            </Modal>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalColor}
                onRequestClose={()=>setModalColor(false)}
                >
                <ModalArea>
                    <BodyModalColor>
                        <ListColorModal
                            data={listColor} 
                            keyExtractor={item => item.id}
                            numColumns={6}
                            renderItem={({item}) => <ListColorComponent 
                                data={item} 
                                onPress={(item) => handlerColor(item)}
                            /> }
                        />
                    </BodyModalColor>
                </ModalArea>
            </Modal>
        </Container>
    );
}

export default CategoryRevenueEdit;