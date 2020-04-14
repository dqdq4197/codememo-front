import React from 'react';
import styled from 'styled-components';

const HomeBlock = styled.div`
    width:100%;
    min-height:100vh;
    background:${({theme}) => theme.bgcolor};
`

const HomePage = () => {
    return (
        <HomeBlock>

        </HomeBlock>
    )
}

export default HomePage;