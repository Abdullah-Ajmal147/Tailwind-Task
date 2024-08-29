import React, { useEffect } from 'react'
import SideBar from '../sidebar';


const Layout = ({ children, active }) => {
    useEffect(() => {
        // This will scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
      }, []); 

    return (
        <>
            <div class="antialiased bg-primary">
                <SideBar openSidebar={true} active={active} />
                {children}
            </div>
        </>
    )
}

export default Layout