import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #FFF;
    margin: 8px 10px 8px;
    height: 60px;
    border-radius: 5px;
`;

export const Border = styled.View`
    width: 4px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
`;

export const Body = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const AreaTitle = styled.View`
  margin-left: 10px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const Description = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 10px;
`;

export const AreaValue = styled.View`
  margin-right: 20px;
`;

export const ValueText = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 12px;
`;