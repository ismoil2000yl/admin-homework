import {
  FolderOutlined,
  HomeOutlined,
  ReadOutlined,
  FileDoneOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  ProfileTwoTone,
  HddOutlined,
} from "@ant-design/icons";

const menus = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "banners",
    icon: <FileDoneOutlined />,
    label: "Banners"
  },
  {
    key: "posts",
    icon: <ReadOutlined />,
    label: "Posts"
  },
  {
    key: "pages",
    icon: <FolderOutlined />,
    label: "Pages"
  },
  {
    key: "menus",
    icon: <MenuUnfoldOutlined />,
    label: "Menus"
  },
  {
    key: "store-page",
    icon: <SmileOutlined />,
    label: "Store"
  },
  {
    key: "tags",
    icon: <ProfileTwoTone />,
    label: "Tags"
  },
  {
    key: "categories",
    icon: <HddOutlined />,
    label: "Categories"
  }
];

export default menus;
