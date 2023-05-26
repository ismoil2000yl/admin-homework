import { Button, notification } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import ContainerOne from 'moduls/container/one'
import ContainerForm from 'moduls/container/form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Tabs from '../../components/tabs'
import { useHooks } from 'hooks'
import { CheckOutlined } from "@ant-design/icons";

const update = () => {
  const { id } = useParams()
  const { currentLangCode } = useSelector(state => get(state, "system"))
  const { params, navigate } = useHooks()
  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          className=""
          type="primary"
          onClick={() => navigate("/posts")}
        >
          Exit
        </Button>
      </div>
      <div className="flex justify-center my-2">
        <Tabs />
      </div>
      <ContainerOne
        url={`/posts/${id}`}
        queryKey={["posts"]}
        params={{
          extra: { _l: get(params, 'lang', currentLangCode) },
          include: ["file","tags", "categories"]
        }}
      >
        {({ item1, isLoading }) => {
          console.log(item1)
          return (
            <ContainerForm
              url={`/posts/${id}`}
              method="put"
              params={{ extra: { _l: get(params, "lang", currentLangCode) } }}
              onSuccess={(data, resetForm) => {
                notification.success({
                  message: "Changed",
                });
                navigate("/posts")
              }}
              fields={[
                {
                  name: "title",
                  type: "string",
                  value: get(item1, "title", ""),
                  required: true,
                },
                {
                  name: "description",
                  type: "string",
                  value: get(item1, "description", ""),
                  required: true,
                },
                {
                  name: "content",
                  value: get(item1, "content", ""),
                  type: "string",
                  required: true
                },
                {
                  name: "status",
                  type: "boolean",
                  value: get(item1, "status", "") === 1 ? true : false,
                  onSubmitValue: (value) => (value ? 1 : 0),
                },
                {
                  name: "tag_ids",
                  type: "array",
                  value: get(item1, "tags"),
                  onSubmitValue: (value) => {
                    return value.reduce((total, curr) => {
                      return [...total, curr.id]
                    }, []).join(',')
                  }
                },
                {
                  name: "category_ids",
                  type: "array",
                  value: get(item1, "categories"),
                  onSubmitValue: (value) => {
                    return value.reduce((total, curr) => {
                      return [...total, curr.id]
                    }, []).join(',')
                  }
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
              ]}
            >
              {({ values, errors, handleSubmit }) => {
                return (
                  <>
                    <div className="row h-[80vh] overflow-y-scroll">
                      <div className="col-md-8 offset-2">
                        <Field
                          name="file_id"
                          component={Fields.Upload}
                          limit="2"
                        />
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
                          name="content"
                          label="Content"
                          component={Fields.CKEditor}
                          type="textarea"
                        />
                        <Field
                          name="status"
                          label="Status"
                          component={Fields.Switch}
                        />
                        <div className='my-3'>
                          <Field
                            name="tag_ids"
                            label="Tag ID"
                            loadOptionsUrl="/tags"
                            optionValue="title"
                            isMulti={true}
                            loadOptionsParams={(search) => {
                              return {
                                filter: {
                                  title: search,
                                }
                              }
                            }}
                            optionLabel={(option) => {
                              return (
                                <div>
                                  <CheckOutlined className='m-2' />
                                  {option.title}
                                </div>
                              )
                            }}
                            component={Fields.AsyncSelect}
                          />
                        </div>
                        <div className="my-3">
                          <Field
                            name="category_ids"
                            label="Category ID"
                            loadOptionsUrl="/categories"
                            optionValue="name_uz"
                            isMulti={true}
                            loadOptionsParams={(search) => {
                              return {
                                filter: {
                                  name_uz: search,
                                }
                              }
                            }}
                            optionLabel={(option) => {
                              return (
                                <div>
                                  <CheckOutlined className='m-2' />
                                  {option.name_uz}
                                </div>
                              )
                            }}
                            component={Fields.AsyncSelect}
                          />
                        </div>
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