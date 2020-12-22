/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.3);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  text-align: center;
  height: 50px;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#a20a0a" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  background-image: url("/logo.svg");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  width: 80%;
  height: 70%;
  padding: 2px;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item>
        <SLink to='/'>
          <Logo />
        </SLink>
      </Item>
      <Item current={pathname === "/"}>
        <SLink to='/'>영화</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to='/tv'>TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to='/search'>검색</SLink>
      </Item>
    </List>
  </Header>
));
