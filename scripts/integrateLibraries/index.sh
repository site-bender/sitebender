#!/bin/bash

# Integrate all library branches into main and ensure complete synchronization
# This script ensures all worktrees, local branches, and remote branches are in sync

set -e  # Exit on error

echo "🔄 Full Integration and Synchronization Script"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Detect VS Code CLI for helpful hints
CODE_BIN=$(command -v code || echo "")

print_code_hint() {
    local path="$1"
    if [ -n "$CODE_BIN" ]; then
        echo -e "${YELLOW}         VS Code: code '${path}'${NC}"
    fi
}

# All library branches
BRANCHES=(
    "ai/pagewright"
    "ai/architect"
    "ai/envoy"
    "ai/quarrier"
    "ai/formulator"
    "ai/agent"
    "ai/arborist"
    "ai/auditor"
    "ai/toolsmith"
)

# Resolve a worktree directory for a given branch using porcelain output (robust against formatting)
get_worktree_dir() {
    local branch="$1"
    # Expect branch in refs/heads/<branch>
    git worktree list --porcelain | awk -v b="refs/heads/${branch}" '
        $1=="worktree" { path=$2 }
        $1=="branch" && $2==b { print path }
    '
}

# Get the main worktree directory (prefer porcelain parse; fallback to repo toplevel)
MAIN_WORKTREE=$(get_worktree_dir "main")
if [ -z "$MAIN_WORKTREE" ]; then
    MAIN_WORKTREE=$(git rev-parse --show-toplevel 2>/dev/null || echo "")
fi

# Function to check if branch exists locally
branch_exists_local() {
    git show-ref --quiet --verify "refs/heads/$1"
}

# Function to check if branch exists on remote
branch_exists_remote() {
    git ls-remote --exit-code --heads origin "$1" >/dev/null 2>&1
}

# Function to check for uncommitted changes in a directory
has_uncommitted_changes() {
    local dir=$1
    if [ -d "$dir" ]; then
        (
            cd "$dir" &&
            # Detect unstaged and staged changes; porcelain covers both but be explicit
            if ! git diff --quiet || ! git diff --cached --quiet; then
                exit 0
            else
                # Also detect untracked files that would be overwritten
                if [ -n "$(git ls-files --others --exclude-standard)" ]; then
                    exit 0
                fi
                exit 1
            fi
        )
    else
        return 1
    fi
}

# Step 1: Pre-flight checks
echo -e "${CYAN}Step 1: Pre-flight checks${NC}"
echo "Checking for uncommitted changes in all worktrees..."

UNCOMMITTED_FOUND=false
for branch in "${BRANCHES[@]}"; do
    WORKTREE_DIR=$(get_worktree_dir "$branch")
    if [ -n "$WORKTREE_DIR" ]; then
        if has_uncommitted_changes "$WORKTREE_DIR"; then
            echo -e "${RED}  ❌ Uncommitted changes in $WORKTREE_DIR ($branch)${NC}"
            UNCOMMITTED_FOUND=true
        else
            echo -e "${GREEN}  ✓ $branch worktree is clean${NC}"
        fi
    fi
done

# Check main worktree
if [ -z "$MAIN_WORKTREE" ]; then
    echo -e "${RED}  ❌ Could not determine main worktree path${NC}"
    UNCOMMITTED_FOUND=true
elif has_uncommitted_changes "$MAIN_WORKTREE"; then
    echo -e "${RED}  ❌ Uncommitted changes in main worktree${NC}"
    UNCOMMITTED_FOUND=true
else
    echo -e "${GREEN}  ✓ main worktree is clean${NC}"
fi

if [ "$UNCOMMITTED_FOUND" = true ]; then
    echo -e "${RED}Cannot proceed with uncommitted changes. Please commit or stash them first.${NC}"
    exit 1
fi

