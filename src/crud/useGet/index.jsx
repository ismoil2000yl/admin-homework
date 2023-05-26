import { useQuery } from '@tanstack/react-query'
import api from 'services/api'
import queryBuilder from 'services/queryBuilder'

const useGet = ({
  url, 
  queryKey,
  params,
  onSucces=()=>{},
  onError=()=>{}
}) => {

    const data = useQuery({
        queryKey: [queryKey, params],
        queryFn: async ()=>{
            return await api.get(queryBuilder(url, params))
        },
            onSucces:(data)=>onSucces(data),
            onError:(data)=>onError(data)
    })

return {...data}
}

export default useGet