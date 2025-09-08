#!/bin/bash

# Integrate all library branches into main
# DANGER: This merges all AI branches into main - be careful!

set -e  # Exit on error

echo "🔄 Integrating library branches into main..."
echo "⚠️  WARNING: This will merge all ai/* branches into main"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# All library branches
BRANCHES=(
    "ai/components"
    "ai/engine"
    "ai/foundry"
    "ai/maths"
    "ai/mesh"
    "ai/parser"
    "ai/prover"
    "ai/scribe"
    "ai/toolkit"
)

# Function to check if branch exists
branch_exists() {
    git show-ref --quiet --verify "refs/heads/$1"
}

# Ensure we're on main branch
echo -e "${YELLOW}Switching to main branch...${NC}"
git checkout main

# Pull latest main
echo -e "${YELLOW}Pulling latest main...${NC}"
git pull origin main

# Count of successful merges
SUCCESS_COUNT=0
SKIP_COUNT=0
FAIL_COUNT=0

echo ""
echo -e "${BLUE}Starting integration of ${#BRANCHES[@]} branches...${NC}"
echo ""

for branch in "${BRANCHES[@]}"; do
    echo -e "${YELLOW}Processing $branch...${NC}"
    
    if branch_exists "$branch"; then
        # Check if branch has any changes not in main
        COMMITS_AHEAD=$(git rev-list --count main..$branch 2>/dev/null || echo "0")
        
        if [ "$COMMITS_AHEAD" -eq "0" ]; then
            echo -e "${BLUE}  ↳ No new commits to merge${NC}"
            ((SKIP_COUNT++))
        else
            echo -e "${BLUE}  ↳ Found $COMMITS_AHEAD new commits${NC}"
            
            # Attempt merge
            if git merge "$branch" --no-ff -m "feat: integrate $branch changes" --no-edit; then
                echo -e "${GREEN}  ✅ Successfully merged $branch${NC}"
                ((SUCCESS_COUNT++))
            else
                echo -e "${RED}  ❌ Merge conflict in $branch${NC}"
                echo -e "${RED}     Aborting merge...${NC}"
                git merge --abort
                ((FAIL_COUNT++))
            fi
        fi
    else
        echo -e "${YELLOW}  ⚠️  Branch $branch does not exist locally${NC}"
        ((SKIP_COUNT++))
    fi
    
    echo ""
done

# Summary
echo -e "${BLUE}═══════════════════════════════════${NC}"
echo -e "${BLUE}Integration Summary:${NC}"
echo -e "${GREEN}  ✅ Successful merges: $SUCCESS_COUNT${NC}"
echo -e "${YELLOW}  ⏭️  Skipped (no changes or missing): $SKIP_COUNT${NC}"
echo -e "${RED}  ❌ Failed merges: $FAIL_COUNT${NC}"
echo -e "${BLUE}═══════════════════════════════════${NC}"

if [ $FAIL_COUNT -gt 0 ]; then
    echo ""
    echo -e "${RED}⚠️  Some merges failed due to conflicts${NC}"
    echo -e "${YELLOW}   Please resolve conflicts manually for those branches${NC}"
fi

if [ $SUCCESS_COUNT -gt 0 ]; then
    echo ""
    echo -e "${GREEN}Recent commits:${NC}"
    git log --oneline -10
    echo ""
    echo -e "${YELLOW}Don't forget to:${NC}"
    echo "  1. Run tests: deno task test"
    echo "  2. Push to origin: git push origin main"
fi