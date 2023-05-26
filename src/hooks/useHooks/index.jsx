import qs from 'qs'
// import * as lodash from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom'

const index = () => {

    const location = useLocation()
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    const navigate = useNavigate()

  return {
    qs,
    navigate,
    location,
    // ...lodash,
    params
  }
}

export default index