import React, { useState, useEffect } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { WToast } from 'react-native-smart-tip';

import CardMetaSelect from '../../components/CardMetaSelect';
import api from '../../services/api';

import { 
    Container,
    AreaTextInfo,
    Title,
    Description,
    List,
    AreaBody,
    AreaButon,
    ButtonNext,

} from './styles';

const MetaInitial = (props) => {

    const [data, setData] = useState({}); 
    const [idsCategory, setIdsCategory] = useState([]);

    useEffect(() => {
        handlerCategory();
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

    const handlerCategory = async () => {

        try {
            let res = await api.get('dpcategory');
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlerId = (id) => {
        setIdsCategory(prevArray => [...prevArray, id]);
    }

    const deleteId = (id) => {

        let newIds = idsCategory;
        let indice = idsCategory.indexOf(id)

        while(indice >= 0) {
            newIds.splice(indice, 1);
            indice = newIds.indexOf(id);
        }

        setIdsCategory(newIds);
    }

    const handlerMeta = async () => {
        if(idsCategory.length > 0) {


            let id = idsCategory.toString();

            try {
                
                let res = await api.get(`dpcategoryfilter/${id}`);

                res = res.data.map(e => {

                    let res = {
                        id: e.id,
                        name: e.name,
                        color_hex: e.color_hex,
                        id_icon: e.id_icon,
                        value: 0
                    }

                    return res;
                });

                
                props.navigation.navigate('MetaCreate', { data: res });
                
            } catch (error) {
                console.log(error);
            } 

        } else {
            toatsError('Nenhuma categoria foi selecionada!');
        }
    }

    return (
        <Container>
            <AreaTextInfo>
                <Title>Categorias</Title>
                <Description>Escolha para quais categorias você gostaria acompanhar</Description>
                <Description>os gastos.</Description>
            </AreaTextInfo>
            
            <AreaBody> 

                <List 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <CardMetaSelect 
                        data={item}
                        handlerCategory={(id) => handlerId(id)}
                        deleteId={(id) => deleteId(id)}
                    />} 
                />   
        
                <AreaButon>

                    <ButtonNext activeOpacity={0.8} onPress={() => handlerMeta()}>
                        <Fontisto name="arrow-right-l" size={25} color="#FFF" />
                    </ButtonNext>
                    
                </AreaButon>
            
            </AreaBody>

        </Container>
    )
}

export default MetaInitial;