import { paginateArray } from "../../utility/Utils"

export const data = {
    employees: [
        {
            id: 1,
            name: 'Azim Baig', 
            dob: '02-12-1987', 
            cpr: '871241854',
            nationality: 'Pakistan', 
            passport: 'AY3924154',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            expatriate: true, 
            contractSigned: true, 
            contract_img: '',
            cpr_img_front:'', 
            cpr_img_back: '',
            branch: 'tubli', 
            status: 'active'
        },
        {
            id: 2,
            name: 'Abdulla alsaeed', 
            dob: '02-06-1996', 
            cpr: '960641854',
            nationality: 'Bahrain', 
            passport: 'xxxxxxxxx',
            phone: '00000000',
            address: 'Address ',
            expatriate: false, 
            contractSigned: false, 
            contract_img: '',
            cpr_img_front:'', 
            cpr_img_back: '',
            branch: 'tubli',
            status: 'active'
        },
        {
            id: 3,
            name: 'Syed Fadhel', 
            dob: '02-04-1997', 
            cpr: '970441854',
            nationality: 'Bahrain', 
            passport: 'xxxxxxxxxxx',
            phone: '111111111',
            address: 'Address',
            expatriate: false, 
            contractSigned: false, 
            contract_img: '',
            cpr_img_front:'', 
            cpr_img_back: '',
            branch: 'tubli',
            status: 'active'
        }
    ]
}

export const getData = config => {
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = '',
      status = null,
      sortColumn = 'name', 
      nationality = "",
      branch = ""

    } = config
  
    const queryLowered = q.toLowerCase()
  
    const dataAsc = data.employees.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    console.log('type', typeof nationality)
    const filteredData = dataToFilter.filter(
      employee => (employee.name.toLowerCase().includes(queryLowered) || employee.branch.toLowerCase().includes(queryLowered)) && 
      employee.expatriate === ((nationality === "true") ? true : (nationality === "false") ? false : employee.expatriate) &&
      employee.branch === (branch || employee.branch) &&
      employee.status === (status || employee.status)
    )
      
    return {
        total: filteredData.length,
        employees: paginateArray(filteredData, perPage, page)
      }
      
    
  }

export const getEmployee = (param) => {
    return data.employees.find(item => item.id === Number(param.id))
}

export const delEmployee = (params) => {
    const userIndex = data.employees.findIndex(t => t.id === Number(params.id))
    data.employees.splice(userIndex, 1)
}