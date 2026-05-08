# ✏️ Sketch It!
 
> A browser-based drawing app built from scratch with vanilla HTML, CSS, and JavaScript using the Canvas API and object-oriented design.

---
 
## 🎨 About
 
Sketch It! is an interactive drawing app that runs entirely in the browser. Users can free draw or place geometric shapes onto a canvas, pick any colour, undo mistakes, and clear the board, with all drawings automatically saved to local storage so your work persists across page reloads.
 
This project was one of my first real web apps, and it pushed me to learn OOP in JavaScript, the Canvas API, local storage, and responsive canvas scaling, which are concepts I hadn't worked with before.
 
---
 
## ✨ Features
 
- 🖊️ **Free Draw** — smooth freehand drawing built from continuous line segments
- 📐 **Shape tools** — drag to place Lines, Rectangles, Circles, and equilateral Triangles
- 🎨 **Colour picker** — choose any colour for each shape or stroke
- ↩️ **Undo** — removes the last drawn shape and re-renders the canvas
- 🗑️ **Clear** — wipes the entire canvas and resets local storage
- 💾 **Persistent canvas** — all drawings are saved to local storage and restored on reload
- 📐 **Responsive canvas** — resizes with the window and rescales all existing shapes proportionally
- 🧠 **Settings memory** — your last selected shape and colour are remembered across sessions
---
 
## 🗂️ Project Structure
 
```
sketchit/
├── index.html          # App shell: canvas, shape selector, colour picker, buttons
├── css/
│   └── styles.css      # Layout and control styling
├── js/
│   └── script.js       # All drawing logic, OOP shape classes, canvas events, local storage
├── images/
│   └── paintbrush.png  # Favicon
└── README.md
```

---
 
## 🚀 Getting Started
 
```bash
git clone https://github.com/jgebrete/sketchit.git
cd sketchit
open index.html
```
 
Or open `index.html` with [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). No build tools or dependencies required.
 
Sketch It! is also hosted on [GitHub Pages](https://jgebrete.github.io/sketchit).
 
---
 
## 🕹️ How to Use
 
1. Open `index.html` in your browser
2. Pick a **shape** from the dropdown (Free Draw, Line, Rectangle, Circle, Triangle)
3. Pick a **colour** using the colour picker
4. **Click and drag** on the canvas to draw
5. Use **Undo** to remove the last shape, or **Clear** to wipe everything
6. Your drawing and settings are saved automatically, so refreshing the page restores your work

---

## 🛠️ Tech Stack

| Technology | Role |
|------------|------|
| HTML5 | Canvas element, shape/colour controls |
| CSS3 | Layout and styling |
| JavaScript (ES6+) | OOP shape classes, Canvas 2D API, local storage, mouse event handling |
 
No build tools. No dependencies. Runs directly in the browser.
