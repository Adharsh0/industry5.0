// import React, { useEffect, useState, useRef } from 'react';
// import * as THREE from 'three';
// import './HomeSection.css';

// const HomeSection = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [positionClass, setPositionClass] = useState('bee-position-1');
//   const beeRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mouseRef = useRef({ x: 0, y: 0 });
//   const scrollRef = useRef(0);
//   const animationRef = useRef(null);

//   // ===================== THREE.JS LIQUID METAL =====================
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     scene.fog = new THREE.Fog(0x000000, 6, 40);

//     const camera = new THREE.PerspectiveCamera(
//       70,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       100
//     );
//     camera.position.set(0, 2, 7);

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true,
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     /* ===== LIQUID PLANE ===== */
//     const planeGeo = new THREE.PlaneGeometry(20, 20, 120, 120);
//     const planeMat = new THREE.MeshStandardMaterial({
//       color: 0x4A90E2,
//       metalness: 0.8,
//       roughness: 0.3,
//       transparent: true,
//       opacity: 0.6,
//       wireframe: true,
//     });

//     const plane = new THREE.Mesh(planeGeo, planeMat);
//     plane.rotation.x = -Math.PI / 2;
//     plane.position.y = -1.8;
//     scene.add(plane);

//     /* ===== LIGHTS ===== */
//     const light1 = new THREE.PointLight(0x4A90E2, 1.2, 20);
//     light1.position.set(5, 5, 5);
//     scene.add(light1);

//     const light2 = new THREE.PointLight(0xffffff, 0.6, 20);
//     light2.position.set(-5, 3, -5);
//     scene.add(light2);

//     /* ===== FLOATING METAL PARTICLES ===== */
//     const pCount = 800;
//     const pGeo = new THREE.BufferGeometry();
//     const pPos = new Float32Array(pCount * 3);

//     for (let i = 0; i < pCount; i++) {
//       pPos[i * 3] = (Math.random() - 0.5) * 15;
//       pPos[i * 3 + 1] = Math.random() * 6;
//       pPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
//     }

//     pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

//     const pMat = new THREE.PointsMaterial({
//       color: 0xffffff,
//       size: 0.03,
//       transparent: true,
//       opacity: 0.5,
//       blending: THREE.AdditiveBlending,
//     });

//     const particles = new THREE.Points(pGeo, pMat);
//     scene.add(particles);

//     /* ===== MOUSE ===== */
//     const mouse = { x: 0, y: 0 };
//     const onMouseMove = (e) => {
//       mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
//       mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener("mousemove", onMouseMove);

//     /* ===== ANIMATION ===== */
//     const clock = new THREE.Clock();
//     const positions = plane.geometry.attributes.position;

//     const animate = () => {
//       const t = clock.getElapsedTime();

//       // Liquid wave
//       for (let i = 0; i < positions.count; i++) {
//         const y =
//           Math.sin(positions.getX(i) * 1.5 + t) *
//           0.25 *
//           Math.cos(positions.getY(i) * 1.5 + t);
//         positions.setZ(i, y);
//       }
//       positions.needsUpdate = true;

//       // Particle shimmer
//       particles.rotation.y += 0.0008;

//       // Camera parallax
//       camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.04;
//       camera.position.y += (2 + mouseRef.current.y * 0.6 - camera.position.y) * 0.04;
//       camera.lookAt(0, 0, 0);

//       renderer.render(scene, camera);
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     /* ===== RESIZE ===== */
//     const onResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       cancelAnimationFrame(animationRef.current);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("resize", onResize);
//       renderer.dispose();
//     };
//   }, []);

//   // ===================== SCROLL HANDLING =====================
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setScrollY(currentScrollY);
//       scrollRef.current = currentScrollY;
      
//       let newPosition = 'bee-position-1';
      
//       if (currentScrollY > 400) {
//         newPosition = 'bee-position-5';
//       } else if (currentScrollY > 300) {
//         newPosition = 'bee-position-4';
//       } else if (currentScrollY > 200) {
//         newPosition = 'bee-position-3';
//       } else if (currentScrollY > 100) {
//         newPosition = 'bee-position-2';
//       }
      
//       setPositionClass(newPosition);
      
//       if (beeRef.current) {
//         const bee = beeRef.current;
//         let top, left, width, opacity;
        
