import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  expect(getByPlaceholderText('Search for a movie')).toBeInTheDocument();
  expect(getByText('My top 9 films')).toBeInTheDocument();
});
