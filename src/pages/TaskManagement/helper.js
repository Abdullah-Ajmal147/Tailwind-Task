import { useState } from "react";

const useTaskManagerHelper = () => {
    // usestates
    const [tasksColumn1, setTasksColumn1] = useState([
        { id: 'task-1', content: 'Task 1' },
        { id: 'task-2', content: 'Task 2' },
        { id: 'task-3', content: 'Task 3' },
    ]);
    const [boxesColumn2, setBoxesColumn2] = useState([]);
    const [boxesColumn3, setBoxesColumn3] = useState([]);
    const [nextBoxId, setNextBoxId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // on drag start function 
    const onDragStart = (e, item, source) => {
        e.dataTransfer.setData('item', JSON.stringify(item));
        e.dataTransfer.setData('source', source);
    };

    // on drag over function
    const onDragOver = (e) => {
        e.preventDefault();
    };

    // on drop function
    const onDrop = (e, targetBoxId, targetColumn) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData('item'));
        const source = e.dataTransfer.getData('source');
        if (source === 'column1' && targetColumn === 'column2') {
            // Check if Column 2 has at least one box
            if (boxesColumn2.length === 0) {
                alert('Column 2 must have at least one box to add a task.');
                return;
            }
            addTaskToBoxInColumn2(item, targetBoxId);
        } else if (source === 'column3' && targetColumn === 'column2') {
            moveBoxToColumn2(item.id);
        } else if (source === 'column2' && targetColumn === 'column3') {
            moveBoxToColumn3(item.id);
        }
    };

    // add tasks from column1 to column2
    const addTaskToBoxInColumn2 = (task, boxId) => {
        setTasksColumn1((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        setBoxesColumn2((prevBoxes) =>
            prevBoxes.map((box) => {
                if (box.id === boxId) {
                    return { ...box, tasks: [...box.tasks, task] };
                }
                return box;
            })
        );
    };

    // move column3 boxes to column2
    const moveBoxToColumn2 = (boxId) => {
        setBoxesColumn3((prevBoxesColumn3) => {
            const boxToMove = prevBoxesColumn3.find((box) => box.id === boxId);
            if (!boxToMove) return prevBoxesColumn3;

            setBoxesColumn2((prevBoxesColumn2) => {
                // Ensure the box is not already in Column 2
                if (prevBoxesColumn2.some((box) => box.id === boxId)) return prevBoxesColumn2;

                return [
                    ...prevBoxesColumn2,
                    { ...boxToMove, tasks: [...boxToMove.tasks] }
                ];
            });

            return prevBoxesColumn3.filter((box) => box.id !== boxId);
        });
    };

    // create new boxes in column3
    const createBoxInColumn3 = () => {
        const newBox = { id: `box-${nextBoxId}`, tasks: [] };
        setNextBoxId(nextBoxId + 1);
        setBoxesColumn3((prevBoxes) => [...prevBoxes, newBox]);
    };

    // move boxes from column2 to column3
    const moveBoxToColumn3 = (boxId) => {
        setBoxesColumn2((prevBoxesColumn2) => {
            const boxToMove = prevBoxesColumn2.find((box) => box.id === boxId);
            if (!boxToMove) return prevBoxesColumn2;

            setBoxesColumn3((prevBoxesColumn3) => {
                // Ensure the box is not already in Column 3
                if (prevBoxesColumn3.some((box) => box.id === boxId)) return prevBoxesColumn3;

                return [
                    ...prevBoxesColumn3,
                    { ...boxToMove, tasks: [...boxToMove.tasks] }
                ];
            });

            return prevBoxesColumn2.filter((box) => box.id !== boxId);
        });
    };

    // remove single task from column2 boxes
    const removeTaskFromBoxInColumn2 = (taskId, boxId) => {
        setBoxesColumn2((prevBoxes) =>
            prevBoxes.map((box) => {
                if (box.id === boxId) {
                    const newTasks = box.tasks.filter((task) => task.id !== taskId);
                    setTasksColumn1((prevTasks) => [
                        ...prevTasks,
                        box.tasks.find((task) => task.id === taskId)
                    ]);
                    return { ...box, tasks: newTasks };
                }
                return box;
            })
        );
    };

    // remove complete box from column3
    const removeBoxFromColumn3 = (boxId) => {
        setBoxesColumn3((prevBoxes) => {
            const boxToRemove = prevBoxes.find((box) => box.id === boxId);
            if (!boxToRemove) return prevBoxes;

            // Move tasks from box to Column 1
            setTasksColumn1((prevTasks) => [
                ...prevTasks,
                ...boxToRemove.tasks
            ]);

            // Remove box from Column 3
            return prevBoxes.filter((box) => box.id !== boxId);
        });
    };

    // add tasks from column1 to column2 boxes
    const handleAddButtonClick = (task) => {
        // Check if Column 2 has at least one box
        if (boxesColumn2.length === 0) {
            alert('Column 2 must have at least one box to add a task.');
            return;
        }
        setSelectedTask(task);
        setShowModal(true);
    };

    // select box number from model
    const handleModalSelect = (boxId) => {
        addTaskToBoxInColumn2(selectedTask, boxId);
        setShowModal(false);
        setSelectedTask(null);
    };

    // restore tasks from column3 to column1 on delete of box from column3
    const restoreBoxToColumn1 = (boxId) => {
        const boxToRestore = boxesColumn3.find((box) => box.id === boxId);
        if (boxToRestore) {
            setBoxesColumn3((prevBoxes) => prevBoxes.filter((box) => box.id !== boxId));
            setBoxesColumn2((prevBoxes) => [
                ...prevBoxes,
                { ...boxToRestore, tasks: boxToRestore.tasks }
            ]);
        }
    };
    return {
        tasksColumn1, onDragStart, handleAddButtonClick, onDragOver, onDrop, boxesColumn2, moveBoxToColumn3,
        removeTaskFromBoxInColumn2, createBoxInColumn3, boxesColumn3, restoreBoxToColumn1, removeBoxFromColumn3,
        showModal, handleModalSelect, setShowModal
    }
}

export default useTaskManagerHelper