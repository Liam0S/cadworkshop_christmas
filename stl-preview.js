import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

class StlPreview extends HTMLElement {
  static get observedAttributes() { return ['src']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; position: relative; min-height: 220px; }
        .viewport { position: absolute; inset: 0; }
        canvas { display: block; width: 100%; height: 100%; touch-action: none; }
        .status { position: absolute; inset: 0; display: grid; place-items: center; padding: 20px; color: #f5f1df; font: 14px/1.5 system-ui, sans-serif; text-align: center; pointer-events: none; }
      </style>
      <div class="viewport"></div><div class="status" role="status">Loading 3D model…</div>`;
    this.viewport = this.shadowRoot.querySelector('.viewport');
    this.status = this.shadowRoot.querySelector('.status');
    this.animate = this.animate.bind(this);
  }

  connectedCallback() {
    if (this.renderer) return;
    this.start();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src' && oldValue !== newValue && oldValue !== null && this.isConnected && this.renderer) {
      this.loadModel(newValue);
    }
  }

  disconnectedCallback() {
    this.loadToken = (this.loadToken || 0) + 1;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.controls?.dispose();
    this.mesh?.removeFromParent();
    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
    this.renderer?.domElement.remove();
    this.renderer = this.scene = this.camera = this.controls = this.geometry = this.material = this.mesh = null;
  }

  start() {
    try {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, 1, 0.01, 10000);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.viewport.appendChild(this.renderer.domElement);

      this.scene.add(new THREE.HemisphereLight(0xfff6df, 0x26372f, 2.2));
      const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
      keyLight.position.set(4, 7, 6);
      this.scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0xd7e8ff, 1.2);
      fillLight.position.set(-5, -2, 4);
      this.scene.add(fillLight);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.controls.autoRotateSpeed = 1.4;

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this);
      this.resize();

      this.loadModel(this.getAttribute('src'));
      this.frame = requestAnimationFrame(this.animate);
    } catch (error) {
      console.error('Could not start STL preview:', error);
      this.status.textContent = 'Interactive 3D preview is unavailable in this browser.';
    }
  }

  loadModel(src) {
    if (!src) {
      this.status.hidden = false;
      this.status.textContent = 'No STL file was provided.';
      return;
    }
    const token = this.loadToken = (this.loadToken || 0) + 1;
    this.status.hidden = false;
    this.status.textContent = 'Loading 3D model…';
    new STLLoader().load(src, geometry => {
      if (!this.isConnected || token !== this.loadToken) { geometry.dispose(); return; }
      this.mesh?.removeFromParent();
      this.geometry?.dispose();
      this.material?.dispose();
      this.geometry = geometry;
      this.geometry.computeVertexNormals();
      this.geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      this.geometry.boundingBox.getCenter(center);
      this.geometry.translate(-center.x, -center.y, -center.z);
      this.geometry.computeBoundingSphere();

      const color = src.toLowerCase().includes('snowflake') ? 0xd7aa4d : 0xc9dfd2;
      this.material = new THREE.MeshStandardMaterial({ color, metalness: 0.18, roughness: 0.34, side: THREE.DoubleSide });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      const radius = Math.max(this.geometry.boundingSphere.radius, 0.01);
      this.camera.position.set(radius * 2.4, radius * 1.8, radius * 2.8);
      this.camera.near = Math.max(radius / 100, 0.001);
      this.camera.far = radius * 100;
      this.camera.updateProjectionMatrix();
      this.controls.target.set(0, 0, 0);
      this.controls.minDistance = radius * 0.6;
      this.controls.maxDistance = radius * 10;
      this.controls.update();
      this.status.hidden = true;
    }, undefined, error => {
      if (token !== this.loadToken) return;
      console.error('Could not load STL preview:', error);
      this.status.textContent = 'Could not load the 3D preview. Use the STL link below to open the file.';
    });
  }

  resize() {
    if (!this.renderer || !this.camera) return;
    const width = Math.max(this.clientWidth, 1);
    const height = Math.max(this.clientHeight, 1);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    if (!this.isConnected || !this.renderer) return;
    this.frame = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

if (!customElements.get('stl-preview')) customElements.define('stl-preview', StlPreview);
