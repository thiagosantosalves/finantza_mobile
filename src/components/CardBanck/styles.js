import styled from "styled-components/native";

export const Container = styled.View`
    height: 142px;
    background-color: #FFF;
    margin-top: 20px;
    margin-bottom: 5px;
    border-radius: 12px;
`;

export const AreaTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TitieCard = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 10px;
`;

export const AreaIconBanck = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-left: 10px;
`;

export const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 16px;
`;

export const IconImage = styled.Image`
    width: 16px;
    height: 16px;
`;

export const AreaNameBanck = styled.View`
    margin-left: 10px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 11px;
`;

export const Description = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 11px;
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
    margin-bottom: 20px;
`;

export const AreaValue = styled.View`
    flex: 1;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 25px;
`;

export const ValueText = styled.Text`
    font-family: 'Poppins-SemiBold';
    color:  #FF872C;
    font-size: 11px;
    margin-right: 8px;
`;