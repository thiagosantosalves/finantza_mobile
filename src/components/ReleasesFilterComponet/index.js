import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import ListBankFull from '../../components/ListBankFull';
import ListCategoryRcFull from '../../components/ListCategoryRcFull';
import ListCategoryDpFull from '../../components/ListCategoryDpFull';
import ListTagsFull from '../../components/ListTagsFull';
import ListCardCreditFull from '../../components/ListCardCreditFull';

import { listIconAccount } from '../../utils/listIconAccount';
import { institution } from '../../utils/institution';
import { listIconRc } from '../../utils/listIconRc';
import { listIconDp } from '../../utils/listIconDp';

import api from '../../services/api';

import { 
    Container,
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
    IconCard,
    ButtonText,
    AreaTagStatus,
    TagStatus,
} from './styles';

const ReleasesFilterComponet = (props) => {

    const [all, setAll] = useState(true);
    const [credit, setCredit] = useState(false);
    const [debit, setDebit] = useState(false);
    const [transf, setTransf] = useState(false);
    const [fixo, setFixo] = useState(false);
    const [installments, setInstallments] = useState(false);
    const [bank, setBank] = useState(false);
    const [iconBank, setIconBank] = useState(false);
    const [cardCreditFull, setCardCreditFull] = useState(false);
    const [cardCredit, setCardCredit] = useState(false);
    const [iconCard, setIconCard] = useState(false);
    const [catRc, setCatRc] = useState(false);
    const [catDp, setCatDp] = useState(false);   
    const [tag, setTag] = useState(false);
    const [bankFull, setBankFull] = useState([]);
    const [categoryRc, setCategoryRc] = useState([]);
    const [categoryDp, setCategoryDp] = useState([]);
    const [tagsFull, setTagsFull] = useState([]);
    const [iconRc, setIconRc] = useState(false);
    const [iconDp, setIconDp] = useState(false); 
    const [modalBank, setModalBank] = useState(false);
    const [modalCard, setModalCard] = useState(false);
    const [modalCategoryRc, setModalCategoryRc] = useState(false);
    const [modalCategoryDp, setModalCategoryDp] = useState(false);
    const [modalTag, setModalTag] = useState(false);
    const [tagMsn , setTagMsn] = useState(false);

    useEffect(() => {
        getBank();
        getCardCreedit();
        getRcCategory();
        getDpCategory();
        getTags();
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

    const getCardCreedit = async () => {
        const res = await api.get('cardcredit');
            const respoFilter = res.data.sort((x, y) => {
              let a = new Date(x.createdAt);
              let b = new Date(y.createdAt);
              return a - b;
            });
        setCardCreditFull(respoFilter);
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
                setDebit(false);
            }
            if(debit === false) {
                setDebit(true)
                setAll(false)
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

    const handleBankId = (id) => {
        const res = bankFull.filter(item => item.id === id);
        const resIcon = listIconAccount.filter(item => Number(item.id) === Number(res[0].type_id));

        setBank(res[0]);
        setIconBank(resIcon[0].url)
        setModalBank(false);
    }

    const handlerCardId = (id) => {
        const res = cardCreditFull.filter(item => item.id === id);
        const resIcon = institution.filter(item => Number(item.id) === Number(res[0].id_institution));

        setCardCredit(res[0])
        setIconCard(resIcon[0].url);
        setModalCard(false);
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
    
    const handlerFilter = () => {

        let isAll = all;
        let type = null;
        let isInstallments = null;
        let isFixo = null;
        let idBank = null;
        let idCardCredit = null;
        let idCatRc = null;
        let idCatDp = null;
        let idTag = null;

        if(credit) {
            type = 1;
        }

        if(debit) {
            type = 2;
        }

        if(transf) {
            type = 3;
        }

        if(installments) {
            isInstallments = true;
        }

        if(fixo) {
            isFixo = true;
        }

        if(bank) {
            idBank = bank.id;
        }

        if(cardCredit) {
            idCardCredit = cardCredit.id;
        }

        if(catRc) {
            idCatRc = catRc.id;
        }

        if(catDp) {
            idCatDp = catDp.id;
        }
        
        if(tag) {
            idTag = tag.id
        }

        const resultFilter = {
            all: isAll,
            type,
            isInstallments,
            isFixo,
            idBank,
            idCardCredit,
            idCatRc,
            idCatDp,
            idTag,
        }

        props.onChangeFilter(resultFilter);
        props.onChangeModal();
    }

    return (
        <Container
            showsVerticalScrollIndicator={false}
        >
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
                <TitleFilter>Conta</TitleFilter>

                {bank ? (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalBank(true)}>
                            <AreaIcon style={{ backgroundColor: bank.color_hex }}>
                                <IconImage source={iconBank} />
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
                <TitleFilter>Cartão de credito</TitleFilter>

                {cardCredit ? (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalCard(true)}>
                           
                            <IconCard source={iconCard} />
                    
                            <ButtonText>{cardCredit.name}</ButtonText> 
                        </AreaButtonDashed>
                    </AreaFilterButton>
                ) : (
                    <AreaFilterButton>
                        <AreaButtonDashed onPress={() => setModalCard(true)}>
                            <ButtonDashed source={require('../../assets/card_img/icontrasejado.png')} />
                            <ButtonDashedTitle>Selecione uma cartão</ButtonDashedTitle>
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

                ):(

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
                    <ButtonTag onPress={() => {tagsFull.length > 0 ? setModalTag(true) : setTagMsn(true)}}
                        activeOpacity={0.8}
                        style={{backgroundColor: tag ? '#FF872C' : '#C4C4C4'
                    }}>
                        <ButtonTagText>Tags</ButtonTagText>
                    </ButtonTag>

                    {tagMsn && 
                        <AreaTagStatus>
                            <TagStatus>Nenhuma tag!</TagStatus>
                        </AreaTagStatus>
                    }

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
                visible={modalCard}
                onRequestClose={()=> setModalCard(false)}
            >
                <AreaModalBank>

                    <BodyModalBank>

                        <AreaTitleModal>
                            <TitleModal>Selecione um cartão de credito</TitleModal>
                        </AreaTitleModal>

                        <ListBank 
                            data={cardCreditFull}
                            renderItem={({item}) => 
                            <ListCardCreditFull
                            data={item} 
                            onAction={(id) => handlerCardId(id)}                       
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