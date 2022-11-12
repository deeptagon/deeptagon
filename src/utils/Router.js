import { Router as Component } from 'react-router-dom';
import { createElement } from 'react'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory();
export const routeTo = (route) => () =>
  history.push(route)

export const Router = ({ children }) => createElement(Component, { history }, children)