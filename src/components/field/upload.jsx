// import { PlusOutlined } from '@ant-design/icons';
// import { Modal, Upload } from 'antd';
// import { usePost } from 'crud';
// import { get, method } from 'lodash';
// import { useState } from 'react';


// const upload = ({ field:{name, value}, form:{setFieldValue} }) => {

//     const [previewModal, setPreviewModal] = useState({isOpen: false, item: {}})

//     const {mutate} = usePost()

//     const newData = 
//     value?.length > 0 &&
//     value.map((item)=>{
//         const url = get(item, "domain") + get(item, "folder") + get(item, "file")
//         return {
//             ...item,
//             uid: get(item, "uid"),
//             name: get(item, "name"),
//             url
//         }
//     })

//     const [fileList, setFileList] = useState( newData || [] );

//     const onDrop = (file) =>{
//         const formData = new FormData()
//         formData.append(`files[0]`, file)
//         mutate({
//             url: "/filemanager/uploads",
//             method: "post",
//             values: formData,
//             onSuccess: (data)=>{
//                 setFileList([
//                     ...fileList,
//                     ...get(data, "data").map((item=>{
//                         const url = get(item, "domain") + get(item, "folder") + get(item, "file")
//                         return {
//                             ...item,
//                             uid: get(item, "uid"),
//                             name: get(item, "name"),
//                             url
//                         }
//                     }))
//                 ])
//                 setFieldValue(...name, [...value, ...get(data, "data")])
//             }
//         })
//     }

//     const onPreview = (file) =>{
//         setPreviewModal({
//             isOpen: true,
//             item: {
//                 title: get(file, "title"),
//                 src: get(file, "thumbnails.normal.src")
//             }
//         })
//     }

//     const onRemove = (file) =>{
//         mutate({
//             url: `/filemeneger/${get(file, "id")}`,
//             method: "delete"
//         });
//         setFileList(fileList.filter((item)=> get(item, "id") !== get(file, "id")))
//     }

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   );
//   return (
//     <>
//         <Upload
//           listType="picture-card"
//           fileList={fileList}
//           data={(file)=>onDrop(file)}
//           onPreview={onPreview}
//           onRemove={onRemove}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal 
//             width={1000}
//             open={get(previewModal, "isOpen")} 
//             title={get(previewModal, "title")} 
//             footer={null} 
//             onCancel={()=>setPreviewModal({isOpen: false, item: null})}
//         >
//             <img
//               alt="example"
//               style={{
//                 width: '100%',
//               }}
//               src={get(previewModal, "item.src")}
//             />
//         </Modal>
//     </>
//   );
// };
// export default upload;


import { useEffect, useState } from "react"
import {PlusOutlined, FileImageOutlined, FrownOutlined} from '@ant-design/icons'
import { message, Modal, notification, Spin, Upload } from "antd"
import { usePost } from "crud"
import {get} from 'lodash' 

const upload = ({form:{setFieldValue, setFieldTouched, touched, errors, label}, limit=1, field}) => {
    const [preview, setPreview] = useState({modal:false, title:'',url:''})

    const newData = 
        get(field, 'value')?.length > 0 &&
        get(field, 'value').map(item=>{
            const url = get(item, 'domain') + get(item, 'folder') + get(item, 'file')
        return {
            ...item, 
            uid:get(item, 'id'),
            name:get(item, 'title'),
            url,
        }
        })

    const [fileList, setFileList] = useState(newData || [])
    
    useEffect(()=>{
        setFileList(newData || [])
        // console.log(newData);
    }, [get(field,'value')])

    const handlePreview = async(file)=>{
        setPreview({modal:true, url:file?.url || file?.preview, title:file?.name})
    }
    const {mutate, isLoading} = usePost()
    const deleteFile = async(id)=>{
        mutate({
            url:`/filemanager/${id}`,
            method:'delete',
            onSuccess:()=>{
                const filteredData = fileList.filter((item) => item.id !== id);
                setFileList(filteredData);
                setFieldValue(
                  get(field, "name"),
                  filteredData?.length > 0 ? filteredData : ""
                );
                // console.log('FILTER',filteredData);
                notification.success({
                  message: "deleted file successfully",
                  icon: <FileImageOutlined style={{ color: "green" }} />,
                });
            }
        })
    }
    const onDrop = (file) => {
        let formData = new FormData()
        formData.append('files[0]', file)
        // console.log(formData);
        // console.log(file);
        mutate({
            url:'/filemanager/uploads',
            method:'post',
            values:formData,
            onSuccess:(data)=>{
                // console.log(data);
                const newData = get(data, 'data').map(item=>{
                    const url =
                      get(item, "domain") +
                      get(item, "folder") +
                      get(item, "file");
                    return{
                        ...item, 
                        url
                    }
                })
                setFieldValue(get(field, 'name'), [...get(field, 'value'), ...newData])
                notification.success({
                    message:'added file successfully',
                    icon:<FileImageOutlined style={{color:'green'}}/>
                })
            }, 
            onError:(err)=>{
                notification.error({
                    message:get(err, 'message') || 'Something went wrong',
                    icon:<FrownOutlined style={{color:'red'}}/>
                })
            }
        })
    }
    const uploadButton = ()=>{
        return (
            <div>
                <PlusOutlined/>
                <div className="mt-4">
                    Upload
                </div>
            </div>
        )
    }

  return (
    <div>
        {label?<label>{label}</label>:null}
        <Upload
          customRequest={()=>{}}
          name={field.name}
          disabled={isLoading}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          data={(file)=>{
            // console.log(file);
            onDrop(file)
          }}
          onBlur={()=>setFieldTouched(field.name, true)}
          onRemove={(file)=>{
            console.log(file.id);
            deleteFile(file.id)
          }}
        >
            {isLoading ? <Spin/>  : fileList?.length >= limit ? null: uploadButton()}
        </Upload>
        <Modal
          open={preview.modal}
          title={preview.title}
          footer={null}
          onCancel={()=>{
            setPreview({modal:false, url:'', title:''})
          }}
        >
            <img src={preview.url} alt="img" className="w-full"/>
        </Modal>
    </div>
  )
}

export default upload