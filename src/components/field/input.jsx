import {Input} from "antd";
import React from 'react'
// import { ErrorMessage } from 'formik'

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  errorMessage = "To'ldirish shart",
  form: { setFieldValue, errors, touched, setFieldTouched },
}) => {
  return(
    <div className="form-floating my-2">
      <Input
        name={field.name}
        status={touched[field.name] && errors[field.name] && "error"}
        value={field.value}
        onBlur={()=>setFieldTouched(field.name, true)}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={label}
        className="form-control"
      />
      {/* <ErrorMessage component="div" className='error' name={field.name} /> */}
      {!field.value && touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-semibold text-xs">
          {errorMessage}
        </small>
      )}
      <label>{label}</label>
    </div>
  )
}

export default TextInput