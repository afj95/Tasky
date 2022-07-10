import React, { useRef, useState } from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Pressable,
    TextInput
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import { t } from '../../../i18n';
import { SupervisorsModal } from './SupervisorsModal';
import Colors from '../../../utils/Colors';

export const AddProjectForm = ({ addProjectProps: { handleChange, values, errors, handleBlur, setFieldValue } }) => {

    const _scroll = useRef(null);
    // TODO: Add loading in redux.
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} ref={_scroll} contentContainerStyle={{ paddingBottom: 120 }}>
                <View style={styles.textContainer}>
                    <MyText>projectName1</MyText>
                </View>
                <TextInput
                    mode={'flat'}
                    value={values?.projectName1}
                    error={errors?.projectName1}
                    style={styles.input}
                    onBlur={handleBlur('projectName1')}
                    placeholder={t('app.projectName1')}
                    placeholderTextColor={Colors.text}
                    onChangeText={handleChange('projectName1')}
                    theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.projectName1 ? <ErrorText error={errors?.projectName1} /> : null}

                <View style={styles.textContainer}>
                    <MyText>projectName2</MyText>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={t('app.projectName2')}
                    placeholderTextColor={Colors.text}
                    mode={'flat'}
                    onChangeText={handleChange('projectName2')}
                    value={values?.projectName2}
                    error={errors?.projectName2}
                    onBlur={handleBlur('projectName2')}
                    theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.projectName2 ? <ErrorText error={errors?.projectName2} /> : null}

                <View style={styles.textContainer}>
                    {/* TODO: change Supervisors to Supervisor */}
                    <MyText>projectSupervisors</MyText>
                </View>
                <Pressable onPress={() => setModalVisible(!modalVisible)} >
                    <TextInput
                        style={styles.input}
                        placeholder={t('app.projectSupervisors')}
                        placeholderTextColor={Colors.text}
                        mode={'flat'}
                        editable={false}
                        pointerEvents={'none'}
                        onChangeText={handleChange('projectSupervisors')}
                        value={values?.projectSupervisor} // here will show the label from the modal
                        error={errors?.projectSupervisors}
                        onBlur={handleBlur('projectSupervisors')}
                        theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                    />
                </Pressable>
                {errors?.projectSupervisors ? <ErrorText error={errors?.projectSupervisors} /> : null}
                <SupervisorsModal
                    modalVisible={modalVisible}
                    onSelect={async (item) => {
                        await setFieldValue('projectSupervisors', item?._id)
                        await setFieldValue('projectSupervisor', item?.name)
                    }}
                    closeModal={() => setModalVisible(false)}
                />

                <View style={styles.textContainer}>
                    <MyText>projectDescription</MyText>
                </View>
                <TextInput
                    roundness={0}
                    style={{ ...styles.input, height: 180 }}
                    placeholder={t('app.projectDescription')}
                    placeholderTextColor={Colors.text}
                    mode={'flat'}
                    onChangeText={handleChange('projectDescription')}
                    value={values?.projectDescription}
                    error={errors?.projectDescription}
                    textAlignVertical={'top'}
                    multiline={true}
                    numberOfLines={10}
                    // onBlur={handleBlur('projectDescription')}
                    theme={{ colors: { text: Colors.text, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.projectDescription ? <ErrorText error={errors?.projectDescription} /> : null}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.primary
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    registerButton: {
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
        // shadow
        shadowColor: '#888888',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    input: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        padding: 10,
        color: Colors.text
    },
    haveAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    signupText: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    seperator: {
        width: '80%',
        height: 1,
        backgroundColor: '#b9b9b9',
        marginVertical: 20,
        alignSelf: 'center'
    },
    tasksText: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    addTaskContainer: {
        backgroundColor: Colors.buttons,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        position: 'absolute',
        bottom: 5,
        end: 10,
    },
    addTaskView: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTaskText: {
        fontSize: 25,
        color: Colors.white
    },
    taskView: {
        backgroundColor: '#fff',
        marginTop: 10
    },
})

const ErrorText = ({ error }) => <MyText style={{ color: '#B22323', fontSize: 12 }}>{error}</MyText>