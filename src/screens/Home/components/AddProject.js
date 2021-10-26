import React, { useRef, useState } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
// used this library the native library doesn't handle press
// on position: 'absolute' container
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import { Portal, TextInput } from 'react-native-paper';
// import { t } from '../../../i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { addNewHome } from '../../../../reducers/home/homesActions';
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get("window");

export const AddProject = () => {
    const dispatch = useDispatch();
    const _inputRef = useRef();
    // const isMounted = useRef(false);

    // const addHomeLoading = useSelector(state => state?.homesReducer?.addHomeLoading);
    // const addHomeStatus = useSelector(state => state?.homesReducer?.addHomeStatus);
    const addProjectLoading = useSelector(state => state?.projectsReducer?.addProjectLoading)

    // useEffect(() => {
    //     // if (isMounted.current) {
    //       if(isMounted.current) {
    //         switch(addHomeStatus) {
    //             case 201: {
    //                 showMessage({
    //                     message: 'Added successfully',
    //                     type: 'success',
    //                     duration: 800,
    //                 })
    //             }
    //         }
    //         isMounted.current = false
    //       } else {
    //         showMessage({
    //             message: 'Not Added!',
    //             type: 'danger',
    //             duration: 800,
    //         })
    //       }

    //     // }
    //   }, [addHomeStatus]);

    // useEffect(() => {
    //     isMounted.current = true;
    //   }, []);

    const modalizeRef = useRef(null);
    const [value, setValue] = useState('');
    const [error, setError] = useState(value !== '');

    const _onOpen = () => {
        modalizeRef.current?.open();
    };

    const _onClosed = () => {
        // cleaning functions
        setValue('');
        setError(false);
    };

    const onChangeText = text => setValue(text) 
    
    const _addNewHome = async () => {
        // if(value === '') {
        //     setError(true);
        // } else {
        //     // cleaning functions
        //     setError(false)
        //     await dispatch(addNewHome(value))
        //     modalizeRef.current?.close();
        // }

        alert('added')
    };

    return (
        <>
            <TouchableOpacity onPress={_onOpen} style={styles.showModalButton}>
                <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} />
                <MyText text={'addProject'} style={styles.showModalText}  />
            </TouchableOpacity>
            <Portal>
                <Modalize onClosed={_onClosed}  ref={modalizeRef} modalHeight={height - (height / 2)} snapPoint={height - (height / 2)}>
                    <View style={styles.container}>
                        <View>
                            <View style={styles.closeIcon}>
                                <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} onPress={_addNewHome} />
                                {addProjectLoading ?
                                    <ActivityIndicator size={'small'} color={'black'} />
                                :
                                    <AntDesign name={'close'} size={20} onPress={() => modalizeRef.current?.close()} />
                                }
                            </View>
                            <TextInput
                                ref={_inputRef}
                                style={styles.textInput(addProjectLoading, error)}
                                placeholder={'project'}
                                mode={'flat'}
                                onChangeText={onChangeText}
                                error={error}
                                returnKeyType={'done'}
                                onSubmitEditing={_addNewHome}
                                theme={{ colors: { error: '#B22323', primary: '#595959' }, roundness: 12 }}
                            />
                            {error ? <MyText text={'Home name should not be an empty string'} style={styles.errorMessage} /> : null}
                            {/* <View style={{ alignItems: 'center' }}>
                                <MyText
                                    style={styles.helpMessageText}
                                    text={'Add home name\nyou want to show in your homes list'}
                                />
                            </View> */}
                        </View>
                    </View>
                </Modalize>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height - (height / 3),
        width,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    showModalButton: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    showModalText: {
        fontSize: 9,
        color: Colors.text
    },
    closeIcon: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: (addProjectLoading, error) => ({
        borderbottomWidth: error ? 1 : null,
        marginVertical: 5,
        borderRadius: 12,
        backgroundColor: addProjectLoading ? '#cfcfcf' : 'white',
        borderColor: error ? 'red' : 'black',
    }),
    helpMessageText: {
        textAlign: 'center',
        marginTop: 10,
        color: 'gray',
        fontSize: 12,
    },
    addHomeText: {
        color: 'white',
        fontSize: 22
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center'
    },
    submit: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.buttons,
    }
})

/**
 * <Portal>
        <Modalize onClosed={_onClosed} modalHeight={height - (height / 3)} ref={modalizeRef} snapPoint={height - (height / 3)}>
            <View style={styles.container}>
                <View>
                    <View style={styles.closeIcon}>
                        <Ionicons name={'md-add-circle'} size={22} color={Colors.buttons} onPress={_addNewHome} />
                        {addHomeLoading ?
                            <ActivityIndicator size={'small'} color={'black'} />
                        :
                            <AntDesign name={'close'} size={20} onPress={() => modalizeRef.current?.close()} />
                        }
                    </View>
                    <TextInput
                        ref={_inputRef}
                        style={styles.textInput(addHomeLoading, error)}
                        placeholder={'Home name'}
                        mode={'flat'}
                        onChangeText={onChangeText}
                        error={error}
                        returnKeyType={'done'}
                        onSubmitEditing={_addNewHome}
                        theme={{ colors: { error: '#B22323', primary: '#595959' }, roundness: 12 }}
                    />
                    {error ? <MyText text={'Home name should not be an empty string'} style={styles.errorMessage} /> : null}
                    <View style={{ alignItems: 'center' }}>
                        <MyText
                            style={styles.helpMessageText}
                            text={'Add home name\nyou want to show in your homes list'}
                        />
                    </View>
                </View>
            </View>
        </Modalize>
    </Portal>
 */