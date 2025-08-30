#!/bin/bash
# run_sessions.sh - Runs all AI sessions in parallel

echo "Starting all AI sessions..."

# Find all session directories and run them
for session_dir in ../session-*; do
    if [ -d "$session_dir" ]; then
        echo "Starting session in: $session_dir"
        (cd "$session_dir" && python ai_agent.py) &
    fi
done

echo "All sessions started in background!"
echo "Use 'jobs' to see running sessions"
echo "Use 'fg %1' to bring a session to foreground"
wait