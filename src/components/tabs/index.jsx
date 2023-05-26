import { Segmented  } from 'antd';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs'

const index = () => {
    
    const location = useLocation()
    const navigate = useNavigate()
    const {currentLangCode} = useSelector(state=> get(state, "system"))
    const params = qs.parse(location.search, {ignoreQueryPrefix: true})
    
    const items = [
      {
        value: 'uz',
        label: `Uzbek`,
      },
      {
        value: 'en',
        label: `English`,
      },
      {
        value: 'ru',
        label: `Russian`,
      },
    ];

    return(
        <Segmented
            options={items} 
            value={get(params, "lang", currentLangCode)} 
            onChange={
                (tab)=>navigate({
                    search: qs.stringify({
                      ...params,
                        lang: tab,
                    })
                })
            } />
    )
}

export default index