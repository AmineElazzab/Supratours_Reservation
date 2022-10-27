import React from 'react'
import { Navigate } from 'react-router-dom';

function Profile() {
  return (
    <div>
       <div className="sidebar w-[300px] h-full bg-gray-100">
        <div className="logo flex justify-center items-center h-20">
            
            <div className="menu flex flex-col gap-2">
                {menutoBeRendered.map((menu) => (
                    <div
                        className={`menu-item flex items-center gap-2 p-2 rounded-lg cursor-pointer 
                            
                        `} 
                        onClick={() => {
                            if (menu.path === "/logout") {
                                localStorage.removeItem("token");
                                Navigate("/login");
                            } else {
                                Navigate(menu.path);
                            }
                        }}
                    >
                        <i className={menu.icon}></i>
                        <span>{menu.name}</span>
                        <i className="ri-arrow-right-s-line"></i>
                        </div> 
                ))}
                </div>
                </div>
                </div>
                        
    </div>
  )
}

export default Profile