import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }, 
  {
    path: '/employees/view',
    component: lazy(() => import('../../views/pages/employees/Employees')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/employee/view/:id',
    component: lazy(() => import('../../views/pages/employees/EmployeeView'))
  },
  {
    path: '/employees/visa',
    component: lazy(() => import('../../views/pages/employees/Visa')),
    meta: {
      authRoute: true
    }
  }, 
  {
    path: '/employees/working',
    component: lazy(() => import('../../views/pages/employees/WorkingHours')),
    meta: {
      authRoute: true
    }
  }, 
  {
    path: '/employees/gosi',
    component: lazy(() => import('../../views/pages/employees/GosiDetails')),
    meta: {
      authRoute: true
    }
  }, 
  {
    path: '/employees/request',
    component: lazy(() => import('../../views/pages/employees/Request')),
    meta: {
      authRoute: true
    }
  }, 
  {
    path: '/cr-details',
    component: lazy(() => import('../../views/pages/company/CrDetails')),
    meta: {
      authRoute: true
    }
  }, 
  {
    path: '/rules',
    component: lazy(() => import('../../views/pages/company/Rules')),
    meta: {
      authRoute: true
    }
  }
]

export { DefaultRoute, TemplateTitle, Routes }
