import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './ToDoList';

test('renders to-do list UI', () => {
    render(<TodoList />);
  
    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter a new task/i)).toBeInTheDocument();
});

//failed
test('able to delete a task', () => {
    render(<TodoList />);

    const newTaskInput = screen.getByPlaceholderText(/Enter a new task/i) as HTMLInputElement;
    const addButton = screen.getByLabelText(/Add Task/i);

    fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByLabelText(/Delete Task/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/New Task/i)).not.toBeInTheDocument();
});

//failed
test('able to edit a task', () => {
    render(<TodoList />);

    const newTaskInput = screen.getByPlaceholderText(/Enter a new task/i) as HTMLInputElement;
    const addButton = screen.getByLabelText(/Add Task/i);

    fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const editButton = screen.getByLabelText(/Edit Task/i);
    fireEvent.click(editButton);

    const editInput = screen.getByLabelText(/Edit Textbox/i);

    expect(editInput).toBeInTheDocument();

    fireEvent.change(editInput, { target: { value: 'Edited Task' } });

    const saveButton = screen.getByLabelText(/Save Edit/i);
    fireEvent.click(saveButton);

    expect(screen.queryByText(/New Task/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Edited Task/i)).toBeInTheDocument();

    const deleteButton = screen.getByLabelText(/Delete Task/i);
    fireEvent.click(deleteButton);
});

//failed
test('able to cancel edit', () => {
    render(<TodoList />);

    const newTaskInput = screen.getByPlaceholderText(/Enter a new task/i) as HTMLInputElement;
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const editButton = screen.getByLabelText(/Edit Task/i);
    fireEvent.click(editButton);

    const editInput = screen.getByLabelText(/Edit Textbox/i) as HTMLInputElement;
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });

    const cancelButton = screen.getByLabelText(/Cancel Edit/i);
    fireEvent.click(cancelButton);

    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
    expect(screen.queryByText(/Edited Task/i)).not.toBeInTheDocument();

    const deleteButton = screen.getByLabelText(/Delete Task/i);
    fireEvent.click(deleteButton);
});

//failed
test('able to add a new task', () => {
    render(<TodoList />);

    const newTaskInput = screen.getByPlaceholderText(/Enter a new task/i) as HTMLInputElement;
    const addButton = screen.getByLabelText(/Add Task/i);

    fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/New Task/i)).toBeInTheDocument();

    const deleteButton = screen.getByLabelText(/Delete Task/i);
    fireEvent.click(deleteButton);
});

// failed
test('able to toggle a task', () => {
    render(<TodoList />);

    const newTaskInput = screen.getByPlaceholderText(/Enter a new task/i) as HTMLInputElement;
    const addButton = screen.getByLabelText(/Add Task/i);

    fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByLabelText("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
});