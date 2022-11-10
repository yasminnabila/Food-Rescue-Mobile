import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { selectXenditPay, setXenditPay } from '../store/slices/userSlice';

export default function XenditScreen() {
  const dispatch = useDispatch()
  const xenditPay = useSelector(selectXenditPay)
  const [localXendit, setLocalXendit] = useState(null)

  if (xenditPay) {
    setLocalXendit(xenditPay)
    dispatch(setXenditPay(null))
  }


  return (
    <WebView
      source={{ uri: localXendit }}
    />
  )
}