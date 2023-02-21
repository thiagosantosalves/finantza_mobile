import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [idsMeta, setIdsMeta] = useState({});
    const [metaDate, setMetaDate] = useState('');
    const [importOFX, setImporOFX] = useState(null);

    useEffect(() => {

        async function loadStoragedData() {
           
            const [token, user] = await AsyncStorage.multiGet([
                '@Finantza:token',
                '@Finantza:user'
            ]);

            if(token[1] && user[1]) {
                api.defaults.headers.authorization = `bearer ${token[1]}`;

                setData({ token: token[1], user: JSON.parse(user[1]) });
            }

            setLoading(false);
        }

        loadStoragedData();
    }, []);

    const signIn = useCallback(async (data) => {

        const response = await api.post('/session', data);

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@Finantza:token', token],
            ['@Finantza:user', JSON.stringify(user)],
        ]);

        api.defaults.headers.authorization = `bearer ${token}`;
        
        setData({ token, user });

    }, []);

    const updateUser = useCallback(async (info) => {
        data.user = info;
        await AsyncStorage.setItem('@Finantza:user', JSON.stringify(data.user));
        setData(data);
    }, []);

    const signOut = useCallback(async () => {

        await AsyncStorage.multiRemove(['@Finantza:token', '@Finantza:user']);
        setData({});
        
    }, []);

    const handlerMeta = useCallback((data) => {
        setIdsMeta(data);
    }, []);

    const handlerMetaDate = useCallback((date) => {
        setMetaDate(date);
    }, []);

    const handlerIsImportOFX = useCallback((status) => {
        setImporOFX(status);
    }, []);


    return (
        <AuthContext.Provider value={{ 
            signIn, 
            user: data.user, 
            updateUser,
            loading, 
            signOut, 
            handlerMeta,
            idsMeta: idsMeta,
            handlerMetaDate,
            metaDate: metaDate,
            importOFX: importOFX,
            handlerIsImportOFX
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };  
