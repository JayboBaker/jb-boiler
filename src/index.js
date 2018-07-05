import React from 'react'
import ReactDOM, { render } from 'react-dom'
import a11y from 'react-a11y'

import debug from './utils/debug'
import { rules } from './utils/a11y.constants'

import App from './components/app/App'

import './index.scss'

const iDebug = debug('entry')
if (process.env.NODE_ENV === 'development') {
  a11y(React, ReactDOM, {
    rules
  })

  iDebug('a11y dev tools initialised!')
}

const renderApp = () => render(
  <App />,
  document.getElementById('app')
)

renderApp()
