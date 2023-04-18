import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchableSelect from './SearchableSelect';

const options = [
  { text: 'Finnish', value: 'finnish' },
  { text: 'Swedish', value: 'swedish' },
  { text: 'English', value: 'english' },
  { text: 'German', value: 'german' },
  { text: 'French', value: 'french' }
];

describe('Select', () => {
  test('is rendered', () => {
    render(<SearchableSelect options={options} placeholder="Search..." />);
    expect(screen.getByText('Search...')).exist;
    expect(screen.getByText('Finnish')).exist;
  });
});
