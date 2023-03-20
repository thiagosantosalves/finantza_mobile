import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #FFFF;
`;

export const AreaIconDelete = styled.TouchableOpacity`
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

export const ListNotification = styled.FlatList``;

export const AreaModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
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

export const AreaButtonModalNotification = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const AreaButtonModalNotificationInfo = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
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