import { TodoTask } from "../../types/TodoTask";

// Load tasks from local storage
export function getTasks(): TodoTask[] {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
}

// Save tasks to local storage
export function saveTasks(tasks: TodoTask[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
export function addTask(tasks: TodoTask[], newTaskText: string): TodoTask[] {
  if (!newTaskText.trim()) return tasks; // Prevent empty tasks

  const newTask: TodoTask = {
    id: Date.now(),
    task_description: newTaskText.trim(),
    completed: false,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return updatedTasks;
}

// Toggle task completion status
export function toggleTask(tasks: TodoTask[], id: number): TodoTask[] {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks(updatedTasks);
  return updatedTasks;
}

// Delete a task
export function deleteTask(tasks: TodoTask[], id: number): TodoTask[] {
  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasks(updatedTasks);
  return updatedTasks;
}

// Edit a task
export function editTask(tasks: TodoTask[], id: number, newText: string): TodoTask[] {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, task_description: newText } : task
    );

    return updatedTasks;
}

// Save edited task
export function saveEditedTasks(tasks: TodoTask[]): void {
    saveTasks(tasks);
}

// Cancel edit - reload the last saved tasks
export function cancelEdit(): TodoTask[] {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  }