import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal, notification } from 'antd'
import { Fields } from 'components'
import usePost from 'crud/usePost'
import { Field, Form, Formik } from 'formik'
import { get } from 'lodash'
import React from 'react'

const form = ({modalData, setModalData}) => {

    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification();

    const {mutate} = usePost({
        url: `/banners${
          get(modalData, "data")?`/${get(modalData, "data.id")}`:""
      }`,
        method: [get(modalData, "data")?"put":"post"],
        params:{
          extra:{ 
            _l : "uz" 
          }
        },
        nameKey: "banners",
        onSuccess: () => {
              modalData.item?
              api.success({
                message: `Muvofaqqiyatli`,
                description: "Banner ma'lumoti o'zgartirildi",
              })
              :
              api.success({
                message: `Muvofaqqiyatli`,
                description: "Yangi Banner qo'shildi",
              });
              setModalData({ isOpen: false, item: null });
              queryClient.invalidateQueries({ queryKey: "banners" });
            },
            onError: (error) => {},
    })

  return (
    <Modal 
        title={get(modalData, "data")?"Bannerni o'zgartirish":"Banner yaratish"} 
        open={modalData.isOpen} 
        footer={false}
        onCancel={()=>setModalData({isOpen: false, data: null})}
    >
        {contextHolder}
        <Formik
            initialValues={{
                name_uz: get(modalData, "data.name_uz"),
                description_uz: get(modalData, "data.description_uz")
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
                            name="name_uz"
                            label="Name"
                            component={Fields.Input}
                        />
                        <Field
                            name="description_uz"
                            label="Description"
                            component={Fields.TextArea}
                        />
                        <div className="mt-3 flex justify-end">
                            <Button 
                                type='primary'
                                onClick={handleSubmit}
                            >
                                {get(modalData, "data")?"Bannerni o'zgartirish":"Bannerni qo'shish"}
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