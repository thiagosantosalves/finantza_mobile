import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Alert, Dimensions } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import PatternInput from '../../components/PatternInput';
import ListColorComponent from '../../components/ListColorComponent';
import ButtonPatternAdd from '../../components/ButtonPatternAdd';

import { listColor } from '../../utils/listColor';

import api from '../../services/api';

import { 
    Container, 
    Title,
    AreaInput,
    AreaIcon,
    Icon,
    TextDescription,
    ModalArea,
    BodyModal,
    TitleModal,
    AreaIconModal,
    BodyModalColor,
    ListColorModal,
    IconColorAtive,
    AreaButtonAdd
} from './styles';


const BankEdit = ({ route, navigation }) => {

    const [ name, setName ] = useState(route.params.account.name);
    const [ type, setType ] = useState(parseInt(route.params.account.type_id));
    const [typeName, setTypeName] = useState(route.params.account.type);
    const [ color_hex, setColor_hex ] = useState(route.params.account.color_hex);
    const [ modalTypeBank, setModalTypeBank ] = useState(false);
    const [ modalColor, setModalColor ] = useState(false);
    
    const handlerColor = (item) => {
        setColor_hex(item.nameColor);
        setModalColor(false);
    } 
          
    const createAccount = async () => {

        const account = {
            name,
            type_id: type,
            type: typeName,
            color_hex,
        }

        if(name && type && color_hex) {

            try {
                await api.put('/account/'+route.params.account.id, account);

                navigation.navigate('bank');
            } catch (error) {
                console.log(error);
            }
            
        } else {
            Alert.alert(
                'Erro, campo não foram preenchidos.', 
                'Os campos do cadastro de contas são obrigatório!', 
            );
        }
    }


    return (
        <Container>

            <AreaInput>
                <Title>Nome da categoria</Title>

                <PatternInput 
                    placeholder="Digite o nome da  sua conta" 
                    placeholderTextColor="#7E7E7E"
                    maxLength={35}
                    onChangeText={(name)=>setName(name)}
                    value={name} 
                />
         
            </AreaInput>

            <AreaInput>
                <Title>Tipo de conta</Title>

                <AreaIcon activeOpacity={0.8}  onPress={()=>setModalTypeBank(true)}>
                    {type === 1 &&
                        <>
                            <MaterialCommunityIcons name="bank" size={32} color="#000" />
                            <TextDescription style={{color: '#2F323D'}}>Conta corrente</TextDescription>
                        </>
                       
                    }

                    {type === 2 &&
                        <>
                            <FontAwesome5 name="piggy-bank" size={32} color="#000" />
                            <TextDescription style={{color: '#2F323D'}}>Poupança</TextDescription>
                        </>
                       
                    }

                    {type === 3 &&
                        <>
                            <Entypo name="wallet" size={32} color="#000" />
                            <TextDescription style={{color: '#2F323D'}}>Outros</TextDescription>
                        </>
                       
                    }

                    {type === null &&
                        <>
                            <Icon source={require('../../assets/card_img/icontrasejado.png')} />
                            <TextDescription>Selecionar o tipo de conta</TextDescription>
                        </>
                    }
                   
                </AreaIcon>
            </AreaInput>

            <AreaInput>
                <Title>Cor</Title>

                <AreaIcon activeOpacity={0.8} onPress={()=>setModalColor(true)}>
                    {color_hex === null &&
                        <>
                            <Icon source={require('../../assets/card_img/icontrasejado.png')} />
                            <TextDescription>Selecionar cor da conta</TextDescription>
                        </>
                        
                    }
                    {color_hex &&
                        <>
                            <IconColorAtive style={{ backgroundColor: color_hex }}  />
                            <TextDescription style={{ color: '#2F323D' }}>Cor selecionada</TextDescription>
                        </>
                    }
                    
                </AreaIcon>
            </AreaInput>

            <AreaButtonAdd>
                <ButtonPatternAdd title="Concluir" onPress={() => createAccount()} />
            </AreaButtonAdd>
            
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalTypeBank}
                onRequestClose={()=>setModalTypeBank(false)}
                >
                <ModalArea>
                    <BodyModal>

                        <AreaIconModal  activeOpacity={0.8} onPress={()=>{
                            setType(1);
                            setTypeName('Conta corrente');
                            setModalTypeBank(false);
                        }}>
                            <MaterialCommunityIcons name="bank" size={30} color="#000" />
                            <TitleModal>Conta corrente</TitleModal>
                        </AreaIconModal>

                        <AreaIconModal activeOpacity={0.8} onPress={()=>{
                            setType(2);
                            setTypeName('Poupança');
                            setModalTypeBank(false);
                        }}>
                            <FontAwesome5 name="piggy-bank" size={30} color="#000" />
                            <TitleModal>Poupança</TitleModal>
                        </AreaIconModal>

                        <AreaIconModal activeOpacity={0.8} onPress={()=>{
                            setType(3);
                            setTypeName('Outros');
                            setModalTypeBank(false);
                        }}>
                            <Entypo name="wallet" size={30} color="#000" />
                            <TitleModal>Outros</TitleModal>
                        </AreaIconModal>

                    </BodyModal>
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
    )
}

export default BankEdit;