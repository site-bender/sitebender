#!/usr/bin/env -S deno run --allow-read --allow-write

async function ensureDir(path: string): Promise<void> {
  try {
    await Deno.stat(path)
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.mkdir(path, { recursive: true })
    } else {
      throw error
    }
  }
}

async function writeFileWithDir(filePath: string, content: string): Promise<void> {
  const dirPath = filePath.split('/').slice(0, -1).join('/')

  await ensureDir(dirPath)
  await Deno.writeTextFile(filePath, content)
}

const repeatString = (str, n) => str.repeat(n);

async function main() {
  console.log('🔍 Reading inheritance-types.json...')

  const jsonContent = await Deno.readTextFile('lib/components/inheritance-types-final.json')
  const inheritanceTypes: InheritanceTypes = JSON.parse(jsonContent)

  console.log(`📋 Processing ${Object.keys(inheritanceTypes).length} types...`)

	Object.entries(inheritanceTypes).map(async ([typeName, typeInfo]) => {
		if (typeName === 'Thing') {
			return
		}

		const depth = typeInfo.location.split('/').length
		const numProps = Object.keys(typeInfo.properties || {}).length
		const componentPath = `lib/components/${typeInfo.location}x`
		const path = typeInfo.location.split("/").slice(0, -1)
		// console.log(typeName, typeInfo.location, path.slice(0,-1))

		if (numProps < 1) {
			const fileString = `import ${typeName} from "../index.tsx"

export default ${typeName}
`

			if (typeName === 'Intangible') {
				console.log("Writing Intangible component with no properties:", componentPath)
			}

			writeFileWithDir(componentPath, fileString)

			return
		}

		const thingRelative = `${repeatString('../', depth - 2)}`
		const typePath = `lib/types/${typeInfo.location}`
		const typesRelative = `${repeatString('../', depth)}types/`
		const typeRelative = `${typesRelative}${typeInfo.location}`
		const parent = typeInfo.location.split("/").at(-3)
		// console.log(typeName, typeInfo.location, parent, path)
		const paths = path.map((item, index, array) => {
			const pathString = `"${typesRelative}${array.slice(0, index + 1).join('/')}/index.ts"`
			const importString = item === "Thing" ? `import type ${item}Props from ` : `import type { ${item}Props } from `

			return `${importString}${pathString}`
		}).join('\n')


		const file = `import type { BaseComponentProps, ExtractLevelProps } from "${typesRelative}index.ts"
${paths}

import ${parent} from "../index.tsx"

export type Props = BaseComponentProps<
	${typeName}Props,
	"${typeName}",
	ExtractLevelProps<${path.slice(0,-1).join('Props, ')}Props>
>

export default function ${typeName}({
	${Object.entries(typeInfo.properties || {}).map(([propName, propType]) => `${propName},`).join('\n\t')}
	schemaType = "${typeName}",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<${parent}
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				${Object.entries(typeInfo.properties || {}).map(([propName, propType]) => `${propName},`).join('\n\t\t\t\t')}
				...subtypeProperties,
			}}
		/>
	)
}
`

		if (typeName === 'Intangible') {
			console.log("Writing Intangible component with properties:", componentPath)
		}


		writeFileWithDir(componentPath, file)
	})

	// console.log("\nOutput:", JSON.stringify(out, null, 2))
}

if (import.meta.main) {
  main().catch(console.error)
}
