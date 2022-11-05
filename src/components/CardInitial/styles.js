import styled from 'styled-components/native';

export const Container = styled.View`
    height: 192px;
    background-color: #FFF;
    margin: 20px 20px 0px 20px;
    border-radius: 12px;
    align-items: center;
    margin-bottom: 10px;
`;

export const AreaTitle = styled.View`
    width: 100%;
`;

export const TitleCard = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 10px;

`;

export const AreaDescription = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 50%;
    margin-top: 5px;
    margin-bottom: 10px;
`;


export const Description = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 11px;
    margin-right: 10px;
`;


export const Img = styled.Image`
    width: 70px;
    height: 70px;
`;


export const ButtonAdd = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #C6C6C6;
    width: 210px;
    height: 42px;
    border-radius: 5px;
`;

export const ButtonAddTitle = styled.Text`
    font-family: 'Poppins-Medium';
    color: #fff;
    font-size: 14px;
`;