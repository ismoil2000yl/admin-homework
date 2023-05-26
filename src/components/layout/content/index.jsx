import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const index = () => {
  return (
    <Content className="p-[10px]">
      <Outlet />
    </Content>
  );
};

export default index;
