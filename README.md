# fpv

Flight controller configuration for the KPU fleet, split by firmware.

| Folder | Firmware | How it is consumed |
| --- | --- | --- |
| [`betaflight/`](betaflight) | Betaflight | Remote preset source, applied from the App's Presets tab |
| [`inav/`](inav) | INAV | Plain CLI snippets, pasted by hand |

Both are built from the newest CLI dump per craft in Dropbox `/FPV/Betaflight` and `/FPV/INAV`. Hardware-specific values are deliberately left out — craft name, board, serial map, motor order, calibration, and PIDs stay per-aircraft.

`index.json` and `index_hash.txt` live at the repo root because the Betaflight App always fetches them from there. The presets they point at live under `betaflight/presets/`.

## Betaflight

Add this repo as a custom preset source:

1. Push the repo, including root `index.json` and `index_hash.txt`.
2. Open **Presets → Preset sources**.
3. Add a source:
   - URL: `https://github.com/kpucynski/fpv`
   - Branch: `main`
4. Search for `kpu` and apply in this order: **common → VTX → OSD → rates → modes**.
5. Save on the flight controller. Take a fresh `dump all` backup first.

### Presets (`betaflight/presets/2026.6`)

| File | Category | Source dumps |
| --- | --- | --- |
| `other/common.txt` | OTHER | Shared telemetry/OSD/DSHOT/battery/GPS options |
| `rates/kpu.txt` | RATES | Daily Actual 22/10/109 plus whoop, 5in, and cine options |
| `osd/analog.txt` | OSD | AIR75 II C analog MAX7456 |
| `osd/hdzero.txt` | OSD | Meteor65 Pro / Pavo / Oasis / Seeker / Master HD canvas |
| `osd/o4.txt` | OSD | Vapor D5 DJI canvas |
| `vtx/analog.txt` | VTX | AIR65 / AIR75 factory analog table |
| `vtx/hdzero.txt` | VTX | M6 F HD / Mach R5 U HDZero table |
| `modes/kpu.txt` | MODES | GPS freestyle AUX map, analog whoop option |

Craft covered: AIR75 II C, AIR75 C, AIR65 II C, AIR65 C, AIR65 F, AIR65 R, OASISFLY25, SEEKER35 DC, METEOR65 PRO, M6 F HD, MACH R5 U, MACH R5 ULTRA, VAPOR D5, PAVO FEMTO, MASTER 3X, T-CUBE18, PAVO20 PRO. HMB RS V2 was skipped (incomplete dump).

### Index

`index.json` and `index_hash.txt` are what the App reads to list presets, so they must match `betaflight/presets/`.

The `Presets` workflow keeps them in sync: pull requests only validate the presets, and a push to `main` rebuilds the index and commits it back if it changed. You can also trigger it manually from the Actions tab.

To rebuild locally, from the repo root:

```bash
npm run verify
npm run index
```

Run these from the root — the indexer writes `index.json` to the working directory, and the App needs it at the top level.

## INAV

See [`inav/README.md`](inav/README.md). INAV Configurator does not support remote preset sources, so those files are pasted into the CLI manually.
