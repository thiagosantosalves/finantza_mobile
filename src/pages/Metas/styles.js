import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #FFF;
`;

export const AreaMonth = styled.View`
    width: 100%;
`;

export const AreaYear = styled.View`
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #2C3CD1;
`;

export const TitleHeaderYear = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    font-size: 12px;
`;

export const AreaBodyOps = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
`;

export const AreaTitle = styled.View`
    align-items: center;
`;

export const TitleOps = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #000000;
    font-size: 30px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const ImageOps = styled.Image`
    width: 104px;
    height: 104px;
    margin-bottom: 15px;
`;

export const AreaButton = styled.View`
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 120px;
`;

export const ButtonHandlerMeta  = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 32px;
    border-radius: 3px;
    background-color: #CE510B;
`;

export const ButtonHandlerMetaText  = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    font-size: 12px;
`;

export const AreaTitleValue = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
`;

export const TitleValueMeta = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 16px;
`;

export const AreaValuePlanning = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
`;

export const BoxPlanning = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 60px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const ValuePlanning = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;

export const ValueRemains = styled.Text`
    font-family: 'Poppins-Regular';
    color: #626263;
    font-size: 11px;
`;

export const ListMeta = styled.FlatList``;

export const AreaModal = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;

export const BodyModalYear = styled.View`
    width: 100%;
    height: 250px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
`;

export const AreaTitleYear = styled.View`
    justify-content: center;
    align-items: center;
    height: 70px;
`;

export const TitleYear = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 13px;
    color: #2F323D;
`;

export const AreaButtonYear = styled.View`
    justify-content: center;
    align-items: center;
`;

export const FlalistYear = styled.FlatList`
    margin-top: 30px;
`;

export const ButtonFilterYear = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 30px;
    background-color: #FF872C;
    border-radius: 5px;
    margin-top: 30px;
`;

export const ButtonFilterYearTitle = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 13px;
    color: #fff;
`;