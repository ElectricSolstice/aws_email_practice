import React from 'react';
import { render } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renders learn react link', () => {
  const { getByText } = render(<ContactForm />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
