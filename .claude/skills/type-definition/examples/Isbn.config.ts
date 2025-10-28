import type { BrandedTypeConfig } from "../types.ts"

export default {
	name: "Isbn",
	baseType: "string",
	targetFolder: ".claude/skills/type-definition/examples",
	description: "International Standard Book Number (ISBN) identifier",
	predicateName: "isIsbn",
	errorCode: "ISBN_INVALID",
} satisfies BrandedTypeConfig
