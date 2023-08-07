import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? 'https://853b-188-48-119-89.ngrok-free.app/api/' : 'http://tasky-erp.com/api/';

export const googleMapKey = 'AIzaSyBy9xokt7ciS8rwVPfJ58PwTCcCv9eRqso';

export const mainStyles = {
    viewShadow: {
        elevation: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
}