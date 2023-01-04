import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const AreaTitle = styled.View`
    justify-content: center;
    align-items: center;
    height: 120px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 14px;
    color: #2F323D;
`;

export const AreaDescription = styled.View`
    justify-content: center;
    align-items: center;
    height: 150px;
`;

export const TextDescription = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #2F323D;
`;

export const AreaButton = styled.View`
    justify-content: flex-end;
    align-items: center;
    height: 100px;
`;

export const ButtonImport = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 190px;
    height: 33px;
    border-radius: 4px;
    background-color: #C6C6C6;
`;

export const ButtonImportText = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 11px;
    color: #FFF;
`;