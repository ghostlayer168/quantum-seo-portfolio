import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

function getSafeViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

let viewport = getSafeViewportSize();

const camera = new THREE.PerspectiveCamera(60, viewport.width / viewport.height, 0.1, 1000);
camera.position.z = 35;
camera.position.y = 2;

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(viewport.width, viewport.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0x332200);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0xff6600, 2.5);
light1.position.set(5, 5, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0xff3300, 2);
light2.position.set(-5, 3, 12);
scene.add(light2);

const light3 = new THREE.PointLight(0xffaa00, 1.5);
light3.position.set(0, -2, 15);
scene.add(light3);

scene.fog = new THREE.FogExp2(0x000000, 0.005);

function getScreenBounds() {
    const aspect = viewport.width / viewport.height;
    
    let baseX, baseY;
    
    if (viewport.width <= 480) {
        baseX = 10;
        baseY = 8;
    } else if (viewport.width <= 768) {
        baseX = 14;
        baseY = 10;
    } else if (viewport.width <= 1024) {
        baseX = 18;
        baseY = 12;
    } else {
        baseX = 22;
        baseY = 14;
    }
    
    if (aspect > 2) {
        baseX *= 1.2;
    } else if (aspect < 0.8) {
        baseX *= 0.7;
        baseY *= 0.7;
    }
    
    if (viewport.width <= 768) {
        baseX *= 0.85;
        baseY *= 0.85;
    }
    
    return {
        x: baseX,
        y: baseY,
        z: 15
    };
}

let screenBounds = getScreenBounds();

const spheres = [];
const sphereCount = viewport.width <= 768 ? 50 : 80;
const colors = [0xff3300, 0xff5500, 0xff7700, 0xff9900, 0xffaa00, 0xffbb00];

for (let i = 0; i < sphereCount; i++) {
    const maxSize = viewport.width <= 768 ? 1.8 : 2.2;
    const size = 0.3 + Math.random() * maxSize;
    const geometry = new THREE.SphereGeometry(size, 48, 48);
    
    const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.1 + Math.random() * 0.3,
        metalness: 0.1,
        emissive: 0x331100,
        emissiveIntensity: 0.1 + Math.random() * 0.3,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    
    sphere.position.x = (Math.random() - 0.5) * (screenBounds.x * 1.5);
    sphere.position.y = (Math.random() - 0.5) * (screenBounds.y * 1.5);
    sphere.position.z = (Math.random() - 0.5) * (screenBounds.z * 1.5);
    
    const speedBase = viewport.width <= 768 ? 0.0015 : 0.002;
    const sizeFactor = 1 / size;
    
    sphere.userData = {
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * speedBase * sizeFactor * 2,
            (Math.random() - 0.5) * speedBase * sizeFactor * 2,
            (Math.random() - 0.5) * speedBase * sizeFactor * 1.5
        ),
        color: sphere.material.color.getHex(),
        size: size,
        phase: Math.random() * Math.PI * 2
    };
    
    scene.add(sphere);
    spheres.push(sphere);
}

const mouse3D = new THREE.Vector3(0, 0, 8);
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let isTouching = false;

function updateMousePosition(clientX, clientY) {
    targetX = (clientX / viewport.width) * 2 - 1;
    targetY = -(clientY / viewport.height) * 2 + 1;
    
    mouse3D.x = (clientX / viewport.width - 0.5) * screenBounds.x * 2;
    mouse3D.y = -(clientY / viewport.height - 0.5) * screenBounds.y * 2;
}

window.addEventListener('mousemove', (event) => {
    updateMousePosition(event.clientX, event.clientY);
});

window.addEventListener('touchmove', (event) => {
    if (event.touches.length) {
        updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
    }
}, { passive: true });

window.addEventListener('touchstart', (event) => {
    if (event.touches.length) {
        isTouching = true;
        updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
    }
});

window.addEventListener('touchend', () => {
    isTouching = false;
    // Reset target position when touch ends to prevent sticking
    targetX = 0;
    targetY = 0;
});

function resolveCollisions() {
    const strength = 0.015;
    
    for (let i = 0; i < spheres.length; i++) {
        for (let j = i + 1; j < spheres.length; j++) {
            const s1 = spheres[i];
            const s2 = spheres[j];
            
            const dx = s1.position.x - s2.position.x;
            const dy = s1.position.y - s2.position.y;
            const dz = s1.position.z - s2.position.z;
            
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            const minDist = (s1.userData.size + s2.userData.size) * 0.9;
            
            if (dist < minDist && dist > 0) {
                const angleY = Math.atan2(dy, dx);
                const angleZ = Math.atan2(dz, Math.sqrt(dx*dx + dy*dy));
                const force = (minDist - dist) * strength;
                
                s1.position.x += Math.cos(angleY) * force;
                s1.position.y += Math.sin(angleY) * force;
                s1.position.z += Math.sin(angleZ) * force * 0.8;
                
                s2.position.x -= Math.cos(angleY) * force;
                s2.position.y -= Math.sin(angleY) * force;
                s2.position.z -= Math.sin(angleZ) * force * 0.8;
            }
        }
    }
}

