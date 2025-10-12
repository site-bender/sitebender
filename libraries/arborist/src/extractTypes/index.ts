// @sitebender/arborist/src/extractTypes
// Extracts all type aliases and interfaces from a ParsedAst using Validation monad for error accumulation
//
// IMPORTANT: SWC WASM Span Offset Bug
// ====================================
// SWC WASM has a critical bug where span offsets accumulate across multiple parse() calls.
// This makes span-based substring extraction (sourceText.substring(span.start - 1, span.end - 1))
// unreliable when parsing multiple files in sequence.
//
// Solution: We use AST node serialization instead of span-based extraction.
// The _serializeTypeAnnotation() utility converts type annotation AST nodes directly to their
// string representation, avoiding any dependency on span offsets.
//
// This allows us to:
// 1. Parse multiple files without reinitializing SWC between each parse
// 2. Extract accurate type definitions regardless of parse order
// 3. Maintain better performance by avoiding repeated SWC initialization
//
// @sitebender/arborist/src/extractTypes
// Extracts all type aliases and interfaces from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"

import type { ParsedAst, ParsedType } from "../types/index.ts"
import type { TypeExtractionError } from "../types/errors/index.ts"
import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"

import extractTypeDetails from "../_extractTypeDetails/index.ts"

//++ Extracts all type aliases and interfaces from a ParsedAst
//++ Returns Validation to accumulate extraction errors per type
//++ Continues extraction on individual failures to gather all valid types
//++ Captures the full type definition as text for documentation
export default function extractTypes(
	ast: ParsedAst,
): Validation<TypeExtractionError, ReadonlyArray<ParsedType>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as unknown as Array<unknown>

	// Filter for type declarations (both standalone and exported)
	const typeNodes = filter(
	  function isTypeDeclaration(node: unknown): boolean {
	    const nodeObj = node as Record<string, unknown>
	    const nodeType = nodeObj.type as string

	    // Direct type declarations
	    if (
	      isEqual(nodeType)("TsTypeAliasDeclaration") ||
	      isEqual(nodeType)("TsInterfaceDeclaration")
	    ) {
	      return true
	    }

	    // Export declarations that wrap types
	    if (isEqual(nodeType)("ExportDeclaration")) {
	      const decl = nodeObj.declaration as Record<string, unknown> | undefined
	      return !!((and(and(decl)(typeof decl!.type === "string"))(isEqual(decl!.type)("TsTypeAliasDeclaration"))) ||
	        (and(and(decl)(typeof decl!.type === "string"))(isEqual(decl!.type)("TsInterfaceDeclaration"))))
	    }

	    return false
	  },
	)(moduleBody as ReadonlyArray<Serializable>)

	const typeNodesArray = getOrElse([] as ReadonlyArray<unknown>)(typeNodes)

	// Extract details from each type node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractTypeDetails never fails (returns ParsedType directly)
	const typesResult = map(
	  function extractDetails(node: unknown): ParsedType {
	    return extractTypeDetails(node)(ast.sourceText)
	  },
	)(typeNodesArray as ReadonlyArray<Serializable>)

	const types = getOrElse([] as ReadonlyArray<ParsedType>)(typesResult)

	// Return success with extracted types
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid types
	return success(types)
}
