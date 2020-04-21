import React,{useState} from 'react';
import styled from 'styled-components';
import Dialog from '../Common/Dialog';

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


const SignInBtn = () => {
    const [visible, setVisible] = useState(false);

    const onConfirm = () => {
        setVisible(false);
    }
    const onCancel = () => {
        setVisible(false);
    }
    const onClickButton = () => {
        return setVisible(true);
    }
    return( 
        <>
            <Button onClick={onClickButton}>로그인</Button>
            <Dialog title='로그인' onConfirm={onConfirm} onCancel={onCancel} confirmtext={'확인'} cancelText={'취소'} visible={visible} >
                로그인하자
            </Dialog>
        </>

    )
}

export default SignInBtn;