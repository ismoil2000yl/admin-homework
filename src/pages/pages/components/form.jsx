import { useQueryClient } from '@tanstack/react-query'
import { Button, notification } from 'antd'
import { Fields } from 'components'
import usePost from 'crud/usePost'
import { Field, Form, Formik } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import qs from 'qs'

const form = ({modalData, setModalData}) => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [api, contextHolder] = notification.useNotification();
    const params = qs.parse(location.search, {ignoreQueryPrefix: true})
    const {currentLangCode} = useSelector(state=> get(state, "system"))

    // const {mutate} = usePost({
    //     url: `/pages${
    //         get(modalData, "data")?`/${get(modalData, "data.id")}`:""
    //     }`,
    //     method: [get(modalData, "data")?"put":"post"],
    //     params:{
    //         extra:{ 
    //             _l :  get(params, "lang", currentLangCode)
    //         }
    //       },
    //       nameKey: "pages",
    //     onSuccess:() => {
    //         modalData.data?
    //         api.success({
    //           message: `Muvofaqqiyatli`,
    //           description: "Page ma'lumoti o'zgartirildi",
    //         })
    //         :
    //         api.success({
    //           message: `Muvofaqqiyatli`,
    //           description: "Yangi Page qo'shildi",
    //         });
    //         // setModalData({isOpen: false, data: null})
    //         queryClient.invalidateQueries({queryKey: "pages"})
    //         navigate("/pages")
    //     },
    //     onError: (error) => {
    //         api.error({
    //             message: `Diqqat xatolik...!`,
    //             description: {error},
    //         })
    //     },
    // })

    const {mutate} = usePost

  return (
    // <Modal 
    //     title={get(modalData, "data")?"Pageni o'zgartirish":"Page yaratish"} 
    //     // open={modalData.isOpen} 
    //     open={true}
    //     footer={false}
    //     onCancel={()=>navigate("/pages")}
    // >
    <div className='container'>
        <div className="d-flex justify-start my-3">
            <Button type='primary' onClick={()=>navigate("/pages")}>
                Orqaga qaytish
            </Button>
        </div>
        <div className="row">
            <div className="col-md-6 offset-3">
    <Formik
    initialValues={{
        title: get(modalData, "data.title"),
        description: get(modalData, "data.description"),
        status: get(modalData, "data.status")
        // slug: get(modalData, "data.slug"),
        // file_id: get(modalData, "data.file_id"),
        // lang: get(modalData, "data.lang"),
        // status: get(modalData, "data.status")
    }}
    onSubmit={(values, {resetForm})=>{
        mutate(values);
        resetForm();
    }}
    >
            {({values, handleSubmit})=>{
                return(
                    <Form>
                        {contextHolder}
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
                        {/* <Field
                            name="slug"
                            label="Slug"
                            component={Fields.Input}
                        />
                        <Field
                            name="file_id"
                            label="File_ID"
                            component={Fields.Input}
                        />
                        <Field
                            name="lang"
                            label="Lang"
                            component={Fields.Input}
                        /> */}
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
                                {get(modalData, "data")?"Pageni o'zgartirish":"Pageni qo'shish"}
                            </Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
            </div>
        </div>
    </div>
    // </Modal>
  )
}

export default form