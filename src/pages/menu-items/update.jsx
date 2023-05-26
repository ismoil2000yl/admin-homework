import { useQueryClient } from "@tanstack/react-query"
import { Button, notification } from "antd"
import { Fields } from "components"
import { Field } from "formik"
import { get } from "lodash"
import { useNavigate, useParams } from "react-router-dom"
import qs from "qs"
import { useSelector } from "react-redux"
import ContainerForm from "moduls/container/form";
import ContainerOne from "moduls/container/one"


const index = () => {

    const { id } = useParams()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    const { currentLangCode } = useSelector(state => get(state, "system"))

    return (
        <div>
            <div className="d-flex justify-start my-3">
                <Button
                    type="primary"
                    onClick={() => navigate(`/menu-items/${id}`)}
                >
                    Orqaga qaytish
                </Button>
            </div>
            <ContainerOne
                url={`/menu-items/${id}`}
                queryKey={["menu-items"]}
                // params={{
                //     include: "menu"
                // }}
            >
                {
                    ({ item, isLoading }) => {
                        console.log(item)
                        return (
                            <>
                                <div className="row">
                                    <ContainerForm
                                        url={`/menu-items/${id}`}
                                        method="put"
                                        params={{
                                            extra: { _l: get(params, "lang", currentLangCode) },
                                        }}
                                        onSuccess={(data, resetForm) => {
                                            notification.success({
                                                message: "Yangi Menu items qo'shildi",
                                            });
                                            navigate(`/menu-items/${id}`)
                                            setModalData({ isOpen: false, data: null })
                                            queryClient.invalidateQueries({ queryKey: ["menu-items"] })
                                        }}
                                        fields={[
                                            {
                                                name: "title",
                                                required: true,
                                                onSubmitValue: (value) => value,
                                                value: get(item, "title", "")
                                            },
                                            // {
                                            //     name: "alias",
                                            //     required: true,
                                            //     onSubmitValue: (value) => value,
                                            //     value: get(item, "alias", "")
                                            // },
                                            {
                                                name: "url",
                                                required: true,
                                                onSubmitValue: (value) => value,
                                                value: get(item, "url", "")
                                            },
                                            {
                                                name: "menu_id",
                                                value: id
                                            },
                                            {
                                                name: "status",
                                                type: "boolean",
                                                onSubmitValue: (value) => value ? 1 : 0,
                                                value: get(item, "status", "") === 1 ? true : false,
                                            },
                                        ]}

                                    // onSuccess={(data) => navigate(`/post/update/${data?.id}`)}
                                    >
                                        {({ values, handleSubmit }) => {

                                            return (
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-8 offset-2">
                                                            <Field
                                                                name="title"
                                                                label="Title"
                                                                component={Fields.Input}
                                                            />
                                                            {/* <Field
                                                                name="alias"
                                                                label="Alias"
                                                                component={Fields.Input}
                                                            /> */}
                                                            <Field
                                                                name="url"
                                                                label="Url"
                                                                component={Fields.Input}
                                                            />
                                                            <Field
                                                                name="status"
                                                                label="Status"
                                                                component={Fields.Switch}
                                                            />
                                                            <div className="w-full flex justify-end my-3">
                                                                <Button className="" type="primary" onClick={handleSubmit}>
                                                                    Update
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            );
                                        }}
                                    </ContainerForm>
                                </div>
                            </>
                        )
                    }
                }
            </ContainerOne>
        </div>
    )
}

export default index