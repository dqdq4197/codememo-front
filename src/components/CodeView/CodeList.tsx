import React,{useMemo,useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
import {useLocation} from 'react-router-dom';
import hljs from 'highlight.js';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import {CodeMemoType} from '../../modules/codememo';
import {device} from '../../styles/MediaHoc';

const fadeInView = keyframes`
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
`

const ContentBlock = styled.div`
    display:flex;
    color:${({theme}) => theme.palette.basic};
    grid-column-start: 1;
    transition:color .2s;
    animation-duration: .5s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-name:${fadeInView};
    .util {
        display: flex;
        flex-direction: column;
        margin:27px 20px 0 0;
        color:${({theme}) => theme.palette.lightPurple};
        svg {
            margin-bottom:10px;
            transition:color .3s;
        }
        svg:nth-child(1) {
            &:hover {
                color:#ea0b0b;
            }
        }
        svg:nth-child(2) {
            &:hover {
                color:${({theme}) => theme.palette.basic};
            }
        }
    }
    p {
        font-weight:500;
    }
`

const CodeBlock = styled.div`
    z-index:111;
    grid-column-start: 2;
    overflow:hidden;
    font-size:14px;
    
    .hljs {
        background:transparent;
    }
    pre {
        position:relative;
    }
    pre:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 100%;
        background: linear-gradient(to left, #151515, rgba(21, 21, 21, 0));
        pointer-events: none;
        @media ${device.laptop} {
            display:none;
        }
    }
    
    code {
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        hyphens: none;
        tab-size:4;
        animation-duration: .5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
        animation-name:${fadeInView};
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
    @media ${device.laptop} {
        code.hljs {
            max-width:100%;
            background:${({theme}) => theme.codeView.sideCodeViewBgcolor};
            border-radius:8px;
            padding:20px;
        }
    }

`


const GridBlock = styled.div`
    display:grid;
    column-gap: 100px;
    padding-right: 80px;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow:dense;
    word-break: keep-all;
    @media ${device.laptop} {
        display:block;
        padding-right:40px;
    }
`
const ListBlock = styled.div`
    display:flex;
    flex-direction:column-reverse
    
`
type ListProps = {
    memoArray:CodeMemoType[];
    onRemoveMemo:(name:string,number:number)=> void;
}
const CodeList = ({memoArray, onRemoveMemo}:ListProps) => {
    
    const location = useLocation();

    useEffect(() => {
        pushCode();
    })
    const memoList = useMemo(() => {
        const path = location.pathname.replace(/\/codeview\//,'');
        const memoArr = memoArray.filter(item => item.name===path);
        
        
        if(memoArr) {
            return memoArr.map(item => item.memo.map(value => 
                value.hasOwnProperty('number') ?
                <GridBlock key={value.number}>
                    <ContentBlock>
                        <div className="util">
                            <RemoveCircleOutlineIcon onClick={()=>onRemoveMemo(path,value.number)}/>
                            <EditIcon/>
                        </div>
                        <div>
                            <h2>{value.about.title}</h2>
                            {value.about.content ? <p>{value.about.content}</p> : null}
                        </div>
                    </ContentBlock>
                    <CodeBlock>
                        <pre className="language-jsx"><code className="language-jsx">{value.code}</code></pre>
                    </CodeBlock>
                </GridBlock> : null
            ))
            
        }
    },[location.pathname,memoArray])

    const pushCode = () => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });
    }
  
    return (
        <ListBlock>
            {memoList}
        </ListBlock>
    )
}

export default CodeList;