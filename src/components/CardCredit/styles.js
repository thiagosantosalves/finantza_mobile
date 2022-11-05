import styled from  'styled-components/native';

export const Container = styled.View`
    justify-content: space-between;
    height: 210px;
    background-color: #FFF;
    margin-top: 20px;
    margin-bottom: 5px;
    border-radius: 12px;
`;

export const AreaTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TitleCard = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 10px;
`;

export const ButtonAdd = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-color: #FF872C;
    margin-top: 10px;
    margin-right: 10px;
`;

export const AreaNameCard = styled.View`
    flex-direction: row;
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
`;

export const Img = styled.Image`
    width: 30px;
    height: 30px;
`;

export const AreaName = styled.View`
    margin-top: 10px;
`;

export const NameText = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 11px;
`;

export const NameInstitute = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 11px;
`;

export const AreaValue = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;

export const AreaValueLimit = styled.View`
    margin-left: 20px;
`;

export const TitleValue = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 11px;
`;

export const ValueTextLimit = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 11px;
    color: #0BCECE;
`;

export const AreaValueInvoice = styled.View`
    margin-right: 20px;
`;

export const ValueTextInvoice = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 11px;
    color: #FF872C;
`;