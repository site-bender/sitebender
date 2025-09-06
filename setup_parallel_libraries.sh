#!/bin/bash

# Setup parallel AI development for different libraries
# Each library gets its own branch and optional worktree

echo "🚀 Setting up parallel AI development for @sitebender libraries"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the base directory
BASE_DIR=$(dirname "$(pwd)")

# Function to create library branch
create_library_branch() {
    local library=$1
    local branch="ai/${library}"
    
    echo -e "${YELLOW}Setting up ${library}...${NC}"
    
    # Create branch if it doesn't exist
    if git show-ref --quiet refs/heads/$branch; then
        echo -e "${YELLOW}Branch $branch already exists${NC}"
    else
        git checkout -b $branch main
        echo -e "${GREEN}Created branch $branch${NC}"
        git checkout main
    fi
}

# Function to create worktree
create_worktree() {
    local library=$1
    local branch="ai/${library}"
    local worktree_path="${BASE_DIR}/${library}-ai"
    
    # Check if worktree already exists
    if [ -d "$worktree_path" ]; then
        echo -e "${YELLOW}Worktree at $worktree_path already exists${NC}"
    else
        git worktree add "$worktree_path" "$branch"
        echo -e "${GREEN}Created worktree at $worktree_path${NC}"
        
        # Create status file
        cat > "$worktree_path/AI_STATUS.md" << EOF
# AI Status: $library

## Current Task
Working on @sitebender/${library} library

## Branch
$branch

## Progress
- [ ] Initial setup complete
- [ ] Test coverage analysis
- [ ] Test generation/writing
- [ ] Documentation updates

## Notes
- Follow CLAUDE.md and TESTING.md strictly
- Achieve 100% test coverage
- Use conventional commits
- Update this file regularly
EOF
        echo -e "${GREEN}Created AI_STATUS.md in $worktree_path${NC}"
    fi
}

# Main setup
echo "Choose setup type:"
echo "1. Branches only (no worktrees)"
echo "2. Branches + Worktrees (recommended for true parallel work)"
echo "3. Selective (choose which libraries get worktrees)"
read -p "Enter choice (1-3): " choice

# Libraries ready for work
LIBRARIES=("toolkit" "engine" "components")

case $choice in
    1)
        echo -e "${GREEN}Setting up branches only...${NC}"
        for lib in "${LIBRARIES[@]}"; do
            create_library_branch $lib
        done
        ;;
    2)
        echo -e "${GREEN}Setting up branches and worktrees...${NC}"
        for lib in "${LIBRARIES[@]}"; do
            create_library_branch $lib
            create_worktree $lib
        done
        ;;
    3)
        echo -e "${GREEN}Setting up selective worktrees...${NC}"
        for lib in "${LIBRARIES[@]}"; do
            create_library_branch $lib
            read -p "Create worktree for $lib? (y/n): " yn
            case $yn in
                [Yy]* ) create_worktree $lib;;
                * ) echo "Skipping worktree for $lib";;
            esac
        done
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. For branches only: git checkout ai/[library-name]"
echo "2. For worktrees: cd ${BASE_DIR}/[library-name]-ai"
echo ""
echo "Available branches:"
git branch | grep "ai/"
echo ""
echo "Available worktrees:"
git worktree list

# Create integration script
cat > integrate_libraries.sh << 'EOF'
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
EOF

chmod +x integrate_libraries.sh
echo -e "${GREEN}Created integrate_libraries.sh for merging work${NC}"