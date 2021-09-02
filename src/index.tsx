import React from 'react'
import ReactDOM from 'react-dom'
import './styles/globals.scss'
import App from './app'
import 'katex/dist/katex.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
