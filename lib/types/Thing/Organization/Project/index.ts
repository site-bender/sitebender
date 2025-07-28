import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface ProjectProps {}

type Project = Thing & OrganizationProps & ProjectProps

export default Project
