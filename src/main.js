canvas = document.getElementById('canvas');
let frameCount = 0;
function animate() {
  frameCount++;
  document.getElementById('notif').innerText = frameCount;
  requestAnimationFrame(animate);
}

animate();