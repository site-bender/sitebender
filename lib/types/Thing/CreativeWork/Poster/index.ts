import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface PosterProps {}

type Poster = Thing & CreativeWorkProps & PosterProps

export default Poster
