import React from 'react';
import { render, screen } from '@testing-library/react';
import CoinsTable from './CoinsTable';

describe('MyComponent', () => {
  test('renders the component', () => {
    render(<CoinsTable />);
    const element = screen.getByText('Hello, world!');
    expect(element).toBeInTheDocument();
  });
});
