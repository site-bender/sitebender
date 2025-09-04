import createServer from "~scripts/serve/createServer/index.ts"

const port = Number(Deno.env.get("PORT") ?? Deno.args[0] ?? 5556)
createServer(console, { port })
// Keep process alive
await new Promise(() => {})
