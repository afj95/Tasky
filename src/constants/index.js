import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? 'https://c7e7-2001-16a2-39c5-3100-91f5-62b2-baf1-dd4f.ngrok-free.app/api/' : 'https://tasky-erp.com/api/';

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