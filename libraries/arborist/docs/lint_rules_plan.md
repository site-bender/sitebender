# Plan for Implementing Lint Rules to Prevent Rule Violations

## Problem
The arborist codebase has accumulated rule violations (like `||` operators) because there are no automated linting rules to catch them during development. This allows violations to persist and requires manual batch fixes.

## Solution
Implement ESLint rules that automatically detect and prevent functional programming rule violations during development.

## Required Lint Rules

### 1. No Logical OR Operator (`no-restricted-syntax`)
**Rule**: Prevent usage of `||` operator
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "LogicalExpression[operator='||']",
        "message": "Use 'or' from @sitebender/toolsmith/logic/or instead of || operator"
      }
    ]
  }
}
```

### 2. No Strict Equality Operator (`no-restricted-syntax`)
**Rule**: Prevent usage of `===` operator
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "BinaryExpression[operator='===']",
        "message": "Use 'isEqual' from @sitebender/toolsmith/validation/isEqual instead of === operator"
      }
    ]
  }
}
```

### 3. No Length Property Access (`no-restricted-syntax`)
**Rule**: Prevent usage of `.length` property
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "MemberExpression[property.name='length']",
        "message": "Use 'length' from @sitebender/toolsmith/array/length instead of .length property"
      }
    ]
  }
}
```

### 4. No Logical NOT Operator (`no-restricted-syntax`)
**Rule**: Prevent usage of `!` operator
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "UnaryExpression[operator='!']",
        "message": "Use 'not' from @sitebender/toolsmith/logic/not instead of ! operator"
      }
    ]
  }
}
```

### 5. No Arrow Functions (`no-restricted-syntax`)
**Rule**: Prevent usage of arrow functions
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "ArrowFunctionExpression",
        "message": "Use named function declarations instead of arrow functions"
      }
    ]
  }
}
```

### 6. No For Loops (`no-restricted-syntax`)
**Rule**: Prevent usage of for/while loops
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "ForStatement",
        "message": "Use functional iteration (map/filter/reduce) instead of for loops"
      },
      {
        "selector": "WhileStatement",
        "message": "Use functional iteration (map/filter/reduce) instead of while loops"
      },
      {
        "selector": "DoWhileStatement",
        "message": "Use functional iteration (map/filter/reduce) instead of do-while loops"
      }
    ]
  }
}
```

### 7. No Let Declarations (`no-restricted-syntax`)
**Rule**: Prevent usage of let declarations
**Configuration**:
```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "VariableDeclaration[kind='let']",
        "message": "Use const declarations only, never let"
      }
    ]
  }
}
```

## Implementation Steps

1. **Install ESLint**: Add ESLint as a dev dependency to arborist
2. **Create ESLint Config**: Add `.eslintrc.json` to arborist root with the rules above
3. **Configure TypeScript Parser**: Use `@typescript-eslint/parser` for TypeScript files
4. **Add Lint Scripts**: Add `lint` and `lint:fix` scripts to `deno.json`
5. **Integrate with CI**: Run linting in CI pipeline before tests
6. **Update Development Workflow**: Require linting to pass before commits

## ESLint Configuration File

Create `libraries/arborist/.eslintrc.json`:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "LogicalExpression[operator='||']",
        "message": "Use 'or' from @sitebender/toolsmith/logic/or instead of || operator"
      },
      {
        "selector": "BinaryExpression[operator='===']",
        "message": "Use 'isEqual' from @sitebender/toolsmith/validation/isEqual instead of === operator"
      },
      {
        "selector": "MemberExpression[property.name='length']",
        "message": "Use 'length' from @sitebender/toolsmith/array/length instead of .length property"
      },
      {
        "selector": "UnaryExpression[operator='!']",
        "message": "Use 'not' from @sitebender/toolsmith/logic/not instead of ! operator"
      },
      {
        "selector": "ArrowFunctionExpression",
        "message": "Use named function declarations instead of arrow functions"
      },
      {
        "selector": "ForStatement",
        "message": "Use functional iteration (map/filter/reduce) instead of for loops"
      },
      {
        "selector": "WhileStatement",
        "message": "Use functional iteration (map/filter/reduce) instead of while loops"
      },
      {
        "selector": "DoWhileStatement",
        "message": "Use functional iteration (map/filter/reduce) instead of do-while loops"
      },
      {
        "selector": "VariableDeclaration[kind='let']",
        "message": "Use const declarations only, never let"
      }
    ]
  }
}
```

## Scripts to Add to deno.json

```json
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  }
}
```

## Benefits

- **Prevention**: Catches violations before they enter the codebase
- **Consistency**: Ensures all developers follow the same rules
- **Automation**: No manual batch fixes needed for new violations
- **Zero Debt**: Maintains functional programming compliance automatically

## Timeline

1. **Phase 1**: Implement basic operator restriction rules (||, ===, .length, !)
2. **Phase 2**: Add syntax rules (arrow functions, loops, let)
3. **Phase 3**: Integrate with CI and development workflow
4. **Phase 4**: Add auto-fix capabilities where possible

## Testing

- Run linting on current codebase to ensure no false positives
- Test that violations are properly detected
- Verify that fixes don't break existing functionality
- Ensure linting integrates well with existing build process
