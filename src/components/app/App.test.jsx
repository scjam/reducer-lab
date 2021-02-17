import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

describe('colorpicker change, undo, redo, and record', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes background color', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('color input');
    const div = await screen.getByTestId('colorDiv');
    fireEvent.change(colorInput, {
      target: {
        value: '#00FF00'
      }
    });
    expect(div).toHaveStyle({
      backgroundColor: '#00FF00'
    });
  });

  it('should undo previous color change', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('color input');
    const undo = screen.getByTestId('undo');
    fireEvent.change(colorInput, {
      target: {
        value: '#0000FF'
      }
    });
    fireEvent.click(undo);
    const div = await screen.findByTestId('colorDiv');
    expect(div).toHaveStyle({
      backgroundColor: '#000000'
    });
  });

  it('should redo the previous color change', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('color input');
    const undo = screen.getByTestId('undo');
    const redo = screen.getByTestId('redo');
    fireEvent.change(colorInput, {
      target: {
        value: '#0000FF'
      }
    });
    fireEvent.click(undo);
    fireEvent.click(redo);
    const div = await screen.getByTestId('colorDiv');
    expect(div).toHaveStyle({
      backgroundColor: '#0000FF'
    });    
  });
  
  
});
