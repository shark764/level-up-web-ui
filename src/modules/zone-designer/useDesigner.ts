/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useReducer } from 'react';

type DesignerState = {
  columns: number;
  rows: number;
};

const initialDesignerState: DesignerState = {
  columns: 8,
  rows: 8
};

enum ActionType {
  setColumns = 'SET_COLUMNS',
  setRows = 'SET_ROWS'
}

type Action = {
  type: ActionType;
  payload: number | string;
};

const setRowsAction = (rows: number): Action => ({
  type: ActionType.setRows,
  payload: rows
});

const setColumnsAction = (columns: number): Action => ({
  type: ActionType.setColumns,
  payload: columns
});

const designerReducer = (
  state: DesignerState,
  action: Action
): DesignerState => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.setRows:
      return { ...state, rows: payload as number };

    case ActionType.setColumns:
      return { ...state, columns: payload as number };
    default:
      return state;
  }
};

export const useDesigner = (initialState?: DesignerState) => {
  const [state, dispatch] = useReducer(
    designerReducer,
    initialState || initialDesignerState
  );

  return {
    state,
    setRows: (rows: number) => {
      dispatch(setRowsAction(rows));
    },
    setColumns: (columns: number) => {
      dispatch(setColumnsAction(columns));
    }
  };
};
