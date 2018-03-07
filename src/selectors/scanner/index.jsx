import { createSelector } from 'reselect'

const dataState = state => state.scanner

export const getReadData = createSelector(
  dataState,
  items => items,
)

export default {}
