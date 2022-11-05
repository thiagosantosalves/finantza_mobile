import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl } from 'react-native';

import api from '../../services/api';

import ListTagsComponent from '../../components/ListTagsComponent';

import { 
    Container, 
    ListTags,
    AreaBodyOps,
    AreaTitle,
    ImageOps,
    TitleOps,
    Title,
} from './styles';

const Tags = ({ navigation }) => {

    const [listTags, setListTags] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            exploreRefresh();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getList();
    }, []);

    const exploreRefresh = () => {

        setIsLoading(true);

        getList();

        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    }

    const getList = useCallback( async () => {
        const list = await api.get('tags');
        setListTags(list.data);
    },[]);


    const handlerDelete = useCallback( async (id) => {

        await api.delete(`tags/${id}`);
        exploreRefresh();

    }, []);

    return (
        <Container>

            {listTags.length <= 0 ? (
                <AreaBodyOps>
                    <ImageOps source={require('../../assets/card_img/tag_screen.png')} />
                    <AreaTitle>
                        <TitleOps>Ops!</TitleOps>
                        <Title>Nenhum tag cadastrada.</Title>
                    </AreaTitle>
                </AreaBodyOps> 
            ) : (
                <ListTags 
                    refreshControl={
                        <RefreshControl 
                            refreshing={isLoading}
                            onRefresh={exploreRefresh}
                            progressBackgroundColor="#fff"
                            colors={['#5636D3']} 
                        />
                    }  
                    data={listTags}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <ListTagsComponent
                            data={item} 
                            onDelete={(id) => handlerDelete(id)}
                        />
                    }
                />
            )}
            
        </Container>
    )
}

export default Tags;