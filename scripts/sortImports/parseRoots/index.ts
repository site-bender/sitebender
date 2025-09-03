export default function parseRoots(args: Array<string>): Array<string> {
    const defaults = ["agent", "docs", "inspector", "libraries", "scripts"]
    const selected: Array<string> = []

    for (const arg of args) {
        if (arg.startsWith("--dir=")) {
            selected.push(arg.slice("--dir=".length))
        } else if (!arg.startsWith("-")) {
            selected.push(arg)
        }
    }

    return selected.length > 0 ? selected : defaults
}
