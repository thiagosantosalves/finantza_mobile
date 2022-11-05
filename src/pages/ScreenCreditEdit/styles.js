import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    justify-content: center;
    height: 110px;
    background-color: #0BCECE;
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

export const BodyKeyboard = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const AreaButton = styled.View`
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 40px;
`;

export const ButtonCreate = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #0BCECE;
`;
