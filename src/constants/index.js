import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? 'https://6e3d-2001-16a2-396f-a800-c426-a5b8-6e47-97f9.ngrok-free.app/api/' : 'https://tasky-erp.com/api/';

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