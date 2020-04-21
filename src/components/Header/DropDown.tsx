import React from 'react';
import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CSSTransition } from 'react-transition-group';
import './csstransition.css';

const DropDownBlock = styled.div`
    position:absolute;
    right:130px;
    top:45px;
    width: 200px;
    overflow:hidden;
    transform-origin:top right;
    background:gray;
    border:1px solid #474a4d;
    border-radius:8px;
    transition: height .5s ease;
    padding:.5rem;
`
const DropDownItems = styled.div`
    height: 40px;
    display: flex;
    align-items: center;

    border-radius:8px;
    transition: background .3s;
    padding: 0.2rem;
    &:hover {
        background-color: #525357;
    }
    .icon {
        margin-right: 0.5rem;
        --button-size: calc(40px * 0.5);
        width: var(--button-size);
        height: var(--button-size);
        background-color: #484a4d;
        border-radius: 50%;
        padding: 5px;
        margin-right:10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: filter 300ms;
        &:hover {
            filter: brightness(1.2);
        }
    }
    .icon svg {
        fill: #dadce1;
        width: 15px;
        height: 15px;
    }
    .nextIcon {
        margin-left:auto;
    }
`
const Menu = styled.div`
    width:100%;
    color:black;
`

type DropDownProps = {
    dropdownRef:React.ElementRef<any>;
    active:string;
    menuHeight:string;
    onCheckHeight:(e:any) => void;
    onClickMenu?:(anchor:string)=> void;
}

type ItemProps = {
    children:string;
    icon?:React.ReactNode;
    nextIcon?:React.ReactNode;
    anchor?:string;
    onClickMenu?:(anchor:string)=> void;
}
const DropdownItems = ({children,icon,nextIcon,anchor,onClickMenu}:ItemProps) => (
    <DropDownItems onClick={()=> onClickMenu && anchor && onClickMenu(anchor)}>
        <span className="icon">{icon}</span>
        {children}
        <span className="nextIcon">{nextIcon}</span>
    </DropDownItems>
)

const DropDown = ({dropdownRef, active,onCheckHeight,menuHeight,onClickMenu}:DropDownProps) => {

    
    return (
        <DropDownBlock style={{height:menuHeight+ 'px'}}>
            <CSSTransition 
                in={active === 'primary'}
                timeout={500}
                classNames={'primary-menu'}
                unmountOnExit
                onEnter={onCheckHeight}
            >
                <Menu ref={dropdownRef}>
                    <DropdownItems icon={<SettingsIcon/>} > 
                        My profile
                    </DropdownItems>
                    <DropdownItems icon={<SettingsIcon/>} nextIcon={<NavigateNextIcon/>} onClickMenu={onClickMenu} anchor={'setting'}>
                        Setting
                    </DropdownItems>
                    <DropdownItems icon={'🦧'}>
                        DarkMode
                    </DropdownItems>
                </Menu>
            </CSSTransition>

            <CSSTransition 
                in={active === 'setting'}
                timeout={500}
                classNames={'menu-secondary'}
                unmountOnExit
                onEnter={onCheckHeight}
            >
                <Menu>
                    <DropdownItems icon={<SettingsIcon/>}> 
                        내정보
                    </DropdownItems>
                    <DropdownItems icon={<SettingsIcon/>} onClickMenu={onClickMenu} anchor={'primary'}>
                        프로필
                    </DropdownItems>
                    <DropdownItems icon={<SettingsIcon/>}>
                        밤모드
                    </DropdownItems>
                    <DropdownItems icon={<SettingsIcon/>}>
                        밤모드
                    </DropdownItems>
                    <DropdownItems icon={<SettingsIcon/>}>
                        밤모드
                    </DropdownItems>
                    <DropdownItems icon={<SettingsIcon/>}>
                        밤모드
                    </DropdownItems>
                </Menu>
            </CSSTransition>
        </DropDownBlock>
    )
}

export default DropDown;