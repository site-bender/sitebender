#!/bin/bash

# Setup worktrees for parallel AI development
# Main repository stays on main branch for easy merging/pulling
# Worktrees are created for ai/* branches with logical naming

echo "🚀 Setting up worktrees for @sitebender libraries"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get the base directory
MAIN_REPO=$(git rev-parse --show-toplevel)
BASE_DIR=$(dirname "$MAIN_REPO")

# All available libraries
ALL_LIBRARIES=(
    "agent"
    "architect"
    "codewright"
    "envoy"
    "formulator"
    "linguist"
    "logician"
    "quarrier"
		"quartermaster"
		"steward"
    "toolsmith"
		"warden"
)

# Function to extract library name from branch
get_library_from_branch() {
    local branch=$1
    # Extract library name from ai/library format
    echo "${branch#ai/}"
}

# Function to create/checkout branch
ensure_branch() {
    local branch=$1

    if git show-ref --quiet refs/heads/$branch; then
        echo -e "${BLUE}Branch $branch already exists${NC}"
    else
        echo -e "${YELLOW}Creating branch $branch from main...${NC}"
        git branch $branch main
        echo -e "${GREEN}✓ Created branch $branch${NC}"
    fi
}

# Function to create worktree
create_worktree() {
    local branch=$1
    local library=$(get_library_from_branch "$branch")
    local worktree_path="${BASE_DIR}/${library}-ai"

    # Check if worktree already exists
    if git worktree list | grep -q "$worktree_path"; then
        echo -e "${YELLOW}⚠ Worktree at $worktree_path already exists${NC}"
        return 1
    fi

    # Ensure the branch exists
    ensure_branch "$branch"

    # Create the worktree
    echo -e "${CYAN}Creating worktree for $branch...${NC}"
    git worktree add "$worktree_path" "$branch"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Created worktree at $worktree_path${NC}"

        # Create AI_STATUS.md file
        cat > "$worktree_path/AI_STATUS.md" << EOF
# AI Development Status: $library

## Branch
\`$branch\`

## Worktree Location
\`$worktree_path\`

## Current Task
Working on @sitebender/${library} library

## Progress Checklist
- [ ] Initial setup complete
- [ ] Test coverage analysis
- [ ] Test generation/implementation
- [ ] Documentation updates
- [ ] 100% coverage achieved
- [ ] All tests passing
- [ ] Ready for integration

## Commands
\`\`\`bash
# Navigate to this worktree
cd $worktree_path

# Run tests for this library
deno task test:${library}

# Check coverage
deno task coverage:${library}

# Format code
deno task fmt

# Lint code
deno task lint

# Type check
deno task typecheck

# Switch back to main repo
cd $MAIN_REPO
\`\`\`

## Notes
- Follow CLAUDE.md and TESTING.md strictly
- Achieve 100% test coverage
- Use conventional commits
- Update this file with progress
EOF
        echo -e "${GREEN}✓ Created AI_STATUS.md${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to create worktree${NC}"
        return 1
    fi
}

# Main script
echo -e "${BLUE}Current repository: $MAIN_REPO${NC}"
echo -e "${BLUE}Base directory: $BASE_DIR${NC}"
echo ""

# Ensure we're on main branch in the main repository
echo -e "${YELLOW}Ensuring main repository is on main branch...${NC}"
git checkout main
echo ""

# Check if specific branches were provided as arguments
if [ $# -gt 0 ]; then
    echo -e "${CYAN}Setting up worktrees for specified branches:${NC}"
    for arg in "$@"; do
        # Handle both "ai/library" and "library" formats
        if [[ $arg == ai/* ]]; then
            branch="$arg"
        else
            branch="ai/$arg"
        fi

        echo ""
        echo -e "${BLUE}Processing: $branch${NC}"
        create_worktree "$branch"
    done
else
    echo -e "${CYAN}No branches specified. Available options:${NC}"
    echo "1. Set up all libraries (${#ALL_LIBRARIES[@]} total)"
    echo "2. Choose specific libraries"
    echo "3. Enter custom branch names"
    echo "4. Show existing worktrees and exit"
    read -p "Enter choice (1-4): " choice

    case $choice in
        1)
            echo -e "${GREEN}Setting up all libraries...${NC}"
            for lib in "${ALL_LIBRARIES[@]}"; do
                echo ""
                create_worktree "ai/$lib"
            done
            ;;
        2)
            echo -e "${GREEN}Choose libraries to set up:${NC}"
            for lib in "${ALL_LIBRARIES[@]}"; do
                # Check if worktree already exists
                if git worktree list | grep -q "${lib}-ai"; then
                    echo -e "${BLUE}$lib already has a worktree${NC}"
                else
                    read -p "Set up worktree for $lib? (y/n): " yn
                    case $yn in
                        [Yy]* )
                            echo ""
                            create_worktree "ai/$lib"
                            ;;
                        * )
                            echo "Skipping $lib"
                            ;;
                    esac
                fi
            done
            ;;
        3)
            echo "Enter branch names (format: ai/name or just name)"
            echo "Press Enter with empty line to finish"
            while true; do
                read -p "Branch: " branch_input
                [ -z "$branch_input" ] && break

                # Normalize to ai/* format
                if [[ $branch_input == ai/* ]]; then
                    branch="$branch_input"
                else
                    branch="ai/$branch_input"
                fi

                echo ""
                create_worktree "$branch"
            done
            ;;
        4)
            # Just show existing worktrees
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            exit 1
            ;;
    esac
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Current worktree configuration:${NC}"
git worktree list
echo ""
echo -e "${BLUE}Available ai/* branches:${NC}"
git branch | grep "ai/" || echo "  No ai/* branches found"
echo ""
echo -e "${CYAN}📝 Quick reference:${NC}"
echo "  Main repo (for merging/pulling): $MAIN_REPO"
echo "  Current branch: $(git branch --show-current)"
echo ""
echo "  To navigate to a worktree:"
for worktree in $(git worktree list --porcelain | grep "^worktree" | cut -d' ' -f2); do
    if [[ $worktree != $MAIN_REPO ]] && [[ $worktree == *-ai ]]; then
        echo "    cd $worktree"
    fi
done
echo ""
echo -e "${CYAN}💡 Tips:${NC}"
echo "  • Main repository stays on 'main' for easy pulling/merging"
echo "  • Each worktree has its own AI_STATUS.md for tracking progress"
echo "  • Use 'git worktree list' to see all worktrees"
echo "  • Run 'deno task integrate' to merge all branches into main"
echo "  • Run this script with library names to add specific worktrees"
echo "    Example: $0 quarrier linguist"
