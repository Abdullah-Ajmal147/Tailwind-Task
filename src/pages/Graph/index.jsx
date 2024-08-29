import React from 'react'
import Layout from '../../Components/Layout'
import GanttChart from '../../Utility/Charts/GanttChart'

const Graph = () => {
    return (
        <Layout active={'Order'}>
            <main className="p-4 ml-64 h-auto min-h-screen overflow-x-auto">
                <div className='flex justify-between items-center gap-5'>
                    <h3 className='font-bold text-2xl p-4 '>Graph </h3>
                </div>
                <GanttChart />
            </main>
        </Layout>
    )
}

export default Graph