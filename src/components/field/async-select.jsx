// import { useGet } from 'crud';
// import { get } from 'lodash';
// import { AsyncPaginate } from 'react-select-async-paginate';
// import api from 'services/api';
// import queryBuilder from 'services/queryBuilder';

// const index = ({
//     placeholder,
//     label,
//     optionLabel,
//     loadOptionsUrl,
//     loadOptionsParams,
//     optionValue,
//     menuPlacement = "bottom",
//     isMulti = false,
//     field: { value, name },
//     form: { setFieldValue, errors, touched, setFieldTouched }
// }) => {

//     async function loadOptions(search, loadOptions, { page }) {
//         const { data } = await api.get(queryBuilder(loadOptionsUrl, loadOptionsParams))
//         return {
//             options: get(data, "data", []),
//             hasMore: get(data, "total") > get(data, "perPage") ? true : false,
//             additional: {
//                 page: page + 1,
//             },
//         }
//     }

//     const styles = {
//         control: (props) => {
//             return {
//                 ...props
//             }
//         }
//     }

//     return (
//         <div>
//             {label ? <h2 className="text-sm">{label}</h2> : null}
//             <AsyncPaginate
//                 styles={styles}
//                 isMulti={isMulti}
//                 menuPlacement={menuPlacement}
//                 loadOptions={loadOptions}
//                 placeholder={placeholder}
//                 getOptionLabel={option => 
//                     typeof optionLabel === 'function' ? optionLabel(option) : option[optionLabel]}
//                 getOptionValue={option => 
//                     typeof optionValue === 'function' ? optionValue(option) : option[optionValue]}
//                 onChange={(e) => setFieldValue(name, e)}
//                 additional={{
//                     page: 1
//                 }}
//             />
//         </div>
//     )
// }

// export default index


import { get } from "lodash";
import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import api from "services/api";
import queryBuilder from "services/queryBuilder";

const index = ({
  placeholder,
  label,
  optionLabel,
  loadOptionsUrl,
  optionValue,
  menuPlacement = "bottom",
  isMulti = false,
  loadOptionsParams = () => { },
  field: { value, name },
  form: { setFieldValue, errors, touched, setFieldTouched }
}) => {
  async function loadOptions(search, { page }) {
    const { data } = await api.get(
      queryBuilder(loadOptionsUrl, {
        page,
        ...loadOptionsParams(search)
      })
    );
    return {
      options: get(data, "data", []),
      hasMore: get(data, "total") > get(data, "perPage") ? true : false,
      additional: {
        page: page + 1
      }
    };
  }
  return (
    <div>
      {label ? <h2 className="text-sm">{label}</h2> : null}
      <AsyncPaginate
        value={value}
        name={name}
        menuPlacement={menuPlacement}
        isMulti={isMulti}
        loadOptions={loadOptions}
        getOptionValue={(option) =>
          typeof optionLabel === "function"
            ? optionLabel(option)
            : option[optionLabel]
        }
        getOptionLabel={(option) =>
          typeof optionValue === "function"
            ? optionValue(option)
            : option[optionValue]
        }
        additional={{
          page: 1
        }}
        onChange={(value) => setFieldValue(name, value)}
      />
    </div>
  );
};

export default index;