# Optional visibility: warn if any files are marked skip-worktree/assume-unchanged (can hide conflicts)
FLAGGED_COUNT=$(git ls-files -v | grep -E '^[a-zS]' | wc -l | tr -d ' ')
if [ "$FLAGGED_COUNT" != "0" ]; then
    echo -e "${YELLOW}Warning:${NC} Detected $FLAGGED_COUNT files with skip-worktree/assume-unchanged flags. These can hide changes/conflicts."
    echo -e "${YELLOW}  To clear (safe):${NC} git ls-files -z | xargs -0 git update-index --no-assume-unchanged --; git ls-files -z | xargs -0 git update-index --no-skip-worktree --"
fi

echo ""

# Step 2: Fetch all updates from origin
echo -e "${CYAN}Step 2: Fetching all updates from origin${NC}"
git fetch --all --prune
echo -e "${GREEN}  ✓ Fetched all remote updates${NC}"
echo ""

# Step 3: Ensure all AI branches exist on origin
echo -e "${CYAN}Step 3: Ensuring all AI branches exist on origin${NC}"
for branch in "${BRANCHES[@]}"; do
    if ! branch_exists_remote "$branch"; then
        echo -e "${YELLOW}  Creating $branch on origin...${NC}"
        if branch_exists_local "$branch"; then
            git push -u origin "$branch"
            echo -e "${GREEN}    ✓ Created $branch on origin${NC}"
        else
            echo -e "${RED}    ❌ $branch doesn't exist locally${NC}"
        fi
    else
        echo -e "${GREEN}  ✓ $branch exists on origin${NC}"
    fi
done
echo ""

# Step 4: Update all worktrees with their remote branches
echo -e "${CYAN}Step 4: Updating all worktrees from origin${NC}"
for branch in "${BRANCHES[@]}"; do
    WORKTREE_DIR=$(get_worktree_dir "$branch")
    if [ -n "$WORKTREE_DIR" ]; then
        echo -e "${BLUE}  Updating $branch worktree...${NC}"
        (
            cd "$WORKTREE_DIR"
            # Ensure tracking is set up
            git branch --set-upstream-to="origin/$branch" "$branch" 2>/dev/null || true
            # Pull latest changes
            if git pull --ff-only origin "$branch" 2>/dev/null; then
                echo -e "${GREEN}    ✓ Updated $branch from origin${NC}"
            else
                echo -e "${YELLOW}    ⚠ No fast-forward possible for $branch (will handle in merge)${NC}"
            fi
        )
    else
        echo -e "${YELLOW}  ⚠ No worktree found for $branch${NC}"
    fi
done
echo ""

# Step 5: Switch to main and update it
echo -e "${CYAN}Step 5: Updating main branch${NC}"
cd "$MAIN_WORKTREE"
git checkout main
# Re-check cleanliness before pulling
if has_uncommitted_changes "$MAIN_WORKTREE"; then
    echo -e "${RED}  ❌ Main worktree has uncommitted changes. Please commit or stash before integrating.${NC}"
    exit 1
fi

# Require a clean fast-forward; abort on failure
if ! git pull --ff-only origin main; then
    echo -e "${RED}  ❌ Unable to fast-forward main. Resolve issues (likely local changes) and retry.${NC}"
    exit 1
fi
echo -e "${GREEN}  ✓ Main branch ready${NC}"
echo ""

# Step 6: Merge all AI branches into main
echo -e "${CYAN}Step 6: Integrating all AI branches into main${NC}"
SUCCESS_COUNT=0
SKIP_COUNT=0
FAIL_COUNT=0

