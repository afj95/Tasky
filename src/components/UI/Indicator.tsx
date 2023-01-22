import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const Indicator = (props: {
     animating: boolean | undefined;
     hidesWhenStopped?: boolean | true;
} | ActivityIndicatorProps) => {
     return (
          // @ts-ignore
          <ActivityIndicator
               animating={props.animating === true}
               hidesWhenStopped={props.hidesWhenStopped || true}
               {...props}
          />
     )
}

export default Indicator;