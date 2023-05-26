import { useGet } from "crud"
import { get } from "lodash"

const all = ({url, params, queryKey, onSuccess, onError, children}) => {

    const data = useGet({
        url,
        params,
        queryKey,
        onSuccess,
        onError
    })

  return children({
    items: get(data, "data.data.data"),
    meta:{
        total: get(data, "data.data.total"),
        perPage: get(data, "data.data.per_page"),
        current: get(data, "data.data.current_page"),
        last:  get(data, "data.data.last_page")
    },
    ...data
  })
}

export default all