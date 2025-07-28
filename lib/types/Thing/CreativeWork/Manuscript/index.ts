import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import ManuscriptComponent from "../../../../../components/Thing/CreativeWork/Manuscript/index.tsx"

export interface ManuscriptProps {
}

type Manuscript =
	& Thing
	& CreativeWorkProps
	& ManuscriptProps

export default Manuscript
