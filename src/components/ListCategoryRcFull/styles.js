import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 15px;
    color: #2F323D;
    margin-left: 20px;
`;

export const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 20px;
    background-color: red;
`;

export const IconImage = styled.Image`
    width: 20px;
    height: 20px;
`;