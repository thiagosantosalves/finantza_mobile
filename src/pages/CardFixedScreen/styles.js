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

export const AreaDescription = styled.View`
    height: 40px;
`;

export const Description = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 14px;
    color: #7E7E7E;
    margin-left: 10px;
`;

export const AreaSection = styled.ScrollView`
    margin-left: 20px;
    margin-right: 20px;
`;

export const Section = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const TitleSection = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 14px;
`;

export const AreaIconCategory = styled.View`
    flex-direction: row;
    height: 60px;
    align-items: center;
`;

export const IconCategory = styled.View`
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 17px;
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

export const AreaIconBank = styled.View`
    flex-direction: row;
    height: 60px;
    align-items: center;
`;

export const IconPattern = styled.Image`
    width: 32px;
    height: 32px;
    margin-right: 20px;
`;

export const TitleIconCard = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 14px;
    color: #7E7E7E;
`;

export const AreaDate = styled.View`
    flex-direction: row; 
    margin-top: 10px;
`;

export const ButtonSelectPattern = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 35px;
    border-radius: 5px;
    background-color: #C4C4C4;
    margin-right: 15px;
`;

export const ButtonSelectPatternText = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 14px;
    color: #FFFFFF;
`;

export const AreaButtonFixed = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 40px;
`;