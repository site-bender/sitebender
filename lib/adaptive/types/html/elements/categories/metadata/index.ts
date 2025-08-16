import type { BaseElement } from "../../metadata/base/index.ts"
import type { HeadElement } from "../../metadata/head/index.ts"
import type { LinkElement } from "../../metadata/link/index.ts"
import type { MetaElement } from "../../metadata/meta/index.ts"
import type { StyleElement } from "../../metadata/style/index.ts"
import type { TitleElement } from "../../metadata/title/index.ts"
import type { NoScriptElement } from "../../scripting/noscript/index.ts"
import type { ScriptElement } from "../../scripting/script/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"

export type MetadataContent =
	| BaseElement
	| HeadElement
	| LinkElement
	| MetaElement
	| NoScriptElement
	| ScriptElement
	| StyleElement
	| TemplateElement
	| TitleElement
