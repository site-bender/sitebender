import type { DeletionElement } from "../../edits/del/index.ts"
import type { InsertionElement } from "../../edits/ins/index.ts"

export type EditsContent = DeletionElement | InsertionElement
