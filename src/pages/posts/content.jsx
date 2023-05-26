import { Button } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import ContainerOne from 'moduls/container/one'
import { get } from 'lodash'
import { useSelector } from 'react-redux'
import { useHooks } from 'hooks'

const content = () => {

    const { id } = useParams()
    const currentLangCode = useSelector((state) => state.system.currentLangCode);
    const { navigate, params } = useHooks()

    return (
        <div>
            <div>
                <Button
                    type='primary'
                    onClick={() => navigate("/posts")}
                >
                    Back to posts
                </Button>
            </div>

            <div className="my-3 h-[88vh] overflow-y-scroll">
                <ContainerOne
                    url={`/posts/${id}`}
                    queryKey={["posts"]}
                    params={{
                        extra: { _l: get(params, 'lang', currentLangCode) },
                        include: "file"
                    }}
                >
                    {
                        ({ item1, isLoading }) => {
                            return (
                                <div className="row">
                                    <div className="col-md-10 offset-1">
                                        <div className='card mt-4'>
                                            <div className="text-center card-header">
                                                <h1>Content</h1>
                                            </div>
                                            <div className="card-body">
                                                <div
                                                    className="editor"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item1?.content,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                </ContainerOne>
            </div>
        </div>
    )
}

export default content