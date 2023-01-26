import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import Colors from '../../utils/Colors';

const Indicator = (props: {
     animating: boolean | undefined;
     hidesWhenStopped?: boolean | true;
} | ActivityIndicatorProps) => {
     return (
          // @ts-ignore
          <ActivityIndicator
               animating={props.animating === true}
               hidesWhenStopped={props.hidesWhenStopped || true}
               color={Colors.primary}
               {...props}
          />
     )
}

export default Indicator;