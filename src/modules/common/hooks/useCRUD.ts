import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface StateItem {
  id: string;
  [key: string]: unknown;
}

export const useCRUD = (initialData: StateItem[], key: string) => {
  const [state, setState] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : initialData;
  });

  useDeepCompareEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return {
    state,
    add: (item: StateItem) => {
      setState([...state, item]);
    },
    update: (item: StateItem, itemId: string) => {
      setState(state.map((i: StateItem) => (i.id === itemId ? item : i)));
    },
    delete: (itemId: string) => {
      setState(state.filter((item: StateItem) => item.id !== itemId));
    }
  };
};
