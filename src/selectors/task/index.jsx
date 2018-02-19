import get from 'lodash/get'
import { createSelector } from 'reselect'

const dataBrowseState = state => state.task.browse.data
const metaBrowseState = state => state.task.browse.meta

export const getBrowseData = createSelector(
  dataBrowseState,
  items => items,
)

export const getBrowseTotal = createSelector(
  metaBrowseState,
  items => items.total,
)

export const getBrowsePerPage = createSelector(
  metaBrowseState,
  items => items.perPage,
)

export const getBrowseCurrentPage = createSelector(
  metaBrowseState,
  items => items.currentPage,
)

export const getBrowseIsLoading = createSelector(
  metaBrowseState,
  items => items.isLoading,
)

const dataEditState = state => state.task.edit.data
const metaEditState = state => state.task.edit.meta

export const getEditData = createSelector(
  dataEditState,
  items => ({
    ...items,
    city: {
      label: get(items, 'shop.city.title', ''),
      value: get(items, 'shop.city.id', ''),
    },
    shop: {
      label: get(items, 'shop.title', ''),
      value: get(items, 'shop.id', ''),
    },
    verification_types: get(items, 'verification_types', []).map(item => ({ label: item.title, value: item.id })),
    verification_types_selected: get(items, 'verification_types', []).map(item => (item.id)),
  }),
)

export const getEditTaskId = createSelector(
  metaEditState,
  items => items.taskId,
)
