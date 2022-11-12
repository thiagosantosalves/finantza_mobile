import styled from 'styled-components/native';

export const Container = styled.View`  
    justify-content: space-between;
    background-color: #FFF;
    margin: 10px 0px 10px;
    height: 160px;
    border-radius: 5px;
`;

export const TitleStatus = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 12px;
    margin-left: 10px;
    margin-bottom: 5px;
`;

export const BoxInfo = styled.View`
    flex-direction: row;
    margin-left: 10px;
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    margin-right: 15px;
`;

export const Icon = styled.Image`
    width: 25px;
    height: 25px;
`;

export const AreaInfoCategory = styled.View``;

export const CategoryName = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const AreaValue = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const TextValueUsed = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 12px;
`;

export const TextValueTotal = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 10px;
`;

export const AreaPorcentTotal = styled.View`
    height: 8px;
    background-color: #C4C4C4;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const AreaPorcent = styled.View`
    height: 8px;
    background-color: #E83F5B;
    border-radius: 5px; 
`;

export const AreaButton = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 35px;
`;

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 25px;
`;

export const TitleButton = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #626263;
`;