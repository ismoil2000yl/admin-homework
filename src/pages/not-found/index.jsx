import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const index = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Назад
        </Button>
      }
    />
  );
};
export default index;
