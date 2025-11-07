Yes—pair SWC for fast emit with TypeScript’s checker for full inferred types.

SWC is great for transpile/minify, but it doesn’t perform semantic type inference. To get accurate parameter and return types (including curried functions) while keeping builds fast, use a two-track pipeline:
• Use SWC to compile/transpile JavaScript/TypeScript for runtime.
• Use TypeScript’s compiler API (or ts-morph) to extract types, names, and JSDoc for documentation. Optionally emit .d.ts and read those.

Here are practical setups you can adopt.

Option 1: Parallel SWC build + TSC declaration emit
• SWC handles the JS build quickly.
• TSC emits declarations with full inference; your doc tool reads .d.ts for types and source for names/comments.

tsconfig for declarations:// tsconfig.types.json
{
"extends": "./tsconfig.json",
"compilerOptions": {
"declaration": true,
"emitDeclarationOnly": true,
"outDir": "dist/types",
"composite": true,
"incremental": true,
"skipLibCheck": true
},
"include": ["src"]
}

SWC config:// .swcrc
{
"jsc": {
"parser": { "syntax": "typescript", "tsx": false },
"target": "es2020",
"externalHelpers": true
},
"module": { "type": "es6" },
"minify": false,
"sourceMaps": true
}

Run both in parallel:swc src -d dist/js &
tsc -p tsconfig.types.json &
wait

Your doc generator then consumes dist/types/*.d.ts, which will have the inferred outer return types (e.g., multiply: (multiplicand: number) => (multiplier: number) => number) without requiring you to annotate them.

Option 2: Use the TypeScript checker directly (no emit)

For maximum flexibility, query the TypeScript checker for signatures and types; keep SWC purely for emit.

Minimal example that infers the curried return type:// tools/extractTypes.ts
import ts from "typescript";

function createProgram(projectPath: string) {
const configPath = ts.findConfigFile(projectPath, ts.sys.fileExists, "tsconfig.json");
if (!configPath) throw new Error("tsconfig.json not found");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, projectPath);
return ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
}

function typeToString(checker: ts.TypeChecker, type: ts.Type) {
return checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);
}

function extractFunctionInfo(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
const results: any[] = [];
const visit = (node: ts.Node) => {
if (ts.isFunctionDeclaration(node) && node.name) {
const symbol = checker.getSymbolAtLocation(node.name);
if (symbol) {
const type = checker.getTypeOfSymbolAtLocation(symbol, node);
const sigs = type.getCallSignatures();
const sig = sigs[0];
if (sig) {
const returnType = sig.getReturnType(); // this will be inferred
results.push({
name: node.name.getText(),
params: sig.getParameters().map(p => ({
name: p.getName(),
type: typeToString(checker, checker.getTypeOfSymbolAtLocation(p, node))
})),
returnType: typeToString(checker, returnType)
});
}
}
}
ts.forEachChild(node, visit);
};
visit(sourceFile);
return results;
}

const program = createProgram(process.cwd());
const checker = program.getTypeChecker();

for (const sf of program.getSourceFiles()) {
if (sf.isDeclarationFile) continue;
const info = extractFunctionInfo(sf, checker);
info.forEach(i => {
console.log(`${i.name}(${i.params.map(p =>`${p.name}: ${p.type}`).join(", ")}): ${i.returnType}`);
});
}

Given your example, the printed return type will be the inferred function type, not unknown.

Notes:
• The checker returns rich types (including generics and unions). Use ‎⁠checker.getSignaturesOfType⁠ and ‎⁠checker.getReturnTypeOfSignature⁠ if you need overloads.
• You can also read JSDoc from ‎⁠symbol.getJsDocTags()⁠ and ‎⁠ts.getJSDocCommentsAndTags(node)⁠.

Option 3: ts-morph convenience wrapper

ts-morph wraps the TypeScript API and simplifies traversal and formatting, while still giving full inference.// tools/extractWithTsMorph.ts
import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
project.addSourceFilesAtPaths("src/**/*.ts");

for (const sf of project.getSourceFiles()) {
for (const fn of sf.getFunctions()) {
const sig = fn.getSignature();
const params = sig.getParameters().map(p => ({
name: p.getName(),
type: p.getTypeAtLocation(fn).getText()
}));
const returnType = sig.getReturnType().getText();
console.log(`${fn.getName()}(${params.map(p =>`${p.name}: ${p.type}`).join(", ")}): ${returnType}`);
}
}

ts-morph handles edge cases like ambient types and project config, and it’s typically simpler for documentation extraction.

Performance tips
• Use composite + incremental TSC builds to cache type information; subsequent runs to emit .d.ts or query the checker are much faster.
• Set skipLibCheck: true to avoid expensive node_modules type checking when you don’t need it.
• Limit the program to your doc-relevant files (include/exclude in a separate tsconfig for docs).
• Run SWC and type extraction in parallel; their work is independent.
• If you use paths/aliases, rely on tsconfig paths and the checker; avoid custom resolvers in your doc tool.

Bottom line

Keep SWC for speed where syntax-only transforms suffice, and lean on the TypeScript checker (directly or via ts-morph, or via emitted .d.ts) to get complete, inferred types and parameter names for your documentation—no need to add outer return annotations for curried functions.
