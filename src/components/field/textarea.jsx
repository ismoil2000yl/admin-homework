import React from 'react'
import { ErrorMessage } from 'formik'

const TextArea = ({
  field,
  label,
  rows = "10",
  required = false,
  placeholder,
  form: { setFieldValue, errors, touched },
}) => {
  return(
    <div className="form-floating my-2">
      <textarea
        rows={rows}
        name={field.name}
        status={touched[field.name] && errors[field.name] && "error"}
        value={field.value}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={label}
        className="form-control"
      />
      <ErrorMessage component="div" className='error' name={field.name} />
      <label>{label}</label>
    </div>
  )
}

export default TextArea