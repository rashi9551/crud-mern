import * as yup from 'yup'

 const validation=yup.object({
    name: yup.string().trim().matches(/^[a-zA-Z ]+$/, 'Name should contain only alphabetic characters').required('Name is required'),
    email:yup.string().email('Invalid Email').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid Email').required('E-mail is required'),
    phone:yup.string().matches(/^\d{10}$/, 'Enter valid Number').required('Enter the phone Number'),
    password:yup.string().min(8,'Password atleast 8 charecters').required("password is required"),
    cpassword:yup.string().oneOf([yup.ref('password')],'Password should match').required('confirm password is required')
}) 

export const validationUpdate=yup.object({
    name: yup.string().trim().matches(/^[a-zA-Z ]+$/, 'Name should contain only alphabetic characters').required('Name is required'),
    email:yup.string().email('Invalid Email').required('E-mail is required'),
    phone:yup.string().matches(/^\d{10}$/, 'Enter valid Number').required('Enter the phone Number')
}) 
export const validationAdmin=yup.object({
    email:yup.string().email('Invalid Email').required('E-mail is required'),
    password:yup.string().required("Password is required")
}) 
export default validation