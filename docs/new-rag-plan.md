# RAG Implementation Plan: Enforcement Layers

## ✅ ALL PHASES COMPLETE

### Phase 1: Constitutional Rules in System Prompts ✅ COMPLETE
- [x] Step 1.1: Extract constitutional rules from MCP server
- [x] Step 1.2: Add rules to CLAUDE.md (system instructions for all modes)
- [x] Step 1.3: Verify integration with test

### Phase 2: Pre-Generation Rule Injection ✅ COMPLETE
- [x] Step 2.1: Create task_detector.ts
- [x] Step 2.2: Create rule_mapper.ts
- [x] Step 2.3: Add mandatory workflow to CLAUDE.md
- [x] Step 2.4: Test task type detection (10 tests passing)
- [x] Step 2.5: Test rule retrieval (7 tests passing)

### Phase 3: Post-Generation Verification ✅ COMPLETE
- [x] Step 3.1: Create violation_detector.ts
- [x] Step 3.2: Create verification_pipeline.ts
- [x] Step 3.3: Add mandatory verification to CLAUDE.md
- [x] Step 3.4: Test violation detection (14 tests passing)
- [x] Step 3.5: Test blocking mechanism (11 tests passing)

### Phase 4: Intent-Based Retrieval ✅ COMPLETE
- [x] Step 4.1: Create intent_detector.ts
- [x] Step 4.2: Add intent-based encoding retrieval to CLAUDE.md
- [x] Step 4.3: Test intent detection (15 tests passing)
- [x] Step 4.4: Document encoding type mapping

### Phase 5: Confidence Scoring ✅ COMPLETE
- [x] Step 5.1: Create confidence_scorer.ts
- [x] Step 5.2: Add confidence handling to CLAUDE.md
- [x] Step 5.3: Test confidence scoring (16 tests passing)

**Total Tests: 73/73 passing ✅**

**See:** [`docs/RAG_ENFORCEMENT_COMPLETE.md`](RAG_ENFORCEMENT_COMPLETE.md:1) for complete summary

---

## Status: Foundation Complete, Enforcement Needed

**What's Done:**
- ✅ 10 Qdrant collections with rules embedded
- ✅ MCP servers configured and working
- ✅ 6-way encoding (principles, patterns, queries, anti-patterns, examples, counter-examples)
- ✅ Rich metadata structure

**What's Missing:**
- ❌ Constitutional rules in system prompts
- ❌ Pre-generation rule injection
- ❌ Post-generation verification
- ❌ Task-type auto-retrieval

---

## Phase 1: Constitutional Rules in System Prompts (CRITICAL)

### Goal
Move Layer 1 rules from RAG database into system prompts so they're ALWAYS active, never requiring retrieval.

### Implementation

**Step 1.1: Extract Constitutional Rules**

Query the `constitutional_rules` MCP server and extract these 6 core rules:

1. No classes - use pure functions only
2. No mutations - immutable data always
3. No loops - use map/filter/reduce from Toolsmith
4. No exceptions - use Result/Validation monads
5. One function per file - single responsibility
6. Pure functions - except explicit IO boundaries

**Step 1.2: Add to Kilocode System Prompts**

Location: `.kilocode/modes/*/instructions.md` files

Add this section to EVERY mode's instructions:

```markdown
## MANDATORY RULES (Non-Negotiable)

These rules are CONSTITUTIONAL and cannot be violated under any circumstances:

1. **No Classes**: Never use TypeScript classes. Use modules with pure functions.
   - Wrong: `class UserService { ... }`
   - Right: `function createUser(...) { ... }`

2. **No Mutations**: All data must be immutable. Use `const`, `Readonly<T>`, `ReadonlyArray<T>`.
   - Wrong: `array.push(item)` or `obj.prop = value`
   - Right: `[...array, item]` or `{ ...obj, prop: value }`

3. **No Loops**: Never use for/while loops. Use map/filter/reduce from Toolsmith.
   - Wrong: `for (let i = 0; i < arr.length; i++)`
   - Right: `map(fn)(array)` or `reduce(fn)(init)(array)`

4. **No Exceptions**: Never use try/catch/throw. Use Result<T,E> or Validation<T,E> monads.
   - Wrong: `throw new Error(...)` or `try { ... } catch`
   - Right: `return error({ _tag: 'ErrorType', ... })`

5. **One Function Per File**: Each file exports exactly one function (except curried inner functions).
   - File: `processUser/index.ts` exports `function processUser(...)`
   - Helpers go in nested folders: `processUser/_validateUser/index.ts`

6. **Pure Functions**: Functions must be pure (same input → same output, no side effects).
   - Exception: IO operations isolated to specific boundary functions
   - Mark IO functions clearly: `// [IO] This function performs side effects`

