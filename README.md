## Rad - Benchmarks

Extended version of widely accepted [js-framework-bench](https://github.com/krausest/js-framework-benchmark/) for benchmarking [Rad](https://github.com/erlage/rad/). Although js-framework-bench is great in its original form but it doesn't bench some cases such as adding or moving rows around etc. This repo includes scripts that extend js-framework-bench by including aforementioned cases and helps getting deep insights into the performance of Rad.

## Results

You can check out latest published results at http://erlage.github.io/rad/benchmark-results.

**Note**: We're not here to claim that Rad is faster than 'this' or 'that'. The primary purpose of benchmarks is to discover bottlenecks that might accidently get introduced during development. Benchmarking Angular & React-JS alongside helps gaining an independent perspective about how well Rad is performing compares to JS frameworks. 

## Running Benchmarks

If running for the first time, build driver using `sh build_driver.sh`.

> ❗ NOTE: Google Chrome will have to be installed for the benchmarks to run.

### 1. Benchmarking two versions of Rad

1. Make sure server is up:
    ```sh
    sh spin_server.sh
    ```

2. Add base and head version information in `run_compare.sh`.

3. Run `sh run_compare.sh`

Visit: http://localhost:8080/webdriver-ts-results/table.html on your machine to view results.

### 2. Benchmarking Rad against React & Angular


1. Make sure server is up:
    ```sh
    sh spin_server.sh
    ```

2. Build frameworks:
    ```sh
    sh build_frameworks.sh
    ```

2. Run benchmarks:
    ```sh
    # benchmark keyed versions of Rad, React & Angular
    sh run_keyed.sh 

    # benchmark non-keyed versions of Rad & React
    sh run_non_keyed.sh 
    ```

3. After running, build results table:
    ```sh
    sh build_results.sh
    ```
    Visit: http://localhost:8080/webdriver-ts-results/table.html on your machine to view results.

## Credits

[Stefan Krause](https://github.com/krausest/) for creating [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)