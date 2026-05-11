import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getStickerInfo } from './geometry.js';
import { projectNDto3D } from './projection_nd.js';

export class ThreeRenderer {
    constructor(canvas) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: false
        });
        this.camera.position.z = 25;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        const axes = new THREE.AxesHelper(5);
        this.scene.add(axes);
        this.pointGeometry = new THREE.SphereGeometry(0.1);
        this.pointMaterial = new THREE.MeshBasicMaterial({color:0xffffff});

        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.animate();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.render();
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setPixelRatio(
            window.devicePixelRatio
        );

        this.renderer.setSize(width, height);
        this.render();
    }

    addTestSphere() {
        const sphere = new THREE.Mesh(this.pointGeometry, this.pointMaterial);
        this.scene.add(sphere);
    }

    addPieceCenters(cube, projector) {
        const geometry = new THREE.SphereGeometry(0.1);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff});
        for (const piece of cube.pieces) {
            for (const sticker of piece.stickers) {
                const info = getStickerInfo(piece, sticker);
                const pos3 = projector(info.pos);
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(pos3.get(0), pos3.get(1), pos3.get(2));
                this.scene.add(mesh);
            }
            // const posN = piece.getTransPos();
            // const pos3 = projector(posN);
            // if (!pos3) continue;
            // const mesh = new THREE.Mesh(geometry, material);
            // mesh.position.set(pos3.get(0), pos3.get(1), pos3.get(2));
            // this.scene.add(mesh);
        };
    }
}