export const addTask = (tasks, newTask) => {
    if (newTask.trim()) {
        return [...tasks, { text: newTask, id: Date.now() }];
    }
    return tasks;
};

export const deleteTask = (tasks, id) => {
    return tasks.filter(task => task.id !== id);
};

export const startEditingTask = (task, setEditingTask, setNewTask) => {
    setEditingTask(task);
    setNewTask(task.text);
};

export const editTask = (tasks, editingTask, newTask) => {
    return tasks.map(task =>
        task.id === editingTask.id ? { ...task, text: newTask } : task
    );
};