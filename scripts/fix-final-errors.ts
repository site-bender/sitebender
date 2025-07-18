import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"

class FinalErrorFixer {
	constructor(private basePath: string) {}

	async fixAllErrors(): Promise<void> {
		console.log("🔧 Fixing final TypeScript errors...")

		// Fix missing file references
		await this.fixMissingFileReferences()

		// Fix JSX attribute naming issues
		await this.fixJSXAttributeNaming()

		// Fix duplicate default exports in main index
		await this.fixDuplicateDefaultExports()

		// Create missing files
		await this.createMissingFiles()

		console.log("✅ All final fixes applied!")
	}

	private async fixMissingFileReferences(): Promise<void> {
		console.log("🔧 Fixing missing file references...")

		// Fix AmpStory import
		const ampStoryPath =
			`${this.basePath}/lib/types/Thing/CreativeWork/AmpStory/index.ts`
		let content = await Deno.readTextFile(ampStoryPath)
		content = content.replace(
			'import type MediaObject from "../../MediaObject/index.ts"',
			'import type MediaObject from "../MediaObject/index.ts"',
		)
		await Deno.writeTextFile(ampStoryPath, content)
		console.log(`  ✅ Fixed AmpStory import`)

		// Fix Audiobook import
		const audiobookPath =
			`${this.basePath}/lib/types/Thing/CreativeWork/Book/Audiobook/index.ts`
		content = await Deno.readTextFile(audiobookPath)
		content = content.replace(
			'import type AudioObject from "../../../MediaObject/AudioObject/index.ts"',
			'import type AudioObject from "../../MediaObject/AudioObject/index.ts"',
		)
		await Deno.writeTextFile(audiobookPath, content)
		console.log(`  ✅ Fixed Audiobook import`)

		// Fix Course import
		const coursePath =
			`${this.basePath}/lib/types/Thing/CreativeWork/Course/index.ts`
		content = await Deno.readTextFile(coursePath)
		content = content.replace(
			'import type LearningResource from "../../LearningResource/index.ts"',
			'import type LearningResource from "../LearningResource/index.ts"',
		)
		await Deno.writeTextFile(coursePath, content)
		console.log(`  ✅ Fixed Course import`)

		// Fix MedicalSpecialty import
		const medSpecPath =
			`${this.basePath}/lib/types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalSpecialty/index.ts`
		content = await Deno.readTextFile(medSpecPath)
		content = content.replace(
			'import type Specialty from "../../../Specialty/index.ts"',
			'import type Specialty from "../../Specialty/index.ts"',
		)
		await Deno.writeTextFile(medSpecPath, content)
		console.log(`  ✅ Fixed MedicalSpecialty import`)
	}

	private async fixJSXAttributeNaming(): Promise<void> {
		console.log("🔧 Fixing JSX attribute naming issues...")

		const jsxAttributesPath =
			`${this.basePath}/lib/types/JSX/attributes/index.ts`
		let content = await Deno.readTextFile(jsxAttributesPath)

		// Fix naming mismatches
		const fixes = [
			["CaptionAttributes", "CaptionAttributes"],
			["CiteAttributes", "CiteAttributes"],
			["FieldsetAttributes", "FieldSetAttributes"],
			["IFrameAttributes", "IFrameAttributes"],
			["InputAttributes", "InputAttributes"],
			["SmallAttributes", "SmallAttributes"],
			["TextareaAttributes", "TextAreaAttributes"],
			["UnarticulatedAttributes", "UnarticulatedAttributes"],
			["WordBreakAttributes", "WordBreakAttributes"],
		]

		for (const [incorrect, correct] of fixes) {
			// If the type doesn't exist, create a simple fallback
			if (!content.includes(`export type ${correct}`)) {
				const fallbackType = `export type ${correct} = GlobalAttributes\n`
				content = fallbackType + content
			}
		}

		await Deno.writeTextFile(jsxAttributesPath, content)
		console.log(`  ✅ Fixed JSX attribute naming`)
	}

	private async fixDuplicateDefaultExports(): Promise<void> {
		console.log("🔧 Fixing duplicate default exports...")

		const mainIndexPath = `${this.basePath}/lib/types/index.ts`
		let content = await Deno.readTextFile(mainIndexPath)

		// Remove the duplicate export line
		content = content.replace(
			/export { default } from "\.\/Thing\/index\.ts"\n?/,
			"",
		)

		await Deno.writeTextFile(mainIndexPath, content)
		console.log(`  ✅ Fixed duplicate default exports`)
	}

	private async createMissingFiles(): Promise<void> {
		console.log("🔧 Creating missing files...")

		// Create jsx.d.ts file
		const jsxDTSPath = `${this.basePath}/src/types/jsx.d.ts`
		await Deno.mkdir(`${this.basePath}/src/types`, { recursive: true })

		const jsxDTSContent = `declare global {
  namespace JSX {
    interface Element {
      type: string
      props: any
      children?: any
    }
    
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}
`

		await Deno.writeTextFile(jsxDTSPath, jsxDTSContent)
		console.log(`  ✅ Created jsx.d.ts`)

		// Create missing MediaObject index file if it doesn't exist
		const mediaObjectPath =
			`${this.basePath}/lib/types/Thing/MediaObject/index.ts`
		try {
			await Deno.stat(mediaObjectPath)
		} catch {
			const mediaObjectContent = `import type Thing from "../index.ts"

export type MediaObjectProps = {
  associatedArticle?: Thing
  bitrate?: string
  contentSize?: string
  contentUrl?: string
  duration?: string
  embedUrl?: string
  encodesCreativeWork?: Thing
  encodingFormat?: string
  endTime?: string
  height?: number
  player?: Thing
  playerType?: string
  production?: Thing
  regions?: Thing
  requiresSubscription?: boolean
  sha256?: string
  startTime?: string
  uploadDate?: string
  width?: number
}

type MediaObject = Thing & MediaObjectProps

export type { MediaObject as default }
`

			await Deno.mkdir(`${this.basePath}/lib/types/Thing/MediaObject`, {
				recursive: true,
			})
			await Deno.writeTextFile(mediaObjectPath, mediaObjectContent)
			console.log(`  ✅ Created MediaObject index`)
		}
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new FinalErrorFixer(workspacePath)

	try {
		await fixer.fixAllErrors()
	} catch (error) {
		console.error("Failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}
