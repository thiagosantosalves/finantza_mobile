import React from 'react';

import { 
    Container,
    AreaTitle,
    Title,
    AreaDay,
    RowDay,
    ButtonDay,
    DayText,
    AreaCancel,
    ButtonCancel,
    TextCancel
} from './styles';

const CalendaryDay = (props) => {
    return (
        <Container>
            <AreaTitle>
                <Title>Selecione o dia</Title>
            </AreaTitle>

            <AreaDay>

                <RowDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(1)}>
                        <DayText>1</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(2)}>
                        <DayText>2</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(3)}>
                        <DayText>3</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(4)}>
                        <DayText>4</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(5)}>
                        <DayText>5</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(6)}>
                        <DayText>6</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(7)}>
                        <DayText>7</DayText>
                    </ButtonDay>
                </RowDay>

                <RowDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(8)}>
                        <DayText>8</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(9)}>
                        <DayText>9</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(10)}>
                        <DayText>10</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(11)}>
                        <DayText>11</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(12)}>
                        <DayText>12</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(13)}>
                        <DayText>13</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(14)}>
                        <DayText>14</DayText>
                    </ButtonDay>
                </RowDay>

                <RowDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(16)}>
                        <DayText>15</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(16)}>
                        <DayText>16</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(17)}>
                        <DayText>17</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(18)}>
                        <DayText>18</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(19)}>
                        <DayText>19</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(20)}>
                        <DayText>20</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(21)}>
                        <DayText>21</DayText>
                    </ButtonDay>
                </RowDay>

                <RowDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(22)}>
                        <DayText>22</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(23)}>
                        <DayText>23</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(24)}>
                        <DayText>24</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(25)}>
                        <DayText>25</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(26)}>
                        <DayText>26</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(27)}>
                        <DayText>27</DayText>
                    </ButtonDay>
                    <ButtonDay activeOpacity={0.8} onPress={() => props.onPress(28)}>
                        <DayText>28</DayText>
                    </ButtonDay>
                </RowDay>

                <RowDay style={{
                    justifyContent: 'flex-start',
                }}>
                    <ButtonDay style={{ marginRight: 12 }} activeOpacity={0.8} onPress={() => props.onPress(29)}>
                        <DayText>29</DayText>
                    </ButtonDay>
                    <ButtonDay style={{ marginRight: 12 }} activeOpacity={0.8} onPress={() => props.onPress(30)}>
                        <DayText>30</DayText>
                    </ButtonDay>
                    <ButtonDay style={{ marginRight: 12 }} activeOpacity={0.8} onPress={() => props.onPress(31)}>
                        <DayText>31</DayText>
                    </ButtonDay>
                </RowDay>
                
                <AreaCancel>
                    <ButtonCancel activeOpacity={0.8} onPress={() => props.onCancel()} >
                        <TextCancel>Cancelar</TextCancel>
                    </ButtonCancel>
                </AreaCancel>

            </AreaDay>
        </Container>
    );
}

export default CalendaryDay;