import {
  ADD_STACK,
  AddStackAction,
  TOOGLE_DOCS,
  ToggleDocsAction,
  CHANGE_WIDTH_DOCS,
  ChangeWidthDocsAction,
  CHANGE_KEY_MOVE,
  ChangeKeyMoveAction,
} from '../actions/graphiql-docs'
import { columnWidth } from '../constants'

type GraphiqlDocsAction =
  | AddStackAction
  | ToggleDocsAction
  | ChangeWidthDocsAction
  | ChangeKeyMoveAction

export interface DocsState {
  readonly navStack: any[]
  readonly docsOpen: boolean
  readonly docsWidth: number
  readonly keyMove: boolean
}

const defaultState: DocsState = {
  navStack: [],
  docsOpen: false,
  docsWidth: columnWidth,
  keyMove: false,
}

export default function graphiqlDocsReducer(
  state: DocsState = defaultState,
  action: GraphiqlDocsAction,
) {
  switch (action.type) {
    case ADD_STACK:
      const { field, x, y } = action
      let newNavStack = state.navStack
      if (!field.path) {
        field.path = field.name
      }
      // Reset the list to the level clicked
      if (x < newNavStack.length) {
        newNavStack = newNavStack.slice(0, x)
      }
      return {
        ...state,
        navStack: [
          ...newNavStack,
          {
            x,
            y,
            field,
          },
        ],
      }

    case TOOGLE_DOCS:
      const { open } = action
      if (open !== undefined) {
        return {
          ...state,
          docsOpen: open,
        }
      }
      return {
        ...state,
        docsOpen: !state.docsOpen,
      }

    case CHANGE_WIDTH_DOCS:
      const { width } = action
      return {
        ...state,
        docsWidth: width,
      }

    case CHANGE_KEY_MOVE:
      const { move } = action
      return {
        ...state,
        keyMove: move,
      }
  }
  return state
}