If you violate ANY of these rules, STOP immediately and regenerate correctly.
```

**Step 1.3: Verify Integration**

Test that modes receive these rules by:
1. Starting a new task in code mode
2. Asking AI to create a class
3. Verify AI refuses and suggests functions instead

**Success Criteria:**
- All modes have constitutional rules in instructions
- AI refuses to generate violations
- No need to query MCP for these 6 rules

---

## Phase 2: Pre-Generation Rule Injection (IMPORTANT)

### Goal
Before generating code, automatically inject relevant rules based on task type.

### Implementation

**Step 2.1: Create Task Type Detector**

File: `scripts/rag/task_detector.ts`

```typescript
type TaskType = 
  | 'error-handling'
  | 'type-definition'
  | 'testing'
  | 'async-operation'
  | 'validation'
  | 'file-operation'
  | 'component'
  | 'general'

function detectTaskType(userMessage: string): Array<TaskType> {
  const types: Array<TaskType> = []
  const lower = userMessage.toLowerCase()
  
  // Error handling
  if (lower.match(/error|fail|exception|result|validation/)) {
    types.push('error-handling')
  }
  
  // Type definitions
  if (lower.match(/type|interface|branded|discriminated|union/)) {
    types.push('type-definition')
  }
  
  // Testing
  if (lower.match(/test|spec|assert|expect|mock/)) {
    types.push('testing')
  }
  
  // Async operations
  if (lower.match(/async|await|promise|fetch|api/)) {
    types.push('async-operation')
  }
  
  // Validation
  if (lower.match(/validate|check|verify|sanitize/)) {
    types.push('validation')
  }
  
  // File operations
  if (lower.match(/file|read|write|fs|path/)) {
    types.push('file-operation')
  }
  
  // Components
  if (lower.match(/component|jsx|tsx|render|props/)) {
    types.push('component')
  }
  
  return types.length > 0 ? types : ['general']
}
```

**Step 2.2: Create Rule Retrieval Mapper**

File: `scripts/rag/rule_mapper.ts`

```typescript
type RuleSet = {
  server: string
  queries: Array<string>
}

const TASK_TO_RULES: Record<TaskType, Array<RuleSet>> = {
  'error-handling': [
    { server: 'functional_programming_rules', queries: ['Result monad', 'Validation monad'] },
    { server: 'typescript_rules', queries: ['discriminated unions', 'error types'] }
  ],
  'type-definition': [
    { server: 'typescript_rules', queries: ['branded types', 'discriminated unions', 'type-level programming'] },
    { server: 'syntax_rules', queries: ['naming conventions', 'type naming'] }
  ],
  'testing': [
    { server: 'functional_programming_rules', queries: ['pure functions', 'property testing'] }
  ],
  'async-operation': [
    { server: 'functional_programming_rules', queries: ['Promise Result', 'async error handling'] },
    { server: 'typescript_rules', queries: ['async types'] }
  ],
  'validation': [
    { server: 'functional_programming_rules', queries: ['Validation monad', 'smart constructors'] }
  ],
  'file-operation': [
    { server: 'functional_programming_rules', queries: ['IO boundaries', 'effect runners'] }
  ],
  'component': [
    { server: 'jsx_rules', queries: ['component design', 'data-as-configuration'] },
    { server: 'accessibility_rules', queries: ['semantic components', 'progressive enhancement'] }
  ],
  'general': [
    { server: 'syntax_rules', queries: ['naming', 'function declarations'] },
    { server: 'formatting_rules', queries: ['code style'] }
  ]
}

