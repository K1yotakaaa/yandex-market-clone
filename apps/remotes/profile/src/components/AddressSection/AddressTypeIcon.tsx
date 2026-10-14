import type { AddressType } from '../../types';
import { IconHome, IconPin, IconWork } from '../ui/icons';

export function AddressTypeIcon({ type, size = 20 }: { type: AddressType; size?: number }) {
  if (type === 'home') return <IconHome size={size} />;
  if (type === 'work') return <IconWork size={size} />;
  return <IconPin size={size} />;
}
