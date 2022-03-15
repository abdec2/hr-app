import { Mail, Home, User } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    header: 'Employees'
  },
  
  {
    id: 'view_employees', 
    title: 'Employees', 
    navLink: '/employees/view'
    
  }, 
  {
    id: 'employees_visa', 
    title: 'Employee Visa', 
    navLink: '/employees/visa'
    
  }, 
  {
    id: 'working_hours', 
    title: 'Working Hours', 
    navLink: '/employees/working'
    
  },
  {
    id: 'gosi', 
    title: 'GOSI', 
    navLink: '/employees/gosi'
    
  },
  {
    id: 'request', 
    title: 'Requests', 
    navLink: '/employees/request'
    
  },
    
 
  {
    header: 'Company Details'
  },
  {
    id: 'cr_details',
    title: 'CR Details',
    icon: <Mail size={20} />,
    navLink: '/cr-details'
    
  },
  {
    id: 'rulesPolicy',
    title: 'Rules & Policy',
    icon: <Mail size={20} />,
    navLink: '/rules'
    
  }
]
