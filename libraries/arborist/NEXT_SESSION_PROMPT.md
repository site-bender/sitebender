# Function Refactoring Task

## Objective
Refactor a TypeScript file by moving every function in it into its own dedicated folder, following strict architectural rules. This eliminates "utils" folders and ensures proper encapsulation.

## Rules to Follow

### 1. Function Analysis
- Identify ALL functions in the target file (including nested functions, arrow functions, etc.)
- Determine which functions are part of the public API (exported from the library)
- Determine which functions are internal/private helpers

### 2. Folder Naming and Placement
- **API Functions** (part of library exports): Use function name as folder name (no underscore)
- **Private Functions** (internal only): Prepend underscore to function name for folder name
- **Placement**: Place folders at the lowest common ancestor folder where every function that uses it is below that folder
  - If used by only one other folder: place in that folder's directory
  - If used by multiple folders: place at their common ancestor (usually `src/`)

### 3. File Structure
Each function gets its own folder with `index.ts` containing:
```typescript
//++ [Description of what the function does]
export default function [functionName]([params]): [returnType] {
  // function body
}
```

### 4. Import/Export Updates
- Update all files that import the moved functions
- Remove function definitions from the original file
- Add proper imports to the original file for any functions it still needs
- Ensure all type imports are preserved

### 5. Testing Requirements
- Run ALL tests in the affected library to ensure nothing is broken
- Specifically run tests for the refactored file and any dependent files
- Verify that the library's main functionality still works
- Check that no TypeScript errors remain

## Step-by-Step Process

1. **Read the target file** and identify all functions
2. **Analyze dependencies** - where each function is used
3. **Determine placement** for each function folder
4. **Create folders and files** for each function
5. **Update imports** in all affected files
6. **Remove functions** from the original file
7. **Run comprehensive tests** to verify correctness
8. **Clean up** any empty directories if needed

## Critical Checks
- ✅ All functions moved to their own folders
- ✅ Correct naming (underscore for private functions)
- ✅ Proper placement at lowest common ancestor
- ✅ All imports updated correctly
- ✅ No TypeScript errors
- ✅ All tests pass (run with full permissions: `--allow-read --allow-write --allow-run`)
- ✅ Library functionality preserved

## Example
For a file `src/extractSomething/index.ts` with functions:
- `extractSomething` (API function)
- `isValidNode` (private helper)
- `processNode` (private helper used by isValidNode)

Result:
- `src/extractSomething/index.ts` (keeps API function, imports helpers)
- `src/_isValidNode/index.ts` (private helper)
- `src/_processNode/index.ts` (private helper)

## Target File
[User will specify the file path here]
