//++ Maps target option to TypeScript ScriptTarget enum
import * as typescript from "npm:typescript@5.7.2"

export default function mapTarget(target?: string) {
	switch (target) {
		case "ES2020":
			return typescript.ScriptTarget.ES2020
		case "ES2022":
			return typescript.ScriptTarget.ES2022
		case "ESNext":
			return typescript.ScriptTarget.ESNext
		default:
			return typescript.ScriptTarget.ESNext
	}
}

//?? mapTarget("ES2020") // Returns: ScriptTarget.ES2020
//?? mapTarget("ESNext") // Returns: ScriptTarget.ESNext
//?? mapTarget(undefined) // Returns: ScriptTarget.ESNext (default)
