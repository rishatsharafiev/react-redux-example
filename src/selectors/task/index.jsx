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

export const getEditFormData = createSelector(
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
    planned_at: get(items, 'planned_at.date', ''),
    verification_types: get(items, 'verification_types', []).map(item => ({ label: item.title, value: item.id })),
    verification_types_selected: get(items, 'verification_types', []).map(item => (item.id)),
    violation_types: get(items, 'violation_types', []).map(item => ({ label: item.title, value: item.id })),
    violation_types_selected: get(items, 'violation_types', []).map(item => (item.id)),
  }),
)

export const getEditInitialData = createSelector(
  dataEditState,
  items => ({
    city: get(items, 'shop.city.id', null),
    shop: get(items, 'shop.id', null),
    verification_types: get(items, 'verification_types', []).map(item => (item.id)),
    violation_types: get(items, 'violation_types', []).map(item => (item.id)),
    violation_comment: get(items, 'violation_comment', ''),
    planned_at: get(items, 'planned_at.date', null),
  }),
)

export const getEditTaskId = createSelector(
  metaEditState,
  items => items.taskId,
)

export const getEditStatus = createSelector(
  dataEditState,
  items => ({
    taskId: items.id,
    statusValue: items.status,
  }),
)
