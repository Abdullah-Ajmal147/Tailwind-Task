import React from 'react';
import useTaskManagerHelper from './helper';
import Layout from '../../Components/Layout';

const TaskManager = () => {
    const { tasksColumn1, onDragStart, handleAddButtonClick, onDragOver, onDrop, boxesColumn2, moveBoxToColumn3,
        removeTaskFromBoxInColumn2, createBoxInColumn3, boxesColumn3, restoreBoxToColumn1, removeBoxFromColumn3,
        showModal, handleModalSelect, setShowModal
    } = useTaskManagerHelper()

    return (
        <Layout active={'Task'}>
            <main className="p-4 ml-64 h-auto min-h-screen overflow-x-auto">
                <h3 className='font-bold text-2xl p-4 '>Task Management</h3>
                <div className="grid grid-cols-3 gap-4 p-4 h-screen min-w-[900px] overflow-x-auto">
                    {/* Column 1: Tasks */}
                    <div className="border p-4 h-full overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Number of Items: {tasksColumn1?.length}</h2>
                        {tasksColumn1?.map((task) => (
                            <div
                                key={task.id}
                                draggable
                                onDragStart={(e) => onDragStart(e, task, 'column1')}
                                className="p-2 border mb-2 bg-white flex justify-between items-center"
                            >
                                {task.content}
                                <button
                                    onClick={() => handleAddButtonClick(task)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Column 2: Boxes with Tasks */}
                    <div
                        className="border p-4 h-full overflow-y-auto"
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, null, 'column2')}
                    >
                        <h2 className="text-xl font-bold mb-4">Focus Column</h2>
                        {boxesColumn2?.map((box) => (
                            <div
                                key={box.id}
                                draggable
                                onDragStart={(e) => onDragStart(e, { id: box?.id }, 'column2')}
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, box?.id, 'column2')}
                                className="border p-4 mb-4 bg-gray-100"
                            >
                                <div className="flex justify-between items-center">
                                    <div className='flex gap-2 items-center justify-center'>
                                        <button
                                            onClick={() => moveBoxToColumn3(box?.id)}
                                            className="text-xl font-bold mr-2"
                                        >
                                            &gt;
                                        </button>
                                        <h3 className="font-bold">{box?.id}</h3>
                                    </div>
                                </div>
                                {(box.tasks || []).map((task) => (
                                    <div key={task.id} className="p-2 border mt-2 bg-white flex justify-between items-center">
                                        {task.content}
                                        <button
                                            onClick={() => removeTaskFromBoxInColumn2(task?.id, box?.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Column 3: Available Boxes */}
                    <div
                        className="border p-4 h-full overflow-y-auto"
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, null, 'column3')}
                    >
                        <h2 className="text-xl font-bold mb-4">Number of Boxes: {boxesColumn3?.length}</h2>
                        <div className='flex justify-end'>
                            <button
                                onClick={createBoxInColumn3}
                                className="bg-green-500 text-white px-2 py-1 rounded mb-4"
                            >
                                Add Box
                            </button>
                        </div>
                        {boxesColumn3?.map((box) => (
                            <div
                                key={box.id}
                                draggable
                                onDragStart={(e) => onDragStart(e, { id: box.id }, 'column3')}
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, box.id, 'column3')}
                                className="border p-4 mb-4 bg-gray-100"
                            >
                                <div className="flex justify-between items-center">
                                    <div className='flex gap-2 items-center justify-center'>
                                        <button
                                            onClick={() => restoreBoxToColumn1(box.id)}
                                            className="text-xl font-bold"
                                        >
                                            &lt;
                                        </button>
                                        <h3 className="font-bold">{box.id}</h3>
                                    </div>
                                    <button
                                        onClick={() => removeBoxFromColumn3(box?.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        X
                                    </button>
                                </div>
                                {(box.tasks || []).map((task) => (
                                    <div key={task.id} className="p-2 border mt-2 bg-white">
                                        {task.content}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Modal for Adding Task to Box */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded">
                                <h2 className="text-lg font-bold mb-4">Select Box to Add Task</h2>
                                {boxesColumn2.map((box) => (
                                    <button
                                        key={box.id}
                                        onClick={() => handleModalSelect(box.id)}
                                        className="block p-2 border mb-2 w-full text-left"
                                    >
                                        {box.id}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    );
};

export default TaskManager;
