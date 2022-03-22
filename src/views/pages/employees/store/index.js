// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('employees/getAllData', async () => {
  const response = await axios.get('/api/employees')
  return response.data
})

export const getData = createAsyncThunk('employees/getData', async params => {
  const response = await axios.get('/api/employees/list/data', {params})
  return {
    params,
    data: response.data.employees,
    totalPages: response.data.total
  }
})

export const getEmployee = createAsyncThunk('employees/getEmployee', async id => {
  const response = await axios.get('/api/employees/employee', { params: {id}})
  return response.data
})

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee, { dispatch, getState }) => {
  await axios.post('/api/employees/add-employee', employee)
  await dispatch(getData(getState().employees.params))
  await dispatch(getAllData())
  return employee
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { dispatch, getState }) => {
  await axios.delete('/api/employees/delete', { params: {id} })
  await dispatch(getData(getState().employees.params))
  await dispatch(getAllData())
  return id
})

export const updateEmployeeStatus = createAsyncThunk('employees/updateEmployeeStatus', async (status,  {dispatch, getState }) => {
  await axios.put('/api/employees/update-status', status)
  await dispatch(getEmployee(status.id))
  // await dispatch(getAllData())
  return status
})

export const updateEmployee = createAsyncThunk('employees/update', async (employee, {dispatch, getState}) => {
  await axios.put('/api/employees/update', employee)
  await dispatch(getEmployee(employee.id))
  return employee
})

export const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedEmployee: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload
      })
  }
})

export default employeeSlice.reducer
