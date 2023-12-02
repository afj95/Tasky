import React, { useEffect, useState, useCallback, useRef } from 'react'
import Colors from '../../utils/Colors'
import {
     View,
     StyleSheet,
     I18nManager,
     Alert
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { googleMapKey, mainStyles } from '../../constants';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { t } from '../../i18n';
import MyText from '../../components/UI/MyText';
import { MainHeader } from '../../components/UI/MainHeader'
import TouchableOpacity from '../../components/UI/TouchableOpacity';
import { navigate } from '../../navigation/RootNavigation';
import Errors_codes from '../../../Errors_codes';

export const AddLocationScreen = (props) => {
     const {
          setFieldValue,
          projectAddress,
          setProjectAddress,
          mainRegion,
          setMainRegion,
     } = props?.route?.params;

     const _mapRef = useRef(null);

     const [userRegion, setUserRegion] = useState(mainRegion ||
     {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
     })
     const [errorMsg, setErrorMsg] = useState(null);
     const [marker, setMarker] = useState(mainRegion || null);
     const [address, setAddress] = useState(projectAddress || t('app.searchLocation'));
     const [fetching, setFetching] = useState(false);
     const [hideInput, setHideInput] = useState(false);

     useEffect(() => {
          (async () => {
               try {
                    // Requesting user location
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                         setErrorMsg(t('app.mapPermissionDenied'));
                         return;
                    }
               } catch (error) {
                    Alert.alert(t('app.warning'), t('app.cantGetUserLocation'), [
                         {
                              text: t('app.ok'),
                              style: 'cancel'
                         }
                    ])
                    setUserRegion({
                         latitude: 0,
                         longitude: 0,
                         latitudeDelta: 0.01,
                         longitudeDelta: 0.01,
                    })
               }
          })();

          if (projectAddress) {
               setMarker(mainRegion)
          }

          return () => {
               setMarker(null);
          }
     }, [])

     const fetchLocationDetails = async (data) => {
          const SA_region = 'sa';

          setFetching(true)
          try {
               let geocodeURL = '';
               if (data.address && !data?.coordinate) {
                    let address = data.address + '';

                    address = address.trim().replace(/\s+/g, '+').toLowerCase();
                    geocodeURL =
                         `https://maps.googleapis.com/maps/api/geocode/json?` +
                         `key=${googleMapKey}` +
                         `&address=${address}` +
                         `&language=${I18nManager.isRTL ? 'ar' : 'en'}` +
                         `&region=${SA_region}`;

                    const googleMapsResponse = await axios({
                         url: geocodeURL,
                         method: 'GET',
                    })

                    if (googleMapsResponse?.data?.results.length) {
                         // Setting the marker on the address latlng
                         setMarker({
                              latitude: googleMapsResponse.data?.results[0]?.geometry?.location?.lat,
                              longitude: googleMapsResponse.data?.results[0]?.geometry?.location?.lng
                         })
                         // Navigate to the marker latlng
                         const region = {
                              latitude: googleMapsResponse.data?.results[0].geometry.location.lat,
                              longitude: googleMapsResponse.data?.results[0].geometry.location.lng,
                              latitudeDelta: 0.01,
                              longitudeDelta: 0.01,
                         };
                         _mapRef?.current?.animateToRegion(region, 500)
                    } else {
                         Alert.alert(t('app.warning'), t('app.noMapResultsMessage'), [
                              {
                                   text: t('app.ok'),
                                   style: 'cancel'
                              }
                         ])
                    }
               } else if (data.coordinate) {
                    // On marker longPressed 
                    geocodeURL =
                         `https://maps.googleapis.com/maps/api/geocode/json?` +
                         `key=${googleMapKey}` +
                         `&latlng=${data.coordinate.latitude},${data.coordinate.longitude}`;

                    const googleMapsResponse = await axios({
                         url: geocodeURL,
                         method: 'GET',
                    })

                    const region = {
                         latitude: googleMapsResponse.data?.results[0].geometry.location.lat,
                         longitude: googleMapsResponse.data?.results[0].geometry.location.lng,
                         latitudeDelta: 0.01,
                         longitudeDelta: 0.01,
                    };

                    setMainRegion(region)
                    setAddress(googleMapsResponse.data?.results[0]?.formatted_address);
                    setProjectAddress(googleMapsResponse.data?.results[0]?.formatted_address);
                    await setFieldValue('latitude', googleMapsResponse.data?.results[0].geometry.location.lat)
                    await setFieldValue('longitude', googleMapsResponse.data?.results[0].geometry.location.lng)
               }
          } catch (error) {
               if (__DEV__) {
                    console.log('error', error);
               }
               Alert.alert(t('app.warsning'), t('app.serverError') + ' ' + Errors_codes.fetch_location_details, [
                    {
                         text: t('app.ok'),
                         style: 'cancel'
                    }
               ])
          } finally {
               setFetching(false)
          }
     }

     const _getMarkerClickedData = useCallback(async e => {
          const coordinate = e.nativeEvent.coordinate;
          setMarker(coordinate)
          if (coordinate) {
               fetchLocationDetails({ coordinate });
          } else {
               Alert.alert(t('app.warning'), t('app.serverError') + ' ' + Errors_codes.get_marker_clicked_data, [
                    {
                         text: t('app.ok'),
                         style: 'cancel'
                    }
               ])
          }
     }, [])

     const goToSearchLocationScreen = () => {
          navigate('SearchLocationScreen', {
               address,
               setAddress,
               setProjectAddress,
               setMarker,
               fetchLocationDetails,
               fetching,
          })
     }

     const onMyLocationPressed = async () => {
          let location = await Location.getCurrentPositionAsync({});
          let region = {
               latitude: location.coords.latitude,
               longitude: location.coords.longitude,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
          };
          setMarker({
               latitude: location.coords.latitude,
               longitude: location.coords.longitude,
          })
          _mapRef.current.animateToRegion(region, 500);
     }

     return (
          <View style={styles.container}>
               <MainHeader showGoBack title='addLocationTitle' translate />
               <View style={styles.contentView}>
                    {errorMsg ? <MyText text={errorMsg} /> :
                         <>
                              <TouchableOpacity
                                   activeOpacity={1}
                                   onPress={goToSearchLocationScreen}
                                   style={styles.placesInputContainer}>
                                   <MyText style={styles.addressText} text={address} />
                                   <AntDesign name={'search1'} size={20} color={Colors.primary} />
                              </TouchableOpacity>
                              <View style={{ flex: 1, }}>
                                   <MapView
                                        ref={_mapRef}
                                        style={styles.map}
                                        provider={PROVIDER_GOOGLE}
                                        key={googleMapKey}
                                        showsCompass={true}
                                        showsUserLocation={false}
                                        onLongPress={_getMarkerClickedData}
                                        onTouchStart={() => setHideInput(!hideInput)}
                                        onTouchEnd={() => setHideInput(!hideInput)}
                                        loadingEnabled={true}
                                        initialRegion={userRegion}>
                                        {marker &&
                                             <Marker
                                                  coordinate={marker}
                                                  style={{ width: 40, height: 40 }}>
                                             </Marker>
                                        }
                                   </MapView>
                              </View>
                              <MaterialIcons
                                   name={'my-location'}
                                   size={20}
                                   color={Colors.primary}
                                   style={styles.myLocationbutton}
                                   onPress={onMyLocationPressed}
                              />
                         </>
                    }
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.appWhite
     },
     contentView: {
          flex: 1,
          height: '100%',
          justifyContent: 'space-between',
          backgroundColor: Colors.appWhite,
          padding: 5,
     },
     placesInputContainer: {
          borderWidth: 0.5,
          borderColor: Colors.secondary,
          height: 40,
          backgroundColor: Colors.white,
          position: 'absolute',
          zIndex: 2,
          top: 10,
          width: '95%',
          borderRadius: 8,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 5,
     },
     addressText: {
          width: '95%',
          fontFamily: 'bold',
          color: '#999',
          textAlign: 'left'
     },
     map: {
          width: '100%',
          height: '100%',
          alignSelf: 'flex-end',
          zIndex: 1,
     },
     inputContainer: {
          height: 40,
          overflow: 'hidden',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          backgroundColor: Colors.white,
          borderWidth: 0.5,
          borderColor: Colors.primary,
          borderRadius: 8,
          ...mainStyles.viewShadow
     },
     input: {
          fontFamily: 'bold',
          width: '90%',
          height: 50,
          overflow: 'hidden',
          justifyContent: 'center',
          backgroundColor: Colors.white
     },
     myLocationbutton: {
          position: 'absolute',
          bottom: 20,
          end: 20,
          borderRadius: 10,
          backgroundColor: Colors.white,
          borderRadius: 8,
          padding: 10,
          zIndex: 2,
          ...mainStyles.viewShadow
     },
})