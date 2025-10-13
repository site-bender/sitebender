# Statistics Functions

**Location**: `src/statistics/`
**Functions**: 13
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### variance

- **Current**: `(data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates sample variance: Σ(x - mean)² / (n-1); returns NaN for empty arrays or invalid input
- **Target**: `(data: Array<number>) => Result<StatisticsError, number>`

### standardDeviation (std)

- **Current**: `(data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates sample standard deviation: √variance; returns NaN for empty arrays or invalid input
- **Alias**: `std` re-exports this function
- **Target**: `(data: Array<number>) => Result<StatisticsError, number>`

### covariance (cov)

- **Current**: `(dataX: Array<number> | null | undefined) => (dataY: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates sample covariance between two datasets; requires equal lengths; returns NaN on invalid input or length mismatch
- **Alias**: `cov` re-exports this function
- **Target**: `(dataX: Array<number>) => (dataY: Array<number>) => Result<StatisticsError, number>`

### correlation (corr)

- **Current**: `(dataX: Array<number> | null | undefined) => (dataY: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates Pearson correlation coefficient: cov(X,Y) / (std(X) * std(Y)); returns value in [-1, 1]; returns NaN on invalid input
- **Alias**: `corr` re-exports this function
- **Target**: `(dataX: Array<number>) => (dataY: Array<number>) => Result<StatisticsError, number>`

### zScore

- **Current**: `(value: number | null | undefined) => (data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates z-score: (value - mean) / std; returns NaN on invalid input or zero standard deviation
- **Target**: `(value: number) => (data: Array<number>) => Result<StatisticsError, number>`

### percentile

- **Current**: `(p: number | null | undefined) => (data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates percentile value using linear interpolation; p should be in [0, 100]; returns NaN on invalid input or empty array
- **Target**: `(p: number) => (data: Array<number>) => Result<StatisticsError, number>`

### interquartileRange (iqr)

- **Current**: `(data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates IQR: Q3 - Q1 (75th percentile - 25th percentile); measures statistical dispersion; returns NaN on invalid input
- **Alias**: `iqr` re-exports this function
- **Target**: `(data: Array<number>) => Result<StatisticsError, number>`

### skewness

- **Current**: `(data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates sample skewness (third standardized moment); measures asymmetry of distribution; returns NaN on invalid input or insufficient data
- **Target**: `(data: Array<number>) => Result<StatisticsError, number>`

### kurtosis

- **Current**: `(data: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates excess kurtosis (fourth standardized moment - 3); measures tailedness of distribution; returns NaN on invalid input or insufficient data
- **Target**: `(data: Array<number>) => Result<StatisticsError, number>`

---

## Migration Notes

Statistics functions will be converted to Result-returning functions. The monadic versions will:

1. Return `ok(value)` when calculation succeeds
2. Return `error(StatisticsError)` for empty arrays, mismatched lengths, or invalid inputs
3. Maintain aliases (std, cov, corr, iqr)

## Notes

Missing functions to consider: mode, range, quartiles, MAD (median absolute deviation), confidence intervals, hypothesis tests.
