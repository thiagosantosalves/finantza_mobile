import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import api from '../../services/api';

import { 
    Container, 
    CardTags,
    AreaInput,
    Input,
    AreaButton,
    ButtonCreate,
    ButtonCreateText
} from './styles';

const TagsCreate = ({ navigation }) => {

    const [ name, setName ] = useState(null);

    const { width } = Dimensions.get('window');

    const hendlerCreate = async () => {
        if(name) { 

             
            try {           
                const tags = {
                    name: name
                }
                await api.post('tags', tags);
                navigation.navigate('tags');
            
               
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Preencha o nome da tag")
        }

       
    }   

    return (
        <Container>

            <CardTags style={{
                width: width - 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
            }}> 
                <AreaInput>
                    <Input  
                        placeholder="Digite o nome da tag" 
                        placeholderTextColor="#7E7E7E"
                        maxLength={35}
                        onChangeText={(i) => setName(i)}
                        value={name}
                    />
                </AreaInput>
                
                <AreaButton>
                    <ButtonCreate onPress={() => hendlerCreate()}>
                        <ButtonCreateText>OK</ButtonCreateText>
                    </ButtonCreate>
                </AreaButton>
            </CardTags>
                
        </Container>
    )
}

export default TagsCreate;