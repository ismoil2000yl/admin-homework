import { Button, notification } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import ContainerOne from 'moduls/container/one'
import ContainerForm from 'moduls/container/form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Tabs from '../../components/tabs'
import { useQueryClient } from '@tanstack/react-query'
import {types} from './'
import { useHooks } from 'hooks'

const update = () => {
  const { id } = useParams()
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const {params, navigate, location, qs} = useHooks()
  const queryClient = useQueryClient()
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="mb-5"
          type="primary"
          onClick={() => navigate("/banners")}
        >
          Exit
        </Button>
      </div>
      <div className="flex justify-center my-3">
        <Tabs />
      </div>
      <ContainerOne
        url={`/banners/${id}`}
        queryKey={["banners"]}
        params={{
          include: "file"
        }}
      >
        {({ item1, isLoading }) => {
          return (
            <div className='row'>
              <div className="col-md-6 offset-3">

                {contextHolder}
                <ContainerForm
                  url={`/banners/${id}`}
                  method="put"
                  params={{
                    extra: { _l: get(params, "lang", currentLangCode) },
                  }}
                  onSuccess={(data, resetForm) => {
                    notification.success({
                      message: "Banner ma'lumoti o'zgartirildi",
                    });
                    // navigate("/banners")
                    setModalData({ isOpen: false, data: null })
                    queryClient.invalidateQueries({ queryKey: ["banners"] })
                    navigate(`/banners/update-banner/${get(data, "id")}`)
                  }}
                  fields={[
                    {
                      name: `name_${get(params, "lang", currentLangCode)}`,
                      type: "string",
                      required: true,
                      min: 3,
                      value: get(item1, `name_${get(params, "lang", currentLangCode)}`)
                    },
                    {
                      name: `description_${get(params, "lang", currentLangCode)}`,
                      type: "string",
                      required: true,
                      min: 3,
                      value: get(item1, `description_${get(params, "lang", currentLangCode)}`)
                    },
                    {
                      name: "file_id",
                      type: "array",
                      value: [get(item1, "file", "")],
                      onSubmitValue: (value) => {
                        // console.log('ONSUBMIT', value);
                        return value[0]?.id
                      }
                    },
                    {
                      name: "type",
                      type: "number",
                      required: true,
                      value: get(item1, "type", ""),
                      onSubmitValue: value => value
                    },
                  ]}

                // onSuccess={(data) => navigate(`/post/update/${data?.id}`)}
                >
                  {({ handleSubmit }) => {

                    return (
                      <>
                        <Field
                          name="file_id"
                          component={Fields.Upload}
                          limit="2"
                        />
                        <Field
                          name="type"
                          label="Type"
                          options={types}
                          component={Fields.Select}
                        />
                        <Field
                          name={`name_${get(params, "lang", currentLangCode)}`}
                          label="Name"
                          component={Fields.Input}
                        />
                        <Field
                          name={`description_${get(params, "lang", currentLangCode)}`}
                          label="Description"
                          component={Fields.Input}
                        />
                        <div className="w-full flex justify-end my-3">
                          <Button className="" type="primary" onClick={handleSubmit}>
                            Upload
                          </Button>
                        </div>
                      </>
                    );
                  }}
                </ContainerForm>
              </div>
            </div>
          );
        }}
      </ContainerOne>
    </>
  );
}

export default update