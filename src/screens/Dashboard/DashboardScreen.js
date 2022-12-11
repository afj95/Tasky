import React, { useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    FlatList,
    ScrollView,
    I18nManager,
    RefreshControl
} from 'react-native';
import { TouchableOpacity } from '../../components/UI/TouchableOpacity';
import MyText from '../../components/UI/MyText';
import { Header, Title, DetailesText, ProjectItem, ListEmptyComponent, EmptyChart } from './components';
import { mainStyles } from '../../constants';
import { ProgressChart } from 'react-native-chart-kit';
import Colors from '../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../redux/reducers/Projects/projects-actions';
import { Entypo } from '@expo/vector-icons';
import { animateList } from './helpers';
import { navigate } from '../../navigation/RootNavigation';
import { showMessage } from 'react-native-flash-message';
import { setError } from '../../redux/reducers/Global/global-actions';
import { t } from '../../i18n';

export const DashboardScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const _list = useRef(null)
    // const navigation = useNavigation();

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const user = useSelector((state) => state?.authReducer?.user)
    const dashboardProjects = useSelector(state => state?.projectsReducer?.dashboardProjects)
    const dashboardEmployees = useSelector(state => state?.projectsReducer?.dashboardEmployees)
    const dashboardCharts = useSelector(state => state?.projectsReducer?.dashboardCharts)
    const dashboardLatests = useSelector(state => state?.projectsReducer?.dashboardLatests)

    useEffect(() => {
        dispatch(getDashboardData())
        // TODO:  Get latest projects
        if (dashboardLatests && dashboardLatests?.length > 0) {
            animateList(_list)
        }
    }, [])

    // useEffect(() => {
    //     if (errors?.dashboard) {
    //         if (!errors?.dashboard?.latest) {
    //             showMessage({
    //                 message: errors?.dashboard.message + '',
    //                 type: 'danger',
    //                 duration: 3000,
    //             })
    //         }
    //     }
    //     dispatch(setError(null))
    // }, [loadings?.dashboard, errors?.dashboard])

    const chartConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${1})`,
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
    }

    const chartData = {
        labels: ['', ''],
        colors: [Colors.primary, Colors.secondary],
        data: dashboardCharts, // <- [num, num]
    }

    const onRefresh = () => dispatch(getDashboardData())

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
            <ScrollView
                contentContainerStyle={{ paddingBottom: 25 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        colors={[Colors.primary, Colors.secondary]}
                    />
                }>
                <View style={styles.mainContainer}>
                    {/* upper */}
                    <View style={styles.upperContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.touchableView} onPress={() => navigate('HomeScreen')}>
                                <Title loading={loadings?.dashboard} text={'projects'} data={'projectsExplain'} onPress />
                                <DetailesText text={'allProjects'} value={dashboardProjects?.all} />
                                <DetailesText text={'activeProjects'} value={dashboardProjects?.active} />
                                <DetailesText text={'finishedProjects'} value={dashboardProjects?.finished} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableView} onPress={() => navigate('EmployeesScreen')}>
                                <Title loading={loadings?.dashboard} text={'employees'} data={'employeesExplain'} onPress />
                                <DetailesText text={'allEmployees'} value={dashboardEmployees?.all} />
                                <DetailesText text={'admins'} value={dashboardEmployees?.admins} />
                                <DetailesText text={'projectSupervisors'} value={dashboardEmployees?.supervisors} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* lower */}
                    <View style={styles.lowerContainer}>
                        <Title loading={loadings?.dashboard} text={'tasks'} data={'tasksExplain'} onPress />
                        <View style={styles.circlesContainer}>
                            <View style={styles.checkedCircle} />
                            <MyText style={styles.circleText}>checked</MyText>
                            <View style={styles.unCheckedCircle} />
                            <MyText style={styles.circleText}>unChecked</MyText>
                        </View>
                        {chartData && dashboardCharts ?
                            <ProgressChart
                                style={styles.chart}
                                data={chartData}
                                width={Dimensions.get('window').width - 15}
                                height={220}
                                chartConfig={chartConfig}
                                withCustomBarColorFromData
                            /> : <EmptyChart />}
                    </View>
                    <View style={styles.listContainer}>
                        <Title text={'latestProjects'} data={'latestProjectsExplain'} loading={loadings?.dashboard} onPress />
                        {dashboardLatests && dashboardLatests?.length > 0 ? <FlatList
                            ref={_list}
                            horizontal
                            style={styles.list}
                            keyExtractor={(item, index) => '#' + index.toString()}
                            data={dashboardLatests || []}
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
    circlesContainer: {
        borderWidth: 0.4,
        borderRadius: 8,
        borderColor: Colors.secondary,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    checkedCircle: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: Colors.primary
    },
    unCheckedCircle: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: Colors.secondary
    },
    circleText: {
        fontFamily: 'bold',
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