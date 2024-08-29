import React from "react";

const GanttChart = () => {
    const tasks = [
        { name: "Market Research", start: 2, end: 4 },
        { name: "Define Specifications", start: 3, end: 6 },
        { name: "Overall Architecture", start: 2, end: 2 },
        { name: "Project Planning", start: 1, end: 1 },
        { name: "Detail Design", start: 3, end: 3 },
        { name: "Software Development", start: 1, end: 3 },
        { name: "Test Plan", start: 1, end: 6 },
        { name: "Testing & QA", start: 1, end: 1 },
        { name: "User Documentation", start: 1, end: 2 },
    ];

    const weeks = [
        { month: "April", weeks: ["W1", "W2", "W3", "W4"] },
        { month: "May", weeks: ["W5", "W6", "W7", "W8"] },
        { month: "June", weeks: ["W9", "W10", "W11", "W12"] },
        { month: "July", weeks: ["W13", "W14", "W15", "W16"] },
    ];

    return (
        <div className="p-4 flex">
            {/* Static Task Names */}
            <div className="flex-none w-40 ">
                <div className="flex flex-col pt-3">
                    {/* Empty cell for alignment with header */}
                    <div className="h-12 flex items-center justify-center font-bold border-b-2 ">
                        Tasks
                    </div>
                    {tasks.map((task, index) => (
                        <div key={index} className="h-12 border-b py-6 font-medium text-nowrap">
                            {task.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollable Chart */}
            <div className="flex-1 overflow-x-auto">
                <div className="min-w-[800px] grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-2">
                    {/* Header for months */}
                    {weeks.map((month, index) => (
                        <div
                            key={index}
                            className="col-span-4 text-center font-bold border-b-2"
                        >
                            {month.month}
                        </div>
                    ))}

                    {/* Header for weeks */}
                    {weeks.map((month, index) => (
                        <React.Fragment key={index}>
                            {month.weeks.map((week, i) => (
                                <div key={i} className="text-center border-b-2 font-semibold">
                                    {week}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}

                    {/* Tasks and their corresponding bars */}
                    {tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            {/* Each task row */}
                            {Array.from({ length: 14 }).map((_, weekIndex) => (
                                <div
                                    key={weekIndex}
                                    className={`h-12 border-b py-2 relative`}
                                >
                                    {/* Render the bar only if the current cell is within the task's duration */}
                                    {weekIndex + 1 >= task.start && weekIndex + 1 <= task.end && (
                                        <div
                                            className="absolute bg-blue-500 h-4 rounded"
                                            style={{
                                                left: `${(task.start - 1) * 100}%`,
                                                width: `${(task.end - task.start + 1) * 100}%`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
