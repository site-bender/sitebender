//++ Maps module option to TypeScript ModuleKind enum
import * as typescript from "npm:typescript@5.7.2"

export default function mapModule(module?: string) {
	switch (module) {
		case "CommonJS":
			return typescript.ModuleKind.CommonJS
		case "ESNext":
			return typescript.ModuleKind.ESNext
		case "NodeNext":
			return typescript.ModuleKind.NodeNext
		default:
			return typescript.ModuleKind.ESNext
	}
}

//?? mapModule("CommonJS") // Returns: ModuleKind.CommonJS
//?? mapModule("ESNext") // Returns: ModuleKind.ESNext
//?? mapModule(undefined) // Returns: ModuleKind.ESNext (default)
