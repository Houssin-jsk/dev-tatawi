import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders landing page when no user is stored', () => {
    // Clear localStorage before test
    localStorage.clear();
    
    render(<App />);
    
    expect(screen.getByText(/dev & tatawi/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Learning/i)).toBeInTheDocument();
  });
});