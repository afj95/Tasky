import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import Colors from '../../utils/Colors';

const Indicator = (props: { hidesWhenStopped?: boolean | true; margin: number | 40; } & ActivityIndicatorProps) => {
     return (
          // @ts-ignore
          <ActivityIndicator
               // animating={props.animating === true}
               // hidesWhenStopped={props.hidesWhenStopped || true}
               color={Colors.primary}
               style={{ marginVertical: props.margin }}
               {...props}
          />
     )
}

export default Indicator;