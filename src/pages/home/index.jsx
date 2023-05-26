import { Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'store/auth'

const index = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(signOut())
    navigate("/auth/sign-in")
  }

  const confirm = (e) => {
    handleLogout()
    // message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };

  return (
    <div>
      <h1>Home page</h1>
      <Tooltip placement='right' title={"Profildan chiqish"}>
        <Popconfirm
           title="Profildan chiqish"
           description="Profildan chiqishni xoxlaysizmi?"
           onConfirm={confirm}
           onCancel={cancel}
           okText="Ha"
           cancelText="Yo'q"
        >
          <button className='btn btn-outline-danger my-3'>
            Log-out
          </button>
        </Popconfirm>
      </Tooltip>
    </div>
  )
}

export default index