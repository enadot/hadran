import * as migration_20260712_134614_initial from './20260712_134614_initial';
import * as migration_20260712_134700_seed from './20260712_134700_seed';

export const migrations = [
  {
    up: migration_20260712_134614_initial.up,
    down: migration_20260712_134614_initial.down,
    name: '20260712_134614_initial'
  },
  {
    up: migration_20260712_134700_seed.up,
    down: migration_20260712_134700_seed.down,
    name: '20260712_134700_seed'
  },
];
