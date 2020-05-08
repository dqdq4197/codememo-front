import React from 'react';
import styled from 'styled-components';
import CodeList from './CodeList';
import {Input} from '../Common/Input';
import {CodeMemoType} from '../../modules/codememo';
import AutoTextArea from '../Common/AutoTextArea';
import {CustomBtn} from '../Common/CustomButton';
import {device} from '../../styles/MediaHoc';


const EditorBlock = styled.div`
    max-width:100%;
    height:auto;
    padding-left:300px;
    padding-top:80px;
    padding-bottom:50px;
    margin-left: auto;
    margin-right: auto;
    @media ${device.laptop} {
        max-width:calc(100% - 300px);
    }
`

const CodeBlock = styled.div`
    display: grid;
    column-gap: 100px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 18px;
    @media ${device.laptop} {
        display:block;
    }
`

const CodeEditBlock = styled.div<StyledProps>`
    position:relative;
    z-index:1;
    grid-column-start: 2;
    overflow:hidden;
    textarea {
        background:#27292c;
        width:90%;
        display:${({isShow}) => isShow? 'none' : 'block'}
    }
`


const CodeNote = styled.div<StyledProps>`
    z-index:111;
    display:${({isShow}) => isShow? 'block' : 'none'};
    font-size:14px;
    .hljs{
        background:transparent;
    }
    pre {
        margin:0;
        code {
            padding:0;  
            line-height: 1.5;
        }
    }
    pre code::-webkit-scrollbar {
        height: 5px;
        
    }
    pre{
        &:hover{
            code::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                &:hover {
                    background: rgba(255, 255, 255, .5);
                }
            }
        }        
    }
    pre code::-webkit-scrollbar, pre code::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(255, 255, 255, 0);
    }
`
const UtilBlock =styled.div`
    display:flex;
    justify-content:flex-end;
    button {
        z-index: 111;
    }
    margin-right:10px;
`
const CodeContent = styled.div`
    position:relative;
    grid-column-start: 1;
    border-radius:50px;
    .after {
        position:absolute;
        display:inline-block;
        width:8px;
        height:100%;
        background:#60f;
        border-radius:200px;
    }
    
`
const ReCustomBtn = styled(CustomBtn)`
    & + & {
        margin-left:10px;
    }
`

type StyledProps = {
    isShow:boolean;
}
type CodeEditorProps = {
    onPreView: () => void;
    memoArray:CodeMemoType[];
    codeRef:React.MutableRefObject<any>;
    isShow:boolean;
    onSave:() => void;
    contentRef:React.MutableRefObject<any>;
    titleRef:React.MutableRefObject<any>;
    onRemoveMemo:(name:string,number:number) =>void;
}

const CodeEditor = ({onPreView,memoArray,codeRef,isShow,onSave,titleRef,contentRef,onRemoveMemo}:CodeEditorProps) => {
    return (
        <EditorBlock>
            <div style={{paddingRight:"80px"}}>
                <CodeBlock>
                    <CodeContent>
                        <div className='after'/>
                        <Input ref={titleRef} autocomplete="off" name="TITLE" size="1rem" padding=".7rem" fontSize="24px" margin="1rem"/>
                        <AutoTextArea Ref={contentRef} placeholder="CONTENT" fontSize="16px" leftmargin="1rem"/>
                    </CodeContent>
                    <CodeEditBlock isShow={isShow}>
                        <AutoTextArea Ref={codeRef} color={'white'} placeholder={'코드를 입력해보세요!'}/>
                        <CodeNote id='code' isShow={isShow} style={{color:'white'}}/>
                    </CodeEditBlock>
                </CodeBlock>
                <UtilBlock>
                    <ReCustomBtn onClick={onSave}>저장하기</ReCustomBtn>
                    <ReCustomBtn onClick={onPreView}>미리보기</ReCustomBtn>
                </UtilBlock>
            </div>
                <CodeList memoArray={memoArray} onRemoveMemo={onRemoveMemo}/>
        </EditorBlock>
    )
}

export default CodeEditor;