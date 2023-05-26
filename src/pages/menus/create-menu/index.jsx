import { useQueryClient } from "@tanstack/react-query"
import { Button, notification } from "antd"
import { Fields } from "components"
import { Field, Form, Formik } from "formik"
import { get, method, values } from "lodash"
import { useNavigate } from "react-router-dom"
import qs from "qs"
import { useSelector } from "react-redux"
import { usePost } from "crud"
import ContainerForm  from "moduls/container/form";


const index = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification();
    const params = qs.parse(location.search, {ignoreQueryPrefix: true})
    const {currentLangCode} = useSelector(state=> get(state, "system"))

    const {mutate} = usePost({
        url: "/menu",
        method: "post",
        params: {
            extra: {
                _l : get(params, "lang", currentLangCode)
            }
        },
        nameKey: "menus",
        onSuccess: ()=>{
            api.success({
                message: "Muvoffaqiyatli",
                description: "Yangi menu qo'shildi"
            })
            queryClient.invalidateQueries({queryKey: "menus"})
            navigate("/menus")
        }
    })

  return (
    <div>
        <div className="d-flex justify-start my-3">
            <Button
                type="primary"
                onClick={()=>navigate("/menus")}
            >
                Orqaga qaytish
            </Button>
        </div>
        <div className="row">
        <ContainerForm
            url={"/menu"}
            method="post"
            params={{
                extra: {_l: get(params, "lang", currentLangCode)},
            }}
            onSuccess={(data, resetForm) => {
                notification.success({
                  message: "Yangi Menu qo'shildi",
                });
                navigate("/menus")
                setModalData({isOpen: false, data: null})
                queryClient.invalidateQueries({queryKey:["menus"]})
              }}
        fields={[
          {
            name: "title",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "alias",
            type: "string",
            required: true,
            min: 3,
          },
        //   {
        //     name: "type",
        //     type: "string",
        //     required: true,
        //     min: 3,
        //   },
          {
            name: "status",
            type: "boolean",
            onSubmitValue: (value) => value ? 1 : 0,
          },
        ]}
        
        // onSuccess={(data) => navigate(`/post/update/${data?.id}`)}
      >
        {({ handleSubmit }) => {
            
          return (
            <>
            <div className="row">
              <div className="col-md-8 offset-2">
              <Field 
                name="title" 
                label="Title" 
                component={Fields.Input} 
              />
              <Field
                name="alias"
                label="Alias"
                component={Fields.Input}
              />
              {/* <Field
                name="type"
                label="Type"
                component={Fields.Input}
              /> */}
              <Field 
                name="status" 
                label="Status" 
                component={Fields.Switch} 
              />
              <div className="w-full flex justify-end my-3">
                <Button className="" type="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
              </div>
            </div>
              
            </>
          );
        }}
      </ContainerForm>
        </div>
    </div>
  )
}

export default index