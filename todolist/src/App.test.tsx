import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('to-do list UI renders', () => {
  render(<App />);
  expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter a new task/i)).toBeInTheDocument();
});