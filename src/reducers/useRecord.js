export const initialState = {
  before: [],
  current: '#000000',
  after: []
};

export default function useColor(state, action) {
  switch(action.type) {
    case 'UNDO':
      return { 
        after: [state.current, ...state.after],
        current: state.before[state.before.length - 1],
        before: state.before.slice(0, -1)
      };

    case 'REDO':
      return { 
        before: [...state.before, state.current],
        current: state.after[0],
        after: state.after.slice(1)
      };
    
    case 'RECORD':
      return {
        ...state,
        before: [...state.before, state.current],
        current: action.payload,
      };

    default:
      return state;
  }
}
