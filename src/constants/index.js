import Colors from "../utils/Colors";

export const API_URL2 = __DEV__ ? `http://10.0.2.2:2020/api/v1/` : 'https://my-projects-api-beta.herokuapp.com/api/v1/';
export const API_URL1 = __DEV__ ? `http://192.168.100.49:8000/api/` : 'https://my-projects-api-beta.herokuapp.com/api/v1/';
// laravel
export const API_URL = __DEV__ ? `http://10.0.2.2:8000/api/` : 'https://my-projects-api-beta.herokuapp.com/api/v1/';

export const mainStyles = {
    viewShadow: {
        elevation: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
}