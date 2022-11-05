import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import api from '../../services/api';

import CardCategoryRc from '../../components/CardCategoryRc';

import { listIconRc } from '../../utils/listIconRc';

import { 
    Container, 
    ListCategory,

} from './styles';
import { string } from 'yup';


const CategoryRevenue = ({ navigation, ...rest }) => {


    const [ category, setCategory ] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            exploreRefresh();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getCategory();
    }, []);

    const exploreRefresh = () => {

        setIsLoading(true);

        getCategory();

        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    }

    const getCategory = async () => {

        try {
            const response = await api.get('rccategory');

            const category = response.data.map((item) => {
                
                const list = listIconRc.filter(i => i.id === item.id_icon);

                return {
                    id: item.id,
                    name: item.name,
                    icon_info: list[0],
                    color_hex: item.color_hex,
                }
            });

            setCategory(category);

        } catch (error) {
            console.log(error);
        }   

    }

    const handlerEdit = async (id) => {

        const category = await api.get(`rccategory/${id}`);

        navigation.navigate('categoryRevenueEdit', { category: category.data });
    }

    return (
        <Container>
            
            <ListCategory 
                 refreshControl={
                    <RefreshControl 
                        refreshing={isLoading}
                        onRefresh={exploreRefresh}
                        progressBackgroundColor="#fff"
                        colors={['#5636D3']} 
                    />
                }  
                data={category}
                keyExtractor={item => item.id}
                renderItem={({item}) => <CardCategoryRc
                    data={item} 
                    onEdit={(id) => handlerEdit(id)}
                />}

            /> 

        </Container>
    )
}

export default CategoryRevenue;