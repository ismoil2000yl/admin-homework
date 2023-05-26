import { Select } from 'antd';


const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
const select = ({
  field: { value, name },
  placeholder,
  options,
  optionLabelProp = "label",
  form: { setFieldValue, errors, touched, setFieldTouched }
}) => (
  <Select
    key={value}
    rootClassName='w-full'
    options={options}
    defaultValue={value}
    placeholder={placeholder}
    optionLabelProp={optionLabelProp}
    onChange={(e) => setFieldValue(name, e)}
  />
);
export default select;