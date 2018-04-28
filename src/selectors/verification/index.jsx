import { createSelector } from 'reselect'

const dataState = state => state.verification.data
const metaState = state => state.verification.meta

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

export const getDialogIsVisible = createSelector(
  metaState,
  items => items.isVisible,
)
