import { useMutation } from '@tanstack/react-query'
import api from 'services/api'
import queryBuilder from 'services/queryBuilder'

// const usePost = ({
//     url, 
//     nameKey,
//     params,
//     method = "post",
//     onSuccess=()=>{},
//     onError=()=>{}
// }) => {

//     const data = useMutation({
//         mutationKey: nameKey,
//         mutationFn: async (values)=>{
//             return await api[method](queryBuilder(url, params),values)
//         },
//         onSuccess: (data)=> onSuccess(data),
//         onError: (data)=> onError(data)
//     })

//   return {...data}
// }

// export default usePost


async function postData({ 
    url, 
    values, 
    params, 
    method = "post", 
    onSuccess = () => {}, 
    onError = () => {} 
}) {
  return await api[method](queryBuilder(url, params), values)
    .then(data => {
      onSuccess(data);
    })
    .catch(error => {
      onError(error);
    });
}

const usePost = () => {
  return useMutation(postData);
};

export default usePost;