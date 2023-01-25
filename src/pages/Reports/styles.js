import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const TextType = styled.Text`
    font-family: 'Poppins-SemiBold';
    color: #2F323D;
    font-size: 12px;
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

export const AreaSwitch = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    z-index: 2;
`;

export const SwiperGraphics = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 80%;
    border-radius: 40px;
    background-color: #EAEAEA;
`;

export const ButtonSwiper = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 25px;
    margin-right: 25px;
    background-color: #c4c4c4;
`;  

export const AreaCharts = styled.View`
    justify-content: center;
    padding-top: 10px;
    align-items: center;
    width: 100%;
    height: 48%;
`;

export const ImageGraphics = styled.Image`
    width: 22px;
    height: 22px;
`;

export const ButtonFilter = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #c4c4c4;
    border-radius: 5px;
    margin-left: 15px;
`;

export const ButtonFilterText = styled.Text`
    font-family: 'Poppins-Medium';
    font-size: 10px;
    color: #fff;
`;

export const AreaListReport = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;    
    margin-bottom: 14px;
`;

export const CardList = styled.View`
    height: 160px;
    border-radius: 5px;
    background-color: #fff;
`;

export const ListCategory = styled.FlatList`
    height: 30%;
    margin-bottom: 12px;
`;


//Modal - export
export const AreaModalExport = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    background-color: rgba(0,0,0, 0.1);
`;

export const AreaModalFilter = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, 0.3);
`;

export const BodyModalExport = styled.View`
    width: 100%;
    height: 190px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
`;

export const BodyModalFilterYear = styled.View`
    width: 90%;
    height: 36%;
    border-radius: 8px;
    background-color: #fff;
`;

export const AreaFilterYear = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const BodyAreaFilter = styled.View`
    margin-top: 25px;
    margin-bottom: 20px;
`;

export const AreaTypeFilter = styled.View`
    flex-direction: row;
    margin: 7px
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