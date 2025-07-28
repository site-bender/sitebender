import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ManuscriptProps {}

type Manuscript = Thing & CreativeWorkProps & ManuscriptProps

export default Manuscript
