import React from 'react'

export default ErrorText = ({ error, style }) => <MyText style={{ color: '#B22323', fontSize: 12, fontFamily: 'bold', ...style }}>{error}</MyText>