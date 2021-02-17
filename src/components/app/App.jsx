/* eslint-disable max-len */
import React, { useReducer } from 'react';
import useColor, { initialState } from '../../reducers/useRecord';

// const useRecord = (init) => {
//   const [before, setBefore] = useState([]);
//   const [current, setCurrent] = useState(init);
//   const [after, setAfter] = useState([]);

//   const undo = () => {
//     setAfter(after => [current, ...after]);
//     setCurrent(before[before.length - 1]);
//     setBefore(before => before.slice(0, -1));
//   };

//   const redo = () => {
//     setBefore(before => [...before, current]);
//     setCurrent(after[0]); 
//     setAfter(after => after.slice(1));
//   };

//   const record = val => {
//     setBefore(before => [...before, current]);
//     setCurrent(val);
//   };

//   return {
//     undo,
//     record,
//     redo,
//     current,
//   };
// };

function App() {
  // const { current, undo, redo, record } = useRecord('#FF0000');
  const [state, dispatch] = useReducer(useColor, initialState);

  const undo = () => {
    dispatch({ type: 'UNDO' });
  };

  const redo = () => {
    dispatch({ type: 'REDO' });
  };

  return (
    <>
      <button data-testid="undo" onClick={undo} disabled={!state.before.length} >undo</button>
      <button data-testid="redo" onClick={redo} disabled={!state.after.length}>redo</button>
      <label htmlFor="RECORD">color input</label>
      <input 
        id="RECORD" 
        type="color" 
        value={state.current} 
        onChange={({ target }) => dispatch({
          payload: target.value,
          type: target.id })} 
      />
      <div data-testid="colorDiv" style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
