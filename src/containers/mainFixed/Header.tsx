import React,{useState,useEffect} from 'react';
import ThemeToggle from '../../components/Header/ThemeToggle';
import SignInBtn from '../../components/Header/SignInBtn';
import NavContainer from './NavContainer';
import {useSelector,useDispatch} from 'react-redux';
import {change} from '../../modules/theme';
import { RootState } from '../../modules';
import styled from 'styled-components';


const HeaderBlock = styled.div`
    position:fixed;
    display: flex;
    justify-content: flex-end;
    align-items:center;
    width:100%;
    height:50px;
    z-index:111;
`

const Header = () => {
    const [isChange, setIsChange] = useState(false);
    const {mode} = useSelector((state:RootState) => state.theme);
    const dispatch = useDispatch();
    useEffect(() => {
      
      return (localStorage.setItem('theme',mode))
    })
  
    const onChangeTheme = () => {
      setIsChange(true)
      dispatch(change());
    }
    
    return (
        <HeaderBlock style={{zIndex:999}}>
          <SignInBtn />
          <NavContainer/>
          <ThemeToggle onChangeTheme={onChangeTheme} isChange={isChange} active={mode}/>
        </HeaderBlock>
    )
}

export default Header;