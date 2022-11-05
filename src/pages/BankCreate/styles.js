import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin: 10px 20px 0px 20px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #2F323D;
    margin-bottom: 10px;
`;

export const AreaInput = styled.View`
    margin-top: 30px;
`;

export const AreaIcon = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    width: 80%;
`;

export const Icon = styled.Image`
    width: 32px;
    height: 32px;
    
`;
export const TextDescription = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 14px;
    color: #7E7E7E;
    margin-left: 20px;
`;

export const AreaButtonAdd = styled.View`
    flex: 1;
    margin-bottom: 40px;
    justify-content: flex-end;
    align-items: center;
`;


//modal style
export const ModalArea = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;  

export const BodyModal = styled.View`
    background-color: #fff;
    width: 100%;
    height: 200px;
`;

export const AreaIconModal = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    width: 80%;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
`;

export const TitleModal = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    margin-left: 15px;

`;  

export const BodyModalColor = styled.View`
    background-color: #fff;
    width: 100%;
    height: 470px;
    padding-top: 20px;
`;

export const ListColorModal = styled.FlatList``;

export const IconColorAtive = styled.View`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`;