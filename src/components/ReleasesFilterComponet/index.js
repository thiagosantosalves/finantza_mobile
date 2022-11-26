import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { WToast } from 'react-native-smart-tip';

import MonthPicker from '../../components/MonthPicker';
import ListBankFull from '../../components/ListBankFull';
import ListCategoryRcFull from '../../components/ListCategoryRcFull';
import ListCategoryDpFull from '../../components/ListCategoryDpFull';
import ListTagsFull from '../../components/ListTagsFull';

import { listIconRc } from '../../utils/listIconRc';
import { listIconDp } from '../../utils/listIconDp';

import { format } from 'date-fns';

import api from '../../services/api';

import { 
    Container,
    FlalistYear,
    AreaFilter,
    TitleFilter,
    AreaFilterButton,
    ButtonAddFilter,
    AreaButtonDashed,
    ButtonDashed,
    ButtonDashedTitle,
    ButtonAddFilterText,
    AreaLineFilter,
    LineFilter,
    AreaButtonFilter,
    ButtonFilter,
    AreaModalBank,
    BodyModalBank,
    AreaTitleModal,
    TitleModal,
    ListBank,
    ListCategory,
    ListTags,
    ButtonTag,
    ButtonTagText,
    AreaTitleX,
    TitleX,
    ButtonTagAdd,
    ButtonTagAddText,
    AreaIcon,
    IconImage,
    ButtonText,
} from './styles';


