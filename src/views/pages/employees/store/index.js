// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('employees/getAllData', async () => {
  const response = await axios.get('/api/employees')
  return response.data
})

export const getData = createAsyncThunk('employees/getData', async params => {
  const response = await axios.get('/api/employees/list/data', params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getEmployee = createAsyncThunk('employees/getUser', async id => {
  const response = await axios.get('/api/employees/employee', { id })
  return response.data.user
})

export const addEmployee = createAsyncThunk('employees/addEmployee', async (user, { dispatch, getState }) => {
  await axios.post('/api/employees/add-employee', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { dispatch, getState }) => {
  await axios.delete('/api/employees/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
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
        state.selectedUser = action.payload
      })
  }
})

export default employeeSlice.reducer
