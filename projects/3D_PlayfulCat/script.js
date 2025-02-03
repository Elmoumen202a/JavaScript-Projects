//  Core Components
let scene, camera, renderer, cat, controls;

// Drawing State Management
let isDrawing = false; // Tracks whether the user is currently drawing
let currentColor = 0xff0000; // Default drawing color (red)
let drawings = new THREE.Group(); // Group to hold all drawing points

// Cool Effect State
let coolEffects = new THREE.Group(); // Group to hold all cool effects

// Initialize the scene and start the animation loop
init();
animate();

// Initialization function: Sets up the scene, camera, renderer, lights, and controls
function init() {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;

    // Renderer setup
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting setup
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Create the 3D cat model
    createCat();

    // Controls setup
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Event listeners
    document.addEventListener('mousedown', onMouseDown); // Handle mouse down
    document.addEventListener('mousemove', onMouseMove); // Handle mouse move
    document.addEventListener('mouseup', onMouseUp); // Handle mouse up
    window.addEventListener('resize', onWindowResize); // Handle window resizing

    // UI controls
    document.getElementById('colorPicker').addEventListener('input', (e) => {
        currentColor = e.target.value; // Update the drawing color
    });

    document.getElementById('clearBtn').addEventListener('click', clearDrawings); // Clear all drawings

    scene.add(drawings); // Add the drawings group to the scene
    scene.add(coolEffects); // Add the cool effects group to the scene
}

// Function to create the 3D cat model
function createCat() {
    cat = new THREE.Group();

    // Body (Scaled sphere)
    const body = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x808080 })
    );
    body.scale.set(1, 0.8, 1.2);
    cat.add(body);

    // Head (Sphere)
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.6),
        new THREE.MeshPhongMaterial({ color: 0x808080 })
    );
    head.position.set(0, 0.5, 1);
    cat.add(head);

    // Ears (Cones)
    const earGeometry = new THREE.ConeGeometry(0.2, 0.5, 32);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });

    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.3, 1, 0.8);
    leftEar.rotateX(0.5);
    cat.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.set(0.3, 1, 0.8);
    cat.add(rightEar);

    // Tail (Cylinder)
    const tail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 2),
        new THREE.MeshPhongMaterial({ color: 0x808080 })
    );
    tail.position.set(0, 0, -1.5);
    tail.rotateX(0.5);
    cat.add(tail);

    scene.add(cat);
}

// Handle mouse down event
function onMouseDown(event) {
    const intersects = getIntersects(event.clientX, event.clientY);
    if (intersects.length > 0) {
        if (event.button === 0) { // Left click: Start drawing
            isDrawing = true;
            addDrawingPoint(intersects[0].point);
        } else if (event.button === 2) { // Right click: Add cool effect
            addCoolEffect(intersects[0].point);
        }
    }
}

// Handle mouse move event
function onMouseMove(event) {
    if (!isDrawing) return; // Exit if not in drawing mode
    const intersects = getIntersects(event.clientX, event.clientY);
    if (intersects.length > 0) {
        addDrawingPoint(intersects[0].point); // Add a drawing point at the intersection
    }
}

// Handle mouse up event
function onMouseUp() {
    isDrawing = false; // Disable drawing mode
}

// Add a drawing point at the specified position
function addDrawingPoint(position) {
    const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.05), // Small sphere for the drawing point
        new THREE.MeshBasicMaterial({ color: currentColor }) // Use the selected color
    );
    dot.position.copy(position); // Set the position of the drawing point
    drawings.add(dot); // Add the drawing point to the drawings group
}

// Add a cool effect at the specified position
function addCoolEffect(position) {
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff, // Random color
        transparent: true,
        opacity: 0.8
    });

    const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.2), // Glowing sphere
        glowMaterial
    );
    glowSphere.position.copy(position); // Set the position of the cool effect
    coolEffects.add(glowSphere); // Add the cool effect to the cool effects group

    // Animate the cool effect (fade out and scale up)
    const duration = 1000; // 1 second
    const startTime = Date.now();
    const animateEffect = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            glowSphere.scale.set(1 + progress, 1 + progress, 1 + progress); // Scale up
            glowSphere.material.opacity = 0.8 - progress; // Fade out
            requestAnimationFrame(animateEffect);
        } else {
            coolEffects.remove(glowSphere); // Remove the effect after animation
        }
    };
    animateEffect();
}

// Clear all drawings and cool effects
function clearDrawings() {
    scene.remove(drawings);
    scene.remove(coolEffects);
    drawings = new THREE.Group();
    coolEffects = new THREE.Group();
    scene.add(drawings);
    scene.add(coolEffects);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Raycasting: Convert mouse coordinates to 3D space and find intersections with the cat
function getIntersects(x, y) {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
        ((x - rect.left) / rect.width) * 2 - 1,
        -((y - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(cat.children, true);
}

// Animation loop: Continuously render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update camera controls
    renderer.render(scene, camera); // Render the scene
}