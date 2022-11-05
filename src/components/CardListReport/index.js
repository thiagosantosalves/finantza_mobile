import React, { useState, useEffect } from 'react';

import formatNumber from '../../utils/formatNumber';

import { listIconRc } from '../../utils/listIconRc';
import { listIconDp } from '../../utils/listIconDp';
import { listIconAccount } from '../../utils/listIconAccount';
import { institution } from '../../utils/institution';

import {
    CardCategory,
    AreaIconTitle,
    AreaIcon,
    Icon,
    AreaTitle,
    TitleCategory,
    TitlePorcent,
    AreaValue,
    TitleValue,
    TitlePercentege
} from './styles';

const CardListReport = (props) => {

    const [url, setUrl] = useState({});

    useEffect(() => {

        if(props.data.type === 1 && props.data.account === false) {
            let infoImage = listIconRc.filter(item => item.id === props.data.idIcon);
            setUrl(infoImage[0].url);
        }

        if(props.data.type === 2 && props.data.account === false) {
            let infoImage = listIconDp.filter(item => item.id === props.data.idIcon);
            setUrl(infoImage[0].url);
        }

        if(props.data.account) {
            let infoImage = listIconAccount.filter(item => item.id === Number(props.data.idIcon));
            setUrl(infoImage[0].url);
        }

        if(props.data.card_credit) {
            let infoImage = institution.filter(item => item.id === props.data.idIcon);
            setUrl(infoImage[0].url);
        }

    }, []); 

    const calcPorcent = (v) => {
        let res = v * 100 / props.calc;
        res = res.toFixed(2)
        return res;
    }

    return (
        <CardCategory activeOpacity={0.8} onPress={() => props.onPress(props.data.id)}>
            <AreaIconTitle>
                {props.data.card_credit ? (
                    <AreaIcon>
                        <Icon style={{ width: 30, height: 30 }} source={url} /> 
                    </AreaIcon>
                    
                ) : (
                    <AreaIcon style={{ backgroundColor: props.data.color }}>
                        <Icon source={url} /> 
                    </AreaIcon>
                )}
                <AreaTitle>
                    <TitleCategory>{props.data.label}</TitleCategory>
                    <TitlePorcent>Porcentagem</TitlePorcent>
                </AreaTitle>
                
            </AreaIconTitle>
            <AreaValue>
                <TitleValue>{ formatNumber(props.data.value)}</TitleValue>
                <TitlePercentege>{calcPorcent(props.data.value)}%</TitlePercentege>
            </AreaValue>
        </CardCategory>
    );
}

export default CardListReport;