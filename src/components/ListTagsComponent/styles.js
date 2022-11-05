import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
    background-color: #fff;
`;

export const AreaTitle = styled.View`
    flex-direction: row;
`;

export const Icon = styled.View`
    width: 15px;
    height: 15px;
    border-radius: 7px;
    background-color: #FF872C;
    margin-left: 10px;
    margin-right: 10px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 12px;
    color: #2F323D;
`;

export const ButtonDelete = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 25px;
    margin-right: 10px;
`;

export const ButtonDeleteText = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #626263;
`;