for branch in "${BRANCHES[@]}"; do
    echo -e "${BLUE}  Processing $branch...${NC}"

    if branch_exists_local "$branch"; then
        # Check if branch has any changes not in main
        COMMITS_AHEAD=$(git rev-list --count main.."$branch" 2>/dev/null || echo "0")

        if [ "$COMMITS_AHEAD" -eq "0" ]; then
            echo -e "${YELLOW}    No new commits to merge${NC}"
            ((SKIP_COUNT++))
        else
            echo -e "${BLUE}    Found $COMMITS_AHEAD new commits${NC}"

            # Attempt merge
            # Ensure main worktree is still clean just before merging
            if has_uncommitted_changes "$MAIN_WORKTREE"; then
                echo -e "${RED}    ❌ Main worktree became dirty before merge. Resolve and retry.${NC}"
                exit 1
            fi

            if git merge "$branch" --no-ff -m "feat: integrate $branch changes" --no-edit; then
                echo -e "${GREEN}    ✓ Successfully merged $branch${NC}"
                ((SUCCESS_COUNT++))
            else
                echo -e "${RED}    ❌ Merge conflict in $branch${NC}"
                echo -e "${BLUE}       Worktree: ${YELLOW}${MAIN_WORKTREE}${NC}"
                echo -e "${BLUE}       Conflicted files:${NC}"
                git diff --name-only --diff-filter=U | sed -e 's/^/         - /'
                echo -e "${YELLOW}       Next steps:${NC}"
                echo -e "${YELLOW}         1) Open the worktree above in your IDE${NC}"
                print_code_hint "${MAIN_WORKTREE}"
                echo -e "${YELLOW}         2) Resolve conflict markers (<<<<<<< ======= >>>>>>>)${NC}"
                echo -e "${YELLOW}         3) Commit the merge:${NC}"
                echo -e "${YELLOW}              git add -A && git commit${NC}"
                echo -e "${YELLOW}         4) Re-run: deno task integrate${NC}"
                ((FAIL_COUNT++))
                exit 1  # Stop on conflict
            fi
        fi
    else
        echo -e "${YELLOW}    ⚠ Branch $branch does not exist locally${NC}"
        ((SKIP_COUNT++))
    fi
done

echo ""
echo -e "${GREEN}Integration complete: $SUCCESS_COUNT merged, $SKIP_COUNT skipped${NC}"
echo ""

# Step 7: Push main to origin
echo -e "${CYAN}Step 7: Pushing main to origin${NC}"
\git push origin main
echo -e "${GREEN}  ✓ Main pushed to origin${NC}"
echo ""

# Step 8: Update all AI branches with main's changes
echo -e "${CYAN}Step 8: Updating all AI branches with main's changes${NC}"
MAIN_COMMIT=$(\git rev-parse HEAD)

for branch in "${BRANCHES[@]}"; do
    WORKTREE_DIR=$(get_worktree_dir "$branch")
    if [ -n "$WORKTREE_DIR" ]; then
        echo -e "${BLUE}  Updating $branch with main...${NC}"
        (
            cd "$WORKTREE_DIR"
            # Merge main into the AI branch
            if \git merge main --no-ff -m "chore: sync with main" --no-edit; then
                echo -e "${GREEN}    ✓ $branch synchronized with main${NC}"
            else
                echo -e "${RED}    ❌ Conflict merging main into $branch${NC}"
                echo -e "${BLUE}       Worktree: ${YELLOW}${WORKTREE_DIR}${NC}"
                echo -e "${BLUE}       Conflicted files:${NC}"
                (\git -C "$WORKTREE_DIR" diff --name-only --diff-filter=U | sed -e 's/^/         - /') || true
                echo -e "${YELLOW}       Next steps:${NC}"
                echo -e "${YELLOW}         1) Open the worktree above in your IDE${NC}"
                print_code_hint "${WORKTREE_DIR}"
                echo -e "${YELLOW}         2) Resolve conflict markers (<<<<<<< ======= >>>>>>>)${NC}"
                echo -e "${YELLOW}         3) Commit the merge:${NC}"
                echo -e "${YELLOW}              \git -C '${WORKTREE_DIR}' add -A && \git -C '${WORKTREE_DIR}' commit${NC}"
                echo -e "${YELLOW}         4) Re-run: deno task integrate${NC}"
                exit 1
            fi
        )
    else
        echo -e "${YELLOW}  ⚠ No worktree for $branch, updating branch directly${NC}"
        \git checkout "$branch"
        if \git merge main --no-ff -m "chore: sync with main" --no-edit; then
            echo -e "${GREEN}    ✓ $branch synchronized with main${NC}"
        else
            echo -e "${RED}    ❌ Conflict merging main into $branch${NC}"
            echo -e "${BLUE}       Worktree: ${YELLOW}${MAIN_WORKTREE}${NC}"
            echo -e "${BLUE}       Conflicted files:${NC}"
            \git diff --name-only --diff-filter=U | sed -e 's/^/         - /'
            echo -e "${YELLOW}       Next steps:${NC}"
            echo -e "${YELLOW}         1) Resolve conflicts in current branch (${branch})${NC}"
            print_code_hint "${MAIN_WORKTREE}"
            echo -e "${YELLOW}         2) Commit the merge:${NC}"
            echo -e "${YELLOW}              \git add -A && \git commit${NC}"
            echo -e "${YELLOW}         3) Switch back to main and re-run:${NC}"
            echo -e "${YELLOW}              \git checkout main && deno task integrate${NC}"
            exit 1
        fi
        \git checkout main
    fi
