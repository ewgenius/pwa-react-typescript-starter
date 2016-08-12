import * as React from 'react'
import './Layout.scss'

export default (props) => <div className={`layout ${props.flow}`}>
  {props.children}
</div>