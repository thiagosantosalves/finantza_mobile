import styled from "styled-components/native";

export const Container  = styled.View`
    background-color: #FFF;
    height: 110px;
    margin-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #2F323D;
`;

export const AreaIconTitle = styled.View`
    flex-direction: row;
    margin-top: 20px;
    margin-left: 10px;
`;

export const AreaIcon = styled.View`
    margin-right: 10px;
`;

export const Icon = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

export const IconImage = styled.Image`
    width: 18px;
    height: 18px;
`;

export const AreaTitle = styled.View``;

export const Description = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 11px;
    color: #626263;
`;

export const AreaValue = styled.View`
    flex: 2;
    justify-content: flex-start;
    align-items: flex-end;
    margin-right: 12px;
    margin-top: 20px;
`;

export const ValueText = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 11px;
    color: #FF872C;
`;

export const AreaArchive = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 20px;
    padding-bottom: 20px;
`;

export const ButtonArchive = styled.TouchableOpacity`
    margin-left: 20px;
    margin-right: 15px;
`;

export const ArchiveText = styled.Text`
    color: #626263;
    font-size: 12px;
`;

export const Area = styled.View`
    flex-direction: row;
    flex: 1;
`;