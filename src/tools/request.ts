import axios, { Method, AxiosRequestConfig } from "axios";
import { I18nManager } from "react-native";
import { API_URL } from "../constants";
import { store } from "../redux";
import { stopLoading } from "../redux/reducers/Global/global-actions";
import { logout } from "../redux/reducers/Auth/auth-actions";
import { navigationRef } from '../navigation/RootNavigation';
import { CommonActions } from "@react-navigation/native";
import { showMessage } from "./showMessage";
import { t } from "../i18n";

type RequestProps = {
    url: string;
    method: Method;
    params?: any;
} | AxiosRequestConfig;

export const request = async ({ url, method, params }: RequestProps) => {
    const fullURL = `${API_URL}${url}`;
    // @ts-ignore
    const user = store.getState().authReducer.user;

    let timeout = false;
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                timeout = true;
                reject(new Error('Tiemout, Server is not responding'))
            }, 15000);

            let modfiedHeaders = {
                Authorization: `Bearer ${user?.token}`,
                "Accept-Language": I18nManager.isRTL ? 'ar' : 'en',
                "Accept": "application/json",
                // "Content-Type": "application/json"
            };

            if (__DEV__) {
                console.log("\n\n" + "fullURL ==> ", fullURL);
                console.log("========================================");
                console.log("method  ==> ", method);
                console.log("========================================");
                console.log("params  ==> ", params ? params : "{}");
                console.log("========================================\n");
            }

            axios({
                method: method,
                url: fullURL,
                headers: modfiedHeaders,
                data: params,
            })
                .then((res) => {
                    if (timeout) {
                        throw new Error('Error')
                    }

                    resolve(res);
                })
                .catch((error) => {
                    if (__DEV__) {
                        console.log({
                            'url': url,
                            'error': error,
                            'request error - error?.response?.data ': error?.response?.data
                        });
                    }

                    if (error?.response?.data?.message === 'Unauthenticated.') {
                        // Logout the user if Unauthenticated.
                        store.dispatch(logout(() =>
                            navigationRef.current.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: 'Auth' }]
                                })
                            ))
                        );
                    } else {
                        /*
                         * returning the message came from the API.
                         * { success: true/false, message: '...' }
                        */
                        reject({ message: error?.response?.data?.message })
                    }

                });
        } catch (error) {
            if (__DEV__) {
                console.log({
                    'url': url,
                    'request try/catch error - error ': error
                });
            }
            store.dispatch(stopLoading({ 'general': error }))
            reject({ message: error })
        }
    })
};
