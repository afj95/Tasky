import axios, { Method, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { I18nManager } from "react-native";
import { API_URL } from "../constants";
import { store } from "../redux";
import { stopLoading } from "../redux/reducers/Global/global-actions";
import { navigationRef } from '../navigation/RootNavigation';
import { CommonActions } from "@react-navigation/native";
import { t } from "../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGOUT } from "../redux/reducers";

type RequestProps = {
    url: string;
    method: Method;
    headers?: AxiosRequestHeaders;
    params?: any;
} | AxiosRequestConfig;

export const request = async ({ url, method, headers, params }: RequestProps) => {
    const fullURL = `${API_URL}${url}`;
    // @ts-ignore
    const user = store.getState().authReducer.user;

    let timeout = false;
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(() => {
                timeout = true;
                reject(new Error(t('app.serverError')))
            }, 15000);

            let modfiedHeaders = {
                Authorization: `Bearer ${user?.token}`,
                "Accept-Language": I18nManager.isRTL ? 'ar' : 'en',
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...headers
            };

            if (__DEV__) {
                console.log("\n\n" + "URL ==> ", url);
                console.log("========================================");
                console.log("fullURL ==> ", fullURL);
                console.log("========================================");
                console.log("method  ==> ", method);
                console.log("========================================");
                console.log("params  ==> ", params ? params : "{}");
                console.log("========================================\n");
            }

            await axios({
                method: method,
                url: fullURL,
                headers: modfiedHeaders,
                data: params,
            })
                .then((res) => {
                    if (timeout) {
                        reject(new Error(t('app.serverError')))
                    }
                    resolve(res)
                })
                .catch(async (error) => {
                    // console.log('error', Object.keys(error.response.data));
                    // console.log('error', error.response.data);
                    if (error && error?.response) {
                        if (!__DEV__) {
                            console.log('request error', {
                                'url': url,
                                'error': error,
                                'error?.response?.data ': error?.response?.data
                            });
                        }

                        if (error?.response?.data?.message === 'Unauthenticated.') {
                            // Logout the user if Unauthenticated.
                            await AsyncStorage.removeItem('token')
                                .then(() => store.dispatch({ type: LOGOUT }))
                                .then(() => {
                                    navigationRef.current.dispatch(
                                        CommonActions.reset({
                                            index: 1,
                                            routes: [{ name: 'Auth' }]
                                        })
                                    )
                                })
                        } else {
                            /*
                             * returning the message came from the API.
                             * { success: true/false, message: '...' }
                            */
                            reject({ message: error?.response?.data?.message })
                        }
                    } else {
                        reject({ message: error })
                    }
                });
        } catch (error) {
            if (__DEV__) {
                console.log('request try/catch error', {
                    'url': url,
                    'error ': error
                });
            }
            store.dispatch(stopLoading({ 'general': t('app.serverError') }))
            reject({ message: t('app.serverError') })
        }
    })
};
