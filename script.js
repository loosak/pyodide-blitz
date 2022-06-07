console.log(document.location.href);
globalThis.pyodide = await loadPyodide({});
await pyodide.loadPackage(['micropip']); // load package micropip

globalThis.pyOut = await pyodide.runPythonAsync(`
import micropip
await micropip.install('markdown2')
from pyodide import open_url
from markdown2 import Markdown

with open_url ('https://raw.githubusercontent.com/pyodide/pyodide/main/README.md') as req:
  text = req.read()
Markdown().convert(text)
`);

document.querySelector('#output').innerHTML = `${pyOut}\n`;
