window.onload = function() {
    // Get the canvas and its context
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    
    // Array to store shapes
    let shapes = [];
    
    // Variable to hold the current shape being drawn
    let currentShape = null;
    
    // Default mode set to 'drawRectangle'
    let mode = 'drawRectangle';

    // Setting up button click event handlers to change modes
    document.getElementById('drawRectangle').onclick = () => mode = 'drawRectangle';
    document.getElementById('drawCircle').onclick = () => mode = 'drawCircle';
    document.getElementById('drawLine').onclick = () => mode = 'drawLine';
    document.getElementById('freehand').onclick = () => mode = 'freehand';
    document.getElementById('editShapes').onclick = () => mode = 'editShapes';
    document.getElementById('deleteShapes').onclick = () => mode = 'deleteShapes';

    // Flag to check if drawing is in progress
    let isDrawing = false;

    // Mouse down event handler
    canvas.onmousedown = (e) => {
        const { offsetX, offsetY } = e;
        isDrawing = true;

        // Check mode and create the respective shape
        if (mode === 'drawRectangle') {
            currentShape = {
                type: 'rectangle',
                x: offsetX,
                y: offsetY,
                width: 0,
                height: 0,
                selected: false
            };
            shapes.push(currentShape);
        } else if (mode === 'drawCircle') {
            currentShape = {
                type: 'circle',
                x: offsetX,
                y: offsetY,
                radius: 0,
                selected: false
            };
            shapes.push(currentShape);
        } else if (mode === 'drawLine') {
            currentShape = {
                type: 'line',
                x1: offsetX,
                y1: offsetY,
                x2: offsetX,
                y2: offsetY,
                selected: false
            };
            shapes.push(currentShape);
        } else if (mode === 'freehand') {
            currentShape = {
                type: 'freehand',
                points: [{ x: offsetX, y: offsetY }],
                selected: false
            };
            shapes.push(currentShape);
        } else if (mode === 'editShapes' || mode === 'deleteShapes') {
            currentShape = shapes.find(shape => isInsideShape(shape, offsetX, offsetY));
            if (currentShape) {
                if (mode === 'deleteShapes') {
                    // Remove the shape if in delete mode
                    shapes = shapes.filter(shape => shape !== currentShape);
                    currentShape = null;
                    drawShapes();
                } else {
                    // Select the shape if in edit mode
                    currentShape.selected = true;
                    shapes = shapes.filter(shape => shape !== currentShape); // remove the shape to re-add it on top
                    shapes.push(currentShape);
                }
            }
        }
    };

    // Mouse move event handler
    canvas.onmousemove = (e) => {
        if (isDrawing && currentShape && mode !== 'deleteShapes') {
            const { offsetX, offsetY } = e;
            if (currentShape.type === 'rectangle') {
                currentShape.width = offsetX - currentShape.x;
                currentShape.height = offsetY - currentShape.y;
            } else if (currentShape.type === 'circle') {
                currentShape.radius = Math.sqrt(Math.pow(offsetX - currentShape.x, 2) + Math.pow(offsetY - currentShape.y, 2));
            } else if (currentShape.type === 'line') {
                currentShape.x2 = offsetX;
                currentShape.y2 = offsetY;
            } else if (currentShape.type === 'freehand') {
                currentShape.points.push({ x: offsetX, y: offsetY });
            }
            drawShapes();
        }
    };

    // Mouse up event handler
    canvas.onmouseup = () => {
        isDrawing = false;
        currentShape = null;
        shapes.forEach(shape => shape.selected = false);
    };

    // Function to check if a point is inside a shape
    function isInsideShape(shape, x, y) {
        if (shape.type === 'rectangle') {
            return x > shape.x && x < shape.x + shape.width && y > shape.y && y < shape.y + shape.height;
        } else if (shape.type === 'circle') {
            const dx = x - shape.x;
            const dy = y - shape.y;
            return Math.sqrt(dx * dx + dy * dy) < shape.radius;
        } else if (shape.type === 'line') {
            const dist1 = Math.hypot(x - shape.x1, y - shape.y1);
            const dist2 = Math.hypot(x - shape.x2, y - shape.y2);
            const lineLen = Math.hypot(shape.x2 - shape.x1, shape.y2 - shape.y1);
            const buffer = 2; // buffer for line selection
            return dist1 + dist2 >= lineLen - buffer && dist1 + dist2 <= lineLen + buffer;
        } else if (shape.type === 'freehand') {
            return shape.points.some(point => Math.hypot(point.x - x, point.y - y) < 5);
        }
        return false;
    }

    // Function to draw all shapes on the canvas
    function drawShapes() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => {
            if (shape.type === 'rectangle') {
                context.fillStyle = shape.selected ? 'rgba(255, 0, 0, 0.5)' : '#FF0000';
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === 'circle') {
                context.beginPath();
                context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
                context.fillStyle = shape.selected ? 'rgba(0, 255, 0, 0.5)' : '#00FF00';
                context.fill();
                context.stroke();
            } else if (shape.type === 'line') {
                context.beginPath();
                context.moveTo(shape.x1, shape.y1);
                context.lineTo(shape.x2, shape.y2);
                context.strokeStyle = shape.selected ? 'rgba(0, 0, 255, 0.5)' : '#0000FF';
                context.lineWidth = 2;
                context.stroke();
            } else if (shape.type === 'freehand') {
                context.beginPath();
                context.moveTo(shape.points[0].x, shape.points[0].y);
                shape.points.forEach(point => context.lineTo(point.x, point.y));
                context.strokeStyle = shape.selected ? 'rgba(0, 0, 0, 0.5)' : '#000000';
                context.lineWidth = 2;
                context.stroke();
            }
        });
    }
};
