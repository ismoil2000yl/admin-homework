import { Button, notification} from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import ContainerOne from 'moduls/container/one'
import ContainerForm from 'moduls/container/form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'
import Tabs from '../../components/tabs'

const update = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="mb-5"
          type="primary"
          onClick={() => navigate("/menus")}
        >
          Exit
        </Button>
        <Tabs/>
      </div>
      <ContainerOne 
        url={`/menu/${id}`} 
        queryKey={["menus"]}
        params={{
          extra:{_l:get(params, 'lang', currentLangCode)}
        }}
      >
        {({ item1, item, isLoading }) => {
          console.log(item)
          return (
            <ContainerForm
              url={`/menu/${id}`}
              method="put"
              params={{ extra: { _l: get(params, "lang", currentLangCode) } }}
              onSuccess={(data, resetForm) => {
                notification.success({
                  message: "Changed",
                });
                navigate("/menus")
              }}
              fields={[
                {
                  name: "title",
                  type: "string",
                  value: get(item1, "title", ""),
                  required: true,
                },
                {
                  name: "alias",
                  type: "string",
                  value: get(item1, "alias", ""),
                  required: true,
                },
                {
                  name: "status",
                  type: "boolean",
                  value: get(item1, "status", "") === 1 ? true : false,
                  onSubmitValue: (value) => (value ? 1 : 0),
                },
              ]}
            >
              {({ values, errors, handleSubmit }) => {
                return (
                  <>
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