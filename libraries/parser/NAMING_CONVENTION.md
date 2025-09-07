# Naming Convention for Initialisms and Acronyms

## The Rule

When using initialisms (like AST, API) or acronyms in camelCase or PascalCase:
- **Only capitalize the first letter**
- Treat them as regular words

## Examples

### ✅ CORRECT
- `AstNode` (not ASTNode)
- `ApiClient` (not APIClient) 
- `HtmlParser` (not HTMLParser)
- `JsonResponse` (not JSONResponse)
- `parseAst` (not parseAST)
- `getApiUrl` (not getAPIUrl)

### ❌ WRONG
- `ASTNode`
- `APIClient`
- `HTMLParser`
- `JSONResponse`

## Why?

This ensures clean conversion to other cases:
- `AstNode` → `ast-node` (kebab-case) ✅
- `ASTNode` → `a-s-t-node` (kebab-case) ❌

- `ApiClient` → `api_client` (snake_case) ✅
- `APIClient` → `a_p_i_client` (snake_case) ❌

## Exception: Standalone Usage

When used standalone (not part of a compound name):
- File extensions: `.ts`, `.js`, `.html` 
- Type/constant names that are JUST the initialism: `type Ast = ...`
- Comments and documentation can use full caps: "Uses the AST to..."