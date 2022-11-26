import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    width: 100%;
    height: 800px;
    background-color: #FFF;
`;

export const AreaMonth = styled.View`
    width: 100%;
`;

export const AreaYear = styled.View`
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #2C3CD1;
`;

export const TitleHeaderYear = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    font-size: 12px;
`;

export const AreaBodyOps = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;

export const AreaTitle = styled.View`
    align-items: center;
`;

export const TitleOps = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #000000;
    font-size: 30px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const ImageOps = styled.Image`
    width: 104px;
    height: 104px;
    margin-bottom: 15px;
`;

export const AreaButton = styled.View`
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 120px;
`;

export const ButtonHandlerMeta  = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 32px;
    border-radius: 3px;
    background-color: #CE510B;
`;

export const ButtonHandlerMetaText  = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    font-size: 12px;
`;

export const AreaTitleValue = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
`;

export const TitleValueMeta = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 16px;
`;

export const AreaValuePlanning = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
`;

export const BoxPlanning = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 60px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const ValuePlanning = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const ValueRemains = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 11px;
`;

export const ListMeta = styled.FlatList``;

export const AreaModal = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;

export const BodyModalYear = styled.View`
    width: 100%;
    height: 250px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
`;

export const AreaTitleYear = styled.View`
    justify-content: center;
    align-items: center;
    height: 70px;
`;

export const TitleYear = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 13px;
    color: #2F323D;
`;

export const AreaButtonYear = styled.View`
    justify-content: center;
    align-items: center;
`;

export const FlalistYear = styled.FlatList`
    margin-top: 30px;
`;

export const ButtonFilterYear = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 30px;
    background-color: #FF872C;
    border-radius: 5px;
    margin-top: 30px;
`;

export const ButtonFilterYearTitle = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 13px;
    color: #fff;
`;

export const AreaModalCenter = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;

export const BodyModalCenter = styled.View`
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

export const BodyModalDelete = styled.View`
    width: 90%;
    height: 160px;
    border-radius: 4px;
    background-color: #FFF;
`;

export const AreaTitleModalNotification = styled.View`
    justify-content: center;
    align-items: center;
    height: 45px;
`;

export const TitleModalNotification = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 16px;
    color: #2F323D;
`;

export const AreaDescriptionModalNotification = styled.View`
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-top: 18px;
`;

export const DescriptionModalNotification = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #2F323D;
`;

export const NameCategoryDel = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 12px;
    color: #E83F5B;
`;

export const AreaButtonModalNotification = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const ButtonModalNotification = styled.TouchableOpacity` 
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 35px;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const TextButtonModalNotification = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 13px;
    color: #E83F5B;
`;