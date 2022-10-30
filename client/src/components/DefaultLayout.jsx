import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/admin",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menutoBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if(window.location.pathname.includes('book-now')){
    activeRoute = '/';
  }

  return (
    <div className="layout-parent flex w-full  h-screen gap-[20px]">
      <div className="sidebar bg-orange-600 flex flex-col justify-start px-5 py-0  ">
        <div className="sidebar-header">
          <h1 className="text-white text-[20px] mb-0 p-0 ">IL-MEGLIO</h1>
          <h1 className="role text-white text-[16px] mb-0 p-0 ">
            Hi {user?.name} <br />
            {/* {user?.isAdmin ? "Admin" : "User"} */}
          </h1>
        </div>
        <div className="flex flex-col gap-5 justify-start mt-[150px] ">
          {menutoBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path &&
                  "border-l-4 border-yellow-600 rounded-lg bg-orange-800"
                } " text-[20px] gap-10 mr-[10px] text-white flex items-center hover:bg-orange-800 hover:rounded-lg duration-200 justify-start py-[5px] px-[15px] w-full cursor-pointer transition-[0.2s]"`}
              >
                <i className={item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="body w-full">
        <div className="header shadow-lg w-full p-5  ">
          {collapsed ? (
            <i
              className="ri-menu-2-fill cursor-pointer text-[30px]"
              onClick={() => {
                setCollapsed(false);
              }}
            ></i>
          ) : (
            <i
              className="ri-close-line cursor-pointer text-[30px]"
              onClick={() => {
                setCollapsed(true);
              }}
            ></i>
          )}
        </div>
        <div className="content p-[10px]">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;