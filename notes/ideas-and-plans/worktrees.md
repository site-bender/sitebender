# Should we use worktrees

Git worktrees are an excellent way to run multiple AI sessions in parallel from the same repository. Here's how to set it up:

## Basic Setup

1. **Create main worktree** (if we haven't already):

```bash
git init my-ai-project
cd my-ai-project
```

2. **Create additional worktrees** for parallel sessions:

```bash
# Create worktrees in different directories
git worktree add ../session-1
git worktree add ../session-2
git worktree add ../session-3
```

## Directory Structure

```
my-ai-project/     (main worktree)
session-1/         (additional worktree)
session-2/         (additional worktree)
session-3/         (additional worktree)
```

## Running Parallel AI Sessions

### Option 1: Different branches for different configurations

```bash
# Create worktrees with different branches
git worktree add ../session-experimental experimental-branch
git worktree add ../session-stable main
```

### Option 2: Same branch, different sessions

```bash
# Each session can have different environment variables or configs
cd session-1 && AI_SESSION_ID=1 python ai_script.py &
cd session-2 && AI_SESSION_ID=2 python ai_script.py &
cd session-3 && AI_SESSION_ID=3 python ai_script.py &
```

## Practical Example with Environment Variables

```bash
# Set up different configurations for each session
export SESSION_1_DIR="../session-1"
export SESSION_2_DIR="../session-2"

# Run sessions with different parameters
(cd $SESSION_1_DIR && python ai_agent.py --model=gpt4 --temperature=0.7) &
(cd $SESSION_2_DIR && python ai_agent.py --model=claude --temperature=0.9) &
```

## Managing Worktrees

**List all worktrees:**

```bash
git worktree list
```

**Remove worktrees when done:**

```bash
git worktree remove ../session-1
git worktree remove ../session-2
```

## Benefits for AI Development

1. **Isolation**: Each session has its own working directory
2. **Parallel experimentation**: Test different models/configurations simultaneously
3. **Version control**: All changes are tracked separately but can be merged
4. **Resource management**: Easy to manage multiple AI agent instances

## Advanced Usage with Scripts

Create a setup script:

```bash
#!/bin/bash
# setup_sessions.sh
for i in {1..5}; do
    git worktree add "../session-$i"
    echo "SESSION_ID=$i" > "../session-$i/.env"
done
```

And a run script:

```bash
#!/bin/bash
# run_sessions.sh
for session_dir in ../session-*; do
    (cd "$session_dir" && python ai_agent.py) &
done
wait
```

This approach allows us to run multiple AI instances in parallel while keeping their workspaces isolated but version-controlled.

Here's how to run the scripts and set up our AI parallel sessions:

## Creating and Running the Scripts

### 1. Create the setup script

```bash
# Create a file called setup_sessions.sh
nano setup_sessions.sh
```

Paste this content:

```bash
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
```

### 2. Create the run script

```bash
# Create a file called run_sessions.sh
nano run_sessions.sh
```

Paste this content:

```bash
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
```

### 3. Make the scripts executable

```bash
chmod +x setup_sessions.sh
chmod +x run_sessions.sh
```

### 4. Run the scripts

```bash
# First, set up the sessions
./setup_sessions.sh

# Then run them all
./run_sessions.sh
```

## Alternative: One-time Setup without Scripts

If we prefer to run commands directly:

```bash
# Setup sessions
for i in {1..3}; do
    git worktree add "../session-$i"
    echo "SESSION_ID=$i" > "../session-$i/.env"
done

# Run sessions in background
(cd ../session-1 && python ai_agent.py --name="Session-1") &
(cd ../session-2 && python ai_agent.py --name="Session-2") &
(cd ../session-3 && python ai_agent.py --name="Session-3") &

# See running jobs
jobs

# Bring a specific session to foreground
fg %1  # Bring first session to foreground
# Press Ctrl+Z to pause, then bg to send back to background
```

## Managing Our Sessions

**Check what's running:**

```bash
jobs          # Show background jobs
ps aux | grep python  # Show all python processes
```

**Stop all sessions:**

```bash
pkill -f "python ai_agent.py"
```

**Stop specific session:**

```bash
# First find the process ID
ps aux | grep ai_agent.py

# Then kill specific process
kill <process_id>
```

## Example AI Agent Script

Create a simple `ai_agent.py` to test:

```python
# ai_agent.py
import os
import time
import random

session_id = os.getenv('SESSION_ID', 'unknown')
print(f"🚀 AI Session {session_id} starting...")

# Simulate AI work
for i in range(10):
    print(f"Session {session_id}: Processing task {i+1}")
    time.sleep(random.uniform(0.5, 2.0))

print(f"✅ Session {session_id} completed!")
```

## Quick Test Run

```bash
# Create a simple test
echo "print('Hello from AI session!')" > ai_agent.py

# Setup and run
./setup_sessions.sh
./run_sessions.sh
```

The scripts will create separate directories for each session and run them in parallel. Each session operates independently but shares the same git history and can be managed together!
