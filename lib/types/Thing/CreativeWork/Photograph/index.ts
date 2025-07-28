import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface PhotographProps {}

type Photograph = Thing & CreativeWorkProps & PhotographProps

export default Photograph
