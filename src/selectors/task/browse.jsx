import { createSelector } from 'reselect'

const dataState = state => state.tasks.data
const metaState = state => state.tasks.meta

export const data = createSelector(
  dataState,
  items => items,
)

export const total = createSelector(
  metaState,
  items => items.total,
)

export const perPage = createSelector(
  metaState,
  items => items.perPage,
)

export const currentPage = createSelector(
  metaState,
  items => items.currentPage,
)

export const isLoading = createSelector(
  metaState,
  items => items.isLoading,
)
