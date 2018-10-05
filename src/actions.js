/**
 * actions
 */

export const ADD_CONTACT = 'ADD_CONTACT';

/**
 * action creators
 */

export const addContact = (contactType, contactValue) => ({
  type: ADD_CONTACT,
  contact: {
    type: contactType,
    value: contactValue,
  }
});