import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { EmployeeItem as EI } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees } from '../../redux/reducers/Users/users-actions';
import MyText from '../../components/UI/MyText';
import Colors from '../../utils/Colors';
import { MainHeader } from '../../components/UI/MainHeader';
import { showMessage } from '../../tools';
import { _listEmptyComponent } from '../../components/UI/_listEmptyComponent';

export const EmployeesScreen = () => {
    const dispatch = useDispatch();

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const all_employees = useSelector(state => state?.usersReducer?.all_employees);

    useEffect(() => {
        dispatch(fetchAllEmployees({}));
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
        dispatch(fetchAllEmployees({}));
    }

    return (
        <View style={styles.container}>
            <MainHeader
                title={'employees'}
                translate
            />
            {loadings?.employees ? <ActivityIndicator size={'small'} color={Colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                :
                <View style={styles.listContainer}>
                    <FlatList
                        keyExtractor={(item, index) => '#' + index.toString()}
                        data={all_employees || []}
                        ItemSeparatorComponent={<View style={{ height: 0.6, backgroundColor: '#bcbcbc', width: '100%' }} />}
                        onRefresh={onRefresh}
                        refreshing={false}
                        ListEmptyComponent={_listEmptyComponent}
                        renderItem={({ item, index }) => <EI employee={item} key={index} onRefresh={onRefresh} />}
                    />
                </View>
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
    listContainer: {
        flex: 1,
    },
})