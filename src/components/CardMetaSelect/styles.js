import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
`;

export const AreaCategory = styled.View`
    align-items: center;
    flex-direction: row;
    align-items: center;
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 28px;
    margin-left: 10px;
`;

export const Icon = styled.Image`
    width: 25px;
    height: 25px;
`;

export const AreaTitle = styled.View`
    margin-left: 10px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #2F323D;
`;

export const AreaButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-color: '#000';
`;

export const ButtonSelect = styled.View`
    width: 25px;
    height: 25px;
    border-width: 3px;
    border-radius: 4px;
    border-color: #FF872C;
`;