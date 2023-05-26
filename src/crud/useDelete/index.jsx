import { useMutation } from '@tanstack/react-query'
import api from 'services/api'
import queryBuilder from 'services/queryBuilder'

const useDelete = ({ 
    url, 
    nameKey,
    params,
    onSuccess=()=>{},
    onError=()=>{}
}) => {

    const  data = useMutation({
        mutationKey: nameKey,
        mutationFn: (id)=>{
            api.delete(queryBuilder(`${url}/${id}`, params))
        },
        onSuccess: (data)=> onSuccess(data),
        onError: (data)=> onError(data)
    })

  return {...data}
}

export default useDelete