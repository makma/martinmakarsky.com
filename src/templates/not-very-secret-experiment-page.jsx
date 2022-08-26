import React, { useEffect, useState } from 'react'
import CodeHighlighter from '../components/CodeHighlighter/index'
import fpOS from '@fingerprintjs/fingerprintjs'
import fpPro from '@fingerprintjs/fingerprintjs-pro'
import Botd from '@fpjs-incubator/botd-agent'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import FingerprintJSData from '../components/FingerprintJSData/index'

const NotVerySecretExperimentPage = () => {
  const [visitorIdOS, setVisitorIdOS] = useState('Waiting for visitorIdOS...')
  const [resultOS, setResultOS] = useState('Waiting for results')
  const [botdDetectResult, setBotdDetectResult] = useState(
    'Waiting for results'
  )
  const [botdGetResultResult, setBotdGetResultResult] = useState(
    'Waiting for results'
  )

  const [visitorIdPro, setVisitorIdPro] = useState(
    'Waiting for visitorIdPro...'
  )
  const [resultPro, setResultPro] = useState('')

  function useBotd() {
    // Initialize an agent at application startup.
    const botdPromise = Botd.load({
      token: 'W1QtHZuLIBWVv5XaO9T',
      mode: 'allData',
    })

    ;(async () => {
      // Get the bot detection result when you need it.
      const botd = await botdPromise
      const botdDetectResult = await botd.detect('my_tag')
      setBotdDetectResult(JSON.stringify(botdDetectResult, null, 2))

      const botdGetResult = await botd.getResult()
      setBotdGetResultResult(JSON.stringify(botdGetResult, null, 2))
    })()
  }

  function useFingerprintJSOSS() {
    const fpOSPromise = fpOS.load()

    ;(async () => {
      const fp = await fpOSPromise
      const result = await fp.get()
      setVisitorIdOS(`Fingerprint by OSS is: ${result.visitorId}`)
      setResultOS(JSON.stringify(result, null, 2))
    })()
  }

  function useFingerprintJSProDirectly() {
    fpPro
      .load({
        token: 'tQUwQQOuG9TNwqc6F4I2',
        region: 'eu',
        endpoint: 'https://fp.martinmakarsky.com',
      })
      .then((fp) =>
        fp.get({ tag: 'my_tag', linkedId: 'makma', extendedResult: true })
      )
      .then((result) => {
        setVisitorIdPro(`Fingerprint by PRO is: ${result.visitorId}`)
        setResultPro(JSON.stringify(result, null, 2))
      })
  }

  useEffect(() => {
    // useBotd()
    // useFingerprintJSOSS()
    console.log('use effect');
    useFingerprintJSProDirectly()
  }, [])

  if (typeof window !== 'undefined') {
    return (
      <FpjsProvider
        loadOptions={{
          token: 'tQUwQQOuG9TNwqc6F4I2',
          region: 'eu',
          endpoint: 'https://fp.martinmakarsky.com',
        }}
      >
        <div>
          <h2>Botd Detect Results</h2>
          {botdDetectResult ? (
            <CodeHighlighter language="json" code={botdDetectResult} />
          ) : null}
        </div>
        <div>
          <h2>Botd GetResult Results</h2>
          {botdGetResultResult ? (
            <CodeHighlighter language="json" code={botdGetResultResult} />
          ) : null}
        </div>
        <div>
          <h2>FingerprintJS open source</h2>
          <h3>{visitorIdOS}</h3>
          {resultOS ? (
            <CodeHighlighter language="json" code={resultOS} />
          ) : null}
        </div>
        <div>
          <h2>FingerprintJS PRO</h2>
          <h3>{visitorIdPro}</h3>
          {resultPro ? (
            <CodeHighlighter language="json" code={resultPro} />
          ) : null}
        </div>
        <FingerprintJSData />
      </FpjsProvider>
    )
  }
  return <></>
}

export default NotVerySecretExperimentPage
