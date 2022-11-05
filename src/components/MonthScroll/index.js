import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

import { 
    MonthScroll,
    MonthButton,
    MonthItem, 
    MonthText
} from './styles';

const MonthScrollComponent = (props) => {

    const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth);

    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];    
    const screenWidth = Math.round(Dimensions.get('window').width);
    let thirdW = screenWidth / 3;
    const MonthRef = useRef();
    
    const handleScrollEnd = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetMonth = Math.round( posX / thirdW );
        setSelectedMonth(targetMonth);
    }

    const scrollToMonth = (m) => {
        let posX = m * thirdW;
        MonthRef.current.scrollTo({x:posX, y:0, animated:true});
    }

    useEffect(()=>{
        props.setSelectedMonth(selectedMonth);
    }, [selectedMonth]);

    useEffect(()=>{
        setTimeout(()=>{
            scrollToMonth(selectedMonth);
        }, 10);  
    }, [props.selectedMonth]);

    return (
        <MonthScroll
            ref={MonthRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={thirdW}
            contentContainerStyle={{paddingLeft:thirdW, paddingRight:thirdW}}
            onMomentumScrollEnd={handleScrollEnd}
        >
            {months.map((m, k)=>(
                <MonthButton key={k} style={{width:thirdW}} onPress={()=>setSelectedMonth(Number(k))} underlayColor="transparent">
                    <MonthItem style={k==selectedMonth?{
                        backgroundColor:'#e5e5e5',
                        width:'100%',
                        height:28,
                        backgroundColor: '#2C3CD1'
                    }:{}}>
                        <MonthText style={k==selectedMonth?{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 12,
                            color: '#fff'
                        }: {}}>{m}</MonthText>
                    </MonthItem>
                </MonthButton>
            ))}
        </MonthScroll>
    );
}

export default MonthScrollComponent;