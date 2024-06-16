import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { EmployeeItem as EI, SearchEmployeeComponent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../redux/reducers/Users/users-actions';
import Colors from '../../utils/Colors';
import { MainHeader } from '../../components/UI/MainHeader';
import { showMessage } from '../../tools';
import { _listEmptyComponent } from '../../components/UI/_listEmptyComponent';
import { DismissKeyboardView } from '../../components/UI/DismissKeyboardHOC';

export const EmployeesScreen = () => {
    const dispatch = useDispatch();

    const [employeeName, setEmployeeName] = useState('');

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const all_employees = useSelector(state => state?.usersReducer?.all_employees);

    useEffect(() => {
        dispatch(fetchAllEmployees({ refresh: false }));
    }, [])

    useEffect(() => {
        if (errors?.employees) {
            showMessage({
                message: errors.employees,
                type: 'danger'
            })
        }
    }, [errors?.employees])

    const onRefresh = () => {
        dispatch(fetchAllEmployees({ refresh: true }));
    }

    const searchEmployee = () => {
        if (employeeName) {
            // search
            dispatch(fetchAllEmployees({ refresh: true, search: employeeName }));
        }
    }

    return (
        <View style={styles.container}>
            <MainHeader
                title={'employees'}
                translate
            />
            {loadings?.employees ? <ActivityIndicator size={'small'} color={Colors.primary} style={styles.loading} />
                :
                <DismissKeyboardView style={styles.listContainer}>
                    <View>
                        <SearchEmployeeComponent
                            employeeName={employeeName}
                            setEmployeeName={setEmployeeName}
                            searchEmployee={searchEmployee}
                            loadings={loadings}
                            refresh={onRefresh}
                        />
                        <FlatList
                            keyExtractor={(item, index) => '#' + index.toString()}
                            data={all_employees || []}
                            ItemSeparatorComponent={<View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#bcbcbc', width: '100%' }} />}
                            onRefresh={onRefresh}
                            refreshing={false}
                            ListEmptyComponent={_listEmptyComponent}
                            renderItem={({ item, index }) => <EI id={index} employee={item} key={index} onRefresh={onRefresh} />}
                        />
                    </View>
                </DismissKeyboardView>
            }
            {/* <FilterModal
                visible={filterVisible}
                close={closeModal}
                setEmployeesType={setEmployeesType}
                focusedList={focusedList}
                undeletedSupervisor={undeletedSupervisor}
                seUndeletedSupervisor={seUndeletedSupervisor}
                employeeType={focusedList}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appWhite
    },
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: {
        flex: 1,
        height: '100%'
    },
})