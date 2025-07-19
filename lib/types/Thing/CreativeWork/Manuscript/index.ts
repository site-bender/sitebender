// Manuscript extends CreativeWork but adds no additional properties
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ManuscriptProps {}

type Manuscript =
	& Thing
	& CreativeWorkProps
	& ManuscriptProps

export default Manuscript
