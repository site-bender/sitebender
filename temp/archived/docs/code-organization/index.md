# Code Organization

Code organization handles import sorting, style enforcement, and automatic code formatting to maintain consistent codebase structure.

## Core Behaviors

### Import Sorting & Grouping
- **Automatic Sorting**: Organizes imports according to predefined groups
- **Group Separation**: Adds blank lines between import groups for readability
- **Alphabetical Ordering**: Sorts imports within each group alphabetically
- **Consistency**: Ensures uniform import structure across all files

### Import Group Classification

#### Group Order (Top to Bottom)
1. **External Type Imports**: `import type { X } from "external-lib"`
2. **Local Type Imports**: `import type { Y } from "~types/Y"`
3. **External Component Imports**: `import { Button } from "preact"`
4. **External Utility Imports**: `import { map } from "ramda"`
5. **External Constants**: `import { API_URL } from "external-config"`
6. **Local Component Imports**: `import { Form } from "~components/Form"`
7. **Local Utility Imports**: `import { validate } from "~utilities/validate"`
8. **Local Constants**: `import { ENDPOINTS } from "~constants/API"`

### Style Enforcement

#### Import Alias Resolution
- **Path Mapping**: Resolves `~components/`, `~utilities/`, etc. to actual paths
- **Consistency**: Prefers aliases over relative paths for clarity
- **Group Detection**: Uses resolved paths to determine correct import groups

#### Default Import Preference
- **Utility Functions**: Converts named imports to default imports for utilities
- **Component Imports**: Maintains existing import style for components
- **Consistency**: Enforces project-wide import patterns

### File Processing

#### Scope
- **File Types**: Processes `.ts` and `.tsx` files
- **Directory Coverage**: Scans entire project recursively
- **Exclusions**: Skips test files, node_modules, and generated files

#### Processing Steps
1. **Parse Imports**: Extracts all import statements from file
2. **Classify Groups**: Determines correct group for each import
3. **Sort Within Groups**: Alphabetically sorts imports in each group
4. **Add Separators**: Inserts blank lines between groups
5. **Replace Content**: Updates file with sorted imports

## Sort Commands

### Sort All Files
```bash
deno task sort
# or
deno run --allow-all scripts/sortImports/index.ts
```

### Sort Single File
```bash
deno run --allow-read --allow-write scripts/sortImports/index.ts path/to/file.ts
```

## Example Transformations

### Before Sorting
```typescript
import { Button } from "~components/Button"
import { API_ENDPOINTS } from "~constants/API_ENDPOINTS"
import { createSupabaseClient } from "~utilities/createSupabaseClient"
import { UserType } from "~types/UserType"
import { useState } from "fresh"
import { useEffect } from "preact/hooks"
import type { ComponentType } from "preact"
import type { FreshContext } from "fresh"
```

### After Sorting
```typescript
import type { ComponentType } from "preact"
import type { FreshContext } from "fresh"

import type { UserType } from "~types/UserType"

import { useState } from "fresh"
import { useEffect } from "preact/hooks"

import { Button } from "~components/Button"

import createSupabaseClient from "~utilities/createSupabaseClient"

import { API_ENDPOINTS } from "~constants/API_ENDPOINTS"
```

## Error Handling

### Malformed Imports
- **Syntax Errors**: Reports imports that can't be parsed
- **Missing Sources**: Identifies imports with missing or incorrect paths
- **Recovery**: Continues processing other imports in the file

### File System Issues
- **Read Errors**: Handles files that can't be read
- **Write Errors**: Reports files that can't be updated
- **Permission Issues**: Clear messages about file access problems

### Import Resolution
- **Unknown Aliases**: Reports unrecognized import aliases
- **Missing Files**: Identifies imports pointing to non-existent files
- **Circular Dependencies**: Detects and reports circular import chains

## Integration with Development Workflow

### Automatic Formatting
- **Pre-commit Hooks**: Runs import sorting before commits
- **CI Validation**: Checks import order in continuous integration
- **Editor Integration**: Can be integrated with VS Code save actions

### Team Consistency
- **Uniform Style**: Ensures all team members follow same import patterns
- **Reduced Conflicts**: Minimizes merge conflicts from import reordering
- **Maintainability**: Makes codebases easier to navigate and understand

## Configuration

### Import Aliases
- **Mapping**: Defined in `deno.json` imports section
- **Resolution**: Scripts understand and use configured aliases
- **Validation**: Ensures all aliases point to existing directories

### Group Rules
- **Type Detection**: Automatically identifies type-only imports
- **Path Patterns**: Uses file paths to determine import groups
- **Override Support**: Handles special cases and exceptions

## Performance

### Processing Speed
- **Parallel Processing**: Handles multiple files concurrently
- **Efficient Parsing**: Minimal file content processing
- **Incremental Updates**: Only modifies files that need changes

### Memory Usage
- **Streaming**: Processes files without loading entire content
- **Cleanup**: Proper resource management and garbage collection
- **Scalability**: Handles large codebases efficiently

## Quality Assurance

### Validation
- **Syntax Check**: Ensures sorted imports are syntactically valid
- **Group Verification**: Confirms imports are in correct groups
- **Consistency Check**: Validates uniform style across project

### Testing
- **Behavioral Tests**: Comprehensive test suite covers all sorting scenarios
- **Edge Cases**: Tests handle malformed imports and edge cases
- **Regression Prevention**: Tests prevent sorting logic regressions

## Related Documentation

> **📖 See Also**  
> - **[Design System](../design-system/index.md)** - CSS organization and component styling patterns
> - **[Build System](../build-system/index.md)** - How code organization integrates with the build pipeline
> - **[Development Workflow](../development-workflow/index.md)** - Using code organization tools during development
