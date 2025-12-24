import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getTasks, createTask, updateTask, deleteTask } from "./http/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    // Load tasks
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTasks();
    }, []);

    // Add task
    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const res = await createTask(title);
        setTasks((prev) => [...prev, res.data]);
        setTitle("");
    };

    // Toggle completed
    const handleToggleTask = async (task) => {
        const res = await updateTask(task.id, {
            isCompleted: !task.isCompleted,
        });

        setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
    };

    // Delete task
    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    useEffect(() => {
        fetch(
            "http://localhost:3000/bypass-cors?url=https://api-gateway.fullstack.edu.vn/api/analytics"
        )
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <div className="min-h-screen w-screen bg-gray-50 p-8">
            <div className="w-[70vw] mx-auto">
                <h1 className="text-center text-4xl font-bold mb-8">
                    Todo List
                </h1>

                {/* Add task */}
                <form onSubmit={handleAddTask} className="flex gap-4 mb-6">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="New task..."
                        className="flex-1 border rounded px-4 py-2"
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-6 rounded"
                    >
                        Add
                    </button>
                </form>

                {/* Task list */}
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white border rounded p-4 flex items-center gap-4"
                        >
                            <Checkbox
                                checked={task.isCompleted}
                                onCheckedChange={() => handleToggleTask(task)}
                            />

                            <span
                                className={`flex-1 ${
                                    task.isCompleted
                                        ? "line-through text-gray-400"
                                        : ""
                                }`}
                            >
                                {task.title}
                            </span>

                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
