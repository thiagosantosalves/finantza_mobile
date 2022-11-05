import styled from  'styled-components/native';

export const Container = styled.View`
    height: 170px;
    background-color: #FFF;
    margin-top: 20px;
    margin-bottom: 5px;
    border-radius: 12px;
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
    font-size: 14px;
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
    flex: 1;
    margin-top: 10px;
    margin-left: 20px;
`;

export const TitleValue = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 11px;
`;

export const ValueTextLimit = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #0BCECE;
`;

export const AreaValueInvoice = styled.View`
    width: 140px;
    margin-right: 20px;
    margin-top: 10px;
`;

export const ValueTextInvoice = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FF872C;
    font-size: 11px;
`;

export const AreaEdit = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
`;

export const AreaButton = styled.View`
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
`;

export const Button = styled.TouchableOpacity``;

export const TitleButton = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #626263;
`;