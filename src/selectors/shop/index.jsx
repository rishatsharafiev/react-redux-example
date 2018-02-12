import { createSelector } from 'reselect'

const dataState = state => state.shop.data
const metaState = state => state.shop.meta

export const data = createSelector(
  dataState,
  items => items.map(item => ({
    label: item.title,
    value: item.id,
  })),
)

export const isLoading = createSelector(
  metaState,
  items => items.isLoading,
)
