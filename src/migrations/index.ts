import * as migration_20260712_134614_initial from './20260712_134614_initial';
import * as migration_20260712_134700_seed from './20260712_134700_seed';
import * as migration_20260721_094259_live_preview_autosave from './20260721_094259_live_preview_autosave';

export const migrations = [
  {
    up: migration_20260712_134614_initial.up,
    down: migration_20260712_134614_initial.down,
    name: '20260712_134614_initial',
  },
  {
    up: migration_20260712_134700_seed.up,
    down: migration_20260712_134700_seed.down,
    name: '20260712_134700_seed',
  },
  {
    up: migration_20260721_094259_live_preview_autosave.up,
    down: migration_20260721_094259_live_preview_autosave.down,
    name: '20260721_094259_live_preview_autosave'
  },
];
