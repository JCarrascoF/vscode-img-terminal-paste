const vscode = require('vscode');
const { execFile } = require('child_process');

const IMAGE_TYPES_REGEX = /^(\"|')?\\s*(public\\.)?(png|tiff|jpeg|gif|bmp|heic|heif)\\s*(\"|')?$/i;

/**
 * Checks whether the macOS clipboard currently holds image data.
 * @returns {Promise<boolean>}
 */
function clipboardHasImage() {
  if (process.platform !== 'darwin') {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    execFile('osascript', ['-e', 'clipboard info'], { timeout: 1000 }, (err, stdout) => {
      if (err || !stdout) {
        resolve(false);
        return;
      }
      // `clipboard info` lists types like "«class PNGf»" or "'public.png'" — any image type means an image is present.
      stdout
        .split(', ')
        .map((entry) => entry.trim())
        .some((type) => IMAGE_TYPES_REGEX.test(type))
        ? resolve(true)
        : resolve(false);
    });
  });
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand('imgTerminalPaste.paste', async () => {
    const text = await vscode.env.clipboard.readText();
    if (text && text.length > 0) {
      await vscode.commands.executeCommand('workbench.action.terminal.paste');
      return;
    }

    if (await clipboardHasImage()) {
      const terminal = vscode.window.activeTerminal;
      if (terminal) {
        // Forward Ctrl+V (0x16) so terminal TUIs (Pi, Claude Code, etc.) can read the clipboard image directly.
        terminal.sendText('\x16', false);
        return;
      }
    }

    await vscode.commands.executeCommand('workbench.action.terminal.paste');
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
