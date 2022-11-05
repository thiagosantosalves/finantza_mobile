import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';

import CardMetaSelectValue from '../../components/CardMetaSelectValue';
import formatNumber from '../../utils/formatNumber';

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
    ButtonFinsh,
    ButtonFinshText,
    AreaModal,
    BodyModal,
    AreaTitleModal,
    TitleModal,
    AreaModalInput,
    InputModal,
    AreaCategoryModal,
    AreaIconModal,
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
    const [modal, setModal] = useState(false);

    useEffect(() => {
        let data = route.params.data;
        setData(data);
    }, []);

    const handlerId = (info) => {
        setId(info);
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

    const handlerMeta = () => {

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
        setLimitFormat('R$ 0,00')
        setModal(false);
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

                    <ButtonFinsh activeOpacity={0.8} onPress={() => handlerMeta()}>
                        <ButtonFinshText>SALVAR METAS</ButtonFinshText>
                    </ButtonFinsh>

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

                            <AreaIconModal>
                                {/*  <Icon source={''} /> */}
                            </AreaIconModal>

                            <TextCategoryModal>Alimentação</TextCategoryModal>

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
                            
                            <ButttonModalFinish activeOpacity={0.8} onPress={() => handlerMeta()}>
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