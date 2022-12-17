import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    justify-content: center;
    height: 110px;
    background-color: #DD2D82;
    margin-bottom: 15px;
`;

export const AreaValue = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-left: 15px;
    margin-right: 15px;
`;

export const TextValue = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    font-size: 28px;
`;

export const AreaSection = styled.ScrollView`
    margin-left: 20px;
    margin-right: 20px;
`;

export const Section = styled.View`
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const TitleSection = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 16px;
    margin-bottom: 10px;
`;

export const AreaIconCategory = styled.TouchableOpacity`
    flex-direction: row;
    height: 60px;
    align-items: center;
`;

export const IconPattern = styled.Image`
    margin-right: 20px;
`;

export const IconCategory = styled.View`
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin-right: 20px;
`;

export const IconUrl = styled.Image`
    width: 20px;
    height: 20px;
`;

export const TitleIconCategory = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 14px;
    color: #7E7E7E;
`;

export const AreaIconBank = styled.TouchableOpacity`
    flex-direction: row;
    height: 60px;
    align-items: center;
    
`;

export const AreaSwitch = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const IconBank = styled.View`
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin-right: 20px;
`;

export const TitleIconBank = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 14px;
    color: #2F323D;
`;

export const AreaDate = styled.View`
    flex-direction: row;
   
`;

export const ButtonSelectPattern = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 35px;
    border-radius: 5px;
    background-color: #C4C4C4;
    margin-right: 15px;
`;

export const TitleX = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 20px;
    color: #2F323D;
    padding-top: 2px;
`;

export const ButtonImageInfo = styled.View`
    justify-content: center;
    align-items: center;
    width: 150px;
    background-color: #C4C4C4;
    height: 35px;
    border-radius: 5px;
    margin-right: 15px;
    margin-left: 15px;
`;
          
export const ButtonSelectPatternText = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 16px;
    color: #FFFFFF;
`;

export const AreaButton = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-bottom: 20px;
`;

export const ButtonCreate = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #DD2D82;
`;

export const ListBank = styled.FlatList``;

//Modal 

export const ModalArea = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;  

export const BodyModalCategory = styled.View`
    background-color: #fff;
    width: 100%;
    height: 380px;
    border-radius: 15px;
`;

export const BodyModalBank = styled.View`
    background-color: #fff;
    width: 100%;
    height: 210px;
    border-radius: 15px;
`;

export const ListTags = styled.FlatList``;

export const BodyModalTags = styled.View`
    background-color: #fff;
    width: 100%;
    height: 180px;
    align-items: center;
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

export const TitleModalInstallments = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
`; 

export const BodyModalInstallments = styled.View`
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 230px;
    border-radius: 15px;
`;

export const ButtonActionInstallments = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 35px;
    border-radius: 5px;
    background-color: #FF872C;
    margin-top: 20px;
`;

export const TitleButtonInstallments = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 15px;
    color: #fff;
`;

export const BoxModalInstallments = styled.View``;


export const BodyModalAnexos = styled.View`
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 220px;
    border-radius: 15px;
`;

export const AreaTitle = styled.View`
    flex: 1;
    align-items: center;
    margin-left: 30px;
    margin-top: 10px;
`;

export const HeaderModalAnexo = styled.View`
    flex-direction: row;
`;

export const TitleModalAnexos = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 14px;
`;

export const AreaButtonClose = styled.View`
    width: 40px;
    height: 40px;
    margin-top: 10px;
`;

export const ButtonClose = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    border-radius: 15px;
    background-color: #5636D3;
`;

export const BodyButton = styled.View`
    align-items: center;
`;

export const ButtonCamera = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 30px;
    margin-top: 40px;
    background-color: #FF872C;
`;

export const ButtonCameraTitle = styled.Text`
    font-family: 'Poppins-Regular';
    color: #fff;
    font-size: 14px;
`;

export const ButtonLauchCamera = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 30px;
    border-radius: 5px;
    background-color: #FF872C;
`;

export const ButtonLauchCameraTitle = styled.Text`
    font-family: 'Poppins-Regular';
    color: #fff;
    font-size: 14px;
`;

export const ModalAreaMeta = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const BodyModalNotification = styled.View`
    width: 90%;
    border-radius: 4px;
    background-color: #fff;
`;

export const AreaTitleModalNotification = styled.View`
    justify-content: center;
    align-items: center;
    height: 45px;
`;

export const TitleModalNotification = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 16px;
    padding-top: 20px;
`;

export const AreaModalNotificationDesc = styled.View`
    justify-content: center;
    align-items: center;
    height: 120px;
`;

export const DescModalNotification = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const AreaModalNotificationCategory = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
`;

export const DescCategoryModalNotification = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #D65A3F;
    font-size: 12px;
    margin-left: 40px; 
`;

export const AreaModalNotificationInfo = styled.View`
    margin-left: 15px;
    margin-right: 15px;
`;

export const AreaModalNotificationInfoRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const AreaModalNotificationInfoText = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
    margin-top: 8px;
`;

export const AreaModalNotificationButton = styled.View`
    justify-content: center;
    align-items: center;
    height: 45px;
    margin-top: 20px;
`;

export const ButtonModalNotification = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 33px;
    border-radius: 4px;
    background-color: #CE510B;
`;

export const ButtonTextModalNotification = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #fff;
    font-size: 12px;
`;

export const ButtonCancelModalNotification = styled.TouchableOpacity`

    justify-content: center;
    align-items: center;
    height: 33px;
`;

export const ButtonCancelTextModalNotification = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #E83F5B;
    font-size: 10px;
`;