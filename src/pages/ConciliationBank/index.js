import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { WToast } from 'react-native-smart-tip';

import api from '../../services/api';

import { 
    Container,
    AreaTitle,
    Title,
    AreaDescription,
    TextDescription,
    AreaButton,
    ButtonImport,
    ButtonImportText,
} from './styles';

const ConciliationBank = ({ navigation }) => {

    function toatsError(text) {
        const toastOpts = {
          data: text,
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.LONG,
          position: WToast.position.CENTER,
        }
        WToast.show(toastOpts)
      }

    const handlerOfx = async () => {
        try {
            
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            });

            let name = res[0].name.split('.')
 
            if(name[1] != 'ofx') {
                toatsError('Desculpe, mas o arquivo enviado não é válido. Por favor, verifique o tipo de arquivo e tente novamente.')
                return false;
            } 

            const data = new FormData();
            data.append("file", {
                uri: res[0].uri,
                type: res[0].type,
                name: res[0].name
            });

            const config = {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
            };
  
            const file = await api.post('processofx', data, config);

            navigation.navigate('ConciliationBankImport', { data: file.data });
           
        } catch (error) {
            toatsError('Error, não é possível se conectar ao servidor!');
        }
    }

    return (
        <Container>

            <AreaTitle>
                <Title>Conciliação Bancária</Title>
                <Title>Rápida e Fácil</Title>
            </AreaTitle>

            <AreaDescription>
                <TextDescription>Com o Finantza, você pode importar arquivos OFX</TextDescription>
                <TextDescription>e deixe o app cuidar de tudo por você.</TextDescription>
            </AreaDescription>

            <AreaButton>
                <ButtonImport activeOpacity={0.8} onPress={() => handlerOfx()}>
                    <ButtonImportText>IMPORTAR DADOS OFX</ButtonImportText>
                </ButtonImport>
            </AreaButton>
            
        </Container>
    )
}

export default ConciliationBank;