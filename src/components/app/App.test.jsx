import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useRecord function', () => {
  it('changes background color', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('color input');
    fireEvent.change(colorInput, {
      target: {
        value: '#00FF00'
      }
    });
    const div = await screen.getByTestId('colorDiv');
    expect(div).toHaveStyle({
      backgroundColor: '#00FF00'
    });
  });
  
});
