import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UIBox = ({ children }) => {
  return (
    <Wrapper>
      <HeaderBar>
        <Logo to="/admin">
          <img src="/images/logo-01.svg" />
        </Logo>
        <div>
          Admin
        </div>
      </HeaderBar>
      <Content>
        <SideBar>
          
        </SideBar>
        <Main>
          {children}
        </Main>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;


const Logo = styled(Link)`
  display: block;
  width: 40px;
  height: 40px;
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const HeaderBar = styled.header`
  display: flex;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${p => p.theme.color['gray-10']};
  color: ${p => p.theme.color.black};
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  height: calc(100% - 60px);
`;

const SideBar = styled.section`
  width: 60px;
  box-sizing: border-box;
  height: 100%;
  border-right: 1px solid ${p => p.theme.color['gray-10']};
`;

const Main = styled.main`
  display: flex;
  width: calc(100% - 60px);
  box-sizing: border-box;
  height: 100%;
`;