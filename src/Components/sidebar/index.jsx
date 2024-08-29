import React from 'react'
// import Svgs from '../../Assets/svgs'
import useSidebar from './helper'

const SideBar = ({ openSidebar, active }) => {
    const { navigate, sidebarRoutes } = useSidebar(active)

    return (
        <>
            <aside id="asidebar" className={`bg-[#f5f5f5] fixed top-0 left-0 z-50 h-screen w-64 transition-transform translate-x-0 inset-0 backdrop-blur-0`}>
                <div className="bg-primary w-64 h-screen pt-0 border-r border-lightGrey">
                    <div className="overflow-y-auto py-5 h-full bg-primary ">
                        <div onClick={() => { navigate("/") }} className="flex items-center justify-start ml-4 mb-6 pl-2 cursor-pointer">
                            <img src="/logo192.png" className="h-6" alt="Hotel Logo" />
                            {/* <p> {itm?.icon}</p> */}
                            <span className="flex-1 ml-3 font-medium text-left whitespace-wrap">Catalyst</span>
                        </div>
                        <hr className='border-gray-300' />
                        <ul className="space-y-2 pt-4 px-3">
                            {sidebarRoutes?.map(itm => {
                                return (
                                    <li>
                                        <button
                                            onClick={() => navigate(itm?.url)}
                                            type="button"
                                            className={`flex side-nav items-center p-1 text-blueGrey p-3 w-full text-sm font-medium rounded-lg transition duration-75 group hover:bg-lightGrey ${itm?.active ? 'activeLink' : ''}`}
                                        >
                                            <p> {itm?.icon}</p>
                                            <span className="flex-1 ml-3 font-medium text-left whitespace-wrap">{itm.heading}</span>
                                            {/* <p>
                                                <Svgs.ArrowNextIcon />
                                            </p> */}
                                        </button>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideBar