#!/bin/bash

# Script to run utilities tests with various options

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Running Utilities Tests${NC}"
echo "========================="

# Parse command line arguments
RUN_COVERAGE=false
RUN_WATCH=false
FILTER=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --coverage)
            RUN_COVERAGE=true
            shift
            ;;
        --watch)
            RUN_WATCH=true
            shift
            ;;
        --filter)
            FILTER="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --coverage    Run tests with coverage reporting"
            echo "  --watch       Run tests in watch mode"
            echo "  --filter STR  Filter tests by name"
            echo "  --help        Show this help message"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Build test command
TEST_CMD="deno test lib/architect/utilities/"
TEST_CMD="$TEST_CMD --allow-read --allow-net --allow-env --allow-write"
TEST_CMD="$TEST_CMD --no-check" # Skip type checking for now due to Temporal issues

if [ -n "$FILTER" ]; then
    TEST_CMD="$TEST_CMD --filter=\"$FILTER\""
fi

if [ "$RUN_WATCH" = true ]; then
    TEST_CMD="$TEST_CMD --watch"
fi

if [ "$RUN_COVERAGE" = true ]; then
    echo -e "${YELLOW}Running tests with coverage...${NC}"
    
    # Clean previous coverage
    rm -rf coverage coverage.lcov
    
    # Run tests with coverage
    eval "$TEST_CMD --coverage=coverage"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}Generating coverage report...${NC}"
        
        # Generate text report
        deno coverage coverage
        
        # Generate LCOV report for external tools
        deno coverage coverage --lcov > coverage.lcov
        
        # Generate HTML report if genhtml is available
        if command -v genhtml &> /dev/null; then
            echo -e "${YELLOW}Generating HTML coverage report...${NC}"
            genhtml coverage.lcov -o coverage-html
            echo -e "${GREEN}HTML coverage report generated in coverage-html/${NC}"
        fi
        
        echo ""
        echo -e "${GREEN}Coverage summary:${NC}"
        echo "=================="
        deno coverage coverage 2>/dev/null | grep -E "utilities/.*\.(ts|tsx)" | \
            awk '{
                if ($3 == "100.0") 
                    printf "\033[0;32m%-50s %s%%\033[0m\n", $1, $3
                else if ($3 >= 80) 
                    printf "\033[1;33m%-50s %s%%\033[0m\n", $1, $3
                else 
                    printf "\033[0;31m%-50s %s%%\033[0m\n", $1, $3
            }'
    else
        echo -e "${RED}Tests failed. Coverage report not generated.${NC}"
        exit 1
    fi
else
    # Just run tests
    echo -e "${YELLOW}Running tests...${NC}"
    eval "$TEST_CMD"
fi

echo ""
echo -e "${GREEN}Test run complete!${NC}"