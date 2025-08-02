import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type PosterType = "Poster"

export interface PosterProps {
	"@type"?: PosterType
}

type Poster = Thing & CreativeWorkProps & PosterProps

export default Poster