async function getRulesForTask(taskType: TaskType): Promise<Array<Rule>> {
  const ruleSets = TASK_TO_RULES[taskType]
  const rules: Array<Rule> = []
  
  for (const ruleSet of ruleSets) {
    for (const query of ruleSet.queries) {
      const results = await queryMcpServer(ruleSet.server, query)
      rules.push(...results)
    }
  }
  
  return rules
}
```

**Step 2.3: Integrate with Kilocode**

Modify Kilocode to:
1. Detect task type from user message
2. Retrieve relevant rules
3. Inject into context BEFORE code generation

Pseudo-code:
```typescript
async function beforeCodeGeneration(userMessage: string) {
  // Detect what kind of task this is
  const taskTypes = detectTaskType(userMessage)
  
  // Get relevant rules for each task type
  const allRules: Array<Rule> = []
  for (const taskType of taskTypes) {
    const rules = await getRulesForTask(taskType)
    allRules.push(...rules)
  }
  
  // Deduplicate rules
  const uniqueRules = deduplicateByRuleId(allRules)
  
  // Format for injection
  const ruleContext = formatRulesForContext(uniqueRules)
  
  // Inject into AI context
  return `
TASK TYPE DETECTED: ${taskTypes.join(', ')}

RELEVANT RULES FOR THIS TASK:
${ruleContext}

Now proceed with the task, following these rules.
`
}
```

**Success Criteria:**
- Task type correctly detected from user messages
- Relevant rules automatically retrieved
- Rules injected before code generation
- AI references rules in generated code

---

## Phase 3: Post-Generation Verification (IMPORTANT)

### Goal
After code is generated but BEFORE showing to user, check for violations and block/fix them.

### Implementation

**Step 3.1: Create Violation Detector**

File: `scripts/rag/violation_detector.ts`

```typescript
type Violation = {
  type: 'CRITICAL' | 'WARNING'
  rule: string
  line: number
  message: string
  suggestion: string
}

