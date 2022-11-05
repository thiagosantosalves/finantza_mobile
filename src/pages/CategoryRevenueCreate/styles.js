import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
`;

export const SectionArea = styled.View`
    margin-top: 25px;
    margin-left: 10px;
`;

export const Title = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #2F323D;
    margin-left: 12px;
    margin-bottom: 10px;
`;

export const AreaIcon = styled(RectButton)`
    flex-direction: row;
    align-items: center;
`;

export const AreaUrl = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 12px;
    background-color: #cecece;
`;

export const IconImageUrl = styled.Image`
    width: 28px;
    height: 28px;
`;

export const IconImage = styled.Image`
    width: 40px;
    height: 40px;
    margin-left: 12px;
`;

export const Icon = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: blue;
    margin-left: 12px;
`;

export const TitleIcon = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 13px;
    color: #7E7E7E;
    margin-left: 12px;
`;

export const AreaButton = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 40px;
`;


export const ListColorModal = styled.FlatList``;

export const ListIconModal = styled.FlatList``;

export const ModalArea = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0, 0.1);
`;  

export const BodyModalColor = styled.View`
    background-color: #fff;
    width: 100%;
    height: 470px;
    padding-top: 20px;
`;


export const BodyModalIcon = styled.View`
    background-color: #fff;
    width: 100%;
    height: 160px;
    padding-top: 20px;
`;