import React,{useState ,useRef, useCallback} from 'react';
import SideItemBar from '../../components/CodeView/SideItemBar';
import CodeEditor from '../../components/CodeView/CodeEditor';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {additem} from '../../modules/codememo';
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
    const Items = useSelector((state:RootState)=> state.codememo);
    // const [code,setCode] = useState('');
    const [isAddItem, setIsAddItem] = useState(false);
    const [isOpenSnackBar,setIsOpenSnackBar] = useState({open:false,reload:false});
    const [isShowPreView, setIsShowPreView] = useState(false);
    const addInput = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    

    // 코드 미리보기 
    const onPreView = useCallback(() => {
        if(!codeRef.current) return;
        const code = hljs.highlightAuto(codeRef.current.value).value;
        const codeBlock = document.getElementById('code') as HTMLDivElement;
        codeBlock.innerHTML = `<pre><code className"hljs>${code}</code></pre>`;
        setIsShowPreView(!isShowPreView)
        console.log(isShowPreView)
    },[isShowPreView])
    // Code 변경함수

    // const onCodeChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setCode(e.target.value);
    //     const code1 = hljs.highlightAuto(e.target.value).value;
    //     const codeBlock = document.getElementById('code') as HTMLDivElement
    //     codeBlock.innerHTML = `<pre><code className"hljs>${code1}</code></pre>`;
    //   }

    //  Item 추가/ 변경 /삭제 함수
    const addItem = useCallback(() => {
        setIsAddItem(true);
        if (!addInput.current) {
            return;
        };
        addInput.current.focus();
    },[]);

    const onEnterAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13 && addInput.current) {
            const value = addInput.current.value;
            if(Items){
                const key = Items.find(item=> item.name===value)
                if(key) {
                    setIsOpenSnackBar({open:true,reload:!isOpenSnackBar.reload});
                } else {
                    dispatch(additem(value));
                }
            } else{
                dispatch(additem(value));
            }       
        }
    }

    const OpenSnack = useCallback(() => (
        <SnackBarUi ok={isOpenSnackBar.open} message={'이미 생성된 키워드입니다.'}/>
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
            />
            <SideViewBlock/>
            <OpenSnack/>
        </CodeViewBlock>
    )
}

export default CodeViewContainer;