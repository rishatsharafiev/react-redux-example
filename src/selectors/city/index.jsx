import { createSelector } from 'reselect'

const dataState = state => state.city.data
const metaState = state => state.city.meta

export const getBrowseData = createSelector(
  dataState,
  items => items.map(item => ({
    label: item.title,
    value: item.id,
  })),
)

export const getBrowseIsLoading = createSelector(
  metaState,
  items => items.isLoading,
)
