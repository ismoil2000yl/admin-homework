import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal, notification } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useSelector } from "react-redux";
import ContainerForm from "moduls/container/form";
import { useHooks } from 'hooks'

const form = ({ modalData, setModalData }) => {

    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification();
    const { currentLangCode } = useSelector(state => get(state, "system"))
    const { params } = useHooks()

    return (
        <Modal
            title={"Category yaratish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <ContainerForm
                url={get(modalData, "data")?`/categories/${get(modalData, "data.id")}`: "/categories"}
                method={get(modalData, "data")?"put":"post"}
                params={{
                    extra: { _l: get(params, "lang", currentLangCode) },
                }}
                onSuccess={(data, resetForm) => {
                    notification.success({
                        message: get(modalData, "data")? "Category o'zgartirildi":"Yangi Category qo'shildi",
                    });
                    setModalData({ isOpen: false, data: null })
                    queryClient.invalidateQueries({ queryKey: ["categories"] })
                }}
                fields={[
                    {
                        name: `name_uz`,
                        type: "string",
                        required: true,
                        min: 2,
                        value: get(modalData, "data.name_uz")
                    },
                    {
                        name: `name_en`,
                        type: "string",
                        required: true,
                        min: 2,
                        value: get(modalData, "data.name_en", 'name_en')
                    },
                    {
                        name: `name_ru`,
                        type: "string",
                        required: true,
                        min: 2,
                        value: get(modalData, "data.name_ru", 'name_ru')
                    },
                    {
                        name: `name_oz`,
                        type: "string",
                        required: true,
                        min: 2,
                        value: get(modalData, "data.name_oz", 'name_oz')
                    },
                    {
                        name: "status",
                        type: "boolean",
                        onSubmitValue: (value) => value ? 1 : 0,
                        value: get(modalData, "data.status"),
                    },
                ]}

            // onSuccess={(data) => navigate(`/post/update/${data?.id}`)}
            >
                {({ handleSubmit }) => {

                    return (
                        <>
                            <Field
                                name={`name_uz`}
                                label="Name"
                                component={Fields.Input}
                            />
                            <Field
                                name={`status`}
                                label="Status"
                                component={Fields.Switch}
                            />
                            <div className="w-full flex justify-end my-3">
                                <Button className="" type="primary" onClick={handleSubmit}>
                                    {get(modalData, "data") ? "Update" : "Create"}
                                </Button>
                            </div>
                        </>
                    );
                }}
            </ContainerForm>
        </Modal>
    )
}

export default form