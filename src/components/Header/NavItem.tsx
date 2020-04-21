import React from 'react';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';

const ItemList = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgba(0,0,0,.6);
    border-radius:50%;
    padding:5px;
    cursor:pointer; 
    margin-right:10px;
    a {
        width:24px;
        height:24px;
        svg {
            color:#f1f1f1;
        }
    }
    
    .show-List-enter {
      transform:scale(0);
    }
    .show-List-enter-active {
      transform:scale(1);
      transition: all .3s ease;
    }
    .show-List-exit {
      transform:scale(1);
    }
    .show-List-exit-active {
      transform:scale(0);
      transition: all .3s ease;
    }
`

type ItemProps = {
    icon:React.ReactNode;
    open?:boolean;
    children?:React.ReactNode;
    onClick?:(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
const NavItem = ({icon,children, open,onClick}:ItemProps) => {
    return (
        <ItemList>
            <a href="#" onClick={onClick}>{icon}</a>
            <CSSTransition
                in={open}
                timeout={500}
                classNames={'show-List'}
                unmountOnExit
            >
                <>{children}</>
            </CSSTransition>
        </ItemList>
    )
}

export default NavItem;
