import { useQueryClient } from "@tanstack/react-query"
import { Button, notification } from "antd"
import { Fields } from "components"
import { Field} from "formik"
import { get} from "lodash"
import { useNavigate, useParams } from "react-router-dom"
import qs from "qs"
import { useSelector } from "react-redux"
import ContainerForm  from "moduls/container/form";


const index = () => {

  const {id} = useParams()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [api, contextHolder] = notification.useNotification();
    const params = qs.parse(location.search, {ignoreQueryPrefix: true})
    const {currentLangCode} = useSelector(state=> get(state, "system"))

  return (
    <div>
        <div className="d-flex justify-start my-3">
            <Button
                type="primary"
                onClick={()=>navigate(`/menu-items/${id}`)}
            >
                Orqaga qaytish
            </Button>
        </div>
        <div className="row">
        <ContainerForm
            url={"/menu-items"}
            method="post"
            params={{
                extra: {_l: get(params, "lang", currentLangCode)},
            }}
            onSuccess={(data, resetForm) => {
                notification.success({
                  message: "Yangi Menu items qo'shildi",
                });
                navigate(`/menu-items/${id}`)
                setModalData({isOpen: false, data: null})
                queryClient.invalidateQueries({queryKey:["menu-items"]})
              }}
        fields={[
          {
            name: "title",
            required: true,
            onSubmitValue: (value) => value,
          },
          // {
          //   name: "alias",
          //   required: true,
          //   onSubmitValue: (value) => value,
          // },
          {
            name: "url",
            required: true,
            onSubmitValue: (value) => value,
          },
          {
            name: "menu_id",
            value: id 
          },
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