import { createSelector } from 'reselect'

const dataState = state => state.tasks.data
const totalState = state => state.tasks.meta.total
const pageSizeState = state => state.tasks.meta.pageSize
const currentPageState = state => state.tasks.meta.currentPage
const isLoadingState = state => state.tasks.meta.isLoading

export const data = createSelector(
  dataState,
  items => items,
)

export const total = createSelector(
  totalState,
  items => items,
)

export const pageSize = createSelector(
  pageSizeState,
  items => items,
)

export const currentPage = createSelector(
  currentPageState,
  items => items,
)

export const isLoading = createSelector(
  isLoadingState,
  items => items,
)
