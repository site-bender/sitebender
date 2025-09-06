#!/bin/bash
# Integrate all library branches into main

echo "🔄 Integrating library branches..."

BRANCHES=("ai/toolkit" "ai/engine" "ai/components")

git checkout main

for branch in "${BRANCHES[@]}"; do
    echo "Merging $branch..."
    git merge $branch --no-ff -m "feat: integrate $branch changes"
done

echo "✅ Integration complete!"
git log --oneline -5
