import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 15px;
    color: #2F323D;
    margin-left: 20px;
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
`;

export const Icon = styled.Image`
    width: 32px;
    height: 32px;
`;