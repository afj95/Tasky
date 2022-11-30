import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? `http://192.168.100.248:2020/api/v1/` : 'https://api-myprojects-beta.herokuapp.com/api/v1/';
// export const API_URL = __DEV__ ? `http://127.0.0.1:2020/api/v1/` : null;

export const mainStyles = {
    viewShadow: {
        elevation: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
}