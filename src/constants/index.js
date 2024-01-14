import Colors from "../utils/Colors";

export const API_URL = __DEV__ ? 'https://aaea-2001-16a2-38e8-9c00-c0af-6ddd-82ce-f454.ngrok-free.app/api/' : 'https://tasky-erp.com/api/';

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