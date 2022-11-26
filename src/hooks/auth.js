import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [idsMeta, setIdsMeta] = useState({});

    const [openModalReleases, setOpenModalReleases] = useState(false);
    const [openModalFilterReleases, setOpenModalFilterReleases] = useState(false);
    const [openModalMenuReleases, setOpenModalMenuReleases] = useState(false);

    const [openModalFilterReport, setOpenModalFilterReport] = useState(false);
    const [openModalReport, setOpenModalReport] = useState(false);

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

    const signOut = useCallback(async () => {

        await AsyncStorage.multiRemove(['@Finantza:token', '@Finantza:user']);
        setData({});
        
    }, []);

    const handlerMeta = useCallback((data) => {
        setIdsMeta(data);
    }, []);


    //------------------------------------------------
    const handlerModalReleases = () => {
        if(openModalReleases) {
            setOpenModalReleases(false)
        } else {
            setOpenModalReleases(true)
        }
    }

    const handlerModalFilterReleases = () => {
        if(openModalFilterReleases) {
            setOpenModalFilterReleases(false)
        } else {
            setOpenModalFilterReleases(true)
        }
    }

    const handlerModalMenuReleases = () => {
        if(openModalMenuReleases) {
            setOpenModalMenuReleases(false)
        } else {
            setOpenModalMenuReleases(true)
        }
    }

    const handlerModalFilterReport = () => {
        if(openModalFilterReport) {
            setOpenModalFilterReport(false)
        } else {
            setOpenModalFilterReport(true)
        }
    }

    const handlerModalReport = () => {
        if(openModalReport) {
            setOpenModalReport(false)
        } else {
            setOpenModalReport(true)
        }
    }


    return (
        <AuthContext.Provider value={{ 
            signIn, 
            user: data.user, 
            loading, 
            signOut, 
            handlerMeta,
            idsMeta: idsMeta,


            //-------------------
            openModalReleases, 
            handlerModalReleases,
            openModalFilterReleases,
            handlerModalFilterReleases,
            openModalMenuReleases,
            handlerModalMenuReleases,
            handlerModalFilterReport,
            openModalFilterReport,
            handlerModalReport,
            openModalReport
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
