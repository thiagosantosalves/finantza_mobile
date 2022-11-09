import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { WToast } from 'react-native-smart-tip';

import { listIconDp } from '../../utils/listIconDp';
import formatNumber from '../../utils/formatNumber';

import CardMetaSelectValue from '../../components/CardMetaSelectValue';
import ButtonPatternAdd from '../../components/ButtonPatternAdd';

import api from '../../services/api';

import { 
    Container,
    AreaTextInfo,
    Title,
    Description,
    AreaTextValue,
    ValueTotal,
    ValueText,
    AreaBody,
    List,
    AreaButon,
    AreaModal,
    BodyModal,
    AreaTitleModal,
    TitleModal,
    AreaModalInput,
    InputModal,
    AreaCategoryModal,
    AreaIconModal,
    Icon,
    TextCategoryModal,
    AreaButtonModal,
    ButtonModalCancel,
    ButtonModalCancelText,
    ButttonModalFinish,
    ButttonModalFinishText,
} from './styles';


const MetaCreate = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [value, setValue] = useState(0);
    const [limit, setLimit] = useState(0);
    const [limitFormat, setLimitFormat] = useState('R$ 0,00');
    const [colorCategory, setColorCategory] = useState('');
    const [iconCategory, setIconCategory] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        let data = route.params.data;
        setData(data);
    }, []);

    const toatsError = (text) => {
        const toastOpts = {
          data: text,
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT, 
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
    }

    const handlerId = (info) => {
        setId(info);

        let category = data.filter(e => e.id === info)
        let icon = listIconDp.filter(e => e.id === category[0].id_icon)

        setIconCategory(icon[0].url);
        setColorCategory(category[0].color_hex);
        setNameCategory(category[0].name);

        setModal(true);
    }

    const transformNumber = (value) => {
        let v = value.replace(/\D/g, '');
        v = (v/100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        value = v;

        setLimitFormat("R$  "+value);
    }

    const setInputLimit = (number) => {
        const value = number.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');

        const v = value.replace('R$', '');
        let b = parseInt(v);
        b = (b/100).toFixed(2);

        setLimit(b);

        transformNumber(value);
    }

    const handlerValueCategory = () => {

        let val = limit;
        let total = 0;

        console.log(limit);
        
        let res = data.map(e => {

            if(e.id === id) {
                total = Number(e.value) + Number(val);

                let res = {
                    id: e.id,
                    name: e.name,
                    color_hex: e.color_hex,
                    id_icon: e.id_icon,
                    value: total,
                }

                return res
            } else {
                let res = {
                    id: e.id,
                    name: e.name,
                    color_hex: e.color_hex,
                    id_icon: e.id_icon,
                    value: e.value,
                }

                return res
            }
        }); 
        
        let sum = res.reduce((a, b) => a + b.value, 0);
        setValue(sum);

        setData(res);
        setLimitFormat('R$ 0,00');
        setModal(false);
    }

    const handlerMeta = async () => {

        let date = new Date();
        let month = date.getMonth() + 1; 
        let year = date.getFullYear();

        let newData = data.map(e => {

            let info = {
                month,
                year,
                id_category: e.id,
                value: e.value,
                used_value: 0,
                porcent: 0,
                status: false
            }

            return info
        });

        let isValue = data.filter(e => e.value === 0);

        if(isValue.length > 0) {
            toatsError("Valor da categoria selecionada não foi informado, elae e obrigatória!")
            return false;
        }

        try {
            
            await api.post('meta', newData);

            navigation.navigate("TabRoutes", {
                screen: "Metas"
            });

        } catch (error) {
            toatsError("Error ao se conectar ao servidor !");
        }
    }

    return (
        <Container>
            <AreaTextInfo>
                <Title>Meta</Title>
                <Description>Está na hora de definir suas metas. Atribua o valor que</Description>
                <Description>desejar para cada categoria selecionada.</Description>
            </AreaTextInfo>

            <AreaTextValue>
                <ValueTotal>R$ {formatNumber(value)}</ValueTotal>
                <ValueText>Total</ValueText>
            </AreaTextValue>

            <AreaBody>

                <List 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <CardMetaSelectValue 
                        data={item}
                        onpenModal={(info) => handlerId(info)}
                    />} 
                />    
          
                <AreaButon>
                    <ButtonPatternAdd title="Concluir"  onPress={() => handlerMeta()}/>
                </AreaButon>

            </AreaBody>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={()=> setModal(false)}
            >
                <AreaModal>

                    <BodyModal>

                        <AreaTitleModal>
                            <TitleModal>Meta</TitleModal>
                        </AreaTitleModal>

                        <AreaCategoryModal>

                            <AreaIconModal style={{ backgroundColor: colorCategory }}>
                                <Icon source={iconCategory} />
                            </AreaIconModal>

                            <TextCategoryModal>{nameCategory}</TextCategoryModal>

                        </AreaCategoryModal>

                        <AreaModalInput>
                            <InputModal 
                                placeholderTextColor="#7E7E7E"
                                maxLength={18}
                                keyboardType="numeric"
                                onChangeText={(number)=> setInputLimit(number)}
                                defaultValue="R$ 0,00"
                                value={limitFormat} 
                            />
                        </AreaModalInput>

                        <AreaButtonModal>
                            
                            <ButtonModalCancel activeOpacity={0.8} onPress={() => setModal(false)}>
                                <ButtonModalCancelText>CANCELAR</ButtonModalCancelText>
                            </ButtonModalCancel>
                            
                            <ButttonModalFinish activeOpacity={0.8} onPress={() => handlerValueCategory()}>
                                <ButttonModalFinishText>CONCLUIR</ButttonModalFinishText>
                            </ButttonModalFinish>

                        </AreaButtonModal>

                    </BodyModal>

                </AreaModal>
            </Modal>
        </Container>
    )
}

export default MetaCreate;