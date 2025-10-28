import type { DiscriminatedUnionConfig, VariantConfig } from "./types.ts"

export async function generateDiscriminatedUnion(
	config: DiscriminatedUnionConfig,
): Promise<void> {
	const { name, variants, targetFolder, description, tagCase = "PascalCase" } =
		config

	const basePath = targetFolder
		? `${targetFolder}/types/${name}`
		: `types/${name}`

	// Create directory
	await Deno.mkdir(basePath, { recursive: true })

	// Generate union type definition
	await Deno.writeTextFile(
		`${basePath}/index.ts`,
		generateUnionType(name, variants, description, tagCase),
	)

	console.log(`✅ Generated discriminated union: ${name}`)
	console.log(`   Type definition: ${basePath}/index.ts`)
}

function generateUnionType(
	name: string,
	variants: ReadonlyArray<VariantConfig>,
	description: string | undefined,
	tagCase: "PascalCase" | "lowercase",
): string {
	const descriptionComment = description ? `/*++\n + ${description}\n */\n` : ""

	const variantTypes = variants
		.map(function generateVariantWithTagCase(variant) {
			return generateVariant(variant, tagCase)
		})
		.join("\n\n")

	const genericParams = getUnionGenericParams(variants)
	const genericDef = genericParams ? `<${genericParams}>` : ""

	const unionTypeNames = variants
		.map(function buildVariantTypeName(v) {
			const variantGenerics = getGenericParams(v)
			return variantGenerics ? `${v.name}<${variantGenerics}>` : v.name
		})
		.join(" | ")

	const helperExtracts = variants
		.map(function buildHelperExtract(variant) {
			const variantGenerics = getGenericParams(variant)
			const helperGenericDef = variantGenerics ? `<${variantGenerics}>` : ""
			const extractGenericParams = genericParams || ""
			return `export type ${variant.name}Type${helperGenericDef} = Extract<${name}<${extractGenericParams}>, { _tag: "${
				getTagName(variant.name, tagCase)
			}" }>`
		})
		.join("\n")

	const typeGuards = variants
		.map(function buildTypeGuard(variant) {
			return generateTypeGuard(name, variant, tagCase, genericParams)
		})
		.join("\n\n")

	return `${descriptionComment}${variantTypes}

export type ${name}${genericDef} = ${unionTypeNames}

${helperExtracts}

${typeGuards}
`
}

function generateVariant(
	variant: VariantConfig,
	tagCase: "PascalCase" | "lowercase",
): string {
	const { name, properties = [] } = variant
	const tag = getTagName(name, tagCase)

	const genericParams = properties
		.filter(function filterGenericTypes(p) {
			return isGenericType(p.type)
		})
		.map(function extractType(p) {
			return p.type
		})

	const genericDef = genericParams.length > 0
		? `<${genericParams.join(", ")}>`
		: ""

	const propsLines = properties.length > 0
		? properties.map(function buildPropertyLine(prop) {
			return `\treadonly ${prop.name}: ${prop.type}`
		}).join("\n")
		: ""

	return `export type ${name}${genericDef} = {
	readonly _tag: "${tag}"${properties.length > 0 ? "\n" + propsLines : ""}
}`
}

function generateTypeGuard(
	unionName: string,
	variant: VariantConfig,
	tagCase: "PascalCase" | "lowercase",
	unionGenericParams: string,
): string {
	const tag = getTagName(variant.name, tagCase)
	const _lowerName = variant.name.charAt(0).toLowerCase() + variant.name.slice(1)
	const functionName = `is${variant.name}`

	const variantGenericParams = getGenericParams(variant)
	const genericDef = unionGenericParams ? `<${unionGenericParams}>` : ""
	const variantGenericDef = variantGenericParams
		? `<${variantGenericParams}>`
		: ""

	return `export function ${functionName}${genericDef}(value: ${unionName}${genericDef}): value is ${variant.name}${variantGenericDef} {
	return value._tag === "${tag}"
}`
}

function getTagName(
	variantName: string,
	tagCase: "PascalCase" | "lowercase",
): string {
	return tagCase === "lowercase"
		? variantName.charAt(0).toLowerCase() + variantName.slice(1)
		: variantName
}

function isGenericType(type: string): boolean {
	return /^[A-Z]$/.test(type) || /^[A-Z][a-z]*$/.test(type)
}

function getGenericParams(variant: VariantConfig): string {
	const generics = (variant.properties || [])
		.filter(function filterGenericProperties(p) {
			return isGenericType(p.type)
		})
		.map(function extractPropertyType(p) {
			return p.type
		})

	return generics.length > 0 ? generics.join(", ") : ""
}

function getUnionGenericParams(
	variants: ReadonlyArray<VariantConfig>,
): string {
	const allGenerics = variants.reduce(
		function collectGenerics(acc, variant) {
			const variantGenerics = (variant.properties || []).reduce(
				function collectPropertyGenerics(propAcc, prop) {
					if (isGenericType(prop.type)) {
						propAcc.add(prop.type)
					}
					return propAcc
				},
				acc
			)
			return variantGenerics
		},
		new Set<string>()
	)

	return Array.from(allGenerics).join(", ")
}
