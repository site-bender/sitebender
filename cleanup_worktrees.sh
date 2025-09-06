#!/bin/bash

# Safely clean up worktrees without touching branches
# This preserves all your work while fixing the confusing worktree setup

echo "🧹 Cleaning up worktrees (branches will be preserved)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Show current worktree status
echo -e "${BLUE}Current worktree setup:${NC}"
git worktree list
echo ""

# Get the main worktree path (usually the current directory)
MAIN_WORKTREE=$(git rev-parse --show-toplevel)
BASE_DIR=$(dirname "$MAIN_WORKTREE")

# Show current branches for reference
echo -e "${BLUE}Current branches (these will be preserved):${NC}"
git branch
echo ""

# Ask for confirmation
echo -e "${YELLOW}This will remove the following worktrees:${NC}"
echo "  - /Users/guy/Workspace/@sitebender/components-ai"
echo "  - /Users/guy/Workspace/@sitebender/engine-ai"
echo "  - /Users/guy/Workspace/@sitebender/toolkit-ai"
echo ""
echo -e "${GREEN}Your branches will NOT be deleted. Only the worktree directories.${NC}"
echo ""
read -p "Continue with cleanup? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Cleanup cancelled${NC}"
    exit 1
fi

# First, ensure we're in the main repository
cd "$MAIN_WORKTREE"

# Remove worktrees one by one
echo -e "${YELLOW}Removing worktrees...${NC}"

# Remove components-ai worktree
if git worktree list | grep -q "components-ai"; then
    echo "Removing components-ai worktree..."
    git worktree remove "${BASE_DIR}/components-ai" --force 2>/dev/null || git worktree remove "${BASE_DIR}/components-ai"
    echo -e "${GREEN}✓ Removed components-ai${NC}"
fi

# Remove engine-ai worktree
if git worktree list | grep -q "engine-ai"; then
    echo "Removing engine-ai worktree..."
    git worktree remove "${BASE_DIR}/engine-ai" --force 2>/dev/null || git worktree remove "${BASE_DIR}/engine-ai"
    echo -e "${GREEN}✓ Removed engine-ai${NC}"
fi

# Remove toolkit-ai worktree
if git worktree list | grep -q "toolkit-ai"; then
    echo "Removing toolkit-ai worktree..."
    git worktree remove "${BASE_DIR}/toolkit-ai" --force 2>/dev/null || git worktree remove "${BASE_DIR}/toolkit-ai"
    echo -e "${GREEN}✓ Removed toolkit-ai${NC}"
fi

# Clean up any dangling worktree references
echo -e "${YELLOW}Cleaning up worktree references...${NC}"
git worktree prune

# Now fix the main repository to be on the correct branch
echo -e "${YELLOW}Switching main repository to main branch...${NC}"
git checkout main

echo ""
echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo ""
echo -e "${BLUE}Current status:${NC}"
echo "Repository: $(pwd)"
echo "Current branch: $(git branch --show-current)"
echo ""
echo "Remaining worktrees:"
git worktree list
echo ""
echo "Available branches:"
git branch
echo ""
echo -e "${GREEN}You can now run ./setup_worktrees.sh to set up worktrees properly${NC}"