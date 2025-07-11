# Development Workflow

The development workflow provides live coding with automatic rebuilds, file watching, and instant feedback.

## Core Behaviors

### File Watching & Auto-Rebuild
- **Monitors**: `src/` and `static/` directories for changes
- **Triggers**: Automatic rebuilds on file modifications, additions, or deletions
- **Scope**: Watches TypeScript, TSX, CSS, and static asset files
- **Performance**: Debounced triggering prevents excessive rebuilds

### Live Development Server
- **Port**: Runs on `http://localhost:5555` by default
- **Serving**: Static files from `dist/` directory
- **Routing**: Handles SPA routing with proper fallbacks
- **Error Handling**: Displays build errors in browser and console

### Cache Invalidation Strategy
- **Problem**: Deno's module cache prevents fresh imports of changed files
- **Solution**: Subprocess-based builds with clean module resolution
- **Benefit**: Guarantees that file changes are reflected in builds
- **Trade-off**: Slightly slower builds but guaranteed accuracy

## Development Server Features

### Static File Serving
- **Root Directory**: Serves files from `dist/`
- **MIME Types**: Proper content-type headers for all file types
- **Directory Indexing**: Automatic `index.html` resolution
- **Asset Caching**: Development-appropriate cache headers

### 404 Handling
- **Missing Files**: Returns proper 404 status codes
- **SPA Support**: Falls back to `index.html` for client-side routing
- **Error Pages**: Clear error messages for debugging

### Live Rebuild Integration
- **Automatic**: No manual intervention required
- **Fast**: Optimized build pipeline for development speed
- **Feedback**: Console output shows build progress and errors
- **Recovery**: Graceful error handling with build continuation

## File Change Detection

### Watched Directories
- `src/components/` - Component file changes trigger full rebuild
- `src/routes/` - Route changes rebuild affected pages
- `src/utilities/` - Utility changes rebuild dependent components
- `static/` - Static asset changes copy files to `dist/`

### Change Types
- **File Creation**: Automatically includes new files in build
- **File Modification**: Rebuilds affected dependencies
- **File Deletion**: Removes from build and cleans up outputs
- **Directory Changes**: Handles folder creation and removal

### Debouncing Strategy
- **Window**: 100ms debounce prevents rapid successive builds
- **Batching**: Multiple changes in short timespan trigger single rebuild
- **Efficiency**: Reduces system load during heavy editing sessions

## Error Reporting

### Build Errors
- **Console Output**: Detailed error messages with file paths and line numbers
- **Browser Display**: In-browser error overlay for immediate feedback
- **Error Recovery**: Server continues running even with build failures
- **Context**: Full stack traces for TypeScript compilation errors

### File System Errors
- **Permission Issues**: Clear messages about file access problems
- **Missing Dependencies**: Reports missing imports with suggested fixes
- **Path Resolution**: Helpful messages for incorrect import paths

## Development Commands

### Start Development Server
```bash
deno task dev
# or
deno run -A scripts/serve/index.ts
```

### Manual Build During Development
```bash
deno task build
# or  
deno run -A scripts/build/buildDev/index.ts
```

### Watch-Only Mode
```bash
# File watcher without server (useful for CI/testing)
deno run -A scripts/build/buildDev/index.ts --watch
```

## Performance Optimization

### Build Speed
- **Incremental**: Only rebuilds changed components when possible
- **Parallel**: Asset processing runs concurrently
- **Caching**: Efficient file system operations with minimal I/O

### Memory Usage
- **Streaming**: Processes files without loading entire content into memory
- **Cleanup**: Proper resource cleanup between builds
- **Subprocess Isolation**: Each build runs in clean memory space

### Development vs Production
- **Source Maps**: Enabled in development for debugging
- **Minification**: Disabled in development for speed
- **Validation**: Relaxed type checking for faster iteration

## Troubleshooting

### Common Issues
- **Port Conflicts**: Server fails to start if port 5555 is in use
- **File Permissions**: Build errors due to read/write permission issues
- **Module Resolution**: Import path errors causing build failures

### Debug Strategies
- **Verbose Logging**: Enable detailed output for build diagnostics
- **Manual Build**: Run build separately to isolate server vs build issues
- **File Watching**: Check if file changes are being detected properly

### Recovery Procedures
- **Restart Server**: Fresh start resolves most caching issues
- **Clean Build**: Remove `dist/` directory and rebuild from scratch
- **Dependency Check**: Verify all imports are correct and files exist

## Related Documentation

> **📖 See Also**  
> - **[Design System](../design-system/index.md)** - CSS architecture and styling patterns for component development
> - **[Build System](../build-system/index.md)** - Static site generation pipeline details
> - **[Code Organization](../code-organization/index.md)** - File structure and import conventions
