import React from 'react'
import Layout from '../../Components/Layout'
import OrderTable from '../../Utility/Tables/OrderTable'

const OrderManagement = () => {
    return (
        <Layout active={'Order'}>
            <main className="p-4 ml-64 h-auto min-h-screen ">
                <div className='flex justify-between items-center gap-5'>
                    <h3 className='font-bold text-2xl p-4 '>Orders </h3>
                    <div className='py-2 px-3 bg-black text-white rounded-md'>Create Order</div>
                </div>
                <OrderTable />
            </main>
        </Layout>
    )
}

export default OrderManagement