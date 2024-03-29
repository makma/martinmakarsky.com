import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import ForkMeOnGithub from '../ForkMeOnGithub/index'
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    getVisitorId()

    return (
      <>
        <div className="layout">
          <Helmet
            defaultTitle="Blog by Martin Makarsky"
            htmlAttributes={{ lang: 'en' }}
          >
            <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
          </Helmet>
          {children}
        </div>
        <ForkMeOnGithub
          repo="https://github.com/makma/martinmakarsky.com"
          colorBackground="black"
          colorOctocat="white"
        />
      </>
    )
  }
}

function getVisitorId() {
  // Initialize an agent at application startup using Cloudflare integration.
   const fpPromise = FingerprintJS.load({
     apiKey: 'tQUwQQOuG9TNwqc6F4I2', // REPLACE <API_KEY>,
     scriptUrlPattern:
       'https://martinmakarsky.com/bbcuwo8w03s36c1s/rmcqnpn7451zig6d?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>', // ADDED (as is)
     endpoint: 'https://martinmakarsky.com/bbcuwo8w03s36c1s/ottv9o457h973r88?region=eu', // CHANGED
   })

  // Get the visitor identifier when you need it.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId))
}

export default Layout
