import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #FFFF;
`;

export const ButtonGear = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
`;

export const AreaPerfil = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ImagePerfil = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 25px;
    margin-bottom: 20px;
`;

export const AreaNamePerfil = styled.View`
`;

export const Name = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 16px;
    margin-bottom: 5px;
`;

export const ButtonPerfil = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    background-color: #FF872C;
`;

export const ButtonPerfilText  = styled.Text`
    font-family: 'Poppins-Medium';
    color: #FFF;
    font-size: 11px;
`;

export const AreaButtonPremiun = styled.View`
    justify-content: center;
    align-items: center;
    height: 100px;
`;

export const ButtonPremium = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    width: 65%;
    height: 35px;
    background-color: #0BCECE;
    border-radius: 5px;
`;

export const IconPremium = styled.Image`
    width: 25px;
    height: 25px;
    margin-left: 10px;
`;

export const ButtonPremiumText = styled.Text`
    font-family: 'Poppins-Medium';
    color: #FFF;
    font-size: 16px;
    margin-left: 18%;
`;

export const AreaBody = styled.View`
    flex: 1;
    align-items: center;
`;

export const AreaConfig = styled.View`
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 25px;
`;

export const TitleConfig = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 16px;
    margin-top: 15px;
    margin-left: 10px;
    margin-bottom: 20px;
`;

export const AreaSection = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 25px;
`;

export const TitleSection = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px
`;

export const AreaLine = styled.View`
    align-items: center;
    width: 100%;
`;

export const Line = styled.View`
    width: 90%;
    height: 1px;
    background-color: #E1E1E1;
`;