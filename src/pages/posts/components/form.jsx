import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal, notification } from 'antd'
import { Fields } from 'components'
import usePost from 'crud/usePost'
import { Field, Form, Formik } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useSelector } from "react-redux";
import qs from 'qs'

const form = ({modalData, setModalData}) => {

    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification();
    const params = qs.parse(location.search, {ignoreQueryPrefix: true})
    const {currentLangCode} = useSelector(state=> get(state, "system"))

    const {mutate} = usePost({
        url: `/posts${
          get(modalData, "data")?`/${get(modalData, "data.id")}`:""
      }`,
        method: [get(modalData, "data")?"put":"post"],
        params:{
          extra:{ 
            _l :  get(params, "lang", currentLangCode)
          }
        },
        nameKey: "posts",
        onSuccess: () => {
              modalData.item?
              api.success({
                message: `Muvofaqqiyatli`,
                description: "Post ma'lumoti o'zgartirildi",
              })
              :
              api.success({
                message: `Muvofaqqiyatli`,
                description: "Yangi post qo'shildi",
              });
              setModalData({ isOpen: false, item: null });
              queryClient.invalidateQueries({ queryKey: "posts" });
            },
            onError: (error) => {},
    })



  return (
    <Modal 
        title={get(modalData, "data")?"Postni o'zgartirish":"Post yaratish"} 
        open={modalData.isOpen} 
        footer={false}
        onCancel={()=>setModalData({isOpen: false, data: null})}
    >
        {contextHolder}
        <Formik
            initialValues={{
                title: get(modalData, "data.title"),
                description: get(modalData, "data.description"),
                content: get(modalData, "data.content"),
                status: get(modalData, "data.status")
            }}
            onSubmit={(values, {resetForm})=>{
                mutate(values);
                resetForm();
            }}
        >
            {({values, handleSubmit})=>{
                return(
                    <Form>
                        <Field
                            name="title"
                            label="Title"
                            component={Fields.Input}
                        />
                        <Field
                            name="description"
                            label="Description"
                            component={Fields.TextArea}
                        />
                        <Field
                            name="content"
                            label="Content"
                            component={Fields.Input}
                        />
                        <Field
                            name="status"
                            label="Status"
                            component={Fields.Switch}
                        />
                        <div className="mt-3 flex justify-end">
                            <Button 
                                type='primary'
                                onClick={handleSubmit}
                            >
                                {get(modalData, "data")?"Postni o'zgartirish":"Postni qo'shish"}
                            </Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </Modal>
  )
}

export default form