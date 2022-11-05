import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { Alert } from 'react-native';

import api from '../../services/api';

import CardBankScreen from '../../components/CardBankScreen';

import { 
    Container,
    ListBank
} from './styles';


const Bank = ({ navigation }) => {

    const [ bank, setBank ] = useState({});

    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            exploreRefresh();
        });
        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        getBank();
    }, []);

    const exploreRefresh = () => {

        setIsLoading(true);

        getBank();
        
        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    }

    const getBank = async () => {

        try {
            const response = await api.get('account');
            
            const resFilterFiled = response.data.filter(item => item.is_filed == false);

            const resFilter = resFilterFiled.sort((x,y) => {
                let a = new Date(x.createdAt);
                let b = new Date(y.createdAt);

                return a - b;
            });

            setBank(resFilter);

        } catch (error) {
            console.log(error);
        }   

    }

    const archiveAction =  useCallback((id) => {
        Alert.alert(
            "Você quer mesmo arquivar esta conta?",
            "Contas arquivados não serão exibidos ao criar um lançamento, ok? Também não serão mostrados na listagem de cartõesna tela inicial, Se tiver lançamentos vinculadosa a este cartão, eles continuarão sendo contabilizados nos relatorios e na tela de lançamentos. você poderá reverter o arquivamento a qualquer momento. ", [
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

                        await api.put('account/'+id, params );
                        exploreRefresh();
                    }
                },
            ]
        );
    }, []);

    const actionEdite = async (id) => {

        const account = await api.get('/account/'+id);

        navigation.navigate('BankEdit', { account: account.data });
    }


       /* 
    const deleteAccount = useCallback((id) => {

        Alert.alert(
            "Você tem certeza que deseja excluir este conta ?",
            "Todos os lançamentos vinculados a esta conta sera excluído.Nem a conta nem os lançamentos poderão ser recuperados. Conta vinculada a um cartão de credito, pra excluir pecisara tirar esse vinculo informando outra conta pra fazer o pagaemento do cartão de crédito.", 
           
            [
                { 
                    text: "Cancelar",
                    onPress: () => console.log('teste')
                },
                { 
                    text: "Arquivar",
                    onPress: () => {
 
                    }
                },
            ]
        )

    }, []) */

    return (
        <Container>
            
            <ListBank 
                refreshControl={
                    <RefreshControl 
                        refreshing={isLoading}
                        onRefresh={exploreRefresh}
                        progressBackgroundColor="#fff"
                        colors={['#5636D3']} 
                    />
                }  
                data={bank}
                keyExtractor={item => item.id}
                renderItem={({item}) => <CardBankScreen 
                    data={item} 
                    onArquive={(id) => archiveAction(id)}
                    onEdite={(id) => actionEdite(id)}
                />}
            />

        </Container>
    );
}

export default Bank;