const ReleasesFilterComponet = (props) => {

    const [date, setDate] = useState(new Date());

    const [all, setAll] = useState(true);
    const [credit, setCredit] = useState(false);
    const [debit, setDebit] = useState(false);
    const [transf, setTransf] = useState(false);
    const [fixo, setFixo] = useState(false);
    const [installments, setInstallments] = useState(false);

    const [allStatus, setAllStatus] = useState(false);
    const [padOut, setPadOut] = useState(false);
    const [payable, setPayable] = useState(false);

    const [bank, setBank] = useState(false);
    const [catRc, setCatRc] = useState(false);
    const [catDp, setCatDp] = useState(false);   
    const [tag, setTag] = useState(false);

    const [bankFull, setBankFull] = useState([]);
    const [categoryRc, setCategoryRc] = useState([]);
    const [categoryDp, setCategoryDp] = useState([]);
    const [tagsFull, setTagsFull] = useState([]);

    const [iconRc, setIconRc] = useState(false);
    const [iconDp, setIconDp] = useState(false);

    const [releases, setReleases] = useState([]);
    
    const [modalBank, setModalBank] = useState(false);
    const [modalCategoryRc, setModalCategoryRc] = useState(false);
    const [modalCategoryDp, setModalCategoryDp] = useState(false);
    const [modalTag, setModalTag] = useState(false);

    useEffect(() => {
        getBank();
        getRcCategory();
        getDpCategory();
        getTags();
        getReleases();
    }, []);

    const getBank = async () => {

        try {
            const res = await api.get('account');
            const respoFilter = res.data.sort((x, y) => {
              let a = new Date(x.createdAt);
              let b = new Date(y.createdAt);
              return a - b;
            });
            setBankFull(respoFilter);
        } catch (error) {
            console.log(error)
        }
    }

    const getRcCategory = async () => {
        try {
            const res = await api.get('rccategory');
            const respoFilter =res.data.sort((x, y) => {
              let a = new Date(x.createdAt);
              let b = new Date(y.createdAt);
              return a - b;
            });
            setCategoryRc(respoFilter);
        } catch (error) {
            console.log(error)
        }
    }

    const getDpCategory = async () => {
        try {
            const res = await api.get('dpcategory');
            const respoFilter =res.data.sort((x, y) => {
              let a = new Date(x.createdAt);
              let b = new Date(y.createdAt);
              return a - b;
            });
            setCategoryDp(respoFilter);
        } catch (error) {
            console.log(error)
        }
    }

    const getTags = async () => {
        try {
            const res = await api.get('tags');
            const respoFilter =res.data.sort((x, y) => {
              let a = new Date(x.createdAt);
              let b = new Date(y.createdAt);
              return a - b;
            });
            setTagsFull(respoFilter);
        } catch (error) {
            console.log(error)
        }
    }

    const getReleases = async () => {

        try {
            const res = await api.get('releases');
            setReleases(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAll = () => {
        if(debit === false && credit === false && transf === false && fixo === false && installments === false) {
            if(all === true) {
                setAll(false)
            }
            if(all === false) {
                setAll(true)
            }
        }
    }

    const getDebit = () => {
        if(all === false) {
            if(debit === true) {
                setDebit(false)
            }
            if(debit === false) {
                setDebit(true)
            }
        }
    }

    const getCredit = () => {
        if(all === false) {
            if(credit === true) {
                setCredit(false)
            }
            if(credit === false) {
                setCredit(true)
            }
        }
    }

    const getTransf = () => {
        if(all === false) {
            if(transf === true) {
                setTransf(false)
            }
            if(transf === false) {
                setTransf(true)
            }
        }
    }

    const getFixo = () => {
        if(all === false) {
            if(fixo === true) {
                setFixo(false)
            }
            if(fixo === false) {
                setFixo(true)
            }
        }
    }

    const getInstallments = () => {
        if(all === false) {
            if(installments === true) {
                setInstallments(false)
            }
            if(installments === false) {
                setInstallments(true)
            }
        }
    }

    const getAllStatus = () => {

        if(padOut === false && payable === false) {
            if(allStatus === true) {
                setAllStatus(false)
            }
            if(allStatus === false) {
                setAllStatus(true)
            }
        }
    }

    const getPadOut = () => {

        if(allStatus === false && payable === false) {
            if(padOut === true) {
                setPadOut(false)
            }
            if(padOut === false) {
                setPadOut(true)
            }
        }
    }

    const getPayable = () => {

        if(allStatus === false && padOut === false) {
            if(payable === true) {
                setPayable(false)
            }
            if(payable === false) {
                setPayable(true)
            }
        }
    }

    const handleBankId = (id) => {
        const res = bankFull.filter(item => item.id === id);
        setBank(res[0]);
        setModalBank(false);
    }

    const handleCategoryRcId = (id) => {
        const res = categoryRc.filter(item => item.id === id);;
        const resIcon = listIconRc.filter(item => item.id === res[0].id_icon);
        setCatRc(res[0]);
        setIconRc(resIcon[0]);
        setModalCategoryRc(false);
    }

    const handleCategoryDpId = (id) => {
        const res = categoryDp.filter(item => item.id === id);;
        const resIcon = listIconDp.filter(item => item.id === res[0].id_icon);
        setCatDp(res[0]);
        setIconDp(resIcon[0]);
        setModalCategoryDp(false);
    }

    const getTagsId = (id) => {
        const res = tagsFull.filter(item => item.id === id);
        setTag(res[0]);
        setModalTag(false);
    }

    function toatsTags() {
        const toastOpts = {
          data: 'Nenhuma tag foi cadastrada!',
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT, //1.SHORT 2.LONG
          position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
        }
        WToast.show(toastOpts)
    }

    function toatsReleases() {
        const toastOpts = {
          data: 'Nenhuma tipo foi selecionado!',
          textColor: '#ffffff',
          backgroundColor: '#36393F',
          duration: WToast.duration.SHORT, //1.SHORT 2.LONG
          position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
        }
        WToast.show(toastOpts)
    }

    const handlerFilter = () => {
        const year = format(date, 'yyyy');
        let yearNumber = Number(year);

        let releasesFIlterYear = releases.filter(item => item.year === yearNumber);

        if(!all && !credit && !debit && !transf && !fixo && !installments) {
            toatsReleases();
        } 

        if(credit) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.type === 1);
        }
        if(debit) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.type === 2);
        }
        if(transf) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.type === 3);
        }
        if(installments) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.installments === true);
        }
        if(fixo) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.fixo === true);
        }
        if(bank) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.account_id === bank.id);
        }
        if(catRc) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.rc_category_id === catRc.id);
        }
        if(catDp) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.dp_category_id === catDp.id);
        }
        if(tag) {
            releasesFIlterYear = releasesFIlterYear.filter(item => item.tag_id === tag.id);
        }

        const responseFilter = releasesFIlterYear.sort((x, y) => {
            let a = new Date(x.createdAt);
            let b = new Date(y.createdAt);
            return a - b;
        }); 

        props.onChangeYear(yearNumber);
        props.onChangeFilter(responseFilter)
        props.onChangeModal();
    }

    return (
        <Container
            showsVerticalScrollIndicator={false}
        >

            <AreaFilter>
                <TitleFilter>Ano</TitleFilter>

                <AreaFilterButton>
                    <FlalistYear 
                        horizontal={true}
                        ListHeaderComponent={<MonthPicker 
                            date={date} 
                            onChange={(newDate) => setDate(newDate)}
                        />}
                    />
                </AreaFilterButton>
            </AreaFilter>

            <AreaFilter>

                <TitleFilter>Tipo</TitleFilter>

                <AreaFilterButton>

                    <ButtonAddFilter
                        onPress={() => getAll()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: all ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Todos</ButtonAddFilterText>
                    </ButtonAddFilter>

                    <ButtonAddFilter 
                        onPress={() => getDebit()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: debit ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Despesas</ButtonAddFilterText>
                    </ButtonAddFilter>

                    <ButtonAddFilter 
                        onPress={() => getCredit()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: credit ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Receitas</ButtonAddFilterText>
                    </ButtonAddFilter>

                </AreaFilterButton>

                <AreaFilterButton>

                    <ButtonAddFilter
                        onPress={() => getTransf()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: transf ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Transferências</ButtonAddFilterText>
                    </ButtonAddFilter>

                    <ButtonAddFilter
                        onPress={() => getFixo()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: fixo ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Lançamentos fixos</ButtonAddFilterText>
                    </ButtonAddFilter>

                </AreaFilterButton>

                <AreaFilterButton>

                    <ButtonAddFilter
                        onPress={() => getInstallments()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: installments ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Lançamentos parcelados</ButtonAddFilterText>
                    </ButtonAddFilter>

                </AreaFilterButton>

            </AreaFilter>

            <AreaLineFilter>
                <LineFilter />
            </AreaLineFilter>

            <AreaFilter>
                <TitleFilter>Status</TitleFilter>

                <AreaFilterButton>

                    <ButtonAddFilter
                        onPress={() => getAllStatus()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: allStatus ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Todos</ButtonAddFilterText>
                    </ButtonAddFilter>

                    <ButtonAddFilter
                        onPress={() => getPadOut()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: padOut ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>Pago</ButtonAddFilterText>
                    </ButtonAddFilter>

                    <ButtonAddFilter
                        onPress={() => getPayable()}
                        activeOpacity={0.8} 
                        style={{ backgroundColor: payable ? '#FF872C' : '#C4C4C4' }}
                    >
                        <ButtonAddFilterText>A pagar</ButtonAddFilterText>
                    </ButtonAddFilter>

                </AreaFilterButton>
            </AreaFilter>

            <AreaLineFilter>
                <LineFilter />
            </AreaLineFilter>

            <AreaFilter>
                <TitleFilter>Conta</TitleFilter>

                {bank ? (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalBank(true)}>
                            <AreaIcon style={{ backgroundColor: bank.color_hex }}>
                            {/*  <IconImage source={bank.} /> */}
                            </AreaIcon>
                            <ButtonText>{bank.name}</ButtonText> 
                        </AreaButtonDashed>
                    </AreaFilterButton>
                ) : (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalBank(true)}>
                            <ButtonDashed source={require('../../assets/card_img/icontrasejado.png')} />
                            <ButtonDashedTitle>Selecione uma conta</ButtonDashedTitle>
                        </AreaButtonDashed>
                    </AreaFilterButton>
                )}

            </AreaFilter>
            
            <AreaLineFilter>
                <LineFilter />
            </AreaLineFilter>

            <AreaFilter>
                <TitleFilter>Categoria de receita</TitleFilter>

                {catRc ? (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalCategoryRc(true)}>
                            <AreaIcon style={{ backgroundColor: catRc.color_hex }}>
                                <IconImage source={iconRc.url} />
                            </AreaIcon>
                            <ButtonText>{catRc.name}</ButtonText> 
                        </AreaButtonDashed>
                    </AreaFilterButton>
                ) : (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalCategoryRc(true)}>
                            <ButtonDashed source={require('../../assets/card_img/icontrasejado.png')} />
                            <ButtonDashedTitle>Selecione uma categoria</ButtonDashedTitle>
                        </AreaButtonDashed>
                    </AreaFilterButton>
                )}

            </AreaFilter>

            <AreaLineFilter>
                <LineFilter />
            </AreaLineFilter>

            <AreaFilter>
                <TitleFilter>Categoria de despesas</TitleFilter>

                {catDp ? (

                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalCategoryDp(true)}>
                            <AreaIcon style={{ backgroundColor: catDp.color_hex }}>
                                <IconImage source={iconDp.url} />
                            </AreaIcon>
                            <ButtonText>{catDp.name}</ButtonText> 
                        </AreaButtonDashed>
                    </AreaFilterButton>

                ): (

                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalCategoryDp(true)}>
                            <ButtonDashed source={require('../../assets/card_img/icontrasejado.png')} />
                            <ButtonDashedTitle>Selecione uma categoria</ButtonDashedTitle>
                        </AreaButtonDashed>
                    </AreaFilterButton>

                )}
            </AreaFilter>

            <AreaLineFilter>
                <LineFilter />
            </AreaLineFilter>

            <AreaFilter>
                <TitleFilter>Tags</TitleFilter>

                <AreaFilterButton>
                    <ButtonTag onPress={() => {tagsFull.length > 0 ? setModalTag(true) : toatsTags()}}
                        activeOpacity={0.8}
                        style={{backgroundColor: tag ? '#FF872C' : '#C4C4C4'
                    }}>
                        <ButtonTagText>Tags</ButtonTagText>
                    </ButtonTag>

                    {tag &&
                        <>  
                            <AreaTitleX>
                                <TitleX>+</TitleX>
                            </AreaTitleX>
                            

                            <ButtonTagAdd>
                                <ButtonTagAddText>{tag.name}</ButtonTagAddText>
                            </ButtonTagAdd>
                        </>
                    }

                </AreaFilterButton>

            </AreaFilter> 

            <AreaButtonFilter>

                <ButtonFilter activeOpacity={0.8} onPress={() => handlerFilter()}>
                    <FontAwesome name="check" size={25} color="#FFF" />
                </ButtonFilter>
            
            </AreaButtonFilter>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalBank}
                onRequestClose={()=> setModalBank(false)}
            >
                <AreaModalBank>

                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma conta</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                            data={bankFull}
                            renderItem={({item}) => 
                            <ListBankFull
                                data={item} 
                                onAction={(id) => handleBankId(id)}                       
                            />} 
                            keyExtractor={item => item.id}
                        />

                    </BodyModalBank>
                </AreaModalBank>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCategoryRc}
                onRequestClose={()=> setModalCategoryRc(false)}
            >
                <AreaModalBank>

                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma categoria de receita</TitleModal>
                        </AreaTitleModal>

                        <ListCategory 
                            data={categoryRc}
                            renderItem={({item}) => 
                            <ListCategoryRcFull
                                data={item} 
                                onAction={(id) => handleCategoryRcId(id)}                       
                            />} 
                            keyExtractor={item => item.id}
                        />

                    </BodyModalBank>
                </AreaModalBank>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCategoryDp}
                onRequestClose={()=> setModalCategoryDp(false)}
            >
                <AreaModalBank>

                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma categoria de despesa</TitleModal>
                        </AreaTitleModal>

                        <ListCategory 
                            data={categoryDp}
                            renderItem={({item}) => 
                            <ListCategoryDpFull
                                data={item} 
                                onAction={(id) => handleCategoryDpId(id)}                       
                            />} 
                            keyExtractor={item => item.id}
                        />

                    </BodyModalBank>
                
                </AreaModalBank>
                
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalTag}
                onRequestClose={()=> setModalTag(false)}
            >
                <AreaModalBank>

                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione uma tag</TitleModal>
                        </AreaTitleModal>

                        <ListTags
                            data={tagsFull}
                            renderItem={({item}) => 
                            <ListTagsFull
                                data={item} 
                                onAction={(id) => getTagsId(id)}                       
                            />} 
                            keyExtractor={item => item.id}
                        /> 

                    </BodyModalBank>
                
                </AreaModalBank>
            </Modal>
        </Container>
    )
}

export default ReleasesFilterComponet;