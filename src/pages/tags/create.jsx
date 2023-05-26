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
            title={"Tag yaratish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <ContainerForm
                url={get(modalData, "data")?`/tags/${get(modalData, "data.id")}`: "/tags"}
                method={get(modalData, "data")?"put":"post"}
                params={{
                    extra: { _l: get(params, "lang", currentLangCode) },
                }}
                onSuccess={(data, resetForm) => {
                    notification.success({
                        message: get(modalData, "data")? "Tag o'zgartirildi":"Yangi tag qo'shildi",
                    });
                    setModalData({ isOpen: false, data: null })
                    queryClient.invalidateQueries({ queryKey: ["tags"] })
                }}
                fields={[
                    {
                        name: `title`,
                        type: "string",
                        required: true,
                        min: 2,
                        value: get(modalData, "data.title")
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
                                name={`title`}
                                label="Title"
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