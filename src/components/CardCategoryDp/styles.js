import styled from 'styled-components/native';

export const  Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 74px;
    border-radius: 12px;
    background-color: #FFF;
    margin-bottom: 25px;
`;

export const AreaTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 15px;
`;

export const IconImage = styled.Image`
    width: 24px;
    height: 24px;
`;

export const Title = styled.Text`
    font-family: 'SemiBold';
    color: #2F323D;
    font-size: 16px;
    margin-left: 15px;
`;

export const AreaEdit = styled.View``;

export const ButtonEdit = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 30px;
    margin-right: 20px;
`;
export const ButtonEditText = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 12px;
`;