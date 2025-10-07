# Envoy API Examples

**Status:** Planning Phase - Examples show intended usage after Toolsmith dependencies are ready

Exact usage patterns for Envoy consuming Arborist output using Toolsmith monads.

## Example 1: Basic Documentation Generation

**Source File:**

```typescript
//++ Validates email address using regex pattern matching
export default function validateEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  return pattern.test(email)
}

//?? [EXAMPLE] validateEmail("test@example.com") // true
//?? [EXAMPLE] validateEmail("invalid-email") // false
//?? [GOTCHA] Does not validate against disposable email providers
```

**Arborist Output (ParsedFile):**

```typescript
{
  filePath: "/src/validateEmail/index.ts",
  functions: [{
    name: "validateEmail",
    position: { line: 2, column: 0 },
    span: { start: 73, end: 215 },
    parameters: [{
      name: "email",
      type: "string",
      optional: false,
      defaultValue: undefined
    }],
    returnType: "boolean",
    typeParameters: [],
    modifiers: {
      isExported: true,
      isDefault: true,
      isAsync: false,
      isGenerator: false,
      isArrow: false
    },
    body: {
      hasReturn: true,
      hasThrow: false,
      hasAwait: false,
      hasTryCatch: false,
      hasLoops: false,
      cyclomaticComplexity: 1
    }
  }],
  comments: [
    {
      text: "Validates email address using regex pattern matching",
      position: { line: 1, column: 0 },
      span: { start: 0, end: 58 },
      kind: "line",
      envoyMarker: { marker: "++" },
      associatedNode: "validateEmail"
    },
    {
      text: "[EXAMPLE] validateEmail(\"test@example.com\") // true",
      position: { line: 7, column: 0 },
      span: { start: 217, end: 274 },
      kind: "line",
      envoyMarker: { marker: "??" }
    },
    {
      text: "[EXAMPLE] validateEmail(\"invalid-email\") // false",
      position: { line: 8, column: 0 },
      span: { start: 276, end: 331 },
      kind: "line",
      envoyMarker: { marker: "??" }
    },
    {
      text: "[GOTCHA] Does not validate against disposable email providers",
      position: { line: 9, column: 0 },
      span: { start: 333, end: 400 },
      kind: "line",
      envoyMarker: { marker: "??" }
    }
  ],
  imports: [],
  exports: [],
  types: [],
  constants: [],
  violations: {
    hasArrowFunctions: false,
    arrowFunctions: [],
    hasClasses: false,
    classes: [],
    hasThrowStatements: false,
    throwStatements: [],
    hasTryCatch: false,
    tryCatchBlocks: [],
    hasLoops: false,
    loops: [],
    hasMutations: false,
    mutations: []
  }
}
```

**Envoy Processing:**

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import interpretComments from "@sitebender/envoy/interpretComments"
import generateDocumentation from "@sitebender/envoy/generateDocumentation"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

const result = await parseFile("/src/validateEmail/index.ts")

const doc = foldResult(
  function handleParseError(err) {
    console.error(err.message)
    return null
  }
)(function handleAST(ast) {
  const validation = buildParsedFile(ast)("/src/validateEmail/index.ts")

  return foldValidation(
    function handleExtractionErrors(errors) {
      console.warn("Some extractions failed:", errors.length)
      return null
    }
  )(function handleParsedFile(parsed) {
    const docResult = generateDocumentation(parsed)({
      format: "markdown",
      includeExamples: true
    })

    return foldResult(
      function handleDocError(err) {
        console.error(err.message)
        return null
      }
    )(function handleSuccess(documentation) {
      return documentation
    })(docResult)
  })(validation)
})(result)
```

**Envoy Output (Documentation):**

```markdown
# validateEmail

Validates email address using regex pattern matching

## Signature

```typescript
function validateEmail(email: string): boolean
```

## Parameters

- `email: string` - Email address to validate

## Returns

`boolean` - True if email is valid, false otherwise

## Properties

- ✨ Pure function (no side effects)
- ⚡ O(1) complexity
- 🛡️ No exceptions thrown
- 📊 Cyclomatic complexity: 1

## Examples

```typescript
validateEmail("test@example.com") // true
validateEmail("invalid-email") // false
```

## Gotchas

⚠️ Does not validate against disposable email providers

## Related

- [Email Validation Best Practices](./docs/email.md)
```

## Example 2: Comment Interpretation with Errors

**Arborist Output (with malformed comment):**

```typescript
{
  comments: [
    {
      text: "Validates email addresses",
      envoyMarker: { marker: "++" },
      associatedNode: "validateEmail"
    },
    {
      text: "EXAMPLE validateEmail('test@example.com')", // Missing brackets
      envoyMarker: { marker: "??" },
      associatedNode: undefined
    },
    {
      text: "Unknown marker test",
      envoyMarker: { marker: "@@" }, // Invalid marker
      associatedNode: undefined
    }
  ]
}
```

**Envoy Processing:**

```typescript
const interpretedV = interpretComments(parsed.comments)

