# INAV presets

INAV Configurator has no remote preset source, so these are plain CLI snippets you paste by hand. There is no index and no metadata header — the Betaflight indexer ignores this folder entirely.

Built from the newest dump per aircraft in Dropbox `/FPV/INAV`:

| Aircraft | Board | Firmware | Dump |
| --- | --- | --- | --- |
| DART 250G | MATEKF405TE_SD | INAV 9.0.0 | `INAV_9.0.0_cli_DART_250G_20260427_140534.txt` |
| PENGUIN | ATOMRCF405NAVI | INAV 8.0.1 | `INAV_8.0.1_cli_Pengiun_20260210_161607.txt` |

Both are fixed wing (`platform_type = AIRPLANE`), so everything here is fixed-wing only.

## How to apply

1. Back up first: CLI → `diff all` → save the output somewhere safe.
2. Open Configurator → CLI.
3. Paste one file at a time, in filename order (the numeric prefix is the order).
4. Type `save`. The board reboots.

Files are ordered because `30_rates_fixedwing.txt` selects `control_profile 1` before writing rates. Applying out of order can land rate values in the wrong profile.

| File | What it sets |
| --- | --- |
| `common/00_base.txt` | Features, beeper, gyro filtering, sensor selection, failsafe, GPS, airmode |
| `common/10_nav_fixedwing.txt` | RTH, waypoint safety distance, auto-launch |
| `common/20_osd_dji.txt` | DJI native OSD settings and element layout |
| `common/30_rates_fixedwing.txt` | Expo, roll rate, D-boost, D-term filter (control profile 1) |
| `common/40_blackbox.txt` | Blackbox field selection and rate denominator |
| `common/50_modes.txt` | The aux slots that are identical on both planes |

## Deliberately not included

These are per-board or per-airframe, and pasting them from another aircraft would be wrong or unsafe:

- Calibration: `gyro_zero_*`, `acczero_*`, `accgain_*`, `ins_gravity_cmss`
- Hardware and mounting: `acc_hardware`, `align_board_*`, `vbat_scale`, `current_meter_scale`
- Airframe: `serial`, `servo`, `smix`, `mmix`, `timer_output_mode`, `platform_type`, `model_preview_type`
- Battery: `bat_cells`, `battery_capacity`, `vbat_*_cell_voltage`
- Tune: `fw_p_*`, `fw_i_*`, `fw_d_*`, `fw_ff_*`, `nav_fw_pos_*`
- Identity: `name`, `vtx_*`

`motor_pwm_protocol` is also excluded on purpose — DART runs DSHOT300 and PENGUIN DSHOT600, and forcing the wrong one can spin a motor. Set it per aircraft.

Where a setting differs between the two planes, the relevant file lists both values in a trailing comment so you can pick one.
