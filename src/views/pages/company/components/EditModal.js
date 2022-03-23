import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'

import { selectThemeColors } from '@utils'


import { toggleEditModal, updateCr } from './../store'
import { useEffect, useState } from "react"

import '@styles/react/libs/flatpickr/flatpickr.scss'
 
const EditModal = () => {
    const store = useSelector(state => state.companies)
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)

    const checkIsValid = data => {
        return Object.values(data).map(field => (typeof field === 'object' ? field !== null : field.length > 0))
    }
    
      const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    
      const {
        reset,
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm()
    
      const onSubmit = data => {
        setData(data)
        if (checkIsValid(data)) {
            dispatch(toggleEditModal())
            dispatch(updateCr({
                id: store.selectedCr.id,
                location: data.location,
                cr: data.cr,
                expiry: (typeof data.expiry === 'object') ? data.expiry[0] : data.expiry,
                employeesNo: data.employeesNo,
                timings: data.timings,
                phone: data.phone,
                address: data.address,
                status
            }))
        } else {
            for (const key in data) {
                if (data[key] === '') {
                  setError(`"${key}"`, {
                    type: "manual"
                  })
                }
                if (data[key] !== null && data[key].length === 0) {
                    setError(key, {
                      type: 'manual'
                    })
                  }
              }
        }
        
      }

      useEffect(() => {
        if (store.selectedCr) {
            setValue("location", store.selectedCr.location)
            setValue("cr", store.selectedCr.cr)
            setValue("expiry", store.selectedCr.expiry)
            setValue("employeesNo", store.selectedCr.employeesNo)
            setValue("timings", store.selectedCr.timings)
            setValue("phone", store.selectedCr.phone)
            setValue("address", store.selectedCr.address)
            setStatus(store.selectedCr.status)
        }

      }, [store.selectedCr]) 
    return (
        <Modal isOpen={store.editModal} toggle={() => dispatch(toggleEditModal())} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={() => dispatch(toggleEditModal())}></ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Edit CR Information</h1>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='location'>
                                Location
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='location'
                                name='location'
                                render={({ field }) => (
                                    <Input {...field} id='location' placeholder='Branch Area' invalid={errors.location && true} />
                                )}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='cr'>
                                CR No
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='cr'
                                name='cr'
                                render={({ field }) => (
                                    <Input {...field} id='cr' placeholder='Enter CR Number' invalid={errors.cr && true} />
                                )}
                            />
                        </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='expiry'>
                                Expiry Date
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='expiry'
                                name='expiry'
                                render={({ field }) => (
                                    <Flatpickr options={{ minDate: "today" }} className={classnames('form-control', { 'is-invalid': data !== null && data.expiry.length === 0 })} id='expiry' {...field} />
                                )}
                            />
                        </Col>

                        <Col md={6} xs={12}>
                            <Label className='form-label' for='timings'>
                                Branch Timing
                            </Label>
                            <Input
                                id='timings'
                                defaultValue={store.selectedCr?.timings} 
                                invalid={errors.timings && true}
                            />
                        </Col>

                        <Col md={6} xs={12}>
                            <Label className='form-label' for='phone'>
                                Phone
                            </Label>
                            <Input
                                id='phone'
                                defaultValue={store.selectedCr?.phone} 
                                invalid={errors.phone && true}
                                 />
                        </Col>

                        <Col xs={12}>
                            <Label className='form-label' for='address'>
                                Address
                            </Label>
                            <Input
                                type="textarea"
                                id='address'
                                defaultValue={store.selectedCr?.address} 
                                invalid={errors.address && true}
                                 />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='employeesNo'>
                                Total staff in branch
                            </Label>
                            <Input
                                id='employeesNo'
                                defaultValue={store.selectedCr?.employeesNo} 
                                invalid={errors.employeesNo && true}
                                 />
                        </Col>

                        <Col md={6} xs={12}>
                            <Label className='form-label' for='status'>
                                Status:
                            </Label>
                            <Select
                                id='status'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusOptions}
                                theme={selectThemeColors}
                                value = {statusOptions.filter(option => option.value === status)}
                                onChange = { value => setStatus(value.value)}

                                // defaultValue={statusOptions.filter(option => option.value === store.selectedCr.status)}
                            />
                        </Col>
                        

                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button type='submit' className='me-1' color='primary'>
                                Submit
                            </Button>
                            <Button
                                type='reset'
                                color='secondary'
                                outline
                                onClick={() => {
                                    dispatch(toggleEditModal())
                                }}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default EditModal