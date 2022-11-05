import styled from 'styled-components/native';

export const CardCategory = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    background-color: #fff;
`;

export const AreaIconTitle = styled.View`
    flex-direction: row;
    align-items: center
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 10px;
`;

export const Icon = styled.Image`
    width: 15px;
    height: 15px;
`;

export const AreaTitle = styled.View``;

export const TitleCategory = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 10px;
`;

export const TitlePorcent = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626262;
    font-size: 8px;
`;

export const AreaValue = styled.View`
    align-items: flex-end;
`;

export const TitleValue = styled.Text`
    
    font-family: 'Poppins-Medium';
    color: #2F323D;
    font-size: 10px;
`;

export const TitlePercentege = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626262;
    font-size: 10px;
`;