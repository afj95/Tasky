import React from 'react'
import Colors from '../../../utils/Colors'
import Modal from 'react-native-modal';
import {
     View,
     StyleSheet,
     Linking,
     Platform
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { googleMapKey } from '../../../constants';
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import MyText from '../../../components/UI/MyText';
import { t } from '../../../i18n';

export const MapComponent = ({ visible, closeModal, latitude, longitude, location }) => {

     const openNavigation = async () => {

          Linking.canOpenURL(location)
               .then(supported => {
                    if (supported) {
                         Linking.openURL(location);
                    } else {
                         alert("Can't open this link " + location)
                    }
               })
               .catch(e => {
                    alert(t('app.errorHappened') + ' ' + e)
               });
     }

     return (
          <Modal
               swipeThreshold={10}
               isVisible={visible}
               style={styles.modal}
               onBackButtonPress={closeModal}
               onBackdropPress={closeModal}
               onSwipeComplete={closeModal}
               animationIn={'slideInUp'}
               animationInTiming={500}
               animationOutTiming={500}
               useNativeDriver>
               <View style={styles.contentView}>
                    <MapView
                         style={styles.map}
                         provider={PROVIDER_GOOGLE}
                         pitchEnabled={false}
                         zoomEnabled={false}
                         scrollEnabled={false}
                         initialRegion={{
                              latitude: Number(latitude),
                              longitude: Number(longitude),
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                         }}>
                         {latitude && longitude ?
                              <Marker
                                   coordinate={{
                                        latitude: Number(latitude),
                                        longitude: Number(longitude),
                                   }}
                              /> : null}
                    </MapView>
                    <TouchableOpacity
                         onPress={openNavigation}
                         style={styles.openNavigationButton}>
                         <MyText style={styles.openNavigationText}>startNavigation</MyText>
                    </TouchableOpacity>
               </View>
          </Modal>
     )
}

const styles = StyleSheet.create({
     modal: {
          justifyContent: 'center',
          alignItems: 'center'
     },
     contentView: {
          width: '100%',
          height: '80%',
          backgroundColor: Colors.appWhite,
          borderRadius: 10,
          padding: 10,
          paddingBottom: 15
     },
     header: {
          height: 40,
          justifyContent: 'center',
          alignItems: 'baseline',
          flexDirection: 'row',
     },
     // headerText: {
     //      fontFamily: 'bold',
     //      color: Colors.primary,
     //      fontSize: 18
     // },
     map: {
          width: '100%',
          height: '80%'
     },
     openNavigationButton: {
          height: 50, width: '80%',
          borderWidth: 1,
          borderColor: Colors.primary,
          borderRadius: 8,
          alignSelf: 'center',
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center'
     },
     openNavigationText: {
          fontFamily: 'bold',
          color: Colors.primary,
          fontSize: 18
     }
})