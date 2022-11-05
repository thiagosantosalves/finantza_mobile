import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    
    background-color: #2C3CD1;
    padding-left: 40px;
    padding-right: 40px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    margin-bottom: 40px;
`;


export const Input = styled.TextInput`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    padding-left: 20px;
    margin-top: 20px;
    background-color: #FFFFFF;
    color: #000;
`;

export const ButtonSignUp = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 56px;
    background-color: #FF872C;
    margin-top: 20px;
    border-radius: 5px;
`;

export const ButtonSignUpTitle = styled.Text`
    font-size: 16px;
    font-family: 'Poppins-SemiBold';
    color: #FFF;
`;