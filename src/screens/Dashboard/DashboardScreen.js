import React, { useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    FlatList,
    ScrollView,
    I18nManager
} from 'react-native';
import { TouchableOpacity } from '../../components/UI/TouchableOpacity';
import { Header, Title, DetailesText, ProjectItem, ListEmptyComponent } from './components';
import { mainStyles } from '../../constants';
import { ProgressChart } from 'react-native-chart-kit';
import Colors from '../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProjects } from '../../redux/reducers/Projects/projects-actions';
import { Entypo } from '@expo/vector-icons';
import { animateList } from './helpers';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../navigation/RootNavigation';
import MyText from '../../components/UI/MyText';

export const DashboardScreen = () => {
    const dispatch = useDispatch()
    const _list = useRef(null)
    const navigation = useNavigation();

    const projects = useSelector(state => state?.projectsReducer?.projects)
    const user = useSelector((state) => state?.authReducer?.user)

    useEffect(() => {
        dispatch(fetchingProjects('active', false))
        // if (projects && projects.length > 0) {
        //     animateList(_list)
        // }
    }, [])

    // TODO: Change this data to get from API
    const data = {
        labels: ['label1', 'label2'],
        colors: [Colors.primary, Colors.secondary],
        data: [0.94, 0.65]
    }

    const chartConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff'
    }

    return (
        <View style={styles.container}>
            <Header user={user} />
            <Entypo
                name={'list'}
                color={Colors.primary}
                size={30}
                style={styles.drawerIcon}
                onPress={navigation.toggleDrawer}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
                <View style={styles.mainContainer}>
                    {/* upper */}
                    <View style={styles.upperContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.touchableView} onPress={() => navigate('HomeScreens')}>
                                <Title text={'projects'} data={'projects'} onPress />
                                <DetailesText text={'allProjects'} value={12} />
                                <DetailesText text={'activeProjects'} value={12} />
                                <DetailesText text={'finishedProjects'} value={12} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableView} onPress={() => navigate('employeesScreen')}>
                                <Title text={'employees'} data={'employees'} onPress />
                                <DetailesText text={'allEmployees'} value={12} />
                                <DetailesText text={'admins'} value={12} />
                                <DetailesText text={'projectSupervisors'} value={12} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* lower */}
                    <View style={styles.lowerContainer}>
                        <Title text={'tasks'} data={'tasks'} onPress />
                        <ProgressChart
                            style={styles.chart}
                            data={data}
                            width={Dimensions.get('window').width - 15}
                            height={220}
                            chartConfig={chartConfig}
                            withCustomBarColorFromData
                        />
                    </View>
                    <View style={styles.listContainer}>
                        <Title text={'latestProjects'} data={'latestProjects'} onPress />
                        {projects && projects.length < 0 ? <FlatList
                            ref={_list}
                            horizontal
                            style={styles.list}
                            keyExtractor={(item, index) => '#' + index.toString()}
                            data={projects || []}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => <ProjectItem item={item} index={index} />}
                        /> : <ListEmptyComponent />}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Colors.appWhite,
    },
    drawerIcon: {
        marginHorizontal: 10,
        alignSelf: 'flex-start',
        transform: I18nManager.isRTL ?
            [
                { rotateY: "180deg" },
                { rotateZ: "0deg" }
            ]
            :
            [
                { rotateY: "0deg" },
                { rotateZ: "0deg" }
            ]
    },
    mainContainer: {
        flex: 1,
        padding: 5,
    },
    upperContainer: {
        paddingVertical: 2,
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    chart: {
        overflow: 'hidden',
        width: '100%',
        alignSelf: 'flex-start'
    },
    listContainer: {
        backgroundColor: Colors.white,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        ...mainStyles.viewShadow,
    },
    list: {
        marginBottom: 10
    },
    lowerContainer: {
        marginTop: 10,
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 2,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        ...mainStyles.viewShadow,
    },
    touchableView: {
        borderRadius: 10,
        width: '50%',
        margin: 2.5,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        ...mainStyles.viewShadow
    },
    detailsTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsText: {
        marginVertical: 10,
        fontFamily: 'light'
    }
})