const CRITICAL_PATTERNS = [
  {
    pattern: /class\s+\w+/g,
    rule: 'no-classes',
    message: 'Classes are forbidden. Use pure functions.',
    suggestion: 'Convert to module with exported functions'
  },
  {
    pattern: /=>\s*[{(]/g,
    rule: 'no-arrow-functions',
    message: 'Arrow functions are forbidden. Use function keyword.',
    suggestion: 'Replace with: function name(...) { ... }'
  },
  {
    pattern: /\bfor\s*\(/g,
    rule: 'no-loops',
    message: 'For loops are forbidden. Use map/filter/reduce.',
    suggestion: 'Use Toolsmith functions: map(fn)(array)'
  },
  {
    pattern: /\bwhile\s*\(/g,
    rule: 'no-loops',
    message: 'While loops are forbidden. Use recursion or reduce.',
    suggestion: 'Use recursive function or reduce'
  },
  {
    pattern: /\btry\s*\{/g,
    rule: 'no-exceptions',
    message: 'Try-catch is forbidden. Use Result monad.',
    suggestion: 'Return Result<T, E> type instead'
  },
  {
    pattern: /\bthrow\s+/g,
    rule: 'no-exceptions',
    message: 'Throw is forbidden. Return error value.',
    suggestion: 'Return error({ _tag: "ErrorType", ... })'
  },
  {
    pattern: /\.push\(/g,
    rule: 'no-mutations',
    message: 'Array.push() is forbidden. Use spread operator.',
    suggestion: 'Use: [...array, item]'
  },
  {
    pattern: /\.pop\(/g,
    rule: 'no-mutations',
    message: 'Array.pop() is forbidden. Use slice.',
    suggestion: 'Use: array.slice(0, -1)'
  },
  {
    pattern: /\blet\s+/g,
    rule: 'no-mutations',
    message: 'Let is forbidden (except in generators). Use const.',
    suggestion: 'Use: const name = ...'
  }
]

function detectViolations(code: string): Array<Violation> {
  const violations: Array<Violation> = []
  const lines = code.split('\n')
  
  for (const patternDef of CRITICAL_PATTERNS) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Skip comments
      if (line.trim().startsWith('//')) continue
      
      // Check for pattern
      if (patternDef.pattern.test(line)) {
        violations.push({
          type: 'CRITICAL',
          rule: patternDef.rule,
          line: i + 1,
          message: patternDef.message,
          suggestion: patternDef.suggestion
        })
      }
    }
  }
  
  return violations
}
```

**Step 3.2: Create Verification Pipeline**

File: `scripts/rag/verification_pipeline.ts`

```typescript
type VerificationResult = 
  | { valid: true; code: string }
  | { valid: false; violations: Array<Violation>; code: string }

async function verifyGeneratedCode(code: string): Promise<VerificationResult> {
  // Detect violations
  const violations = detectViolations(code)
  
  if (violations.length === 0) {
    return { valid: true, code }
  }
  
  // Check if all violations are critical
  const criticalViolations = violations.filter(v => v.type === 'CRITICAL')
  
  if (criticalViolations.length > 0) {
    return {
      valid: false,
      violations: criticalViolations,
      code
    }
  }
  
  // Only warnings - allow but log
  console.warn('Code has warnings:', violations)
  return { valid: true, code }
}

function formatViolationReport(violations: Array<Violation>): string {
  return violations.map(v => `
❌ VIOLATION at line ${v.line}: ${v.rule}
   ${v.message}
   💡 Suggestion: ${v.suggestion}
`).join('\n')
}
```

**Step 3.3: Integrate with Kilocode**

After code generation:
```typescript
async function afterCodeGeneration(generatedCode: string) {
  const result = await verifyGeneratedCode(generatedCode)
  
  if (!result.valid) {
    const report = formatViolationReport(result.violations)
    
    // Block and request regeneration
    return {
      action: 'BLOCK',
      message: `
🚫 CRITICAL VIOLATIONS DETECTED

${report}

The code violates constitutional rules and cannot be presented.
Please regenerate following the rules above.
`,
      shouldRegenerate: true
    }
  }
  
  // Code is valid
  return {
    action: 'ALLOW',
    code: result.code
  }
}
```

**Success Criteria:**
- Violations detected before user sees code
- Critical violations block code presentation
- Clear suggestions provided for fixes
- AI regenerates correctly

---

## Phase 4: Task-Type Auto-Retrieval (NICE-TO-HAVE)

### Goal
When AI signals specific intent, automatically retrieve detailed patterns without explicit query.

### Implementation

**Step 4.1: Create Intent Detector**

File: `scripts/rag/intent_detector.ts`

```typescript
type Intent = {
  action: 'create' | 'modify' | 'fix' | 'explain' | 'example'
  subject: string
  context: Array<string>
}

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase()
  
  // Detect action
  let action: Intent['action'] = 'create'
  if (lower.match(/fix|repair|correct/)) action = 'fix'
  else if (lower.match(/modify|change|update|refactor/)) action = 'modify'
  else if (lower.match(/explain|why|how|what/)) action = 'explain'
  else if (lower.match(/example|show|demonstrate/)) action = 'example'
  
  // Extract subject (what they're working with)
  const subject = extractSubject(message)
  
  // Extract context keywords
  const context = extractContextKeywords(message)
  
  return { action, subject, context }
}

function extractSubject(message: string): string {
  // Look for common subjects
  const subjects = [
    'function', 'type', 'component', 'test', 'error',
    'validation', 'async', 'file', 'api', 'data'
  ]
  
  for (const subject of subjects) {
    if (message.toLowerCase().includes(subject)) {
      return subject
    }
  }
  
  return 'general'
}
```

**Step 4.2: Create Smart Retrieval**

```typescript
async function retrieveForIntent(intent: Intent): Promise<Array<Rule>> {
  const rules: Array<Rule> = []
  
  // Based on action, retrieve different encoding types
  switch (intent.action) {
    case 'create':
      // Get patterns and examples
      rules.push(...await queryByEncodingType('pattern', intent.subject))
      rules.push(...await queryByEncodingType('example', intent.subject))
      break
      
    case 'fix':
      // Get anti-patterns and correct patterns
      rules.push(...await queryByEncodingType('antipattern', intent.subject))
      rules.push(...await queryByEncodingType('pattern', intent.subject))
      break
      
    case 'explain':
      // Get principles and examples
      rules.push(...await queryByEncodingType('principle', intent.subject))
      rules.push(...await queryByEncodingType('example', intent.subject))
      break
      
    case 'example':
      // Get examples and counter-examples
      rules.push(...await queryByEncodingType('example', intent.subject))
      rules.push(...await queryByEncodingType('counterexample', intent.subject))
      break
  }
  
  return rules
}
```

**Success Criteria:**
- Intent correctly detected from natural language
- Appropriate encoding types retrieved
- Relevant rules provided without explicit query

---

## Phase 5: Confidence Scoring (NICE-TO-HAVE)

### Goal
Score retrieval relevance and handle low-confidence cases.

### Implementation

**Step 5.1: Add Confidence Calculation**

```typescript
type ScoredRule = {
  rule: Rule
  confidence: number  // 0.0 - 1.0
  relevance: 'high' | 'medium' | 'low'
}

function calculateConfidence(rule: Rule, query: string): number {
  let score = 0.0
  
  // Exact keyword match in content
  const queryWords = query.toLowerCase().split(/\s+/)
  const contentWords = rule.content.toLowerCase().split(/\s+/)
  const matches = queryWords.filter(w => contentWords.includes(w))
  score += (matches.length / queryWords.length) * 0.4
  
  // Category match
  if (query.toLowerCase().includes(rule.category)) {
    score += 0.2
  }
  
  // Priority boost
  score += (rule.priority / 10) * 0.2
  
  // Tag matches
  const tagMatches = rule.tags?.filter(tag => 
    query.toLowerCase().includes(tag.toLowerCase())
  ) || []
  score += (tagMatches.length * 0.1)
  
  return Math.min(score, 1.0)
}

function categorizeRelevance(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence > 0.85) return 'high'
  if (confidence > 0.65) return 'medium'
  return 'low'
}
```

**Step 5.2: Handle Low Confidence**

```typescript
async function handleLowConfidence(
  query: string,
  rules: Array<ScoredRule>
): Promise<Array<Rule>> {
  const highConfidence = rules.filter(r => r.relevance === 'high')
  
  if (highConfidence.length > 0) {
    // Use high confidence rules directly
    return highConfidence.map(r => r.rule)
  }
  
  const mediumConfidence = rules.filter(r => r.relevance === 'medium')
  
  if (mediumConfidence.length > 0) {
    // Present to AI for confirmation
    return await presentForConfirmation(mediumConfidence)
  }
  
  // Low confidence - expand search
  return await expandSearch(query)
}
```

**Success Criteria:**
- Confidence scores calculated for all retrievals
- High confidence rules applied directly
- Medium confidence rules confirmed with AI
- Low confidence triggers expanded search

---

## Testing Strategy

### Test 1: Constitutional Rules Always Active
```
1. Start new task in code mode
2. Ask: "Create a UserService class"
3. Expected: AI refuses, suggests functions
4. Verify: No class code generated
```

### Test 2: Task-Type Detection
```
1. Message: "Handle errors in async function"
2. Expected: Detects 'error-handling' and 'async-operation'
3. Expected: Retrieves Result monad and Promise<Result> patterns
4. Verify: Rules injected before generation
```

### Test 3: Violation Detection
```
1. Generate code with: class UserService { }
2. Expected: Verification blocks code
3. Expected: Clear violation message shown
4. Expected: Suggestion to use functions
5. Verify: Code not shown to user
```

### Test 4: Auto-Retrieval
```
1. Message: "Show me how to create a branded type"
2. Expected: Detects 'example' intent + 'type' subject
3. Expected: Retrieves examples and patterns
4. Verify: Relevant examples provided
```

---

## Success Metrics

After implementation:

1. **Constitutional Rule Compliance**: 100%
   - Zero classes, loops, mutations, exceptions in generated code

2. **Retrieval Success**: >85%
   - Relevant rules retrieved for task type

3. **Violation Detection**: >95%
   - Critical violations caught before user sees code

4. **Auto-Fix Rate**: >50%
   - At least half of violations fixed automatically

5. **User Satisfaction**: Improved
   - Fewer manual corrections needed
   - Better code quality from AI

---

## Implementation Order

**Week 1: Critical Path**
1. Phase 1: Constitutional rules in system prompts (1-2 days)
2. Phase 3: Post-generation verification (3-4 days)

**Week 2: Important Features**
3. Phase 2: Pre-generation rule injection (3-4 days)
4. Testing and refinement (2-3 days)

**Week 3: Nice-to-Have**
5. Phase 4: Task-type auto-retrieval (3-4 days)
6. Phase 5: Confidence scoring (2-3 days)

---

## Files to Create/Modify

### New Files
- `scripts/rag/task_detector.ts`
- `scripts/rag/rule_mapper.ts`
- `scripts/rag/violation_detector.ts`
- `scripts/rag/verification_pipeline.ts`
- `scripts/rag/intent_detector.ts`
- `scripts/rag/confidence_scorer.ts`

### Modified Files
- `.kilocode/modes/*/instructions.md` (add constitutional rules)
- Kilocode integration points (pre/post generation hooks)

---

## What NOT to Implement

❌ **Token-Level Monitoring** (Lines 210-229 in rag-strategy.md)
- Requires deep LLM integration we don't have
- Not feasible with current architecture

❌ **Full AST Auto-Fix** (Lines 233-265 in rag-strategy.md)
- Too complex and brittle
- Start with pattern matching instead

❌ **ML Learning System** (Lines 269-296 in rag-strategy.md)
- Requires ML infrastructure
- Manual improvement sufficient for now

---

## Maintenance

### Adding New Rules
1. Add to appropriate MCP server collection
2. Include all 6 encoding types
3. Update task-type mappings if needed
4. Update violation patterns if blocking needed

### Updating Existing Rules
1. Query MCP server for current rule
2. Modify content/examples
3. Re-embed if content changed significantly
4. Test retrieval still works

### Monitoring
- Log violation rates per session
- Track which rules are most violated
- Monitor retrieval success rates
- Review user feedback on rule helpfulness

---

## Emergency Rollback

If enforcement causes problems:

1. **Remove from system prompts**: Edit `.kilocode/modes/*/instructions.md`
2. **Disable verification**: Comment out verification pipeline
3. **Disable auto-retrieval**: Fall back to manual queries
4. **Keep MCP servers**: Database remains intact for manual use

This allows gradual rollout and quick rollback if needed.
