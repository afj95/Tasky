import axios, { Method, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { I18nManager } from "react-native";
import { API_URL } from "../constants";
import { store } from "../redux";
import { navigationRef } from '../navigation/RootNavigation';
import { CommonActions } from "@react-navigation/native";
import { t } from "../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGOUT } from "../redux/reducers";
import Errors_codes from "../../Errors_codes";
import moment from "moment";

type RequestProps = {
    url: string;
    method: Method;
    headers?: AxiosRequestHeaders;
    params?: any;
} | AxiosRequestConfig;

export const request = async ({ url, method, headers, params }: RequestProps) => {
    if (__DEV__) {
        console.log("\n\n" + `Starting Time - url: ${url} ==> `, moment().locale('en').format('DD-MM-Y - hh:mm:ss:SS A'));
        console.log("========================================");
    }
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
                console.log("URL ==> ", url);
                console.log("========================================");
                console.log("fullURL ==> ", fullURL);
                console.log("========================================");
                console.log("method  ==> ", method);
                console.log("========================================");
                console.log("params  ==> ", params ? params : "{}");
                console.log("========================================");
                console.log("time    ==> ", moment().locale('en').format('DD-MM-Y - hh:mm:ss:SS A'));
                console.log("========================================\n");
            }

            const res = await axios({
                method: method,
                url: fullURL,
                headers: modfiedHeaders,
                data: params,
            });

            // No errors
            resolve(res)

        } catch (error) {
            if (__DEV__) {
                console.log('request/try/catch error:', {
                    'url': url,
                    'error ': error
                });
            }

            if (error && error?.response) {
                if (__DEV__) {
                    console.log('error?.response', {
                        'url': url,
                        'error': error,
                        'error?.response?.data ': error?.response?.data
                    });
                }

                if (error?.response?.data?.message === 'Unauthenticated.') {
                    // Logout the user if Unauthenticated.
                    store.dispatch({ type: LOGOUT });
                    await AsyncStorage.removeItem('token');
                    await navigationRef.current.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Auth' }]
                        })
                    )
                } else {
                    // returning the message came from the API.
                    reject({
                        message: error?.response?.data?.message ?
                            error?.response?.data?.message
                            :
                            t('app.serverError'),
                        response: true
                    })
                }
            } else {
                // In case no "error?.response"
                // if(error && error?.response) == false

                if (__DEV__) {
                    console.log('\nWithout (error && error?.response)', error);
                }

                reject({ message: 'Error ' + Errors_codes.request_axios_error, response: false })
            }
        }
        if (__DEV__) {
            console.log(`Finishing Time - url:${url}   ==> `, moment().locale('en').format('DD-MM-Y - hh:mm:ss:SS A'));
        }
    })
};
