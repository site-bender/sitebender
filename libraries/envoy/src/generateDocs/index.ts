import type {
	ArboristOutput,
	Documentation,
	FunctionMetadata,
	FunctionSignature,
	GenerateOptions,
	Parameter,
	Properties,
	Result,
} from "../types/index.ts"

import parseCommentMarkers from "../comments/parseCommentMarkers/index.ts"
import { DEFAULT_OPTIONS } from "../constants/index.ts"
import buildProperties from "./buildProperties/index.ts"
import extractExamples from "./extractExamples/index.ts"
import extractLaws from "./extractLaws/index.ts"
import findDescription from "./findDescription/index.ts"
import generateOutput from "./generateOutput/index.ts"

//++ Generate documentation from Arborist's output
export default function generateDocs(
	parserOutput: ArboristOutput,
	sourceCode: string, // Raw source for Envoy's comment parsing
	options: GenerateOptions = {},
): Result<Documentation, { message: string }> {
	try {
		const opts = { ...DEFAULT_OPTIONS, ...options }
		const { functions, comments } = parserOutput

		if (functions.length === 0) {
			return {
				ok: false,
				error: { message: "No functions found in Arborist output" },
			}
		}

		const firstFunction = functions[0]
		const { signature: parserSignature, metadata } = firstFunction

		// Convert Arborist signature to legacy format
		const signature: FunctionSignature = {
			name: parserSignature.name,
			parameters: parserSignature.parameters.map((p): Parameter => ({
				name: p.name,
				type: p.type.raw,
				optional: p.isOptional,
				defaultValue: p.defaultValue,
			})),
			returnType: parserSignature.returnType.raw,
			generics: parserSignature.generics?.map((g) => ({
				name: g.name,
				constraint: g.constraint,
				default: g.default,
			})),
			isAsync: parserSignature.isAsync,
			isGenerator: parserSignature.isGenerator,
			isExported: parserSignature.isExported,
			isDefault: parserSignature.isDefault,
		}

		// Parse Envoy's comment markers - the ONLY parsing Envoy does
		const commentMarkers = parseCommentMarkers(sourceCode)

		const description = findDescription(commentMarkers, comments)
		const properties: Properties = buildProperties(parserSignature, metadata)
		const examples = extractExamples(commentMarkers, comments)
		const laws = extractLaws(comments)

		const docMetadata: FunctionMetadata = {
			signature,
			description,
			properties,
			examples,
			laws,
			relatedFunctions: [], // TODO(@parser): Arborist could provide related functions
		}

		const output = generateOutput(docMetadata, opts)

		return {
			ok: true,
			value: {
				name: signature.name,
				content: output,
				format: opts.format || "markdown",
				metadata: docMetadata,
			},
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error
					? error.message
					: "Failed to generate documentation",
			},
		}
	}
}
