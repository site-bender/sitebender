import type { BaseElement } from "../metadata/base"
import type { HeadElement } from "../metadata/head"
import type { LinkElement } from "../metadata/link"
import type { MetaElement } from "../metadata/meta"
import type { StyleElement } from "../metadata/style"
import type { TitleElement } from "../metadata/title"
import type { NoScriptElement } from "../scripting/noscript"
import type { ScriptElement } from "../scripting/script"
import type { TemplateElement } from "../scripting/template"

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
