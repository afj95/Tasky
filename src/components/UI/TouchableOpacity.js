import React from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

export const TouchableOpacity = ({ children, ...props }) => (
    <RNTouchableOpacity
        activeOpacity={0.8}
        {...props}>
        {children}
    </RNTouchableOpacity>
)