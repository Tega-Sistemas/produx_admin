import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from './index';

test('renders LoadingIndicator component', () => {
  render(<LoadingIndicator />);
  expect(screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'h3' && /carregando/i.test(content);
  })).toBeInTheDocument();
});