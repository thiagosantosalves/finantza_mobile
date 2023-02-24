import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const AreaButton = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const ButtonDelete = styled.View`
    justify-content: center;
    height: 40px;
`;

export const ButtonDeleteText = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 14px;
`;

export const Check = styled.TouchableOpacity`
    width: 28px;
    height: 28px;
    border-width: 3px;
    border-radius: 3px;
    border-color: #FF872C;
`;

export const ButtonPrimary = styled.TouchableOpacity``;

export const ButtonPrimaryText = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 16px;
`;

export const AreaFooter = styled.View`
    justify-content: flex-end;
    align-items: center;
    flex: 1;
`;

export const ButtonExit = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 112px;
    height: 34px;
    background-color:  #FF872C;
    margin-bottom: 40px;
    border-radius: 4px;
`;

export const ButtonExitText = styled.Text`
    font-family: 'Poppins-Medium';
    color: #FFF;
    font-size: 16px;
`;