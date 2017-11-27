import initialState from './initialState.json';

export default function analyticsReducer(state = initialState.app, action) {
  switch (action.type) {
    case 'APP_SET_NAME':
      return { ...state, name: 'Test Organization' };
    default:
      return state;
  }
}
