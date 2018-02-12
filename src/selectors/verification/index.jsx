import { createSelector } from 'reselect'

const dataState = state => state.verification.data
const metaState = state => state.verification.meta

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
