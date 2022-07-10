## Rad - Benchmarks
Extended version of widely accepted [js-framework-bench](https://github.com/krausest/js-framework-benchmark/) for benchmarking [Rad](https://github.com/erlage/rad/). Although js-framework-bench is great in its original form but it doesn't bench some cases such as adding or moving rows around etc. This repo includes scripts that extend js-framework-bench by including aforementioned cases and helps getting deep insights into the performance of Rad.

## Results

You can check out latest published results at https://erlage.github.io.

**Note**: We're not here to claim that Rad is faster than 'this' or 'that'. The primary purpose of benchmarks is to discover bottlenecks that might accidently get introduced during development. Benchmarking Angular & React-JS alongside helps gaining an independent perspective about how well Rad is performing compares to JS frameworks. 

## Benchmarks

- **Keyed**: when widgets/nodes have keys.
- **Non-Keyed**: when widgets/nodes don't have keys.

## Running benchmarks

- If running for the first time,
    - Build driver: 
        ```
        sh build_driver.sh
        ```
    - Build frameworks:
        ```
        sh build_frameworks.sh
        ```

1. Start server in a separate shell:
    ```
    sh spin_server.sh
    ```

2. Run benchmarks:
    ```
    # benchmark keyed versions of Rad, React & Angular
    sh bench_keyed.sh 

    # benchmark non-keyed versions of Rad & React
    sh bench_non_keyed.sh 
    ```

3. After running, build results table:
    ```
    sh build_results.sh
    ```
    Visit: http://localhost:8080/webdriver-ts-results/table.html on your machine to view results.

## Credits

[Stefan Krause](https://github.com/krausest/) for creating [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)