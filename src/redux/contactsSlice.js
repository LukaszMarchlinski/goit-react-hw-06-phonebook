import localStore from '../utils/localStore';

const { createSlice } = require('@reduxjs/toolkit');

const contactsInitialState = () => {
  if (localStore.load('contacts')) {
    return localStore.load('contacts');
  }
  return [];
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
        localStore.save('contacts', state);
      },
      prepare({ id, name, number }) {
        return {
          payload: {
            id,
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
