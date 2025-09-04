// VS Code loads this file in a Node context. We keep it simple and spawn Deno in an integrated terminal.

const vscode = require("vscode")
const { runDenoScript } = require("./commands/runDenoScript/index.js")

/** @param {import('vscode').ExtensionContext} context */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand("sitebenderAgent.prereqs.check", () => {
			runDenoScript(context, "checkPrereqs")
		}),
		vscode.commands.registerCommand("sitebenderAgent.initProject", () => {
			runDenoScript(context, "initProject")
		}),
		vscode.commands.registerCommand("sitebenderAgent.compose.up", () => {
			runDenoScript(context, "compose", ["up"])
		}),
		vscode.commands.registerCommand("sitebenderAgent.compose.logs", () => {
			runDenoScript(context, "compose", ["logs"])
		}),
		vscode.commands.registerCommand("sitebenderAgent.compose.down", () => {
			runDenoScript(context, "compose", ["down"])
		}),
	)
}

function deactivate() {}

module.exports = { activate, deactivate }
