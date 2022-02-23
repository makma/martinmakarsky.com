import React from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

const FingerprintJSData = (props) => {
  const visitorData = useVisitorData({ extendedResult: true, tag: "my-tag", linkedId: "my-linked-id" });

  if (visitorData.data) {
    console.log(visitorData.data)
  }

  return (<></>)
}

export default FingerprintJSData

