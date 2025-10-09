use deno_ast::parse_module;
use deno_ast::swc::common::FileName;
use deno_ast::swc::common::SourceMap;
use swc_ecma_visit::Visit;
use deno_ast::MediaType;
use deno_ast::ParseParams;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use std::collections::HashMap;
use std::sync::Arc;
use url::Url;

// Set up the panic hook for better error messages in WASM
#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}

// Serializable types for WASM interop
#[derive(Serialize, Deserialize)]
pub struct WasmSemanticInfo {
    pub inferred_types: HashMap<String, String>,
    pub purity: WasmPurityAnalysis,
    pub complexity: WasmComplexityMetrics,
    pub mathematical_properties: WasmMathematicalProperties,
    pub symbol_table: HashMap<String, WasmSymbolInfo>,
    pub diagnostics: Vec<WasmDiagnostic>,
    pub type_dependencies: HashMap<String, Vec<String>>,
}

#[derive(Serialize, Deserialize)]
pub struct WasmPurityAnalysis {
    pub is_pure: bool,
    pub reasons: Vec<String>,
    pub side_effects: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct WasmComplexityMetrics {
    pub cyclomatic: u32,
    pub cognitive: u32,
    pub halstead: WasmHalsteadMetrics,
}

#[derive(Serialize, Deserialize)]
pub struct WasmHalsteadMetrics {
    pub volume: f64,
    pub difficulty: f64,
    pub effort: f64,
}

#[derive(Serialize, Deserialize)]
pub struct WasmMathematicalProperties {
    pub commutative: Option<bool>,
    pub associative: Option<bool>,
    pub idempotent: Option<bool>,
    pub distributive: Option<bool>,
    pub invertible: Option<bool>,
}

#[derive(Serialize, Deserialize)]
pub struct WasmSymbolInfo {
    pub name: String,
    pub kind: String,
    pub symbol_type: String,
    pub is_exported: bool,
    pub definition: Option<WasmSourceLocation>,
    pub references: Vec<WasmSourceLocation>,
}

#[derive(Serialize, Deserialize)]
pub struct WasmSourceLocation {
    pub file: String,
    pub line: u32,
    pub column: u32,
    pub start: u32,
    pub end: u32,
}

#[derive(Serialize, Deserialize)]
pub struct WasmDiagnostic {
    pub level: String,
    pub message: String,
    pub location: Option<WasmSourceLocation>,
}

// Semantic analysis visitor
struct SemanticVisitor {
    symbols: HashMap<String, WasmSymbolInfo>,
    inferred_types: HashMap<String, String>,
    complexity: WasmComplexityMetrics,
    purity: WasmPurityAnalysis,
}

impl SemanticVisitor {
    fn new() -> Self {
        SemanticVisitor {
            symbols: HashMap::new(),
            inferred_types: HashMap::new(),
            complexity: WasmComplexityMetrics {
                cyclomatic: 1,
                cognitive: 1,
                halstead: WasmHalsteadMetrics {
                    volume: 0.0,
                    difficulty: 1.0,
                    effort: 0.0,
                },
            },
            purity: WasmPurityAnalysis {
                is_pure: true,
                reasons: vec![],
                side_effects: vec![],
            },
        }
    }
}

impl Visit for SemanticVisitor {
    fn visit_var_decl(&mut self, var_decl: &deno_ast::swc::ast::VarDecl) {
        for decl in &var_decl.decls {
            if let Some(name) = decl.name.as_ident() {
                let symbol = WasmSymbolInfo {
                    name: name.sym.to_string(),
                    kind: "variable".to_string(),
                    symbol_type: "unknown".to_string(), // TODO: Infer from init
                    is_exported: false,
                    definition: None,
                    references: vec![],
                };
                self.symbols.insert(name.sym.to_string(), symbol);

                // Type inference from initializer
                if let Some(init) = &decl.init {
                    match init.as_ref() {
                        deno_ast::swc::ast::Expr::Lit(lit) => {
                            let type_str = match lit {
                                deno_ast::swc::ast::Lit::Str(_) => "string",
                                deno_ast::swc::ast::Lit::Bool(_) => "boolean",
                                deno_ast::swc::ast::Lit::Num(_) => "number",
                                _ => "unknown",
                            };
                            self.inferred_types.insert(name.sym.to_string(), type_str.to_string());
                        }
                        _ => {}
                    }
                }
            }
        }
    }

