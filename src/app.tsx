import * as React from 'react'
import {Component} from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import './styles/main.scss'

import Layout from './components/Layout/Layout.tsx'

configure()

if('serviceWorker' in navigator) {
  navigator['serviceWorker']
    .register('/sw.bundle.js')
    .then(() => console.log('Service Worker Registered'))
}

const theme = getMuiTheme()

class App extends Component<{}, {}> {
  render() {
    return <MuiThemeProvider muiTheme={theme}>
      <Layout flow='column'>
        <AppBar />
        <div className='content'>
          <RaisedButton label='test'/>
          <Layout flow='row'>
            <div style={{flex: 1}}>test</div>
            <div style={{flex: 1}}>test</div>
            <div style={{flex: 1}}>test</div>
            <div style={{flex: 1}}>test</div>
          </Layout>
        </div>
      </Layout>
    </MuiThemeProvider>
  }
}

render(<App />, document.getElementById('root'))
