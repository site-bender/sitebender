#!/bin/bash
set -e

echo "🦀 Building optimized WASM for Deno AST parser..."

# Build release version
echo "📦 Building release WASM..."
cargo build --release --target wasm32-unknown-unknown

# Check if wasm-opt is available
if command -v wasm-opt &> /dev/null; then
	echo "🔧 Optimizing with wasm-opt..."
	INPUT="target/wasm32-unknown-unknown/release/arborist_deno_ast_wasm.wasm"
	OUTPUT="target/wasm32-unknown-unknown/release/arborist_deno_ast_wasm.optimized.wasm"

	wasm-opt -Oz --enable-bulk-memory --enable-nontrapping-float-to-int "$INPUT" -o "$OUTPUT"

	# Show size comparison
	echo ""
	echo "📊 Size comparison:"
	echo "  Original:  $(du -h "$INPUT" | cut -f1)"
	echo "  Optimized: $(du -h "$OUTPUT" | cut -f1)"
	echo ""
	echo "✅ Optimized WASM built: $OUTPUT"
else
	echo "⚠️  wasm-opt not found. Install with:"
	echo "    npm install -g wasm-opt"
	echo "    or: brew install binaryen"
	echo ""
	echo "✅ Release WASM built (unoptimized): target/wasm32-unknown-unknown/release/arborist_deno_ast_wasm.wasm"
fi
