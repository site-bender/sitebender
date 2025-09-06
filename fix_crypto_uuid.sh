#!/bin/bash

# Fix remaining crypto.randomUUID() calls in test files
# Add import and replace calls systematically

# Files to fix
files=(
    "/Users/guy/Workspace/@sitebender/engine-ai/libraries/engine/tests/behaviors/runtime/policies_fallback/evaluate_policy_as_comparator.test.ts"
    "/Users/guy/Workspace/@sitebender/engine-ai/libraries/engine/tests/behaviors/operators/ternary/index.test.ts"
    "/Users/guy/Workspace/@sitebender/engine-ai/libraries/engine/tests/behaviors/operations/registries/smoke/index.test.ts"
    "/Users/guy/Workspace/@sitebender/engine-ai/libraries/engine/src/rendering/irToHtml/index.test.ts"
    "/Users/guy/Workspace/@sitebender/engine-ai/libraries/engine/src/rendering/irToHtml/conditional.test.ts"
)

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Processing $file..."

        # Add the import if it doesn't exist
        if ! grep -q "createDeterministicIdGenerator" "$file"; then
            # Find the last import line and add our import after it
            sed -i '' '/^import.*from.*$/a\
import createDeterministicIdGenerator from "../../../../src/utilities/nodeId/index.ts"
' "$file"
        fi

        # Replace crypto.randomUUID() with nodeId() calls
        # First add nodeId generator if not present
        if ! grep -q "const nodeId = createDeterministicIdGenerator" "$file"; then
            # Add after imports but before first function/test
            sed -i '' '/^import.*$/,$!b;/^import.*$/a\
\
const nodeId = createDeterministicIdGenerator("'$(basename "$file" .test.ts)'-test")
' "$file"
        fi

        # Replace the calls
        sed -i '' 's/crypto\.randomUUID()/nodeId()/g' "$file"

        echo "Fixed $file"
    else
        echo "File not found: $file"
    fi
done

echo "Done fixing crypto.randomUUID() calls"
