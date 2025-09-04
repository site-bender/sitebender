import path from 'node:path'
import vscode from 'vscode'

export default function runDenoScript(context, scriptFolderName, args = [], terminalName) {
	const scriptPath = path.join(context.extensionPath, 'scripts', scriptFolderName, 'index.ts')
	const name = terminalName || `Sitebender: ${scriptFolderName}`
	const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath
	const terminal = vscode.window.createTerminal({ name, cwd: workspacePath })
	const argumentString = args.map((value) => JSON.stringify(value)).join(' ')

	terminal.show(true)
	terminal.sendText(`deno run -A ${JSON.stringify(scriptPath)} ${argumentString}`, true)
}
