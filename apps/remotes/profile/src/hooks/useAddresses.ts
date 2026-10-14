import { useCallback, useMemo, useReducer } from 'react';
import type { Address, AddressDraft } from '../types';
import { createAddressId } from '../utils/address';

type Action =
  | { type: 'add'; address: Address }
  | { type: 'update'; id: string; draft: AddressDraft }
  | { type: 'remove'; id: string }
  | { type: 'setDefault'; id: string };

function markDefault(list: Address[], id: string): Address[] {
  return list.map((item) => ({ ...item, isDefault: item.id === id }));
}

/** Guarantees exactly one default address whenever the list is non-empty. */
function ensureDefault(list: Address[]): Address[] {
  if (list.length === 0 || list.some((item) => item.isDefault)) return list;
  return markDefault(list, list[0].id);
}

function reducer(state: Address[], action: Action): Address[] {
  switch (action.type) {
    case 'add': {
      const next = [...state, action.address];
      return action.address.isDefault ? markDefault(next, action.address.id) : ensureDefault(next);
    }
    case 'update': {
      const next = state.map((item) =>
        item.id === action.id ? { ...action.draft, id: action.id } : item,
      );
      return action.draft.isDefault ? markDefault(next, action.id) : ensureDefault(next);
    }
    case 'remove':
      return ensureDefault(state.filter((item) => item.id !== action.id));
    case 'setDefault':
      return markDefault(state, action.id);
  }
}

/** In-memory address book. Resets on page reload by design (mock stage). */
export function useAddresses(initial: Address[]) {
  const [addresses, dispatch] = useReducer(reducer, initial, ensureDefault);

  // Default address first, the rest keep insertion order.
  const sorted = useMemo(
    () => [...addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)),
    [addresses],
  );

  const add = useCallback((draft: AddressDraft) => {
    dispatch({ type: 'add', address: { ...draft, id: createAddressId() } });
  }, []);
  const update = useCallback((id: string, draft: AddressDraft) => {
    dispatch({ type: 'update', id, draft });
  }, []);
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), []);
  const setDefault = useCallback((id: string) => dispatch({ type: 'setDefault', id }), []);

  return { addresses: sorted, add, update, remove, setDefault };
}
