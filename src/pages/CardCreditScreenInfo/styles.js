import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #FFF;
`;

export const DateFilter = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #2C3CD1;
    height: 60px;
`;

export const DateFilterRows = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 5px;
`;

export const AreaTitleDateFilter = styled.View`
    justify-content: center;
    align-items: center;
    width: 115px;
    height: 30px;
`;

export const DateFilterTitle = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #FFF;
    font-size: 12px;
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

export const ListCard = styled.FlatList``;

// Modal area
export const AreaModal = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;

export const BodyModal = styled.View`
    width: 100%;
    height: 180px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
`;

export const AreaTitleExport = styled.View`
    justify-content: center;
    align-items: center;
    height: 70px;
`;

export const TitleExport = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 13px;
    color: #2F323D;
`;

export const AreaButtonExport = styled.View`
    justify-content: center;
    align-items: center;
  
`;

export const ButtonExport = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 28px;
    border-radius: 5px;
    background-color: #FF872C;
    margin-bottom: 20px;
`;

export const TitleButtonExport = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 13px;
    color: #FFF;
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

export const AreaBodyOps = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TitleOps = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #000000;
    font-size: 30px;
    margin-top: 10px;
`;

export const DescriptionOps = styled.Text`
    font-family: 'Poppins-Regular';
    color: #2F323D;
    font-size: 12px;
`;