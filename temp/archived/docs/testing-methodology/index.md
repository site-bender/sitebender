# Testing Methodology

Our testing approach emphasizes behavioral testing that validates outcomes rather than implementation details, ensuring robust and maintainable test coverage.

## Core Principles

### Behavior-Driven Testing
- **Test Outcomes**: Focus on what the system produces, not how it produces it
- **Real Integration**: Tests use actual file system, real imports, and genuine build processes
- **User Perspective**: Tests validate functionality from the user's point of view
- **Black Box Approach**: Tests don't depend on internal implementation details

### Test Organization
- **Folder Structure**: Tests organized by behavior, not by source code structure
- **Descriptive Names**: Test folders describe the behavior being validated
- **Isolated Scenarios**: Each test folder contains a complete test scenario
- **Clear Intent**: Test names immediately communicate what's being verified

## Test Categories

### Build System Tests (`tests/build/`)

#### File Structure Validation (`createsCorrectFileStructure/`)
- **Purpose**: Verifies build output has correct directory structure and files
- **Validates**: HTML files, CSS organization, JavaScript compilation, static assets
- **Approach**: Runs actual build and checks resulting file system
- **Coverage**: All major build pipeline outputs

#### Asset Injection Tests (`includesCorrectAssetTags/`)
- **Purpose**: Ensures HTML pages have correct `<link>` and `<script>` tags
- **Validates**: Asset discovery, dependency resolution, tag injection
- **Approach**: Builds pages and parses HTML to verify asset references
- **Coverage**: Component CSS, JavaScript assets, asset deduplication

#### Error Handling Tests (`handlesErrorConditions/`)
- **Purpose**: Verifies graceful handling of various error conditions
- **Validates**: Missing files, malformed components, permission issues
- **Approach**: Introduces specific error conditions and validates responses
- **Coverage**: All major error scenarios and recovery procedures

### Development Server Tests (`tests/devServer/`)

#### File Serving Tests (`servesFilesCorrectly/`)
- **Purpose**: Validates development server correctly serves static files
- **Validates**: File serving, MIME types, 404 handling, routing
- **Approach**: Starts server and makes HTTP requests to verify responses
- **Coverage**: All file types, error conditions, and server features

#### File Watching Tests (`watchesFileChanges/`)
- **Purpose**: Ensures file changes trigger automatic rebuilds
- **Validates**: File watching, rebuild triggering, change detection
- **Approach**: Modifies files and verifies resulting build updates
- **Coverage**: All watched file types and change scenarios

### Script Feature Tests

#### Clean Operation Tests (`tests/clean/`)
- **Purpose**: Validates build artifact cleanup functionality
- **Validates**: Directory removal, error handling, idempotency
- **Approach**: Creates artifacts, runs clean, verifies removal

#### Setup Process Tests (`tests/setup/`)
- **Purpose**: Ensures development environment setup works correctly
- **Validates**: Git hooks, configuration, dependency setup
- **Approach**: Runs setup process and verifies resulting configuration

#### Import Sorting Tests (`tests/sortImports/`)
- **Purpose**: Validates automatic import organization functionality
- **Validates**: Import grouping, sorting, style enforcement
- **Approach**: Processes files with unsorted imports and verifies results

## Testing Tools & Infrastructure

### Test Execution
- **Runtime**: Deno's built-in test runner with appropriate permissions
- **Isolation**: Each test runs in isolation with proper cleanup
- **Concurrency**: Tests can run in parallel where appropriate
- **Reporting**: Clear output with detailed failure information

### Assertions
- **Standard Library**: Uses Deno's standard assertion library
- **File System**: Custom utilities for file existence and content validation
- **HTTP Testing**: Utilities for testing server responses and behavior
- **Process Testing**: Tools for validating subprocess execution

### Test Data Management
- **Temporary Files**: Tests create and clean up temporary files as needed
- **Real Scenarios**: Uses actual project structure and real file content
- **State Management**: Proper setup and teardown for each test scenario
- **Reproducibility**: Tests produce consistent results across environments

## Coverage Strategy

### Line Coverage
- **Target**: 95%+ line coverage for all script functionality
- **Measurement**: Covers actual execution of build and development scripts
- **Reporting**: HTML coverage reports show detailed line-by-line coverage
- **Exclusions**: Only excludes unreachable error handling paths

### Branch Coverage
- **Target**: 70%+ branch coverage for conditional logic
- **Focus**: All major decision points and error handling branches
- **Validation**: Ensures both success and failure paths are tested
- **Edge Cases**: Covers unusual but possible execution paths

### Behavioral Coverage
- **Completeness**: Every major script behavior has corresponding tests
- **Integration**: Tests cover interactions between different script components
- **End-to-End**: Full workflow testing from input to final output
- **Error Scenarios**: Comprehensive coverage of error conditions and recovery

## Test Execution

### Running Tests
```bash
# All tests
deno task test

# With coverage
deno task test:cov:report

# Specific feature tests
deno task test:build
deno task test:devServer
deno task test:clean
```

### Continuous Integration
- **Automated Execution**: All tests run automatically on commits and pull requests
- **Coverage Reporting**: Coverage results are tracked and reported
- **Quality Gates**: Tests must pass before code can be merged
- **Performance Monitoring**: Test execution time is monitored for regressions

## Test Development Guidelines

### Writing New Tests
1. **Identify Behavior**: Clearly define what behavior needs validation
2. **Create Test Folder**: Use descriptive folder name for the behavior
3. **Write Test Scenario**: Focus on outcomes and observable behavior
4. **Validate Coverage**: Ensure test covers all aspects of the behavior
5. **Test Error Cases**: Include both success and failure scenarios

### Test Maintenance
- **Keep Current**: Update tests when behaviors change
- **Refactor Safely**: Improve test code without changing test scenarios
- **Monitor Performance**: Ensure tests remain fast and reliable
- **Regular Review**: Periodically review test coverage and effectiveness

## Quality Assurance

### Test Quality
- **Reliability**: Tests produce consistent results
- **Clarity**: Test purpose and behavior is immediately apparent
- **Maintainability**: Tests are easy to understand and modify
- **Performance**: Tests run quickly to support frequent execution

### Coverage Quality
- **Meaningful**: Coverage metrics reflect actual testing value
- **Comprehensive**: All important behaviors are covered
- **Actionable**: Coverage reports help identify gaps
- **Realistic**: Coverage targets are achievable and maintained
