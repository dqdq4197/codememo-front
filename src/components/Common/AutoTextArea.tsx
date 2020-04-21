import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const AutoSizeTextArea = styled(TextareaAutosize)`
        overflow:hidden;
        color: ${props => props.color || props.theme.palette.basic};
        font-size: ${(props:StyledProps) => props.fontSize || '1rem'};
        border:none;
        border-radius: 10px;
        font-weight:bold;
        &:focus { 
          outline:none;
          background:${({theme}) => theme.Common.inputFocusBgColor}; 
        }
        &:hover {
          background:${({theme}) => theme.Common.inputFocusBgColor};
        }
        width:${props => props.width || '100%' };
        background:transparent;
        margin: ${props => props.size || '0rem'};
        padding: ${props => props.padding || '1rem'};
        transition: background .2s;
        resize:none;
        margin-left:${props => props.leftmargin || '0rem'};
`

// width:100%;
// min-height:300px;
// background:transparent;
// border:none;
// font-size:14px;
// color:white;
// z-index:111;
// &:focus {
//     outline:none;
// }
// background:#27292c;
// resize:none;
// border-radius: 8px;
// padding:${(props:StyledProps) => props.padding || '30px'};

interface StyledProps {
  color?:string;
  fontSize?:string;
  width?:string;
  size?:string;
  padding?:string;
  leftmargin?:string;
}

interface TextAreaProps extends StyledProps {
  Ref?:React.MutableRefObject<any>;
  placeholder?:string;
  onkeydown?:(event:React.KeyboardEvent<HTMLTextAreaElement>) => void;
    
}
const AutoTextArea = ({Ref,placeholder,width,fontSize,leftmargin,color, onkeydown}:TextAreaProps) => {



    return <AutoSizeTextArea 
                fontSize={fontSize}
                width={width}
                leftmargin={leftmargin}
                placeholder={placeholder}
                inputRef={Ref}
                color={color}
                onKeyDown={onkeydown}
            />
}


export default AutoTextArea;