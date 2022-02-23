import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import ForkMeOnGithub from '../ForkMeOnGithub/index'
import FingerprintJSData from '../FingerprintJSData/index'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';


class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
        <FpjsProvider
          loadOptions={{
            token: 'tQUwQQOuG9TNwqc6F4I2',
            region: 'eu',
            endpoint: 'https://fp.martinmakarsky.com',
          }}
        >
          <div className="layout">
            <Helmet
              defaultTitle="Blog by Martin Makarsky"
              htmlAttributes={{ lang: 'en' }}
            >
              <link
                href="/favicon.ico"
                rel="shortcut icon"
                type="image/x-icon"
              />
            </Helmet>
            {children}
          </div>
          <ForkMeOnGithub
            repo="https://github.com/makma/martinmakarsky.com"
            colorBackground="black"
            colorOctocat="white"
          />
          <FingerprintJSData/>
        </FpjsProvider>
    )
  }
}

export default Layout
