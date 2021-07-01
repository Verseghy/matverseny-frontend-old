import React from 'react'
import ReactDOM from 'react-dom'
import './styles/globals.scss'
import App from './app'
import 'katex/dist/katex.min.css'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
