import styled from 'styled-components/native';

export const Container = styled.View`
   align-items: center;
`;

export const CardTags = styled.View`
    justify-content: center;
    width: 100%;
    height: 129px;
    border-radius: 5px;
    background-color: #FFF;
    margin-top: 40px;
`;

export const AreaInput = styled.View`
    width: 70%;
    border-bottom-width: 1px;
    border-bottom-color: #D2D2D2;
    margin-left: 15px;
`;

export const Input = styled.TextInput`
    color: #2F323D;
`;

export const AreaButton = styled.View`
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const ButtonCreate = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 30px;
    margin-top: 20px;
    margin-right: 30px;
`;

export const ButtonCreateText = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FF872C;
    font-size: 16px;
`;