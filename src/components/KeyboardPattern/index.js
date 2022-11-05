import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { 
    Container,
    AreaRow,
    Button,
    ButtonFake,
    TextButton,

} from './styles';

const KeyboardPattern = ({ getValue, remove, colorNUmber }) => {
    return (
        <Container>

            <AreaRow>

                <Button activeOpacity={0.8} onPress={() => getValue(9)}>
                    <TextButton style={{color: colorNUmber}}>9</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => getValue(8)}>
                    <TextButton style={{color: colorNUmber}}>8</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => getValue(7)}>
                    <TextButton style={{color: colorNUmber}}>7</TextButton>
                </Button>

            </AreaRow>

            <AreaRow>

                <Button activeOpacity={0.8} onPress={() => getValue(6)}>
                    <TextButton style={{color: colorNUmber}}>6</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => getValue(5)}>
                    <TextButton style={{color: colorNUmber}}>5</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => getValue(4)}>
                    <TextButton style={{color: colorNUmber}}>4</TextButton>
                </Button>

            </AreaRow>

            <AreaRow>

                <Button activeOpacity={0.8} onPress={() => getValue(3)}>
                    <TextButton style={{color: colorNUmber}}>3</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => getValue(2)}>
                    <TextButton style={{color: colorNUmber}}>2</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => getValue(1)}>
                    <TextButton style={{color: colorNUmber}}>1</TextButton>
                </Button>

            </AreaRow>

            <AreaRow>

                <ButtonFake />

                <Button activeOpacity={0.8} onPress={() => getValue(0)}>
                    <TextButton style={{color: colorNUmber}}>0</TextButton>
                </Button>

                <Button activeOpacity={0.8} onPress={() => remove()}>
                    <FontAwesome5 name="backspace" color={colorNUmber} size={38} />
                </Button>

            </AreaRow>

        </Container>
    )
}

export default KeyboardPattern;