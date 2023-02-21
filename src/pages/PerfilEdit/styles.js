import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`; 

export const AreaAvatar = styled.View`
    flex-direction: row;
    height: 100px;
    align-items: flex-end;
    margin-left: 10px;
    margin-bottom: 30px;
`;

export const AreaIcon = styled.View`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #c4c4c4;
`;

export const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;   
`;

export const AreaName = styled.View`
    margin-left: 10px;
`;

export const Name = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 14px;
`;

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 30px;
    border-radius: 4px;
    background-color: #FF872C;
    margin-bottom: 5px;
    margin-top: 5px;
`;

export const TitleButton = styled.Text`
    font-family: 'Poppins-Regular';
    color: #FFF;
    font-size: 12px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 12px;
    color: #2F323D;
    margin-bottom: 10px;
`;

export const AreaInput = styled.View`
    margin-top: 30px;
    margin-left: 10px;
`;

export const AreaButton = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
   
    margin-bottom: 40px;
`;