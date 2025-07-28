import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import PosterComponent from "../../../../../components/Thing/CreativeWork/Poster/index.tsx"

export interface PosterProps {
}

type Poster =
	& Thing
	& CreativeWorkProps
	& PosterProps

export default Poster
