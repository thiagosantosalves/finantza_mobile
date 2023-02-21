import styled from 'styled-components/native';

export const Container = styled.View``;


export const Header = styled.View`
    background-color: #2C3CD1;
    height: 220px;
`;

export const AreaInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const AreaPerfil = styled.TouchableOpacity`
    margin-top: 20px;
    margin-left: 20px;
`;

export const AreaImgPerfil = styled.View`
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #c4c4c4;
    margin-bottom: 5px;
`;

export const Img = styled.Image`
    width: 48px;
    height: 48px;
    
`;

export const AreaTitle = styled.View``;

export const TextPresentation = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #FFFFFF;
`;


export const TitleUser = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 16px;
    color: #FFFFFF;
`;


export const AreaNotification = styled.View`
    flex-direction: row;
    margin-top: 20px;
    margin-right: 20px;
`;

export const ButtonEye = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    margin-right: 20px;
`;

export const ButtonNotification = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

export const AreaTotalBalance = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const TitleBalance = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #DADADA;
`;

export const DescriptionBalance = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 22px;
    color: #DADADA;
`;

export const LineBalance = styled.View`
    width: 150px;
    height: 3px;
    background-color: #FFF;
    margin-top: 15px;
`;

export const AreaBody = styled.ScrollView`
    background-color: #FFF;
`;

export const ContainerCard = styled.View`
    height: 850px;
`;

export const AreaList = styled.View`
`;

export const List = styled.FlatList`
`;