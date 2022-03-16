// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import employees from './../views/pages/employees/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  employees
}

export default rootReducer
