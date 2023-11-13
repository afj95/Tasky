import React, { useRef, useCallback } from 'react'
import Colors from '../../utils/Colors'
import {
     View,
     StyleSheet,
     ActivityIndicator,
} from 'react-native'
import { googleMapKey } from '../../constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AntDesign } from '@expo/vector-icons';
import { MainHeader } from '../../components/UI/MainHeader';
import { goBack } from '../../navigation/RootNavigation';
import { t } from '../../i18n';
import { DismissKeyboardView } from '../../components/UI/DismissKeyboardHOC';
import MyText from '../../components/UI/MyText';

export const SearchLocationScreen = (props) => {
     const {
          address,
          setAddress,
          setProjectAddress,
          setMarker,
          fetchLocationDetails,
          fetching
     } = props.route.params;

     const _placesInputRef = useRef(null);

     const _textInputProps = {
          multiline: true,
          numberOfLines: 3,
          autoFocus: true,
          height: 50,
     };

     const _queryConfig = {
          key: googleMapKey,
          language: 'ar',
          country: 'SA',
          region: 'SA'
     };

     const clearPlacesInput = () => {
          _placesInputRef.current.clear();
          setAddress(null);
          setProjectAddress(null);
          setMarker(null);
     }

     const onLocationItemPressed = useCallback(async (data, details = null) => {
          await fetchLocationDetails({
               address: details?.formatted_address
          })
          goBack();
     }, [address])

     const _renderLeftButton = () => {
          return (
               fetching ?
                    <ActivityIndicator
                         size={22}
                         color={Colors.primary}
                         style={{ alignSelf: 'center', marginHorizontal: 8, }}
                    />
                    :
                    <AntDesign
                         name={'close'}
                         size={22}
                         color={Colors.primary}
                         onPress={clearPlacesInput}
                         style={{ alignSelf: 'center', marginHorizontal: 8, }}
                    />
          )
     }

     return (
          <>
               <MainHeader showGoBack title='searchLocation' />
               <DismissKeyboardView style={styles.container}>
                    <GooglePlacesAutocomplete
                         ref={_placesInputRef}
                         query={_queryConfig}
                         styles={styles.googleInputsStyles}
                         textInputProps={_textInputProps}
                         debounce={2200}
                         renderDescription={row => row.description}
                         fetchDetails={true}
                         placeholder={t('app.searchLocation')}
                         minLength={2}
                         autoFocus={false}
                         onPress={onLocationItemPressed}
                         // renderLeftButton={_renderLeftButton}
                         // onFail={error => alert('Error' + JSON.stringify(error))}
                         onNotFound={() => alert('not Found')}
                         // onTimeout={}
                         listEmptyComponent={() => {
                              return (
                                   <View style={styles.listStyles}>
                                        <MyText>noData</MyText>
                                   </View>
                              )
                         }}
                         listLoaderComponent={() => {
                              return (
                                   <View style={styles.listStyles}>
                                        <MyText>loading</MyText>
                                   </View>
                              )
                         }}
                    />
               </DismissKeyboardView>
          </>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.appWhite,
          paddingHorizontal: 5,
     },
     googleInputsStyles: {
          textInput: {
               fontFamily: 'bold',
               paddingVertical: 4,
               height: 40,
               backgroundColor: Colors.white,
               borderColor: Colors.secondary,
               borderWidth: 0.5,
               marginTop: 10,
          },
          description: {
               fontWeight: 'bold'
          },
          listView: {
               height: '50%'
          }
     },
     listStyles: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
     },
})