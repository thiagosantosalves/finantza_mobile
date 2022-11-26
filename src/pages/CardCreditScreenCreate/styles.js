import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin: 0px 20px 0px 20px;
    background-color: #FFFF;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #2F323D;
    margin-bottom: 10px;
`;

export const AreaInput = styled.View`
    margin-top: 20px;
`;

export const InputLimit = styled.TextInput`
    width: 80%;
    height: 50px;
    background-color: #EAEAEA;
    border-radius: 5px;
    padding-left: 15px;
    color: #2F323D;
`;

export const AreaInputDay = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 65%;
`;

export const ButtonDay = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #EAEAEA;
    border-radius: 5px;
    color: #2F323D;
`;

export const TitleButtonDay = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #2F323D;
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
    margin-top: 5px;
`;

export const AreaButtonAdd = styled.View`
    flex: 1;
    margin-bottom: 40px;
    justify-content: flex-end;
    align-items: center;
    
`;

export const AreaIconBank = styled.View`
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 18px;
`;

export const IconBank = styled.Image`
    width: 20px;
    height: 20px;
`;

export const ListInstitution = styled.FlatList``;

export const ListBank = styled.FlatList``;

//modal style

export const ModalArea = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;  

export const AreaTitleModal = styled.View`
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const BodyModalInstitution = styled.View`
    background-color: #fff;
    width: 100%;
    height: 55%;
    border-radius: 15px;
`;

export const BodyModalBank = styled.View`
    background-color: #fff;
    width: 100%;
    height: 210px;
    border-radius: 15px;
`;

export const ModalAreaDay = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;  

export const BodyModalDay = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #E7E7E7;
    width: 85%;
    height: 50%;
    border-radius: 5px;
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
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    margin-left: 16px;

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