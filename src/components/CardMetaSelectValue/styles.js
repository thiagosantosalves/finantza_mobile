import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    height: 120px;
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
`;

export const AreaInfoCategory = styled.View`
    flex-direction: row;
    align-items: center;
    height: 70px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #2F323D;
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 28px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const Icon = styled.Image`
    width: 25px;
    height: 25px;
`;

export const AreaValue = styled.View`
    justify-content: center;
    height: 50px;
`;

export const Value = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 12px;
    color: #2F323D;
    margin-left: 10px;
`;