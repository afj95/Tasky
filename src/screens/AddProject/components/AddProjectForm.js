import React, { useCallback, useRef, useState } from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    I18nManager,
    Alert
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import { t } from '../../../i18n';
import { SupervisorsModal } from './SupervisorsModal';
import Colors from '../../../utils/Colors';
import { mainStyles } from '../../../constants';
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import { Fontisto } from '@expo/vector-icons';
import { StatusesModal } from './StatusesModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import ErrorText from '../../../components/UI/ErrorText';
// import { MapComponent } from '../../ProjectDetails/components';
// import { AddLocationModal } from './AddLocationModal';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { deleteWorkType } from '../../../redux/reducers/Projects/projects-actions';
import { useDispatch } from 'react-redux';

export const AddProjectForm = ({ types, loadings, addProjectProps: { handleChange, values, errors, handleBlur, setFieldValue, handleSubmit } }) => {
    const _scroll = useRef(null);

    const dispatch = useDispatch();

    const [supervisorsModalVisible, setSupervisorsModalVisible] = useState(false);
    const [statusesModal, setStatusesModal] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    // const [locationModalVisible, setLocationModalVisible] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setFieldValue('startDate', currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showPicker = type => showMode(type);

    // const closeLocationModal = () => setLocationModalVisible(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} ref={_scroll} contentContainerStyle={{ paddingBottom: 120 }}>
                <View style={styles.textContainer}>
                    <MyText style={styles.label}>projectName</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                </View>
                <TextInput
                    mode={'flat'}
                    value={values?.projectName}
                    error={errors?.projectName}
                    style={styles.input}
                    onBlur={handleBlur('projectName')}
                    onChangeText={handleChange('projectName')}
                    theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.projectName ? <ErrorText error={errors?.projectName} /> : null}

                <View style={styles.textContainer}>
                    <MyText style={styles.label}>projectSupervisors</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                </View>
                <Pressable onPress={() => setSupervisorsModalVisible(!supervisorsModalVisible)} >
                    <TextInput
                        style={styles.input}
                        mode={'flat'}
                        editable={false}
                        pointerEvents={'none'}
                        onChangeText={handleChange('projectSupervisors')}
                        value={values?.projectSupervisor}
                        error={errors?.projectSupervisors}
                        onBlur={handleBlur('projectSupervisors')}
                        theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                    />
                </Pressable>
                {errors?.projectSupervisors ? <ErrorText error={errors?.projectSupervisors} /> : null}
                <SupervisorsModal
                    modalVisible={supervisorsModalVisible}
                    onSelect={async (item) => {
                        await setFieldValue('projectSupervisors', item?.id)
                        await setFieldValue('projectSupervisor', item?.name)
                    }}
                    closeModal={() => setSupervisorsModalVisible(false)}
                />

                <View style={styles.textContainer}>
                    <MyText style={styles.label}>projectDescription</MyText>
                </View>
                <TextInput
                    roundness={0}
                    style={{ ...styles.input, height: 180 }}
                    mode={'flat'}
                    onChangeText={handleChange('projectDescription')}
                    value={values?.projectDescription}
                    textAlignVertical={'top'}
                    multiline={true}
                    numberOfLines={10}
                    theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />

                <View style={styles.textContainer}>
                    <MyText style={styles.label}>projectStatus</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                </View>
                <Pressable onPress={() => setStatusesModal(!statusesModal)} >
                    <TextInput
                        style={styles.input}
                        mode={'flat'}
                        editable={false}
                        pointerEvents={'none'}
                        onChangeText={handleChange('projectStatus')}
                        value={values?.projectStatusLabel}
                        error={errors?.projectStatus}
                        onBlur={handleBlur('projectStatus')}
                        theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                    />
                </Pressable>
                {errors?.projectStatus ? <ErrorText error={errors?.projectStatus} /> : null}


                <View style={styles.textContainer}>
                    <MyText style={styles.label}>workType</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                </View>
                <TextInput
                    style={styles.input}
                    mode={'flat'}
                    pointerEvents={'none'}
                    onChangeText={handleChange('workType')}
                    value={values?.workType}
                    error={errors?.workType}
                    onBlur={handleBlur('workType')}
                    theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.workType ? <ErrorText error={errors?.workType} /> : null}
                <ScrollView
                    horizontal
                    style={{ marginVertical: 5, marginStart: 5 }}
                    showsHorizontalScrollIndicator={false}>
                    {types && types?.length > 0 ?
                        types.map((type, index) => (
                            <TouchableOpacity
                                onLongPress={() => {
                                    Alert.alert(t('app.deleteType'), t('app.DeleteItem'), [
                                        {
                                            style: 'cancel',
                                            text: t('app.cancel')
                                        },
                                        {
                                            style: 'default',
                                            text: t('app.ok'),
                                            onPress: () => dispatch(deleteWorkType(index))
                                        }
                                    ])
                                }}
                                onPress={() => {
                                    setFieldValue('workType', type)
                                }}
                                activeOpacity={0.4}>
                                <MyText text={type + ','} style={{ marginStart: 5 }} />
                            </TouchableOpacity>
                        ))
                        : null}
                </ScrollView>
                <View style={styles.showedTextContainer}>
                    <MyText style={styles.label}>showed</MyText>
                    <MyText style={styles.showedHelpLabel}>showedHelpText</MyText>
                </View>
                <Fontisto
                    name={values?.showed ? 'checkbox-active' : 'checkbox-passive'}
                    size={20}
                    color={Colors.primary}
                    style={styles.showedBox}
                    onPress={() => setFieldValue('showed', !values.showed)}
                />

                <StatusesModal
                    modalVisible={statusesModal}
                    onSelect={async (item) => {
                        await setFieldValue('projectStatus', item?.name_en)
                        await setFieldValue('projectStatusLabel', I18nManager.isRTL ? item?.name_ar : item?.name_en)
                    }}
                    closeModal={() => setStatusesModal(false)}
                />

                <View style={styles.textContainer}>
                    <MyText style={styles.label}>projectStartDate</MyText>
                </View>
                <View style={styles.dateTimeContainer}>
                    <Pressable onPress={() => showPicker('time')}>
                        <MyText
                            style={styles.dateTimeText}
                            text={moment(values?.startDate).format('h:mm a')}
                        />
                    </Pressable>
                    <Pressable onPress={() => showPicker('date')}>
                        <MyText
                            style={styles.dateTimeText}
                            text={values?.startDate.toLocaleDateString()}
                        />
                    </Pressable>
                </View>
                <MyText style={styles.showedHelpLabel}>dateTimeHelpText</MyText>

                {/* <TouchableOpacity
                    onPress={() => setLocationModalVisible(true)}
                    activeOpacity={1}
                    style={{
                        // borderWidth: 1,

                        height: 100,
                        marginTop: 20,
                        borderRadius: 8
                    }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        initialRegion={{
                            latitude: 24.715462882305346,
                            longitude: 46.676643547097186,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        pitchEnabled={false}
                        scrollEnabled={false}
                    />
                </TouchableOpacity>

                <AddLocationModal
                    visible={locationModalVisible}
                    closeModal={closeLocationModal}
                /> */}

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={values.startDate}
                        mode={mode}
                        is24Hour={false}
                        onChange={onChange}
                    />
                )}

                <TouchableOpacity
                    disabled={loadings?.add_project}
                    onPress={handleSubmit}
                    style={styles.addProjectButton}>
                    <MyText style={styles.addProjectText}>addNewProject</MyText>
                </TouchableOpacity>
            </ScrollView>
            {!loadings?.add_project ? null :
                <ActivityIndicator
                    size={40}
                    color={Colors.primary}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }} />
            }
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    label: {
        color: Colors.primary,
        fontFamily: 'bold',
        fontSize: 15
    },
    input: {
        fontFamily: 'bold',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        color: Colors.primary,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        ...mainStyles.viewShadow
    },
    dateTimeContainer: {
        fontFamily: 'bold',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        color: Colors.primary,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        ...mainStyles.viewShadow,
    },
    dateTimeText: {
        marginEnd: 20,
        fontFamily: 'bold',
        color: Colors.primary
    },
    addProjectButton: {
        marginTop: 40,
        backgroundColor: Colors.primary,
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    addProjectText: {
        fontFamily: 'bold',
        color: Colors.appWhite,
        marginVertical: 3,
        fontSize: 16
    },
    showedTextContainer: {
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    showedHelpLabel: {
        color: Colors.primary,
        fontFamily: 'light',
        fontSize: 12,
        marginTop: 2,
    },
    showedBox: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginStart: 10
    }
})