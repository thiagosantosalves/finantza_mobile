
import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, Animated , TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'; 

import { useNavigation } from '@react-navigation/native';

const AddButton = () => {

    const [animation] = useState(new Animated.Value(0))
    const [ open, setOpen] = useState(null);

    const navigation = useNavigation();

    const toggleMenu = useCallback(() => {
        let toValue = open ? 0 : 1

        Animated.spring(animation, {
        toValue: toValue,
        friction: 5,
        useNativeDriver: true
        }).start()

        setOpen(!open);

    }, [open]);

    const transferAnimation = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, -100]
                })
            }, {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-24, -80] 
                })
            }
        ]
    }

    const creditAnimation = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, -150]
                })
            },
            {
               translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-24, -4]
               })
            }
        ]
    }

    const debitAnimation = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, -100]
                })
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-24, 70]
                })
            }
        ]
    }

    const rotation = {
        transform:[
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                }) 
            }
        ]
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.secondaryButton, transferAnimation]}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> {
                    if(open === true) {
                        navigation.navigate('ActionScreens', {
                            screen: 'ScreenTransfer'
                        });
                        setTimeout(() => {
                            toggleMenu();
                        }, 500);
                    }
                }} style={[styles.ContainerButtonSegundary, {backgroundColor: '#2C3CD1'}]}>
                    <Feather name="repeat" size={18} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Tranferência</Text>
            </Animated.View>
            <Animated.View style={[styles.secondaryButton, creditAnimation]}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> {
                    if(open === true) {
                        navigation.navigate('ActionScreens', {
                            screen: 'ScreenCredit'
                        });
                        setTimeout(() => {
                            toggleMenu();
                        }, 500);
                    }
                }} style={[styles.ContainerButtonSegundary, {backgroundColor: '#0BCECE'}]}>
                    <Feather name="trending-up" size={18} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Receita</Text>
            </Animated.View> 
            <Animated.View style={[styles.secondaryButton, debitAnimation]}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> {
                    if(open === true) {
                        navigation.navigate('ActionScreens', {
                            screen: 'ScreenDebit'
                        });
                        setTimeout(() => {
                            toggleMenu();
                        }, 500);
                    }
                }} style={[styles.ContainerButtonSegundary, {backgroundColor: '#DD2D82'}]}>
                    <Feather name="trending-down" size={18} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Despesa</Text>
            </Animated.View>
            
            <Animated.View style={styles.button}>
                <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={toggleMenu} underlayColor="#7F58FF">
                    <Animated.View style={rotation}>
                        <FontAwesome5 name="plus" size={24} color="#FFF" />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
            {open &&
                <TouchableOpacity onPress={toggleMenu} activeOpacity={1} style={styles.backgroundScreen}>
                </TouchableOpacity>
            }
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute", 
        alignItems: "center",
    },  
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        backgroundColor: "#2C3CD1",
        position: "absolute",
        marginTop: -35,
        zIndex: 2,
    },
    touchable: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 55 / 2,
        width: 55,
        height: 55,
    },
    ContainerButtonSegundary: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 40/ 2,
       
    }, 
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 95,
        height: 48,
        zIndex: 2,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11, 
        marginTop: 5,
        color: '#FFF',
    },

    backgroundScreen:{
        position: 'absolute',
        top: -900,
        zIndex: 1,
        width: 700,
        height: 875,
        backgroundColor:'rgba(0,0,0,0.8)',
    }
});

export default AddButton;