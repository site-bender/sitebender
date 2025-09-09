#!/bin/bash

echo "🧪 Testing Scribe Do-Notation Conversions with Coverage"
echo "========================================================"
echo ""

# Run tests with coverage for the specific converted files
echo "📊 Running tests with coverage..."
deno test \
  --allow-read \
  --allow-write \
  --allow-env \
  --coverage=coverage \
  libraries/scribe/src/extractors/extractDescription/index.test.ts \
  libraries/scribe/src/detectors/detectComplexityFromAST/calculateCyclomaticComplexity/index.test.ts \
  libraries/scribe/src/generateDocsWithCompiler/index.test.ts

# Generate coverage report
echo ""
echo "📈 Generating coverage report..."
deno coverage coverage --lcov --output=coverage.lcov

# Show coverage summary for the specific files
echo ""
echo "📋 Coverage Summary for Converted Functions:"
echo "-------------------------------------------"
deno coverage coverage --include="extractDescription/index.ts" --include="calculateCyclomaticComplexity/index.ts" --include="generateDocsWithCompiler/index.ts"

# Clean up coverage directory
rm -rf coverage

echo ""
echo "✅ Test run complete!"
echo ""
echo "To run these tests again, use:"
echo "  ./test-scribe-conversions.sh"
echo ""
echo "To run with watch mode:"
echo "  deno test --watch --allow-read --allow-write --allow-env \\"
echo "    libraries/scribe/src/extractors/extractDescription/index.test.ts \\"
echo "    libraries/scribe/src/detectors/detectComplexityFromAST/calculateCyclomaticComplexity/index.test.ts \\"
echo "    libraries/scribe/src/generateDocsWithCompiler/index.test.ts"