//         if (currentScrollY <= 100) {
//           const progress = currentScrollY / 100;
//           top = 120 - (progress * 40);
//           left = 50 + (progress * -40);
//           width = 30 - (progress * 10);
//           opacity = 1;
//         } else if (currentScrollY <= 200) {
//           const progress = (currentScrollY - 100) / 100;
//           top = 80 - (progress * 20);
//           left = 10 + (progress * 75);
//           width = 20 - (progress * 5);
//           opacity = 1 - (progress * 0.1);
//         } else if (currentScrollY <= 300) {
//           const progress = (currentScrollY - 200) / 100;
//           top = 60 + (progress * 25);
//           left = 85 + (progress * 5);
//           width = 15 - (progress * 3);
//           opacity = 0.9 - (progress * 0.1);
//         } else {
//           const progress = (currentScrollY - 300) / 100;
//           top = 85 - (progress * 65);
//           left = 90 - (progress * 40);
//           width = 12 - (progress * 4);
//           opacity = 0.8 - (progress * 0.1);
//         }
        
//         bee.style.top = `${top}px`;
//         bee.style.left = `${left}%`;
//         bee.style.width = `${width}%`;
//         bee.style.opacity = opacity;
//         bee.style.transform = currentScrollY > 300 ? `translateX(-50%)` : 'translateX(0)';
//       }

//       if (subtitleRef.current) {
//         const subtitle = subtitleRef.current;
//         const subtitleProgress = Math.min(currentScrollY / 300, 1);
//         const subtitleOpacity = 1 - subtitleProgress;
//         const subtitleScale = 1 - (subtitleProgress * 0.2);
        
//         subtitle.style.opacity = subtitleOpacity;
//         subtitle.style.transform = `translateY(${subtitleProgress * 20}px) scale(${subtitleScale})`;
//       }
//     };

//     let ticking = false;
//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           handleScroll();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', onScroll, { passive: true });
//     handleScroll();
    
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//     };
//   }, []);

//   return (
//     <div className="hero-container" id='home'>
//       <canvas ref={canvasRef} className="three-canvas" />
      
//       <div className="center-content">
//         <div className="image-container">
//           <div 
//             className={`bee-parallax ${positionClass}`}
//             ref={beeRef}
//             style={{
//               transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
//             }}
//           >
//             <img 
//               src="bee.png" 
//               alt="Bee"
//               className="bee-image"
//             />
//           </div>
          
//           <img 
//             src="nex1.png" 
//             alt="AI Robot holding Earth"
//             className="center-image"
//           />
//         </div>
//       </div>

//       <div className="subtitle-wrapper" ref={subtitleRef}>
//         <div className="subtitle-container1">
//           <div className="subtitle-line1"></div>
//           <h2 className="hero-subtitle1">
//             Where <span className="highlight-text">humans</span> meet <span className="highlight-text">machines</span>
//           </h2>
//           <div className="subtitle-line1"></div>
//         </div>

//         <div className="hero-decoration">
//           <div className="decoration-dot dot-1"></div>
//           <div className="decoration-dot dot-2"></div>
//           <div className="decoration-dot dot-3"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeSection;
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import './HomeSection.css';

const HomeSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [positionClass, setPositionClass] = useState('bee-position-1');
  const beeRef = useRef(null);
  const subtitleRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const animationRef = useRef(null);

  // ===================== THREE.JS LIQUID METAL =====================
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 6, 40);

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* ===== LIQUID PLANE ===== */
    const planeGeo = new THREE.PlaneGeometry(20, 20, 120, 120);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x4A90E2,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });

    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.8;
    scene.add(plane);

    /* ===== LIGHTS - CENTERED ===== */
    const light1 = new THREE.PointLight(0x4A90E2, 1.2, 20);
    light1.position.set(0, 5, 5); // CENTERED X
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 0.6, 20);
    light2.position.set(0, 3, -5); // CENTERED X
    scene.add(light2);

    // Add ambient light for better center illumination
    const ambientLight = new THREE.AmbientLight(0x4A90E2, 0.3);
    scene.add(ambientLight);

    // Add directional light from center top
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    /* ===== FLOATING METAL PARTICLES ===== */
    const pCount = 800;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 15;
      pPos[i * 3 + 1] = Math.random() * 6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ===== MOUSE ===== */
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ===== ANIMATION ===== */
    const clock = new THREE.Clock();
    const positions = plane.geometry.attributes.position;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Liquid wave
      for (let i = 0; i < positions.count; i++) {
        const y =
          Math.sin(positions.getX(i) * 1.5 + t) *
          0.25 *
          Math.cos(positions.getY(i) * 1.5 + t);
        positions.setZ(i, y);
      }
      positions.needsUpdate = true;

      // Particle shimmer
      particles.rotation.y += 0.0008;

      // Camera parallax - centered with mobile optimization
      const isMobile = window.innerWidth < 768;
      const parallaxFactor = isMobile ? 0.5 : 1.2;
      const verticalFactor = isMobile ? 0.3 : 0.6;
      
      camera.position.x += (mouseRef.current.x * parallaxFactor - camera.position.x) * 0.04;
      camera.position.y += (2 + mouseRef.current.y * verticalFactor - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    /* ===== RESIZE ===== */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  // ===================== SCROLL HANDLING =====================
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      scrollRef.current = currentScrollY;
      
      let newPosition = 'bee-position-1';
      
      if (currentScrollY > 400) {
        newPosition = 'bee-position-5';
      } else if (currentScrollY > 300) {
        newPosition = 'bee-position-4';
      } else if (currentScrollY > 200) {
        newPosition = 'bee-position-3';
      } else if (currentScrollY > 100) {
        newPosition = 'bee-position-2';
      }
      
      setPositionClass(newPosition);
      
      if (beeRef.current) {
        const bee = beeRef.current;
        let top, left, width, opacity;
        
        if (currentScrollY <= 100) {
          const progress = currentScrollY / 100;
          top = 120 - (progress * 40);
          left = 50 + (progress * -40);
          width = 30 - (progress * 10);
          opacity = 1;
        } else if (currentScrollY <= 200) {
          const progress = (currentScrollY - 100) / 100;
          top = 80 - (progress * 20);
          left = 10 + (progress * 75);
          width = 20 - (progress * 5);
          opacity = 1 - (progress * 0.1);
        } else if (currentScrollY <= 300) {
          const progress = (currentScrollY - 200) / 100;
          top = 60 + (progress * 25);
          left = 85 + (progress * 5);
          width = 15 - (progress * 3);
          opacity = 0.9 - (progress * 0.1);
        } else {
          const progress = (currentScrollY - 300) / 100;
          top = 85 - (progress * 65);
          left = 90 - (progress * 40);
          width = 12 - (progress * 4);
          opacity = 0.8 - (progress * 0.1);
        }
        
        bee.style.top = `${top}px`;
        bee.style.left = `${left}%`;
        bee.style.width = `${width}%`;
        bee.style.opacity = opacity;
        bee.style.transform = currentScrollY > 300 ? `translateX(-50%)` : 'translateX(0)';
      }

      if (subtitleRef.current) {
        const subtitle = subtitleRef.current;
        const subtitleProgress = Math.min(currentScrollY / 300, 1);
        const subtitleOpacity = 1 - subtitleProgress;
        const subtitleScale = 1 - (subtitleProgress * 0.2);
        
        subtitle.style.opacity = subtitleOpacity;
        subtitle.style.transform = `translateY(${subtitleProgress * 20}px) scale(${subtitleScale})`;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="hero-container" id='home'>
      <canvas ref={canvasRef} className="three-canvas" />
      
      <div className="center-content">
        <div className="image-container">
          <div 
            className={`bee-parallax ${positionClass}`}
            ref={beeRef}
            style={{
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img 
              src="bee.png" 
              alt="Bee"
              className="bee-image"
            />
          </div>
          
          <img 
            src="nex1.png" 
            alt="AI Robot holding Earth"
            className="center-image"
          />
        </div>
      </div>

      <div className="subtitle-wrapper" ref={subtitleRef}>
        <div className="subtitle-container1">
          <div className="subtitle-line1"></div>
          <h2 className="hero-subtitle1">
            Where <span className="highlight-text">humans</span> meet <span className="highlight-text">machines</span>
          </h2>
          <div className="subtitle-line1"></div>
        </div>

        <div className="hero-decoration">
          <div className="decoration-dot dot-1"></div>
          <div className="decoration-dot dot-2"></div>
          <div className="decoration-dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;