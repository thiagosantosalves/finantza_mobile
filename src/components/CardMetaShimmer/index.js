import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { 
    Container,
    AreaTitle,
    CardTitle,
    AreaDescription,
    CardDescription,
    AreaCard,
    Card

} from './styles';

const { width } = Dimensions.get('window');
const primaryColor = '#DCDCDC';
const secondaryColor = '#E1E1E1';

const CardMetaShimmer = () => {

    const AnimatedView = Animated.createAnimatedComponent(LinearGradient);
    const AnimatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(AnimatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }, []);

 
    const translateX = AnimatedValue.interpolate({
        inputRange:[0, 1],
        outputRange:[-width, width]
    });

    return (
        <Container>

            <AreaTitle>
            
                <CardTitle style={{ overflow: 'hidden' }}>
                    <AnimatedView 
                        colors={[primaryColor, secondaryColor, secondaryColor,primaryColor]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                transform: [{translateX: translateX}]
                            }
                        ]}
                    />
                </CardTitle>      
            </AreaTitle>

            <AreaDescription>

                <CardDescription style={{ overflow: 'hidden' }}>
                    <AnimatedView 
                        colors={[primaryColor, secondaryColor, secondaryColor,primaryColor]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                transform: [{translateX: translateX}]
                            }
                        ]}
                    />
                </CardDescription>

                <CardDescription style={{ overflow: 'hidden' }}>
                    <AnimatedView 
                        colors={[primaryColor, secondaryColor, secondaryColor,primaryColor]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                transform: [{translateX: translateX}]
                            }
                        ]}
                    />
                </CardDescription>
            
            </AreaDescription>

            <AreaCard>
                        
                <Card style={{ overflow: 'hidden' }}>
                    <AnimatedView 
                        colors={[primaryColor, secondaryColor, secondaryColor,primaryColor]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                transform: [{translateX: translateX}]
                            }
                        ]}
                    />
                </Card>

                <Card style={{ overflow: 'hidden' }}>
                    <AnimatedView 
                        colors={[primaryColor, secondaryColor, secondaryColor,primaryColor]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                transform: [{translateX: translateX}]
                            }
                        ]}
                    />
                </Card>

            </AreaCard>
    
        </Container>
    )
}

export default CardMetaShimmer;