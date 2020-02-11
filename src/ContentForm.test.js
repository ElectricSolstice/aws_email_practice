import React from 'react';
import { render } from '@testing-library/react';
import ContentForm from './ContentForm';

test('renders learn react link', () => {
  const { getByText } = render(<ContentForm />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
