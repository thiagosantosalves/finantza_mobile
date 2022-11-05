import styled from "styled-components/native";

export const Container = styled.View`
    background-color: red;
    width: 90%;
    height: 90%;
    background-color: #E7E7E7;
`;

export const AreaTitle = styled.View`
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-bottom: 15px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Medium';
    color: #2F323D;
    font-size: 16px;
`;

export const AreaDay = styled.View`
    align-items: center;
`;

export const RowDay = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-bottom: 10px;
`;


export const ButtonDay = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
`;

export const DayText = styled.Text`
    font-family: 'Poppins-Medium';
    color: #2F323D;
    font-size: 16px;
`;

export const AreaCancel = styled.View`
    justify-content: flex-end;
    align-items: flex-end;
    width: 90%;
    height: 16%;
`;

export const ButtonCancel = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextCancel = styled.Text`
    font-family: 'Poppins-Medium';
    color: #FF872C;
    font-size: 16px;
`; 