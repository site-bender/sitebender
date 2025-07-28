import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface HackathonProps {}

type Hackathon = Thing & EventProps & HackathonProps

export default Hackathon
