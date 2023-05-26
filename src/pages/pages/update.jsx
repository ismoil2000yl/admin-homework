import { Button, notification } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import ContainerOne from 'moduls/container/one'
import ContainerForm from 'moduls/container/form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHooks } from 'hooks'

const update = () => {
  const { id } = useParams()
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const { params, navigate } = useHooks()
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="mb-5"
          type="primary"
          onClick={() => navigate("/pages")}
        >
          Exit
        </Button>
      </div>
      <ContainerOne
        url={`/pages/${id}`}
        queryKey={["pages"]}
        params={{
          extra: { _l: get(params, 'lang', currentLangCode) }
        }}
      >
        {({ item, isLoading }) => {
          return (
            <ContainerForm
              url={`/pages/${id}`}
              method="put"
              params={{ extra: { _l: get(params, "lang", currentLangCode) } }}
              onSuccess={(data, resetForm) => {
                notification.success({
                  message: "Changed",
                });
              }}
              fields={[
                {
                  name: "title",
                  type: "string",
                  value: get(item, "title", ""),
                  required: true,
                },
                {
                  name: "description",
                  type: "string",
                  value: get(item, "description", ""),
                  required: true,
                },
                {
                  name: "slug",
                  type: "string",
                  value: get(item, "slug", ""),
                  required: true,
                  min: 5,
                  max: 100,
                },
                {
                  name: "status",
                  type: "boolean",
                  value: get(item, "status", "") === 1 ? true : false,
                  onSubmitValue: (value) => (value ? 1 : 0),
                },
              ]}
            >
              {({ values, errors, handleSubmit }) => {
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
                          name="description"
                          label="Description"
                          component={Fields.Input}
                        />
                        <Field
                          name="slug"
                          label="slug"
                          component={Fields.TextArea}
                        />
                        <Field
                          name="status"
                          label="Status"
                          component={Fields.Switch}
                        />
                        <div className="flex justify-end mb-4">
                          <Button type="primary" onClick={handleSubmit}>
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }}
            </ContainerForm>
          );
        }}
      </ContainerOne>
    </>
  );
}

export default update