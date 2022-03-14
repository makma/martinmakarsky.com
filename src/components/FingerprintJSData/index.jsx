import React from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

const FingerprintJSData = () => {
  const visitorData = useVisitorData({
    extendedResult: true,
    tag: 'moj-tag',
    linkedId: 'moje-linked-id',
  })

  if (visitorData.isLoading) {
    console.log('Loading')
  }

  if (visitorData.error) {
    console.log(`An error occured: ${visitorData.error}`)
  }

  if (visitorData) {
    console.log(visitorData)
  }

  return <></>
}

export default FingerprintJSData
