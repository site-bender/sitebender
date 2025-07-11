# Build Artifact Management

Build artifact management handles the cleanup and maintenance of generated files and directories.

## Core Behaviors

### Clean Build Artifacts
- **Target Directory**: Removes the entire `dist/` directory
- **Complete Cleanup**: Ensures no stale build artifacts remain
- **Safe Removal**: Handles missing directories gracefully
- **Recursive Deletion**: Removes all nested files and subdirectories

### Fresh Build Preparation
- **Pre-build Cleanup**: Ensures clean slate for new builds
- **Dependency Reset**: Removes cached assets and generated files
- **State Reset**: Clears any build state that might cause issues
- **Performance Optimization**: Prevents disk space accumulation

## Clean Operations

### Full Clean
```bash
deno task clean
# or
deno run --allow-write scripts/clean/index.ts
```

### Clean Before Build
```bash
deno task clean && deno task build
# Ensures completely fresh build
```

## What Gets Cleaned

### Build Outputs
- **Generated HTML**: All `.html` files in `dist/`
- **Processed CSS**: All CSS files in `dist/styles/`
- **Compiled JavaScript**: All `.js` files in `dist/scripts/`
- **Copied Assets**: All files copied from `static/`

### Directory Structure
- **Component Styles**: `dist/styles/components/` and all subdirectories
- **Component Scripts**: `dist/scripts/components/` and all subdirectories
- **Static Assets**: Root-level files and subdirectories in `dist/`
- **Generated Pages**: All HTML files for routes

## Error Handling

### Missing Directory
- **Graceful Handling**: No error if `dist/` doesn't exist
- **Success Message**: Reports successful cleanup even if nothing to clean
- **Idempotent**: Safe to run multiple times

### Permission Issues
- **Clear Errors**: Reports specific files that can't be deleted
- **Partial Cleanup**: Continues cleaning accessible files
- **Recovery Guidance**: Provides instructions for fixing permission issues

### File System Errors
- **Locked Files**: Handles files that are currently in use
- **Read-only Files**: Manages read-only files appropriately
- **Network Drives**: Handles cleanup on network-mounted directories

## Use Cases

### Development Workflow
- **Build Problems**: Clean when builds produce unexpected results
- **Asset Issues**: Remove stale assets that aren't updating
- **Fresh Start**: Begin development session with clean state
- **Testing**: Ensure tests run against fresh build artifacts

### Deployment Preparation
- **Production Builds**: Clean before creating production artifacts
- **CI/CD Pipelines**: Ensure clean state in continuous integration
- **Release Process**: Start releases with clean build environment
- **Quality Assurance**: Verify builds work from clean state

### Troubleshooting
- **Debugging**: Eliminate cached or stale files as source of issues
- **Performance**: Clear accumulated build artifacts
- **Disk Space**: Free up space used by build outputs
- **Consistency**: Ensure all builds start from same clean state

## Integration with Build System

### Build Pipeline
- **Pre-build Step**: Often run before builds to ensure cleanliness
- **Post-error Cleanup**: Clean up after failed builds
- **Development Cycle**: Regular cleanup during development iterations
- **CI Integration**: Automated cleanup in continuous integration

### File Watching
- **Complement to Watching**: Clean command works alongside file watching
- **Manual Control**: Provides manual cleanup when automatic rebuilds aren't enough
- **Debug Tool**: Helps debug file watching and build issues

## Performance Characteristics

### Speed
- **Fast Deletion**: Efficient recursive directory removal
- **Minimal I/O**: Direct file system operations without scanning
- **Parallel Operations**: Concurrent file deletion where possible

### Resource Usage
- **Low Memory**: Minimal memory footprint during cleanup
- **Disk I/O**: Optimized for fast disk operations
- **System Load**: Low impact on system resources

## Safety Features

### Scope Limitation
- **Target Specific**: Only removes `dist/` directory
- **Source Protection**: Never touches source files in `src/`
- **Asset Protection**: Never removes original assets in `static/`
- **Configuration Safety**: Doesn't affect project configuration files

### Confirmation
- **Automatic Execution**: Runs without confirmation for efficiency
- **Clear Logging**: Reports what was cleaned
- **Error Reporting**: Clear messages about any issues encountered

## Maintenance

### Regular Cleanup
- **Development Practice**: Regular cleanup prevents accumulation
- **Automated Integration**: Can be automated in development workflows
- **CI/CD Usage**: Standard part of build pipelines
- **Disk Management**: Helps manage development environment disk usage

### Monitoring
- **Size Tracking**: Can monitor `dist/` directory size over time
- **Cleanup Frequency**: Track how often cleanup is needed
- **Performance Impact**: Monitor cleanup performance and optimization opportunities
