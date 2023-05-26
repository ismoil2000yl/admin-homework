import { Formik, Form, Field } from "formik";
import React from "react";
import { Fields } from "components";
import { signIn } from "store/auth";
import { Button } from "antd";
import { SignUserAvatar } from 'assets/images/png'
import axios from "axios";
import { useDispatch } from "react-redux";
import {get} from 'lodash'
import { useNavigate } from "react-router-dom";
const { VITE_API_ROOT } = import.meta.env;



const index = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerHandler = (values) => {
    axios.post('https://api.horunxon.uz/api/v1/admin/user/register', values)
    .then((data)=>{
      dispatch(signIn(get(data, 'data.data')))
      navigate('/')
    })
    resetForm()
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
      <div className="w-1/3 shadow-md p-4 rounded-md bg-white">
        <Formik
          initialValues={{
            username: "",
            first_name: "",
            last_name: "",
            phone: "",
            password: "",
            status: 1,
          }}
          onSubmit={(data) => {
            // signIn(data);
          }}
        >
          {({ values, resetForm }) => {
            return (
              <Form>
                <div className='text-center'>
                  <img src={SignUserAvatar} className="sign-user-avatar"/>
                  <h4>Register</h4>
                </div>
              <Field
                name="username"
                label="User name"
                component={Fields.Input}
              />
              <Field
                name="first_name"
                label="First name"
                component={Fields.Input}
              />
              <Field
                name="last_name"
                label="Last name"
                component={Fields.Input}
              />
              <Field 
                name="phone" 
                label="Phone" 
                component={Fields.Input}
              />
              <Field
                name="password"
                label="Password"
                component={Fields.Input}
              />
              <Button
                type="primary"
                onClick={() => registerHandler(values, resetForm)}
                className="col-md-12"
              >
                Submit
              </Button>
              <button 
                className="btn btn-outline-success mt-2 col-md-12"
                onClick={()=>navigate('/auth/sign-in')}
              >
                Do you have an accaunt?
              </button>
            </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default index;
