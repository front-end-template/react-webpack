import React from 'react'
import ReactDOM from 'react-dom'

import '@/styles/main.scss'
import Test from './components/test'

ReactDOM.render(
  <Test value="how are you" />,
  document.getElementById('app'),
)
