import React,{useState, useRef} from 'react';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import Dialog from '../Common/Dialog';
import {Input} from '../Common/Input';



const Button = styled.button`
    width:80px;
    height:30px;
    background:${({theme}) => theme.palette.lightPurple};
    border:none;
    border-radius:5px;
    margin-right:10px;
    color:white;
    cursor:pointer;
    font-weight:bold;
`
const HeaderBlock = styled.div`
    display:flex;
    position:relative;
    width:14rem;
    margin-bottom:1.5rem;
    h3 {
        width:7rem;
        padding:.5rem 1rem;
        color:rgba(0,0,0,.3);
        cursor:pointer;
    }
    .underLine {
        position:absolute;
        bottom:0px;
        height:2px;
        width:50%;
        background:black;
    }
    .${(props:StyledProps) => props.purpose} {
        color:black;
    }
    
`
const BodyBlock = styled.div`
    width:500px;
    height:auto;
`
const CustomInput = styled(Input)`
    & + & {
        margin-top:1.3rem;
    }
`
const BottomBlock = styled.div`
    position:relative;
    width:100%;
    height:auto;
    transition:1s;
    .lineBlock {
        width: 95%;
        height: 20px;
        margin: 0px auto;
        text-align:center;
        margin-top:20px;
        .line {
            position: relative;
            height: 1px;
            background-color: rgb(214, 214, 214);
            top: 55%;
        }
        .or {
            position: absolute;
            display: inline;
            background-color: rgb(250, 251, 252);
            color: rgba(0,0,0,.4);
            font-weight:bold;
            width: 30px;
            transform: translateX(-15px);
        }
    }
    .socialBlock {
        ul {
            display:flex;
            justify-content:space-between;
            padding:1rem 5rem 0; 
            li {
                width:50px;
                height:50px;
                background:rgba(0,0,0,.1);
                border-radius:50%;
            }
        }
    }
`
const InputBlock = styled.div`
    transition:height .3s;
`

type StyledProps = {
    purpose:string;
};

const SignInBtn = () => {
    const [visible, setVisible] = useState(false);
    const [purpose, setPurpose] = useState('signIn');
    const [bodyHeight, setBodyHeight] = useState(121);
    const underLineRef = useRef<HTMLDivElement>(null);

    const onCancel = () => {
        setVisible(false);
        setPurpose('signIn');
    }
    const onSignIn = () => {
        
    }

    const onSignUp = () => {

    }
    const onClickButton = () => {
        return setVisible(true);
    }

    const FormDialog = () => (
            <HeaderBlock purpose={purpose}>
                <h3 className="signIn" onClick={MoveSignIn}>SignIn</h3>
                <h3 className="signUp" onClick={MoveSignUp}>SignUp</h3>
                <div ref={underLineRef} className="underLine"></div>
            </HeaderBlock>
    )

    function MoveSignIn() {
        let pos:number;
        setPurpose('signIn');
        if(purpose === 'signUp') {
            pos = 50;
        } else {
            return ;
        }
        var id = setInterval(frame, 10);
        function frame() {
          if (pos === 0) {
            
            clearInterval(id);
          } else {
            pos-=2.5;
            console.log(pos);
            if(underLineRef.current)
            underLineRef.current.style.left = pos + '%';
          }
        }
    }

    function MoveSignUp() {
        let pos:number;
        setPurpose('signUp');
        if(purpose === 'signIn') {
            pos = 0;
        } else {
            return ;
        }
        var id = setInterval(frame, 10);
        function frame() {
          if (pos === 50) {
            clearInterval(id);
            
          } else {
            pos+=2.5;
            if(underLineRef.current)
            underLineRef.current.style.left = pos + '%';
          }
        }
      }

    const onCheckHeight = (e:any) => {
        setBodyHeight(e.offsetHeight);
    }
    return( 
        <>
            <Button onClick={onClickButton}>로그인</Button>
            <Dialog height={bodyHeight} title={<FormDialog/>} onConfirm={purpose==='signIn' ? onSignIn : onSignUp} confirmText={purpose==='signIn' ? '로그인' : '회원가입'} onCancel={onCancel} cancelText={'취소'} visible={visible} >
                <InputBlock style={{height:bodyHeight}}>
                    <CSSTransition 
                        in={purpose === 'signIn'}
                        timeout={500}
                        classNames={'primary-menu'}
                        unmountOnExit
                        onEnter={onCheckHeight}
                    > 
                        <BodyBlock>
                            <CustomInput name='Email Adress' type="email" paddingLeft="1.4rem" height={'3rem'} />
                            <CustomInput name='Password' type="password"  paddingLeft="1.4rem" height={'3rem'} />
                        </BodyBlock>
                    </CSSTransition>
                    <CSSTransition 
                        in={purpose === 'signUp'}
                        timeout={500}
                        classNames={'primary-menu'}
                        unmountOnExit
                        onEnter={onCheckHeight}
                    > 
                        <BodyBlock>
                            <CustomInput name='Email Adress' type="email" paddingLeft="1.4rem" height={'3rem'} />
                            <CustomInput name='Password' type="password"  paddingLeft="1.4rem" height={'3rem'} />
                            <CustomInput name='Nickname' type="password"  paddingLeft="1.4rem" height={'3rem'} />
                        </BodyBlock>
                    </CSSTransition>
                </InputBlock>
                <BottomBlock>  
                    <div className="lineBlock">
                        <div className="line"></div>
                        <div className="or">OR</div>
                    </div>
                    <div className="socialBlock">
                        {/* <ul>
                            <li>Kakao</li>
                            <li>Github</li>
                            <li>Google</li>
                        </ul> */}
                    </div>
                </BottomBlock>
            </Dialog>
        </>
    )
}

export default SignInBtn;