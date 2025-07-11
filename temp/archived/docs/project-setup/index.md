# Project Setup

Project setup handles development environment configuration, git hooks, and development dependencies.

## Core Behaviors

### Git Hooks Configuration
- **Pre-commit Hooks**: Automatically run tests and linting before commits
- **Pre-push Hooks**: Ensure code quality before pushing to remote
- **Hook Installation**: Sets up git hooks in `.git/hooks/` directory
- **Hook Management**: Maintains hook scripts and permissions

### Development Environment
- **Deno Configuration**: Ensures proper Deno version and permissions
- **IDE Setup**: Configures VS Code settings and extensions
- **Environment Variables**: Sets up development-specific environment variables
- **Path Configuration**: Ensures proper import path resolution

### Dependency Management
- **Lock File**: Manages `deno.lock` for consistent dependency versions
- **Import Maps**: Configures import aliases in `deno.json`
- **Version Checking**: Validates Deno version compatibility
- **Update Procedures**: Handles dependency updates safely

## Setup Process

### Initial Setup
1. **Environment Check**: Verifies Deno installation and version
2. **Git Hooks**: Installs pre-commit and pre-push hooks
3. **Configuration**: Sets up IDE and development settings
4. **Dependencies**: Resolves and locks dependency versions
5. **Verification**: Runs basic tests to ensure setup is working

### Git Hooks Installation

#### Pre-commit Hook
- **Purpose**: Prevents committing broken code
- **Actions**: Runs tests, linting, and formatting checks
- **Failure Handling**: Blocks commit if any check fails
- **Performance**: Optimized to run quickly

#### Pre-push Hook
- **Purpose**: Ensures code quality before sharing
- **Actions**: Full test suite, coverage checks, build verification
- **Remote Checks**: Validates against remote branch requirements
- **Recovery**: Provides clear instructions for fixing issues

### Configuration Management

#### VS Code Settings
- **Extensions**: Installs recommended Deno extension
- **Settings**: Configures TypeScript, formatting, and linting
- **Tasks**: Sets up build and test tasks
- **Debugging**: Configures debugging settings for Deno

#### Import Path Configuration
- **Aliases**: Sets up `~components/`, `~utilities/`, etc.
- **Resolution**: Ensures TypeScript can resolve all imports
- **Validation**: Checks that all configured paths exist

## Setup Commands

### Full Setup
```bash
deno task setup
# or
deno run -A scripts/setup/index.ts
```

### Verify Setup
```bash
# Check that hooks are installed
ls -la .git/hooks/

# Verify Deno configuration
deno info

# Run basic tests
deno task test
```

## Error Handling

### Git Configuration Issues
- **Missing Git**: Clear error message if git is not installed
- **Permissions**: Handles file permission issues gracefully
- **Hook Conflicts**: Manages existing hooks without overwriting

### Environment Problems
- **Deno Version**: Warns about incompatible Deno versions
- **Missing Dependencies**: Clear messages about missing requirements
- **Path Issues**: Helpful debugging for import path problems

### Recovery Procedures
- **Reinstall**: Safe to run setup multiple times
- **Cleanup**: Removes corrupted configuration files
- **Reset**: Restores default configuration if needed

## Maintenance

### Hook Updates
- **Version Control**: Git hooks are version controlled
- **Updates**: Setup script updates hooks when necessary
- **Customization**: Hooks can be customized for team requirements

### Configuration Drift
- **Detection**: Setup warns about configuration changes
- **Sync**: Ensures all team members have consistent setup
- **Documentation**: Tracks setup changes and requirements

## Team Onboarding

### New Developer Setup
1. Clone repository
2. Install Deno
3. Run `deno task setup`
4. Verify with `deno task test`
5. Start development with `deno task dev`

### Common Setup Issues
- **Permission Errors**: Usually resolved with proper file permissions
- **Path Problems**: Import aliases not working correctly
- **Hook Failures**: Git hooks not executing properly

### Setup Verification
- **Build Test**: Ensures build system works correctly
- **Server Test**: Verifies development server starts
- **Test Execution**: Confirms test suite runs successfully
- **Hook Test**: Validates git hooks are functioning

## Continuous Integration

### CI Setup Requirements
- **Environment**: Ensures CI has proper Deno version
- **Dependencies**: Locks dependency versions for consistency
- **Testing**: Configures test execution in CI environment
- **Deployment**: Sets up deployment configuration

### Local vs CI
- **Consistency**: Ensures local setup matches CI environment
- **Debugging**: Provides tools for debugging CI issues locally
- **Performance**: Optimizes setup for both local and CI use
