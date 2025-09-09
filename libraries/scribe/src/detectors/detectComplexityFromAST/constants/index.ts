//++ Constants for detecting complexity in AST

// SyntaxKind values for control flow statements
export const IF_STATEMENT_KIND = 237 // IfStatement
export const WHILE_STATEMENT_KIND = 238 // WhileStatement
export const DO_STATEMENT_KIND = 239 // DoStatement
export const FOR_STATEMENT_KIND = 240 // ForStatement
export const FOR_IN_STATEMENT_KIND = 241 // ForInStatement
export const FOR_OF_STATEMENT_KIND = 242 // ForOfStatement
export const SWITCH_STATEMENT_KIND = 244 // SwitchStatement
export const CASE_CLAUSE_KIND = 289 // CaseClause
export const CONDITIONAL_EXPRESSION_KIND = 223 // ConditionalExpression (ternary)
export const CATCH_CLAUSE_KIND = 292 // CatchClause
export const WITH_STATEMENT_KIND = 245 // WithStatement

// Logical operators that add complexity
export const LOGICAL_AND_KIND = 55 // AmpersandAmpersandToken
export const LOGICAL_OR_KIND = 56 // BarBarToken
export const NULLISH_COALESCING_KIND = 60 // QuestionQuestionToken

// Patterns that indicate loops in text
export const LOOP_PATTERNS = [
	"for (",
	"for(",
	"while (",
	"while(",
	"do {",
	"do{",
	".forEach(",
	".map(",
	".filter(",
	".reduce(",
	".find(",
	".some(",
	".every(",
]

// Patterns that indicate conditionals
export const CONDITIONAL_PATTERNS = [
	"if (",
	"if(",
	"else if",
	"switch (",
	"switch(",
	"case ",
	"? ",
	" && ",
	" || ",
	" ?? ",
]