    fn visit_fn_decl(&mut self, fn_decl: &deno_ast::swc::ast::FnDecl) {
        let symbol = WasmSymbolInfo {
            name: fn_decl.ident.sym.to_string(),
            kind: "function".to_string(),
            symbol_type: "function".to_string(),
            is_exported: false,
            definition: None,
            references: vec![],
        };
        self.symbols.insert(fn_decl.ident.sym.to_string(), symbol);

        // Increase complexity
        self.complexity.cyclomatic += 1;

        // Visit body for purity
        if let Some(body) = &fn_decl.function.body {
            self.visit_block_stmt(body);
        }
    }

    fn visit_call_expr(&mut self, call: &deno_ast::swc::ast::CallExpr) {
        // Check for impure calls
        if let deno_ast::swc::ast::Callee::Expr(expr) = &call.callee {
            if let deno_ast::swc::ast::Expr::Ident(ident) = &**expr {
                if ident.sym == "console" || ident.sym == "Math" {
                    self.purity.is_pure = false;
                    self.purity.side_effects.push("External function call".to_string());
                }
            }
        }
    }

    fn visit_if_stmt(&mut self, _if_stmt: &deno_ast::swc::ast::IfStmt) {
        self.complexity.cyclomatic += 1;
    }

    fn visit_for_stmt(&mut self, _for_stmt: &deno_ast::swc::ast::ForStmt) {
        self.complexity.cyclomatic += 1;
    }

    fn visit_while_stmt(&mut self, _while_stmt: &deno_ast::swc::ast::WhileStmt) {
        self.complexity.cyclomatic += 1;
    }
}


#[derive(Serialize, Deserialize)]
pub struct WasmSemanticAst {
    pub module: serde_json::Value, // Serialized Program AST
    pub source_text: String,
    pub file_path: String,
    pub semantic_info: WasmSemanticInfo,
}

// Main parsing function exposed to JavaScript
#[wasm_bindgen]
pub fn parse_with_semantics(source_text: &str, file_path: &str) -> Result<JsValue, JsValue> {
    // Parse the source code
    let source_map = SourceMap::default();
    let file_name = FileName::Custom(file_path.to_string());

    let specifier = Url::parse(&format!("file://{}", file_path)).unwrap_or_else(|_| Url::parse("file:///unknown").unwrap());
    let text: Arc<str> = Arc::from(source_text);

    let media_type = if file_path.ends_with(".tsx") {
        MediaType::Tsx
    } else if file_path.ends_with(".ts") {
        MediaType::TypeScript
    } else if file_path.ends_with(".js") {
        MediaType::JavaScript
    } else if file_path.ends_with(".jsx") {
        MediaType::Jsx
    } else {
        MediaType::TypeScript
    };

    let parse_result = parse_module(ParseParams {
        specifier,
        text,
        media_type,
        capture_tokens: true,
        scope_analysis: true,
        maybe_syntax: None,
    });

    match parse_result {
        Ok(parsed_source) => {
            let program = parsed_source.program();

            // Extract semantic information
            let semantic_info = extract_semantic_info(&parsed_source, source_text, file_path);

            // Serialize the program AST
            let module = serde_json::to_value(&program)
                .map_err(|e| JsValue::from_str(&format!("AST serialization error: {}", e)))?;

            let semantic_ast = WasmSemanticAst {
                module,
                source_text: source_text.to_string(),
                file_path: file_path.to_string(),
                semantic_info,
            };

            // Serialize to JavaScript
            serde_wasm_bindgen::to_value(&semantic_ast)
                .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
        }
        Err(parse_error) => {
            Err(JsValue::from_str(&format!("Parse error: {:?}", parse_error)))
        }
    }
}

// Extract semantic information from parsed source
fn extract_semantic_info(parsed_source: &deno_ast::ParsedSource, source_text: &str, file_path: &str) -> WasmSemanticInfo {
    let mut visitor = SemanticVisitor::new();

    // Visit the AST
    visitor.visit_program(&parsed_source.program());

    // Basic metrics
    let lines = source_text.lines().count() as f64;
    let characters = source_text.len() as f64;
    let volume = lines * (characters / lines).ln(); // Simplified Halstead volume

    // Update complexity with basic metrics
    visitor.complexity.halstead.volume = volume;
    visitor.complexity.halstead.effort = volume * visitor.complexity.halstead.difficulty;

    WasmSemanticInfo {
        inferred_types: visitor.inferred_types,
        purity: visitor.purity,
        complexity: visitor.complexity,
        mathematical_properties: WasmMathematicalProperties {
            commutative: None,
            associative: None,
            idempotent: None,
            distributive: None,
            invertible: None,
        },
        symbol_table: visitor.symbols,
        diagnostics: vec![],
        type_dependencies: HashMap::new(),
    }
}
