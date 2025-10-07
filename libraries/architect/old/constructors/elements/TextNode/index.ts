import type { TextNodeConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function TextNode(content: unknown): TextNodeConfig {
	return {
		content: typeof content === "string" ? content : "",
		tag: "TextNode",
	}
}
