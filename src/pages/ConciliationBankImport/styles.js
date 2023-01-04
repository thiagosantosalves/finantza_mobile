import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const AreaTitle = styled.View`
    justify-content: center;
    align-items: center;
    height: 15%;
`;

export const Title = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 14px;
    color: #2F323D;
`;

export const AreaDescription = styled.View`
    justify-content: center;
    align-items: center;
    height: 15%;
`;

export const TextDescription = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #2F323D;
`;

export const AreaBank = styled.View`
    justify-content: flex-end;
    height: 15%;
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 20px;
`;

export const TitleBank = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 14px;
    color: #2F323D;
    margin-bottom: 10px;
    margin-left: 10px;
`;

export const AreaInfoBank = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 17px;
    margin-left: 10px;
`;

export const IconeBank = styled.Image`
    width: 18px;
    height: 18px;
`;

export const NameBank = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #2F323D;
    margin-left: 10px;
`;

export const List = styled.FlatList``;

export const AreaButton = styled.View`
    justify-content: center;
    align-items: center;
    height: 10%;
`;

export const ModalArea = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;  

export const BodyModalBank = styled.View`
    background-color: #fff;
    width: 100%;
    height: 210px;
    border-radius: 15px;
`;

export const AreaTitleModal = styled.View`
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const TitleModal = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 14px;
`; 

export const ListBank = styled.FlatList``;

export const BodyModalCategory = styled.View`
    background-color: #fff;
    width: 100%;
    height: 300px;
    border-radius: 15px;
`;

export const AreaModalDescription = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;

export const BodyModalDescription = styled.View`
    background-color: #fff;
    width: 100%;
    height: 220px;
    border-radius: 15px;
`;

export const AreaModalInput = styled.View`
    justify-content: center;
    align-items: center;
`;

export const InputModal = styled.TextInput`
    width: 90%;
    height: 50px;
    background-color: #F3F3F3;
    border-radius: 5px;
    padding-left: 15px;
    color: #2F323D;
`;

export const AreaButtonModal = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 65px;

    //background-color: red;
`;

export const ButtonModalCancel = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 30px;
    margin-right: 15px;
`;

export const ButtonModalCancelText = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 13px;
    color: #E83F5B;
`;

export const ButttonModalFinish = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 34px;
    border-radius: 4px;
    background-color: #FF872C;
    margin-left: 15px;
`;

export const ButttonModalFinishText = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 12px;
    color: #FFF;
`;