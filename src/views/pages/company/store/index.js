// store for company section
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


export const getAllData = createAsyncThunk('companies/getAllData', async () => {
    const response = await axios.get('/api/companies')
    return response.data
  })
  
  export const getData = createAsyncThunk('companies/getData', async params => {
    const response = await axios.get('/api/companies/list/data', {params})
    return {
      params,
      data: response.data.companies,
      totalPages: response.data.total
    }
  })

  export const getCR = createAsyncThunk('companies/getCr', async id => {
    const response = await axios.get('/api/companies/cr', { params: {id}})
    return response.data
  })
  
  export const addCr = createAsyncThunk('companies/addCr', async (cr, { dispatch, getState }) => {
    await axios.post('/api/companies/add-cr', cr)
    await dispatch(getData(getState().companies.params))
    await dispatch(getAllData())
    return cr
  })

  export const updateCr = createAsyncThunk('companies/updateCr', async (cr, { dispatch, getState }) => {
    await axios.put('/api/companies/update-cr', cr)
    await dispatch(getData(getState().companies.params))
    await dispatch(getAllData())
    return cr
  })
  
  export const deleteCr = createAsyncThunk('companies/deleteCr', async (id, { dispatch, getState }) => {
    await axios.delete('/api/companies/delete', { params: {id} })
    await dispatch(getData(getState().companies.params))
    await dispatch(getAllData())
    return id
  })
  
  export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
      data: [],
      total: 1,
      params: {},
      allData: [],
      selectedCr: null, 
      editModal: false
    },
    reducers: {
        toggleEditModal: (state) => {
            state.editModal = !state.editModal
        }
    },
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
        .addCase(getCR.fulfilled, (state, action) => {
          state.selectedCr = action.payload
        })
    }
  })

  export const { toggleEditModal } = companiesSlice.actions
  
  export default companiesSlice.reducer