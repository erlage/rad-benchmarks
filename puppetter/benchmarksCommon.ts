import { FrameworkData, config } from "./common";

export enum BenchmarkType {
  CPU,
  MEM,
  STARTUP_MAIN,
  STARTUP,
}

export enum DurationMeasurementMode {
  FIRST_PAINT_AFTER_LAYOUT,
  LAST_PAINT
}

export interface BenchmarkInfo {
  id: string;
  label: string;
  description: string;
  type: BenchmarkType;
}

export interface CPUBenchmarkInfo extends BenchmarkInfo {
  throttleCPU?: number;
  allowBatching: boolean;
  durationMeasurementMode: DurationMeasurementMode;
  type: BenchmarkType.CPU;
}

export interface MemBenchmarkInfo extends BenchmarkInfo {
  type: BenchmarkType.MEM;
}

export interface StartupMainBenchmarkInfo extends BenchmarkInfo {
  type: BenchmarkType.STARTUP_MAIN;
}

export interface StartupBenchmarkInfo extends BenchmarkInfo {
  type: BenchmarkType.STARTUP;
  property: string;
  fn: (x:number) => number;
}

export interface BenchmarkImpl {
  benchmarkInfo: BenchmarkInfo;
  type: BenchmarkType;
}

export function fileName(framework: FrameworkData, benchmark: BenchmarkInfo) {
  return `${framework.fullNameWithKeyedAndVersion}_${benchmark.id}.json`;
}

export const BENCHMARK_01 = "01_run1k";
export const BENCHMARK_02 = "02_replace1k";
export const BENCHMARK_03 = "03_update10th1k_x16";
export const BENCHMARK_04 = "04_select1k";
export const BENCHMARK_05 = "05_swap1k";
export const BENCHMARK_06 = "06_remove-one-1k";
export const BENCHMARK_07 = "07_create10k";
export const BENCHMARK_08 = "08_create1k-after1k_x2";
export const BENCHMARK_09 = "09_create1k-before1k_x2";
export const BENCHMARK_10 = "19_clear1k_x8";

export const BENCHMARK_11 = "10_move_row_to_top";
export const BENCHMARK_12 = "11_move_row_to_bottom";
export const BENCHMARK_13 = "12_add_row_to_bottom";
export const BENCHMARK_14 = "13_add_row_to_bottom";

export const BENCHMARK_15 = "14_add_100_rows_to_top";
export const BENCHMARK_16 = "15_add_100_rows_to_bottom";

export const BENCHMARK_21 = "21_ready-memory";
export const BENCHMARK_22 = "22_run-memory";
export const BENCHMARK_23 = "23_update5-memory";
export const BENCHMARK_24 = "24_run5-memory";
export const BENCHMARK_25 = "25_run-clear-memory";


export const BENCHMARK_30 = "30_startup";

export type TBenchmarkID =
  | typeof BENCHMARK_01
  | typeof BENCHMARK_02
  | typeof BENCHMARK_03
  | typeof BENCHMARK_04
  | typeof BENCHMARK_05
  | typeof BENCHMARK_06
  | typeof BENCHMARK_07
  | typeof BENCHMARK_08
  | typeof BENCHMARK_09
  | typeof BENCHMARK_10
  | typeof BENCHMARK_11
  | typeof BENCHMARK_12
  | typeof BENCHMARK_13
  | typeof BENCHMARK_14
  | typeof BENCHMARK_15
  | typeof BENCHMARK_16
  | typeof BENCHMARK_30;

type ISlowDowns = {
  [key in TBenchmarkID]?: number;
};

const slowDownsOSX: ISlowDowns = {
  [BENCHMARK_03]: 8,
  [BENCHMARK_04]: 8,
  [BENCHMARK_05]: 4,
  [BENCHMARK_08]: 2,
  [BENCHMARK_09]: 2,
  [BENCHMARK_10]: 4,
};

const slowDownsLinux: ISlowDowns = {
  [BENCHMARK_03]: 16,
  [BENCHMARK_04]: 16,
  [BENCHMARK_05]: 4,
  [BENCHMARK_08]: 2,
  [BENCHMARK_09]: 2,
  [BENCHMARK_10]: 8,
};

const slowDowns: ISlowDowns = process.platform == "darwin" ? slowDownsOSX : slowDownsLinux;

export function slowDownNote(benchmark: TBenchmarkID): string {
  return slowDowns[benchmark] ? " " + slowDowns[benchmark] + "x CPU slowdown." : "";
}

export function slowDownFactor(benchmark: TBenchmarkID): number | undefined {
  return slowDowns[benchmark] ? slowDowns[benchmark] : undefined;
}

