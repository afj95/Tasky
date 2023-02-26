import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? 'https://aa63-2001-16a2-c5f7-7700-c47b-1124-6196-980e.ngrok.io/api/' : 'http://tasky-erp.com/api/';

export const mainStyles = {
    viewShadow: {
        elevation: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
}