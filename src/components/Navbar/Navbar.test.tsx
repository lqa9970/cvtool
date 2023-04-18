import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('h1', () => {
  it('has been defined', () => {
    render(<Navbar />);
    expect(screen.getByText(/Navbar/)).toBeDefined();
  });
});
