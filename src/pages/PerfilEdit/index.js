import React, { useState, useEffect } from 'react';
import { WToast } from 'react-native-smart-tip';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PatternInput from '../../components/PatternInput';
import ButtonPatternAdd from '../../components/ButtonPatternAdd';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { 
  Container,
  AreaAvatar,
  AreaIcon,
  Avatar,
  AreaName,
  Name,
  Button,
  TitleButton,
  AreaInput,
  Title,
  AreaButton
} from './styles';

const PerfilEdit = ({ navigation }) => {

  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [url, setUrl] = useState(null);
  const [anexoPhoto, setAnexoPhoto] = useState(null);

  useEffect(() => {
    if(user.avatar) {
      setUrl(user.avatar.url);
    }
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

  const openPickerLibrary = () => {

    let options = {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 1,
    }
    
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setAnexoPhoto(response.assets[0]);
      } 
    });
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handlerEdit = async () => {

    if(!validateEmail(email)) {
      toatsError('Informe um email não e valido!');
      return false;
    }

    let avatar = url;

    if(anexoPhoto) {
        const data = new FormData();
  
        data.append("file", {
          uri: anexoPhoto.uri,
          type: anexoPhoto.type,
          name: anexoPhoto.fileName,
        });  
  
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          const file = await api.post('files', data, config);
          let id_img = file.data.id;
          avatar = file.data;
          setUrl(file.data.url);
          
          if(user.avatar) {
            await api.delete(`files/${user.avatar.id}`);
          }

          await api.put('user', {
            email: email,
            avatar_id: id_img
          });

        } catch (error) {
          console.log(error);
        }
    } 

    if(password) {
      await api.put('user', {
        name: name,
        email: email,
        password: password
      });
    }

    try {

      await api.put('user', {
        name: name,
        email: email,
      });

      const info = {
        avatar: avatar,
        email: email,
        id: user.id,
        name: name,
      }

      updateUser(info);
      navigation.navigate('Home');
  
    } catch (error) {
      toatsError("E-mail já em uso. Escolha outro para atualização.")
    } 
  }

  return (
    <Container>

      <AreaAvatar>
        <AreaIcon>
          {anexoPhoto ? (
            <Avatar source={{ uri: anexoPhoto.uri  }} />
          ) : (
            <>
              {url ? (
                <Avatar source={{ uri: url }} />
              ): (
                <Ionicons name='person' size={32} color="#2F323D" />
              )} 
            </>
            
          )} 
        </AreaIcon>
        
        <AreaName>
            <Name>{user.name}</Name>
            <Button activeOpacity={0.8} onPress={openPickerLibrary}>
                <TitleButton>Alterar imagem</TitleButton>
            </Button>
        </AreaName>
      </AreaAvatar>

      <AreaInput>
        <Title>Nome</Title>

        <PatternInput 
          placeholder="Digite o nome do usuário" 
          placeholderTextColor="#7E7E7E"
          maxLength={21}
          onChangeText={(name)=>setName(name)}
          value={name} 
        />
      </AreaInput>

      <AreaInput>

        <Title>Email</Title>

        <PatternInput 
          placeholder="Digite o email" 
          placeholderTextColor="#7E7E7E"
          keyboardType="email"
          maxLength={55}
          onChangeText={(name)=>setEmail(name)}
          value={email} 
        />

      </AreaInput>

      <AreaInput>

        <Title>Senha</Title>

        <PatternInput 
          placeholder="Digite a nova senha" 
          secureTextEntry={true}
          placeholderTextColor="#7E7E7E"
          maxLength={21}
          onChangeText={(name)=>setPassword(name)}
          value={password} 
        />

      </AreaInput>

      <AreaButton>
          <ButtonPatternAdd title="Concluir" onPress={() => handlerEdit()} />
      </AreaButton>
    </Container>
  )
}

export default PerfilEdit;