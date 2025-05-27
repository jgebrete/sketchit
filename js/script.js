window.addEventListener('load', function() {
    const canvas = document.getElementById('canvasBoard');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    /**
     * Resizes the screen and canvas board on user resize and renders all
     * shape object drawings after rescaling them to the new canvas size.
     *
     * @returns {void} This function does not return a value.
     */
    this.window.addEventListener('resize', function () {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.7;

        // Calculates drawing rescaling based on old and new canvas sizes.
        const xScale = canvas.width / oldWidth;
        const yScale = canvas.height / oldHeight;

        // For each shape, rescale all possible properties (attributes).
        shapes.forEach(shape => {
            shape.x *= xScale;
            shape.y *= yScale;
            if (shape.width) shape.width *= xScale;
            if (shape.height) shape.height *= yScale;
            if (shape.radius) shape.radius *= Math.min(xScale, yScale);
            if (shape.size) shape.size *= Math.min(xScale, yScale);
            if (shape.endX) shape.endX *= xScale;
            if (shape.endY) shape.endY *= yScale;
        });

        renderShapes(); // Redraw shapes after resizing
    })
    
    // Initialize a parent superclass for Shape with base attributes and methods.
    class Shape {
        /** 
         * Creates a parent Shape with specified coordinates and color.
         * 
         * @param {Number} x
         * @param {Number} y
         * @param {String} color
         */
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
        draw() {}
    }

    class Line extends Shape {
        /** 
         * Creates a child Line shape with start points, end points, and color.
         * 
         * @param {Number} x
         * @param {Number} y
         * @param {Number} endX
         * @param {Number} endY
         * @param {String} color
         */
        constructor(x, y, endX, endY, color) {
            super(x, y, color);
            this.endX = endX;
            this.endY = endY;
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.endX, this.endY);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    // Initialize a Rectangle subclass that inherits the Shape superclass
    class Rectangle extends Shape {
        /** 
         * Creates a child Rectangle shape with specified coordinates, dimensions, and color.
         * 
         * @param {Number} x
         * @param {Number} y
         * @param {Number} width
         * @param {Number} height
         * @param {String} color
         */
        constructor(x, y, width, height, color) {
            super(x, y, color);
            this.width = width;
            this.height = height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Initialize a Circle subclass that inherits the Shape superclass
    class Circle extends Shape {
        /** 
         * Creates a child Circle shape with specified coordinates, radius, and color.
         * 
         * @param {Number} x
         * @param {Number} y
         * @param {Number} radius
         * @param {String} color
         */
        constructor(x, y, radius, color) {
            super(x, y, color);
            this.radius = radius;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Initialize a Triangle subclass that inherits the Shape superclass
    class Triangle extends Shape {
        /** 
         * Creates a child Triangle shape with specified coordinates, size, and color.
         * 
         * @param {Number} x
         * @param {Number} y
         * @param {Number} size
         * @param {String} color
         */
        constructor(x, y, size, color) {
            super(x, y, color);
            this.size = size;
        }
        draw() {
            ctx.beginPath();
            // Calculate formula for equilateral triangle.
            ctx.moveTo(this.x, this.y - this.size); // Top vertex
            ctx.lineTo(this.x - this.size * Math.sqrt(3) / 2, this.y + this.size / 2); // Bottom-left vertex
            ctx.lineTo(this.x + this.size * Math.sqrt(3) / 2, this.y + this.size / 2); // Bottom-right vertex
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    let shapes = [];
    let currentShape = null;
    let isDrawing = false;

    const shapeField = document.getElementById('shapeField');
    const colorField = document.getElementById('colorField');

    shapeField.value = localStorage.getItem('selectedShape') || 'Free Draw';
    colorField.value = localStorage.getItem('selectedColor') || '#000000';

    let currentSize = 50;
    let currentShapeType = shapeField.value
    let currentColor = colorField.value

    /**
     * Changes the type of the current shape to the shape value selected
     * by the user and stores it in local storage.
     *
     * @returns {void} This function does not return a value.
     */
    shapeField.addEventListener('change', function(event) {
        currentShapeType = event.target.value;
        localStorage.setItem('selectedShape', currentShapeType);
    });

    /**
     * Changes the current shape color to the shape color value selected
     * by the user and stores it in local storage.
     *
     * @returns {void} This function does not return a value.
     */
    colorField.addEventListener('input', function(event) {
        currentColor = event.target.value;
        localStorage.setItem('selectedColor', currentColor);
    });

    /**
     * Initializes an object of the selected shape based on calculated
     * canvas coordinates when the mouse is pressed down.
     *
     * @returns {void} This function does not return a value.
     */
    canvas.addEventListener('mousedown', function(event) {
        const borderRect = canvas.getBoundingClientRect();
        const x = event.clientX - borderRect.left;
        const y = event.clientY - borderRect.top;

        if (currentShapeType === 'Rectangle') {
            currentShape = new Rectangle(x, y, 0, 0, currentColor);
        } else if (currentShapeType === 'Circle') {
            currentShape = new Circle(x, y, 0, currentColor);
        } else if (currentShapeType === 'Line') {
            currentShape = new Line(x, y, x, y, currentColor);
        } else if (currentShapeType === 'Triangle') {
            currentShape = new Triangle(x, y, currentSize, currentColor);
        } else if (currentShapeType === 'Free Draw') {
            currentShape = new Line(x, y, x, y, currentColor);
        }
        isDrawing = true;
    });

    /**
     * Calculates and updates the rendering of the appropriate object properties 
     * for the selected shape as the mouse moves across the canvas.
     *
     * @returns {void} This function does not return a value.
     */
    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing && currentShape) {
            const borderRect = canvas.getBoundingClientRect();
            const x = event.clientX - borderRect.left;
            const y = event.clientY - borderRect.top;

            // Update shape dimensions as the mouse moves
            if (currentShapeType === 'Rectangle') {
                currentShape.width = x - currentShape.x;
                currentShape.height = y - currentShape.y;
            } else if (currentShapeType === 'Circle') {
                currentShape.radius = Math.sqrt(Math.pow(x - currentShape.x, 2) + Math.pow(y - currentShape.y, 2));
            } else if (currentShapeType === 'Line') {
                currentShape.endX = x;
                currentShape.endY = y;
            } else if (currentShapeType === 'Triangle') {
                currentShape.size = Math.sqrt(Math.pow(x - currentShape.x, 2) + Math.pow(y - currentShape.y, 2));
            } else if (currentShapeType === 'Free Draw') {
                // Update the end point of the line.
                currentShape.endX = x;
                currentShape.endY = y;
                // Store the line segment in the shapes array and begin a new segment.
                shapes.push(currentShape);
                currentShape = new Line(x, y, x, y, currentColor);
            }

            // Clear canvas and redraw all shapes in the array to remove pre-resize shapes.
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderShapes();

            // Draw the current shape being created
            currentShape.draw();
        }
    });

    /**
     * Stores the current shape drawing in the shapes array and local storage before resetting
     * the currentShape and isDrawing flags when the mouse is lifted up.
     *
     * @returns {void} This function does not return a value.
     */
    canvas.addEventListener('mouseup', function(event) {
        if (isDrawing && currentShape) {
            shapes.push(currentShape);
            currentShape = null;
            isDrawing = false;
            saveShapesToLocalStorage();
        }
    });

    /**
     * Redraws and renders all of the shape objects stored in the shapes array.
     *
     * @returns {void} This function does not return a value.
     */
    function renderShapes() {
        shapes.forEach(shape => {
            if (shape && typeof shape.draw === 'function') {
                shape.draw();
            }
        });
    }

    /**
     * Stores each of the current shape objects to local storage and returns a
     * String representation of the shape data.
     *
     * @returns {Array}
     */
    function saveShapesToLocalStorage() {
        const shapesData = [];

        shapes.forEach(function(shape) {
            const shapeData = {
                type: shape.constructor.name,
                x: shape.x,
                y: shape.y,
                color: shape.color,
                width: shape.width,
                height: shape.height,
                radius: shape.radius,
                size: shape.size,
                endX: shape.endX,
                endY: shape.endY
            };

            shapesData.push(shapeData);
        });

        localStorage.setItem('shapes', JSON.stringify(shapesData));

        return shapesData;
    }

    
    /**
     * Loads the current shape objects from local storage and renders the shape
     * data on the canvas.
     *
     * @returns {void} This function does not return a value.
     */
    function loadShapesFromLocalStorage() {
        const shapesData = JSON.parse(localStorage.getItem('shapes'));
        if (shapesData) {
            shapesData.forEach(data => {
                let shape;
                if (data.type === 'Line') {
                    shape = new Line(data.x, data.y, data.endX, data.endY, data.color);
                } else if (data.type === 'Rectangle') {
                    shape = new Rectangle(data.x, data.y, data.width, data.height, data.color);
                } else if (data.type === 'Circle') {
                    shape = new Circle(data.x, data.y, data.radius, data.color);
                } else if (data.type === 'Triangle') {
                    shape = new Triangle(data.x, data.y, data.size, data.color);
                }
                if (shape) {
                    shapes.push(shape);
                }
            });
            renderShapes();
        }
    }

    /**
     * Reinitializes the shapes array to an empty array and clears all drawings
     * from the canvas and local storage when the clear button is clicked.
     * 
     * @returns {void} This function does not return a value.
     */
    document.getElementById('clearButton').addEventListener('click', function() {
        shapes = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem('shapes');
    });

    /**
     * Removes the last object element of the shapes array, redraws the rest of
     * the shape objects in the array, and stores the new state to local storage.
     * 
     * @returns {void} This function does not return a value.
     */
    document.getElementById('undoButton').addEventListener('click', function() {
        shapes.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderShapes();
        saveShapesToLocalStorage();
    });

    loadShapesFromLocalStorage();
    
});
