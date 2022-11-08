import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   background-color: #fff;
`;

export const AreaTextInfo = styled.View`
    justify-content: flex-end;
    padding-left: 20px;
    width: 100%;
    height: 120px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 15px;
    color: #2F323D;
    margin-bottom: 15px;
`;

export const Description = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: #2F323D;
`;     

export const AreaTextValue = styled.View`
    justify-content: center;
    align-items: center;
    height: 70px;
    margin-top: 20px;
`;

export const ValueTotal = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 14px;
    color: #2F323D;
`;

export const ValueText = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #2F323D;
`;

export const AreaBody = styled.View`
    flex: 1;
    justify-content: space-between;
`;

export const List = styled.FlatList`
    margin-top: 20px;
`;

export const AreaButon = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
`;

// modal 

export const AreaModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;

export const BodyModal = styled.View`
    justify-content: space-between;
    width: 85%;
    height: 280px;
    border-radius: 4px;
    background-color: #FFF;
`;

export const AreaTitleModal = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const TitleModal = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 14px;
    color: #2F323D;
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

export const AreaCategoryModal = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const AreaIconModal = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const Icon = styled.Image`
    width: 25px;
    height: 25px;
`;

export const TextCategoryModal = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #2F323D;
`;

export const AreaButtonModal = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 65px;
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