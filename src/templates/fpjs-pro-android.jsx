import React, { useEffect, useState } from 'react'
import CodeHighlighter from '../components/CodeHighlighter/index'
import fpPro from '@fingerprintjs/fingerprintjs-pro'

const FpjsProAndroid = () => {
  const [visitorIdProAndroid, setVisitorIdProAndroid] = useState(
    'Waiting for visitorIdProAndroid...'
  )
  const [resultProIAndroid, setResultProAndroid] = useState('')

  useEffect(() => {
    const androidDeviceId  =
      window["fpjs-pro-android"] && window["fpjs-pro-android"].getDeviceId()
        ? window["fpjs-pro-android"].getDeviceId()
        : 'not-in-android-context'
    ;(async () => {
      fpPro
        .load({
          token: 'tQUwQQOuG9TNwqc6F4I2',
          region: 'eu',
          endpoint: 'https://fp.martinmakarsky.com',
        })
        .then((fp) =>
          fp.get({
            tag: {
              deviceId: androidDeviceId,
              deviceType: 'android',
            },
            linkedId: 'makma',
            extendedResult: true,
          })
        )
        .then((result) => {
          setVisitorIdProAndroid(`Fingerprint by PRO Android is: ${result.visitorId}`)
          setResultProAndroid(JSON.stringify(result, null, 2))
        })
    })()
  }, [])

  return (
    <>
      <div>
        <h2>FingerprintJS PRO iOS</h2>
        <h3>{visitorIdProAndroid}</h3>
        {resultProIAndroid ? (
          <CodeHighlighter language="json" code={resultProIAndroid} />
        ) : null}
      </div>
    </>
  )
}

export default FpjsProAndroid
