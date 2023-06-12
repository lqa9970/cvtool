import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('h1', () => {
  it('has been defined', () => {
    render(<Navbar />);
    expect(screen.getByText(/Navbar/)).toBeDefined();
  });
});
