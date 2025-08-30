#!/bin/bash
# setup_sessions.sh - Creates multiple worktree sessions

echo "Setting up AI worktree sessions..."

# Create 3 sessions
for i in {1..3}; do
    git worktree add "../session-$i"
    echo "SESSION_ID=$i" > "../session-$i/.env"
    echo "Created session $i"
done

echo "All sessions created!";