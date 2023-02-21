import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { 
    Container,
    Card,
} from './styles';

const { width } = Dimensions.get('window');
const primaryColor = '#DCDCDC';
const secondaryColor = '#E1E1E1';

const CardCreditReleaseShimmer = () => {

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
        </Container>
    )
}

export default CardCreditReleaseShimmer;