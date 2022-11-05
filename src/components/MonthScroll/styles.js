import styled from "styled-components/native";

export const MonthScroll = styled.ScrollView`
    width:100%;
    height:60px;
    background-color: #fff;
`;

export const MonthButton = styled.TouchableHighlight`
    justify-content:center;
    align-items:center;
`;

export const MonthItem = styled.View`
    width:90%;
    height:30px;
    background-color:#EEE;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`;

export const MonthText = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 10px;
    color: #2F323D;
`;