import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? `https://75d6-2-88-199-152.ngrok.io/api/` : 'https://my-projects-api-beta.herokuapp.com/api/v1/';

export const mainStyles = {
    viewShadow: {
        elevation: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
}