import React from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

const TouchableOpacity = (props: RNTouchableOpacity['props']) => (
    // @ts-ignore
    <RNTouchableOpacity
        activeOpacity={0.8}
        {...props}>
    </RNTouchableOpacity>
)

export default TouchableOpacity;