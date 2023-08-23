import React from 'react'
import MyText from './MyText'

export default ErrorText = ({ error, style }) => <MyText style={{ color: '#B22323', fontSize: 12, fontFamily: 'bold', ...style }}>{error}</MyText>