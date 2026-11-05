import React from 'react';
import {
  HardHat,
  Compass,
  Layers,
  Building2,
  ShieldCheck,
  KeyRound,
  Wrench,
  MapPin,
} from 'lucide-react';

const ICON_MAP = {
  HardHat,
  Compass,
  Layers,
  Building2,
  ShieldCheck,
  KeyRound,
  Wrench,
  MapPin,
};

export default function ServiceIcon({ name, className = 'w-6 h-6' }) {
  const IconComponent = ICON_MAP[name] || Building2;
  return <IconComponent className={className} aria-hidden="true" />;
}

