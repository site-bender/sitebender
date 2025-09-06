#!/bin/bash

# Run parallel AI sessions for different libraries
# This script helps coordinate multiple AI assistants

echo "🤖 Parallel AI Coordination Script"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BASE_DIR=$(dirname "$(pwd)")

# Function to show library status
show_status() {
    local library=$1
    local path=$2
    local branch="ai/${library}"
    
    echo -e "${BLUE}=== ${library} ===${NC}"
    
    if [ -d "$path" ]; then
        cd "$path"
        echo "Path: $path"
        echo "Branch: $(git branch --show-current)"
        
        # Check for uncommitted changes
        if [[ -n $(git status -s) ]]; then
            echo -e "${YELLOW}Has uncommitted changes${NC}"
        else
            echo -e "${GREEN}Clean working directory${NC}"
        fi
        
        # Show recent commits
        echo "Recent commits:"
        git log --oneline -3 2>/dev/null || echo "No commits yet"
        
        # Check AI_STATUS.md if exists
        if [ -f "AI_STATUS.md" ]; then
            echo "Current task:"
            grep -A 2 "## Current Task" AI_STATUS.md | tail -n 1
        fi
        
        cd - > /dev/null
    else
        echo -e "${RED}Worktree not found at $path${NC}"
    fi
    echo ""
}

# Main menu
while true; do
    clear
    echo -e "${GREEN}🤖 Parallel AI Coordination Center${NC}"
    echo "=================================="
    echo ""
    
    # Show status of all libraries
    show_status "toolkit" "${BASE_DIR}/toolkit-ai"
    show_status "engine" "${BASE_DIR}/engine-ai"
    show_status "components" "${BASE_DIR}/components-ai"
    
    echo "Options:"
    echo "1. Check test coverage status"
    echo "2. Run tests in all libraries"
    echo "3. Integrate all branches"
    echo "4. Show git worktree list"
    echo "5. AI assignment guide"
    echo "6. Exit"
    echo ""
    read -p "Choose option (1-6): " choice
    
    case $choice in
        1)
            echo -e "${YELLOW}Checking test coverage...${NC}"
            for lib in toolkit engine components; do
                echo -e "${BLUE}${lib}:${NC}"
                if [ -d "libraries/${lib}" ]; then
                    cd "libraries/${lib}"
                    deno task test --coverage 2>/dev/null | grep -E "cover|TOTAL" || echo "No coverage data"
                    cd - > /dev/null
                fi
            done
            read -p "Press enter to continue..."
            ;;
        2)
            echo -e "${YELLOW}Running tests in all libraries...${NC}"
            for lib in toolkit engine components; do
                echo -e "${BLUE}Testing ${lib}...${NC}"
                if [ -d "libraries/${lib}" ]; then
                    cd "libraries/${lib}"
                    deno task test 2>/dev/null || echo "Tests failed or not found"
                    cd - > /dev/null
                fi
            done
            read -p "Press enter to continue..."
            ;;
        3)
            echo -e "${YELLOW}Integrating branches...${NC}"
            if [ -f "./integrate_libraries.sh" ]; then
                ./integrate_libraries.sh
            else
                echo -e "${RED}integrate_libraries.sh not found${NC}"
            fi
            read -p "Press enter to continue..."
            ;;
        4)
            echo -e "${YELLOW}Git worktrees:${NC}"
            git worktree list
            read -p "Press enter to continue..."
            ;;
        5)
            clear
            echo -e "${GREEN}AI Assignment Guide${NC}"
            echo "=================="
            echo ""
            echo -e "${BLUE}Toolkit (Priority 1 - Use Claude):${NC}"
            echo "- Build test generator in scripts/test-generator/"
            echo "- Most complex, needs smartest AI"
            echo "- Branch: ai/toolkit"
            echo ""
            echo -e "${BLUE}Engine (Priority 2 - Claude or GPT):${NC}"
            echo "- Test reactive computation engine"
            echo "- Understand IR evaluation"
            echo "- Branch: ai/engine"
            echo ""
            echo -e "${BLUE}Components (Priority 3 - GPT is fine):${NC}"
            echo "- Test JSX components"
            echo "- More straightforward"
            echo "- Branch: ai/components"
            echo ""
            echo -e "${YELLOW}Recommended AI Assignment:${NC}"
            echo "1. Claude #1: Toolkit test generator (main repo)"
            echo "2. Claude #2: Engine testing (worktree)"
            echo "3. GPT #1: Components testing (worktree)"
            echo "4. GPT #2: Toolkit array/string testing"
            echo "5. GPT #3: Documentation updates"
            echo ""
            read -p "Press enter to continue..."
            ;;
        6)
            echo -e "${GREEN}Exiting...${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            sleep 1
            ;;
    esac
done