# Git Workflow & Commit Guidelines

## Conventional Commits
This project uses [Conventional Commits 1.0](https://www.conventionalcommits.org/en/v1.0.0/) format for all commit messages.

## Pre-commit Hook Setup
The project has a pre-commit hook at `.githooks/pre-commit` that:
- Automatically sorts imports (`deno task sort`)
- Formats code (`deno task fmt:quick`)
- Exits with status 1 if files are modified, requiring re-commit

## Critical: Avoiding "Commit Squashing" Issues

### Problem
The pre-commit hook can cause apparent "commit squashing" when:
1. You commit with unformatted code
2. Hook modifies files and exits with status 1
3. Multiple commit attempts fail until code is clean
4. Only the final commit succeeds, making it appear commits were squashed

### Solution: Pre-format Before Committing

**ALWAYS follow this workflow for clean, separate commits:**

```bash
# 1. Pre-format code BEFORE staging
deno task fmt && deno task sort

# 2. Stage already-clean files
git add [files]

# 3. Commit with conventional format
git commit -m "type: description" -m "- Detailed changes" -m "- More context"

# 4. Pre-commit hook passes cleanly ✅
```

### Conventional Commit Types
- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code restructuring without changing behavior
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test changes
- `style:` - Code style/formatting
- `perf:` - Performance improvements

### Multi-line Commit Messages
Use multiple `-m` flags instead of `\n` (which doesn't work in this shell):

```bash
git commit -m "feat: add user authentication" \
           -m "- Implement login/logout functionality" \
           -m "- Add JWT token handling" \
           -m "- Include password validation"
```

## Verification
- Each commit should appear separately in `git log --oneline`
- No commits should be automatically squashed
- Pre-commit hook should pass without requiring re-commits

## Last Updated
June 30, 2025 - After utilities reorganization project
