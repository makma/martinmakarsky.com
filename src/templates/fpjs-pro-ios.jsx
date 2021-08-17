import React, { useEffect, useState } from 'react'
import CodeHighlighter from '../components/CodeHighlighter/index'
import fpPro from '@fingerprintjs/fingerprintjs-pro'

const FpjsProIOS = () => {
  const [visitorIdProIOS, setVisitorIdProIOS] = useState(
    'Waiting for visitorIdProIOS...'
  )
  const [resultProIOS, setResultProIOS] = useState('')

  useEffect(() => {
    const vendorId =
      window.fingerprintjs && window.fingerprintjs.vendorId
        ? window.fingerprintjs.vendorId
        : 'not-in-ios-context'
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
              deviceId: vendorId,
              deviceType: 'ios',
            },
            linkedId: 'makma',
            extendedResult: true,
          })
        )
        .then((result) => {
          setVisitorIdProIOS(`Fingerprint by PRO IOS is: ${result.visitorId}`)
          setResultProIOS(JSON.stringify(result, null, 2))
        })
    })()
  }, [])

  return (
    <>
      <div>
        <h2>FingerprintJS PRO iOS</h2>
        <h3>{visitorIdProIOS}</h3>
        {resultProIOS ? (
          <CodeHighlighter language="json" code={resultProIOS} />
        ) : null}
      </div>
    </>
  )
}

export default FpjsProIOS
