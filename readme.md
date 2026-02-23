# QUANTUM SEO - Interactive 3D Portfolio

<div align="center">
  <img src="assets/images/preview.gif" alt="Quantum SEO Preview" width="100%" style="max-width: 800px; border-radius: 20px; border: 2px solid #ff5500; box-shadow: 0 0 30px rgba(255,85,0,0.5);">
  
  <br>
  <br>
  
  [![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-QUANTUM_PORTAL-ff5500?style=for-the-badge&labelColor=000000)](https://ghostlayer168.github.io/quantum-seo-portfolio/)
  
  <br>
  
  ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
</div>

## ⚡ Experience the Quantum Realm

An interactive portfolio website featuring **80 dynamic spheres** that respond to mouse movement in real-time. Built with Three.js, this project visualizes SEO concepts through quantum-inspired 3D graphics.

> ⚠️ **IMPORTANT: For the full quantum experience**
> - **Desktop viewing is strongly recommended** - the 3D interaction is optimized for mouse movement
> - Mobile devices will work but the sphere interaction is best experienced with a cursor
> - For the complete effect, use Chrome, Firefox, or Edge on a desktop/laptop

## ✨ Quantum Features

- **80 Interactive Spheres**: Each sphere has unique size, speed, and depth - smaller spheres move faster and react more intensely to your cursor
- **Real-time Physics**: Spheres react to mouse movement with natural repulsion forces and gentle wave-like motions
- **Smart Scroll Button**: Changes direction based on scroll position (↓ when at top, ↑ when near bottom)
- **Custom Quantum Components**: 
  - Glitch text effects with quantum theme
  - Floating particle field
  - Gradient borders with animations
  - Custom select dropdown
- **Fully Responsive**: Adapts to all screen sizes (though desktop is recommended!)

## 🛠️ Technology Stack
├── Frontend Core
│ ├── Three.js r128 - 3D graphics engine
│ ├── Vanilla JavaScript ES6+ - Interactive logic
│ └── HTML5/CSS3 - Structure & styling
│
├── Visual Effects
│ ├── Custom particle system
│ ├── Real-time sphere physics
│ ├── CSS keyframe animations
│ └── Gradient & glitch effects
│
└── Performance
├── Optimized collision detection
├── Debounced resize handlers
└── Mobile-specific optimizations

text

## 🎯 Interactive Elements

### The Spheres
- **Size Range**: 0.3 to 2.5 units
- **Speed**: Inversely proportional to size
- **Colors**: 6 shades from deep orange (#ff3300) to bright yellow (#ffbb00)
- **Behavior**: 
  - Gentle wave motion
  - Mouse repulsion
  - Collision detection
  - Boundary constraints

### Custom Components
```javascript
// Example: Sphere with unique properties
{
  size: 0.3 + Math.random() * 2.2,
  velocity: new THREE.Vector3(x, y, z),
  phase: random phase for wave motion,
  color: quantum orange shades
}
🚀 Quick Start
Option 1: Visit Live Demo
Simply visit our Quantum Portal - no installation required!

Option 2: Run Locally
bash
# Clone the repository
git clone https://github.com/ghostlayer168/quantum-seo-portfolio.git

# Navigate to project
cd quantum-seo-portfolio

# Open in browser (Mac)
open index.html

# OR (Windows)
start index.html

# OR (Linux)
xdg-open index.html
📁 Project Structure
text
quantum-seo-portfolio/
├── 📄 index.html              # Main HTML file
├── 📁 assets/
│   ├── 📁 css/
│   │   └── style.css         # All styles (1300+ lines)
│   └── 📁 js/
│       └── main.js           # Three.js logic (400+ lines)
├── 📄 .gitignore              # Git ignore file
├── 📄 README.md               # This file
└── 📄 preview.gif            # Animated preview (optional)
💻 Desktop vs Mobile Experience
Feature	Desktop	Mobile
Sphere Count	80 spheres	50 spheres
Interaction	Full mouse control	Touch-optimized
Collisions	Enabled	Disabled for performance
Particle Effects	Full	Reduced
Animation Quality	High	Optimized
🔧 Technical Deep Dive
Sphere Physics Algorithm
javascript
// Each sphere has:
- Unique velocity vector
- Wave motion phase
- Size-based speed scaling
- Mouse repulsion force
- Boundary collision response

// Optimization strategies:
- Viewport-based sphere count
- Mobile collision disabling
- Debounced resize handling
Performance Metrics
FPS: 60 on desktop, 30+ on mobile

Sphere count: 80 (desktop) / 50 (mobile)

Collision checks: O(n²) with n ≤ 80

Memory usage: ~50MB

🎨 Design Philosophy
The quantum theme is maintained through:

Colors: Black (#000000) with orange gradients (#ff3300 → #ffaa00)

Typography: Syne font for futuristic feel

Terminology: "Dimensions", "Portal", "Quantum", "Nebula"

Animations: Glitch effects, particle float, quantum pulse

🌐 Browser Support
Browser	Version	Support
Chrome	90+	✅ Full
Firefox	88+	✅ Full
Safari	14+	✅ Full
Edge	90+	✅ Full
Opera	76+	✅ Full
Mobile Safari	14+	✅ Optimized
Chrome Android	90+	✅ Optimized
👩‍🎨 About the Creator
Created by Oleksandra Zdoronok - a creative developer passionate about interactive 3D experiences and quantum-inspired design.

<div align="center"> <br> <a href="https://github.com/ghostlayer168"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"> </a> <a href="https://linkedin.com/in/yourusername"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"> </a> <a href="https://yourportfolio.com"> <img src="https://img.shields.io/badge/Portfolio-ff5500?style=for-the-badge&logo=About.me&logoColor=white" alt="Portfolio"> </a> <br> <br> </div>
📄 License
MIT License - feel free to use for your own portfolio!

license
Copyright (c) 2026 Oleksandra Zdoronok

Permission is granted to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, subject to the following 
conditions: The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.
<div align="center"> <br> <strong>⚡ Created with quantum energy for the digital age ⚡</strong> <br> <br> <sub>✨ 80 spheres • 7 dimensions • infinite possibilities ✨</sub> <br> <br> <a href="https://ghostlayer168.github.io/quantum-seo-portfolio/"> <img src="https://img.shields.io/badge/🌌_ENTER_THE_QUANTUM_REALM-ff5500?style=for-the-badge" alt="Enter Quantum Realm"> </a> </div> ```