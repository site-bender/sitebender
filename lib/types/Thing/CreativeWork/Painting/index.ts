import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import PaintingComponent from "../../../../../components/Thing/CreativeWork/Painting/index.tsx"

export interface PaintingProps {
}

type Painting =
	& Thing
	& CreativeWorkProps
	& PaintingProps

export default Painting
