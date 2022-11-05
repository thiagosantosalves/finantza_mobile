import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   background-color: #fff;
`;

export const AreaTextInfo = styled.View`
    justify-content: flex-end;
    padding-left: 20px;
    width: 100%;
    height: 120px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-SemiBold';
    font-size: 15px;
    color: #2F323D;
    margin-bottom: 15px;
`;

export const Description = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: #2F323D;
`;       

export const List = styled.FlatList`
    margin-top: 20px;
`;

export const AreaBody = styled.View`
    flex: 1;
    justify-content: space-between;
`;

export const AreaButon = styled.View`
    align-items: flex-end;
    width: 100%;
    height: 80px;
    padding-right: 20px;
    padding-top: 15px;
`;

export const ButtonNext = styled.TouchableOpacity` 
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #2C3CD1;
`;