done
echo ""

# Step 9: Push all AI branches to origin
echo -e "${CYAN}Step 9: Pushing all AI branches to origin${NC}"
for branch in "${BRANCHES[@]}"; do
    WORKTREE_DIR=$(get_worktree_dir "$branch")
    if [ -n "$WORKTREE_DIR" ]; then
        echo -e "${BLUE}  Pushing $branch...${NC}"
        (
            cd "$WORKTREE_DIR"
            \git push origin "$branch"
            echo -e "${GREEN}    ✓ $branch pushed to origin${NC}"
        )
    else
        # Push from main worktree
        \git push origin "$branch"
        echo -e "${GREEN}    ✓ $branch pushed to origin${NC}"
    fi
done
echo ""

# Step 10: Verification
echo -e "${CYAN}Step 10: Verification${NC}"
echo -e "${BLUE}Checking all worktrees are synchronized...${NC}"

cd "$MAIN_WORKTREE"
MAIN_COMMIT=$(\git rev-parse HEAD)
echo -e "  Main commit: ${YELLOW}$MAIN_COMMIT${NC}"

ALL_SYNCED=true
for branch in "${BRANCHES[@]}"; do
    WORKTREE_DIR=$(get_worktree_dir "$branch")
    if [ -n "$WORKTREE_DIR" ]; then
        BRANCH_COMMIT=$(cd "$WORKTREE_DIR" && \git rev-parse HEAD)
        if [ "$BRANCH_COMMIT" = "$MAIN_COMMIT" ] || \git merge-base --is-ancestor "$MAIN_COMMIT" "$BRANCH_COMMIT"; then
            echo -e "${GREEN}  ✓ $branch is synchronized${NC}"
        else
            echo -e "${RED}  ❌ $branch is NOT synchronized${NC}"
            ALL_SYNCED=false
        fi
    fi
done

echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
if [ "$ALL_SYNCED" = true ]; then
    echo -e "${GREEN}🎉 SUCCESS: All branches and worktrees are fully synchronized!${NC}"
    echo -e "${GREEN}  • All local branches updated${NC}"
    echo -e "${GREEN}  • All remote branches updated${NC}"
    echo -e "${GREEN}  • All worktrees consistent${NC}"
else
    echo -e "${RED}⚠️  WARNING: Some branches are not fully synchronized${NC}"
    echo -e "${YELLOW}  Please check the branches marked above${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════${NC}"

echo ""
echo -e "${CYAN}Recent commits on main:${NC}"
\git log --oneline -5

echo ""
echo -e "${GREEN}Integration and synchronization complete!${NC}"
