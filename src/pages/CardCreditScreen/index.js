import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, Alert } from 'react-native';

import api from '../../services/api';

import CardCredit from '../../components/CardCreditScreen';

import { 
    Container, 
    ListCard,
    AreaTitle,
    TitleOps,
    Title,
    AreaBodyOps,
    ImageOps,

} from './styles';

const CardCreditScreen = ({ navigation }) => {

    const [ card, setCard ] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            exploreRefresh();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getCard();
    }, []);

    const exploreRefresh = () => {

        setIsLoading(true);

        getCard();

        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    }

    const getCard = async () => {

        try {
            const response = await api.get('cardcredit');

            setCard(response.data.filter(item => item.is_filed == false));

        } catch (error) {
            console.log(error);
        }   

    }

    const cardInfoAction = async (id) => {
        const cardCredit = await api.get('/cardcredit/'+id);
        navigation.navigate('CardCreditScreenInfo', { cardCredit: cardCredit.data });
    }

    const archiveAction =  useCallback((id) => {
        Alert.alert(
            "Você quer mesmo arquivar este cartão?",
            "Cartôes arquivados não serão exibidos ao criar um lançamento, ok? Também não serão mostrados na listagem de cartões na tela inicial, Se tiver lançamentos vinculadosa a este cartão, eles continuarão sendo contabilizados nos relatorios e na tela de lançamentos.", [
                { 
                    text: "Cancelar",
                    onPress: () => console.log('teste')
                },
                { 
                    text: "Arquivar",
                    onPress: async () => {

                        const params = {
                            is_filed: true
                        }

                        await api.put('cardcredit/'+id, params );
                        exploreRefresh(); 
                    }
                },
            ]
        );
    }, []);

    const actionEdite = async (id) => {
        const cardCredit = await api.get('/cardcredit/'+id);
        navigation.navigate('CardCreditScreenEdit', { cardCredit: cardCredit.data });
    }

    return (
        <Container>


            {card.length <= 0 ? (
                <AreaBodyOps>
                    <ImageOps source={require('../../assets/card_img/credit-card-ops.png')} />
                    <AreaTitle>
                        <TitleOps>Ops!</TitleOps>
                        <Title>Nenhum cartão cadastrado.</Title>
                    </AreaTitle>
                </AreaBodyOps> 
            ):(
                <ListCard 
                    refreshControl={
                        <RefreshControl 
                            refreshing={isLoading}
                            onRefresh={exploreRefresh}
                            progressBackgroundColor="#fff"
                            colors={['#2C3CD1']} 
                        />
                    }  
                    data={card}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <CardCredit
                        data={item} 
                        onInfo={(id) => cardInfoAction(id)}
                        onEdite={(id) => actionEdite(id)}
                        onArquive={(id) => archiveAction(id)}
                    />}
                />
            )}
            
        </Container>
    )
}

export default CardCreditScreen;