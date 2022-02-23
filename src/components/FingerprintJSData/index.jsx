import React from 'react'
import { FpjsProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

const FingerprintJSData = (props) => {
  const visitorData = useVisitorData({ extendedResult: true, tag: "moj-tag", linkedId: "moje-linked-id" });

  if (visitorData.isLoading) {
    console.log("Loading")
  }

  if (visitorData.error) {
      console.log("An error occured")
  }

  if (visitorData.data) {
    console.log(visitorData.data)
  }

  return (<h1>My data</h1>)
}

export default FingerprintJSData

