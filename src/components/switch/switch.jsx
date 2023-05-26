import { Switch } from 'antd'
import React from 'react'

const index = () => {

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

  return (
    <Switch defaultChecked onChange={onChange} />
  )
}

export default index