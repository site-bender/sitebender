import parseArgs from "../parseArgs/index.ts"

// Minimal config and handler types for our small CLI runner
export type CliRunArgs = {
  flags: Record<string, boolean>
  options: Record<string, string | string[]>
  positional: string[]
  dryRun: boolean
  stdout: (msg?: string) => void
  stderr: (msg?: string) => void
}

export type CliConfig = {
  name: string
  version?: string
  usage?: string
  booleans?: string[]
  strings?: string[]
  aliases?: Record<string, string>
  onRun: (args: CliRunArgs) => Promise<number | void> | number | void
}

/**
 * Minimal, zero-dep CLI runner with conventional flags:
 * -h, --help           Show help/usage
 * -v, --version        Print version
 * -n, --dry-run        Do not perform side-effects
 *
 * Scripts can pass additional booleans/strings/aliases and handle logic in onRun.
 */
export default async function runCli(cfg: CliConfig): Promise<never> {
  const { flags, options, positional } = parseArgs(Deno.args, {
    booleans: ["help", "version", "dry-run", ...(cfg.booleans ?? [])],
    strings: cfg.strings,
    aliases: { h: "help", v: "version", n: "dry-run", ...(cfg.aliases ?? {}) },
  })

  // --help
  if (flags["help"]) {
    const usage = cfg.usage ?? `${cfg.name} [options]`
    console.log(`${cfg.name}\n\nUsage: ${usage}\n\nOptions:\n  -h, --help       Show help\n  -v, --version    Show version\n  -n, --dry-run    Do not perform side-effects`)
    Deno.exit(0)
  }

  // --version
  if (flags["version"]) {
    console.log(cfg.version ?? "0.0.0")
    Deno.exit(0)
  }

  const code = await cfg.onRun({
    flags,
    options,
    positional,
    dryRun: !!flags["dry-run"],
    stdout: console.log,
    stderr: console.error,
  })

  Deno.exit(typeof code === "number" ? code : 0)
}
