import styled from 'styled-components/native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

export const Container = styled.View`
    flex: 1;
    background-color: #2C3CD1;
`;

export const AreaLogo = styled.View`
    justify-content: center;
    align-items: center;
    height: 18%;
    background-color: #2C3CD1;
`;

export const Logo = styled.Image`
    width: 130px;
    height: 35px;
`;

export const AreaTitle = styled.View`
    justify-content: center;
    height: 20%;
    background-color: #2C3CD1;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'Poppins-SemiBold';
    color: #FFFF;
    margin-left: 50px;
    margin-right: 50px;
`;

export const AreaDescription = styled.View`
    justify-content: center;
    height: 15%;
    background-color: #2C3CD1;
`;

export const Description = styled.Text`
    font-size: 14px;
    font-family: 'Poppins-Regular';
    color: #FFFF;
    margin-left: 50px;
    margin-right: 50px;
`;

export const AreaButtonGoogle = styled.View`
    height: 15%;
    justify-content: center;
`;

export const ButttonGoogle = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    height: 56px;
    border-radius: 5px;
    background-color: #fff;
    margin-left: 40px;
    margin-right: 40px;
`;


export const LogoGoogle = styled.Image`
    margin-left: 15px;
    margin-right: 62px;
`;

export const TitleButtonGoogle = styled.Text`
    font-size: 14px;
    font-family: 'Poppins-Medium';
    color: #2F323D;
`;


export const AreaFooter = styled.View`
    flex: 1;
    background-color: #FF872C;
    padding-top: 10px;
`;

export const AreaButtonMail = styled.View`
    height: 70px;
    justify-content: center;
`;

export const ButttonMail = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    height: 56px;
    border-radius: 5px;
    background-color: #fff;
    margin-left: 40px;
    margin-right: 40px;
`;

export const IconMail = styled(FontistoIcon)`
    margin-left: 15px;
    margin-right: 62px;
`;

export const TitleButtonMail = styled.Text`
    font-size: 14px;
    font-family: 'Poppins-Medium';
    color: #2F323D;
`;

export const AreaSignIn = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const ButtonSignIn = styled.TouchableOpacity``;

export const TitleSignIn = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
`;