foldValidation(
  function handleErrors(errors) {
    // Validation accumulates ALL errors
    errors.forEach(err => {
      console.warn(err.message)
      if (err.suggestion) console.log("💡", err.suggestion)
    })
    // Return partial success - valid comments still processed
    return []
  }
)(function handleSuccess(interpreted) {
  return interpreted
})(interpretedV)
```

**Envoy Errors:**

```typescript
{
  _tag: "Failure",
  errors: [
    {
      name: "interpretCommentsError",
      operation: "interpretComments",
      message: "interpretComments: Missing category brackets in help comment at line 8",
      code: "PARSE_ERROR",
      severity: "warning",
      kind: "MalformedCategory",
      comment: { text: "EXAMPLE validateEmail('test@example.com')", ... },
      suggestion: "Help comments need category brackets. Use: //?? [EXAMPLE] validateEmail('test@example.com')"
    },
    {
      name: "interpretCommentsError",
      operation: "interpretComments",
      message: "interpretComments: Unknown marker '@@' at line 10",
      code: "PARSE_ERROR",
      severity: "warning",
      kind: "UnknownMarker",
      comment: { text: "Unknown marker test", ... },
      suggestion: "Valid Envoy markers are: //++, //??, //--, //!!, //>>. Did you mean //++?"
    }
  ]
}
```

## Example 3: Full Pipeline with Error Accumulation

**Usage Pattern:**

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import interpretComments from "@sitebender/envoy/interpretComments"
import buildKnowledgeGraph from "@sitebender/envoy/buildKnowledgeGraph"
import generateDocumentation from "@sitebender/envoy/generateDocumentation"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"
import { map2 } from "@sitebender/toolsmith/monads/validation/map2"

const result = await parseFile("/src/module.ts")

const output = foldResult(
  function handleParseError(err) {
    console.error("Parse failed:", err.message)
    if (err.suggestion) console.log("💡", err.suggestion)
    return null
  }
)(function handleAST(ast) {
  const validation = buildParsedFile(ast)("/src/module.ts")

  return foldValidation(
    function handleExtractionErrors(errors) {
      console.warn(`Extraction completed with ${errors.length} error(s)`)
      errors.forEach(e => {
        console.warn(`- ${e.message}`)
        if (e.suggestion) console.warn(`  💡 ${e.suggestion}`)
      })
      return null
    }
  )(function handleParsedFile(parsed) {
    // Process comments and build graph in parallel
    const commentsV = interpretComments(parsed.comments)
    const graphV = buildKnowledgeGraph(parsed)

    // Combine validations - accumulates ALL errors
    const combined = map2(
      function combine(interpreted, graph) {
        return { interpreted, graph }
      }
    )(commentsV)(graphV)

    return foldValidation(
      function handleProcessingErrors(errors) {
        console.warn("Processing errors:", errors.length)
        errors.forEach(e => console.warn(e.message))
        return null
      }
    )(function handleProcessed({ interpreted, graph }) {
      // Generate documentation
      const docResult = generateDocumentation(parsed)({
        format: "markdown",
        includeExamples: true,
        includeGraph: true
      })

      return foldResult(
        function handleDocError(err) {
          console.error(err.message)
          return null
        }
      )(function handleSuccess(doc) {
        return { doc, graph }
      })(docResult)
    })(combined)
  })(validation)
})(result)
```

## Key Points for Envoy

1. **Syntax-Level Data** - All type information is textual, not semantic
2. **Precise Spans** - Exact character positions for all elements
3. **Comment Structure** - Raw comments with Envoy markers detected, Envoy interprets
4. **Body Analysis** - Cyclomatic complexity and pattern flags from Arborist
5. **Monadic Errors** - Result for parse, Validation for extraction/interpretation
6. **Helpful Suggestions** - All errors include actionable guidance
7. **Partial Success** - Validation allows some operations to succeed while others fail

**Envoy receives from Arborist:**
- Function metadata (name, flags, spans, positions)
- Parameter and return type text
- Generic type parameter text
- Raw comments with Envoy markers detected (not interpreted)
- Body analysis for complexity metrics
- Constitutional violation data
- Helpful error messages when issues occur

**Envoy does NOT receive:**
- SWC AST nodes (opaque ParsedAST)
- Semantic type information
- Inferred types
- Symbol tables
- Cross-file references

**Envoy provides:**
- Interpreted comment semantics
- Generated documentation (multiple formats)
- Knowledge graphs (RDF triples)
- HATEOAS navigation
- Developer experience metrics
- Real-time dashboards

---

**Remember:** Arborist detects, Envoy interprets. Clean separation of concerns.
