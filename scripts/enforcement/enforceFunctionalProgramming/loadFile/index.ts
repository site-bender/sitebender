import has from "@sitebender/toolsmith/vanilla/set/has/index.ts"
import endsWith from "@sitebender/toolsmith/vanilla/string/endsWith/index.ts"
import { FP_ALLOWLIST } from "../../../constants/index.ts"

export type LoadedFile = { file: string; source: string }

export default async function loadFile(file: string): Promise<LoadedFile | null> {
  if (endsWith(".d.ts")(file)) return null
  if (has(file)(FP_ALLOWLIST)) return null
  try {
    const source = await Deno.readTextFile(file)

    return { file, source }
  } catch {
    return null
  }
}
