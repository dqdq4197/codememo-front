import * as React from 'react';
import {useState,useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import {CustomBtn} from './CustomButton';


const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;
const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;
const DarkBackground = styled.div`
    position:fixed;
    display:flex;
    z-index:1111;
    align-items:center;
    justify-content:center;
    left:0;
    top:0;
    background-color:rgba(0, 0, 0, 0.8);
    width:100%;
    height:100%;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;

    ${(props:styleProps) =>
        props.disappear && css`
          animation-name: ${fadeOut};
        `
    }
`

const DialogBlock = styled.div`
    width:600px;
    padding:1.5rem;
    overflow:hidden;
    background:white;
    border-radius:2px;
    transition:height .3s;
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    p {
      font-size: 1.125rem;
    }
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;

    ${(props: styleProps) =>
        props.disappear &&
        css`
          animation-name: ${slideDown};
    `}
`

const ContentBlock = styled.div`
  width:550px;
  margin:0 auto;
`
const ButtonGroup = styled.div`
    margin-top:3rem;
    display:flex;
    justify-content:flex-end;
`
const ShortMaginBtn = styled(CustomBtn)`
    & + & {
        margin-left:0.5rem;
    }
`

interface ChildProps {
    height?: number;
    children:string | React.ReactNode;
    title:string | React.ReactNode;
    cancelText:string;
    confirmText:string;
    visible:boolean;
    onCancel: () => void;
    onConfirm: () => void;
    disappear?: boolean;
}
type styleProps = {
    disappear?: boolean;
}

function Dialog({height, title, children,confirmText, onConfirm, cancelText, visible , onCancel}:ChildProps) {
  
    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(false);
    
    useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
        if (localVisible && !visible) {
          setAnimate(true);
          setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);
    
  if (!animate && !localVisible) return null;
    return (
        <>
           <DarkBackground disappear={!visible} onClick={onCancel}>
               <DialogBlock style={{height: height ? height+210 : 'auto'}} disappear={!visible} onClick={(e) => e.stopPropagation()}>
                 <ContentBlock>
                    {title}
                    {children}
                    <ButtonGroup>
                      <ShortMaginBtn color="pink" onClick={onConfirm}>{confirmText}</ShortMaginBtn>
                      <ShortMaginBtn color="pink" onClick={onCancel}>{cancelText}</ShortMaginBtn>
                    </ButtonGroup>
                  </ContentBlock>
               </DialogBlock>
           </DarkBackground>
        </>
    )
}

Dialog.defaultProps = {
    confirmText:'확인',
    cancelText: '취소',
    visible: false
  };

export default Dialog;