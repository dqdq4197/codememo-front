import React from 'react';
import styled from 'styled-components';

const NavBlock = styled.nav`
    .navItem-block {
        margin:0;
        padding:0;
        display:flex;
    }
`

type NavProps = {
    children: React.ReactNode;
}
const Navbar = ({children}:NavProps) => {
    return( 
        <NavBlock>
            <ul className="navItem-block">
                {children}
            </ul>
        </NavBlock>
    )
}

export default Navbar;