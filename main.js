let scene, camera, renderer, sphere;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2.5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  const light = new THREE.PointLight(0x66ccff, 1, 100);
  light.position.set(0, 0, 5);
  scene.add(light);

  const texture = new THREE.TextureLoader().load("assets/bg.jpg");

  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.5,
    roughness: 0.2,
    emissive: new THREE.Color(0x2244ff),
    emissiveIntensity: 0.2
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  renderer.domElement.addEventListener("mousedown", () => isDragging = true);
  renderer.domElement.addEventListener("mouseup", () => isDragging = false);
  renderer.domElement.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaX = event.offsetX - previousMousePosition.x;
      const deltaY = event.offsetY - previousMousePosition.y;
      sphere.rotation.y += deltaX * 0.005;
      sphere.rotation.x += deltaY * 0.005;
    }
    previousMousePosition = { x: event.offsetX, y: event.offsetY };
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
