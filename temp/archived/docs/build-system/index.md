# Build System

The build system transforms source code and assets into a deployable static site through a functional, pipeline-based architecture.

## Core Behaviors

### Static Site Generation
- **Input**: Source files in `src/` and static assets in `static/`
- **Output**: Production-ready HTML, CSS, and JavaScript in `dist/`
- **Process**: Multi-stage pipeline with asset discovery and dependency resolution

### Asset Discovery & Injection
- **Automatic Detection**: Recursively analyzes component imports to discover required CSS and JS files
- **Dependency Resolution**: Builds complete dependency trees for each page
- **Asset Deduplication**: Ensures each asset is included only once per page
- **Intelligent Injection**: Injects `<link>` and `<script>` tags in the correct order

### File Processing Pipeline

#### Stage 1: Static Asset Copying
- Preserves directory structure from `static/` to `dist/`
- Handles all file types (images, fonts, icons, etc.)
- Maintains file integrity and permissions

#### Stage 2: Component Style Processing
- Scans `src/components/` recursively for CSS files
- Converts PascalCase folder names to kebab-case URLs
- Copies to `dist/styles/components/` with proper structure

#### Stage 3: Component Script Compilation
- Finds TypeScript files in component directories
- Excludes server-side files (`.tsx`, test files)
- Transpiles `.ts` to `.js` for client-side execution
- Outputs to `dist/scripts/components/` with kebab-case paths

#### Stage 4: Page Generation
- Processes all pages in `src/routes/`
- Renders TSX components to HTML strings
- Wraps pages with `_app.tsx` layout
- Injects discovered assets into HTML head
- Pretty-prints final HTML output

## Key Outcomes

### For Development
- **Fast Builds**: Optimized pipeline stages run efficiently
- **Accurate Dependencies**: All required assets are automatically included
- **Clean Output**: Well-structured, readable HTML and file organization

### For Production
- **Optimized Assets**: Minified and properly organized for edge deployment
- **Cache-Friendly**: Consistent file naming and structure for CDN caching
- **SEO-Ready**: Proper HTML structure with all assets in the document head

## Error Handling

### Missing Dependencies
- Graceful handling of missing CSS or JS files
- Clear error messages indicating missing files and expected locations
- Build continues with warnings rather than failing completely

### Malformed Components
- Catches and reports TSX compilation errors
- Provides file-specific error context
- Prevents broken components from breaking the entire build

### File System Issues
- Handles permission errors gracefully
- Reports inaccessible files with clear messages
- Continues processing available files

## Build Variants

### Development Build (`scripts/build/buildDev/`)
- Faster compilation with minimal optimization
- Source maps for debugging
- Unminified output for easier inspection

### Production Build (`scripts/build/`)
- Full optimization and minification
- Asset fingerprinting for cache busting
- Production-ready output for deployment

## Performance Characteristics

### Build Speed
- Parallel processing where possible
- Efficient file system operations
- Minimal redundant work across pipeline stages

### Output Size
- Automatic asset deduplication
- Efficient CSS and JS bundling
- Optimized HTML structure

### Memory Usage
- Streaming file processing
- Minimal in-memory buffering
- Efficient garbage collection patterns

## Related Documentation

> **📖 See Also**  
> - **[Design System](../design-system/index.md)** - CSS architecture, progressive enhancement, and styling patterns processed by the build system
> - **[Development Workflow](../development-workflow/index.md)** - Live development with auto-rebuild
> - **[Code Organization](../code-organization/index.md)** - Component and file structure conventions