export const cpuBenchmarkInfosArray: Array<CPUBenchmarkInfo> = [
  {id: BENCHMARK_01,
  label: "create rows",
  description: "creating 1,000 rows" + slowDownNote(BENCHMARK_01),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_01),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.FIRST_PAINT_AFTER_LAYOUT
},
{
  id: BENCHMARK_02,
  label: "replace all rows",
  description: "updating all 1,000 rows (" + config.WARMUP_COUNT +
              " warmup runs)." + slowDownNote(BENCHMARK_02),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_02),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_03,
  label: "partial update",
  description: "updating every 10th row for 1,000 rows (3 warmup runs)." +
              slowDownNote(BENCHMARK_03),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_03),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_04,
  label: "select row",
  description: "highlighting a selected row. (no warmup runs)." +
              slowDownNote(BENCHMARK_04),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_04),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_05,
  label: "swap rows",
  description: "swap 2 rows for table with 1,000 rows. (" +
                config.WARMUP_COUNT +" warmup runs)." +
                slowDownNote(BENCHMARK_05),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_05),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_06,
  label: "remove row",
  description: "removing one row. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_06),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_06),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_07,
    label: "create many rows" + slowDownNote(BENCHMARK_07),
    description: "creating 10,000 rows" + slowDownNote(BENCHMARK_07),
    type: BenchmarkType.CPU,
    throttleCPU: slowDownFactor(BENCHMARK_07),
    allowBatching: true,
    durationMeasurementMode: DurationMeasurementMode.FIRST_PAINT_AFTER_LAYOUT
  },
{
  id: BENCHMARK_08,
  label: "append rows to large table",
  description: "appending 1,000 to a table of 1,000 rows." + slowDownNote(BENCHMARK_08),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_08),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_09,
  label: "prepend rows to large table",
  description: "prepending 1,000 to a table of 1,000 rows." + slowDownNote(BENCHMARK_09),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_09),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_10,
  label: "clear rows",
  description: "clearing a table with 1,000 rows." + slowDownNote(BENCHMARK_10),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_10),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_11,
  label: "move single row to top",
  description: "moving one row. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_11),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_11),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_12,
  label: "move single row to bottom",
  description: "moving one row. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_12),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_12),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_13,
  label: "add single row to top",
  description: "adding one row. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_13),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_13),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_14,
  label: "add single row to bottom",
  description: "adding one row. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_14),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_14),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_15,
  label: "add 100 rows to top",
  description: "adding 100 rows. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_15),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_15),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
{
  id: BENCHMARK_16,
  label: "add 100 rows to bottom",
  description: "adding 100 rows. (" +config.WARMUP_COUNT +" warmup runs)." +
              slowDownNote(BENCHMARK_16),
  type: BenchmarkType.CPU,
  throttleCPU: slowDownFactor(BENCHMARK_16),
  allowBatching: true,
  durationMeasurementMode: DurationMeasurementMode.LAST_PAINT
},
];

export const memBenchmarkInfosArray: Array<MemBenchmarkInfo> = [
{
  id: BENCHMARK_21,
  label: "ready memory",
  description: "Memory usage after page load.",
  type: BenchmarkType.MEM,
},
{
  id: BENCHMARK_22,
  label: "run memory",
  description: "Memory usage after adding 1000 rows.",
  type: BenchmarkType.MEM,
},
{
  id: BENCHMARK_23,
  label: "update every 10th row for 1k rows (5 cycles)",
  description: "Memory usage after clicking update every 10th row 5 times",
  type: BenchmarkType.MEM,
},
{
  id: BENCHMARK_24,
  label: "replace 1k rows (5 cycles)",
  description: "Memory usage after clicking create 1000 rows 5 times",
  type: BenchmarkType.MEM,
},
{
  id: BENCHMARK_25,
  label: "creating/clearing 1k rows (5 cycles)",
  description: "Memory usage after creating and clearing 1000 rows 5 times",
  type: BenchmarkType.MEM,
},
];

export const startupBenchmarkInfosArray: Array<StartupMainBenchmarkInfo> = [
{
  id: BENCHMARK_30,
  type: BenchmarkType.STARTUP_MAIN,
  label: '',
  description: '',
},
];

export const cpuBenchmarkInfos: {[idx:string]: CPUBenchmarkInfo} = {};
for (let bi of cpuBenchmarkInfosArray) {
  cpuBenchmarkInfos[bi.id] = bi;
}

export const memBenchmarkInfos: {[idx:string]: MemBenchmarkInfo} = {};
for (let bi of memBenchmarkInfosArray) {
  memBenchmarkInfos[bi.id] = bi;
}

export const startupBenchmarkInfos: {[idx:string]: StartupMainBenchmarkInfo} = {};
for (let bi of startupBenchmarkInfosArray) {
  startupBenchmarkInfos[bi.id] = bi;
}

export const benchmarkInfos = [...cpuBenchmarkInfosArray, ...memBenchmarkInfosArray, ...startupBenchmarkInfosArray];