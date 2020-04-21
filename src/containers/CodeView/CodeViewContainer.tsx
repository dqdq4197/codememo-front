import React,{useState ,useRef, useCallback} from 'react';
import SideItemBar from '../../components/CodeView/SideItemBar';
import CodeEditor from '../../components/CodeView/CodeEditor';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation,useHistory} from 'react-router-dom';
import {RootState} from '../../modules';
import {additem,addmemo,removememo} from '../../modules/codememo';
import SnackBarUi from '../../components/Common/SnackBarUi';
import {device} from '../../styles/MediaHoc';
import html from 'highlight.js/lib/languages/xml';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/tomorrow-night-bright.css';
hljs.registerLanguage('html', html);
hljs.registerLanguage('javascript', javascript);


const CodeViewBlock = styled.div`
    display:flex;
    width:100%;
    min-height:100vh;   
    background:${({theme}) => theme.codeView.bgcolor};
    z-index:-2;
    transition:background .2s;
`

const SideViewBlock = styled.aside`
    position:fixed;
    height:100%;
    width: calc(50% - 125px);
    background:${({theme}) => theme.codeView.sideCodeViewBgcolor};
    top:0;
    right:0px;
    @media ${device.laptop} {
        width:0;
    }
`

const CodeViewContainer = () => {
    const Items = useSelector((state:RootState)=> state.codememo)
    const [isAddItem, setIsAddItem] = useState({isShow:false,isAni:false});
    const [isOpenSnackBar,setIsOpenSnackBar] = useState({open:false,reload:false,message:''});
    const [isShowPreView, setIsShowPreView] = useState(false);
    const addInput = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    

    // 코드 미리보기 
    const onPreView = useCallback(() => {
        if(!codeRef.current) return;
        const code = hljs.highlightAuto(codeRef.current.value).value;
        const codeBlock = document.getElementById('code') as HTMLDivElement;
        codeBlock.innerHTML = `<pre><code className"hljs>${code}</code></pre>`;
        setIsShowPreView(!isShowPreView)
        console.log(isShowPreView)
    },[isShowPreView])

    //코드메모 삭제
    const onrRemoveCode = useCallback((name,number) => {
        dispatch(removememo(name,number))
    },[dispatch])

    //코드메모 저장
    const onSaveMemo = useCallback(() => {
        const name= location.pathname.replace(/\/codeview\//,'');
        
        if(titleRef.current && contentRef.current && codeRef.current){
            if(!titleRef.current.value) {
                titleRef.current.focus();
                return ;
            }   
            if(!codeRef.current.value) {
                codeRef.current.focus();
                return;
            }
            dispatch(addmemo(name,titleRef.current.value,contentRef.current.value,codeRef.current.value));
            titleRef.current.value='';
            codeRef.current.value='';
            contentRef.current.value='';
        }
    },[location,dispatch])

    //  Item 추가/ 변경 /삭제 함수
    const addItem = useCallback(() => {
        setIsAddItem({
            isShow:true,
            isAni:!isAddItem.isAni,
        });
        if(isAddItem.isShow) {
            setTimeout(() => setIsAddItem({isAni:!isAddItem.isAni,isShow:false}),200);
        }
        if (!addInput.current) {
            return;
        };  
        addInput.current.focus();   
    },[isAddItem]);


    const onEnterAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13 && addInput.current) {
            const value = addInput.current.value;
            if(!value) {
                setIsOpenSnackBar({open:true,reload:!isOpenSnackBar.reload,message:'키워드를 입력해주세요!'});
                return;
            }
            if(Items){
                const key = Items.find(item=> item.name.toLowerCase()===value.toLowerCase())
                if(key) {
                    setIsOpenSnackBar({open:true,reload:!isOpenSnackBar.reload,message:'이미 생성된 키워드입니다.'});
                } else {
                    dispatch(additem(value));
                    setIsAddItem({isAni:!isAddItem.isAni,isShow:false});
                    addInput.current.value='';
                    history.push(`/codeview/${value}`);
                }
            } else{
                dispatch(additem(value));
                setIsAddItem({isAni:!isAddItem.isAni,isShow:false});
                addInput.current.value='';
                history.push(`/codeview/${value}`);
            }       
        }
    }

    const OpenSnack = useCallback(() => (
        <SnackBarUi ok={isOpenSnackBar.open} message={isOpenSnackBar.message}/>
      ),[isOpenSnackBar])
    



    return (
        <CodeViewBlock>
            <SideItemBar
                memoArray={Items} 
                addItem={addItem} 
                isAddItem={isAddItem} 
                addInput={addInput}
                onEnterAddItem ={onEnterAddItem}
            />
            <CodeEditor
                memoArray={Items}
                codeRef={codeRef}
                onPreView={onPreView}
                isShow={isShowPreView}
                onSave={onSaveMemo}
                titleRef={titleRef}
                contentRef={contentRef}
                onRemoveMemo ={onrRemoveCode}
            />
            <SideViewBlock/>
            <OpenSnack/>
        </CodeViewBlock>
    )
}

export default CodeViewContainer;