function enforceBounds(sphere) {
    const size = sphere.userData.size;
    const bounds = screenBounds;
    const margin = size * 0.5;
    
    if (sphere.position.x > bounds.x - margin) {
        sphere.position.x = bounds.x - margin;
        sphere.userData.velocity.x *= -0.7;
    } else if (sphere.position.x < -bounds.x + margin) {
        sphere.position.x = -bounds.x + margin;
        sphere.userData.velocity.x *= -0.7;
    }
    
    if (sphere.position.y > bounds.y - margin) {
        sphere.position.y = bounds.y - margin;
        sphere.userData.velocity.y *= -0.7;
    } else if (sphere.position.y < -bounds.y + margin) {
        sphere.position.y = -bounds.y + margin;
        sphere.userData.velocity.y *= -0.7;
    }
    
    if (sphere.position.z > bounds.z - margin) {
        sphere.position.z = bounds.z - margin;
        sphere.userData.velocity.z *= -0.7;
    } else if (sphere.position.z < -bounds.z + margin) {
        sphere.position.z = -bounds.z + margin;
        sphere.userData.velocity.z *= -0.7;
    }
}

let time = 0;

function animate() {
    time += 0.006;
    
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    
    spheres.forEach(sphere => {
        const waveAmount = 0.0015 / sphere.userData.size;
        sphere.position.x += Math.sin(time * 0.8 + sphere.userData.phase) * waveAmount;
        sphere.position.y += Math.cos(time * 0.7 + sphere.userData.phase) * waveAmount;
        sphere.position.z += Math.sin(time * 0.6 + sphere.userData.phase) * waveAmount * 0.7;
        
        const dx = sphere.position.x - mouse3D.x;
        const dy = sphere.position.y - mouse3D.y;
        const dz = sphere.position.z - mouse3D.z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        const maxDist = viewport.width <= 768 ? 15 : 20;
        if (dist < maxDist && dist > 0.1) {
            const sizeBonus = 1 / sphere.userData.size;
            const force = (1 - dist / maxDist) * 0.1 * sizeBonus;
            sphere.position.x += dx * force * 0.2;
            sphere.position.y += dy * force * 0.2;
            sphere.position.z += dz * force * 0.15;
        }
        
        sphere.position.x += sphere.userData.velocity.x;
        sphere.position.y += sphere.userData.velocity.y;
        sphere.position.z += sphere.userData.velocity.z;
        
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.004;
        
        enforceBounds(sphere);
    });
    
    if (viewport.width > 768) {
        resolveCollisions();
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        viewport = getSafeViewportSize();
        screenBounds = getScreenBounds();
        
        renderer.setSize(viewport.width, viewport.height);
        camera.aspect = viewport.width / viewport.height;
        
        if (viewport.width <= 768) {
            camera.position.z = 28;
        } else {
            camera.position.z = 35;
        }
        
        camera.updateProjectionMatrix();
    }, 100);
});

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const body = document.body;

if (mobileMenuBtn && mainNav) {
    // Toggle menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Change button icon based on menu state
        if (mainNav.classList.contains('active')) {
            mobileMenuBtn.textContent = '✕';
            mobileMenuBtn.setAttribute('aria-label', 'Close menu');
        } else {
            mobileMenuBtn.textContent = '☯';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        }
    });

    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn.textContent = '☯';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn.textContent = '☯';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn.textContent = '☯';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        }
    });
}

// Custom Select Functionality
const selectWrapper = document.getElementById('customSelect');
if (selectWrapper) {
    const trigger = selectWrapper.querySelector('.custom-select-trigger');
    const optionsContainer = selectWrapper.querySelector('.custom-options');
    const options = selectWrapper.querySelectorAll('.custom-option');
    const triggerText = trigger.querySelector('.trigger-text');
    
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        trigger.classList.toggle('active');
        optionsContainer.classList.toggle('show');
    });
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            triggerText.textContent = option.textContent;
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            trigger.classList.remove('active');
            optionsContainer.classList.remove('show');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            trigger.classList.remove('active');
            optionsContainer.classList.remove('show');
        }
    });
}

// Smart Scroll Button
const scrollButton = document.getElementById('scrollButton');

function updateScrollButton() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollY + windowHeight >= documentHeight - 100) {
        scrollButton.innerHTML = '↑';
    } else {
        scrollButton.innerHTML = '↓';
    }
}

window.addEventListener('scroll', updateScrollButton);
updateScrollButton();

scrollButton.addEventListener('click', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollY + windowHeight >= documentHeight - 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: documentHeight, behavior: 'smooth' });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});