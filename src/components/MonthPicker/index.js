import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { format, subYears, addYears } from 'date-fns';

import { 
    Container,
    Button,
    AreaTitle,
    TitleYear,
} from './styles';

const MonthPicker = ({date, onChange}) => {

    const handlerPrev = () => {
        const newDate = subYears(date, 1);
        onChange(newDate);
    };

    const handlerNext = () => {
        const newDate = addYears(date, 1);
        onChange(newDate);
    };
    
    return (
        <Container>
            <Button activeOpacity={0.8} onPress={handlerPrev}>
                <AntDesign name="arrowleft" size={20} color="#fff" />
            </Button>
                <AreaTitle> 
                    <TitleYear>{format(date, 'yyyy')}</TitleYear>  
                </AreaTitle>
            <Button activeOpacity={0.8} onPress={handlerNext}>
                <AntDesign name="arrowright" size={20} color="#fff" />
            </Button>
        </Container>
    );
}

export default MonthPicker;