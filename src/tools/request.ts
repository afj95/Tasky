import axios, { Method } from "axios";
import { I18nManager } from "react-native";
import { API_URL } from "../constants";
import { store } from "../redux";

type RequesProps = {
    url: string;
    method: Method;
    params?: any;
}

export const request = async ({ url, method, params }: RequesProps) => {
    try {
        const fullURL = `${API_URL}${url}`;
        const user = store.getState().authReducer.user;
        return new Promise((resolve, reject) => {
            let timeout = false;
            setTimeout(() => {
                timeout = true;
            }, 15000);

            let modfiedHeaders = {
                Authorization: `Bearer ${user?.token}`,
                // "Content-Type": "application/json",
                "Accept-Language": I18nManager.isRTL ? 'ar' : 'en'
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
                        throw { response: { status: 500 } };
                    }

                    resolve(res);
                })
                .catch((error) => {
                    /*
                     * returning the error status code 
                     * and the message came from the API.
                    */
                    reject({
                        status: error?.response?.status,
                        message: error.response.data.message
                    })
                });
        });
    } catch (error) {
        console.warn(error);
    }
};
