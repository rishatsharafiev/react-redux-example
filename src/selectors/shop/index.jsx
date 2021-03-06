import { createSelector } from 'reselect'

const dataState = state => state.shop.data
const metaState = state => state.shop.meta

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
