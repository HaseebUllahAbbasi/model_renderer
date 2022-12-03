import React, { Component } from "react";
import {
  Scene,
  Color,
  MeshNormalMaterial,
  PerspectiveCamera,
  WebGLRenderer
} from "three";
import Stats from "stats.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import damagedHelmet from "./DamagedHelmet/Hubmetablend.gltf";

class Example extends Component {
  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.cleanup();
  }

  init = () => {
    this.aspect = this.node.clientWidth / this.node.clientHeight;
    this.camera = new PerspectiveCamera(50, this.aspect, 1, 1000);
    this.camera.position.set(0, 0.9, 3.7);

    this.controls = new OrbitControls(this.camera, this.node);
    this.scene = new Scene();
    this.scene.background = new Color("#191919");

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.parse(damagedHelmet, undefined, ({ scene }) => {
      this.object = scene;
      this.object.traverse((node) => {
        if (node.isMesh) {
          node.material = new MeshNormalMaterial();
          node.material.needsUpdate = true;
        }
      });

      this.scene.add(this.object);
    });

    this.renderer = new WebGLRenderer({
      antialias: true
    });

    this.node.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize);

    this.stats = new Stats();
    this.node.appendChild(this.stats.dom);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.node.clientWidth, this.node.clientHeight);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(this.animate);
  };

  animate = () => {
    this.stats.begin();

    if (this.object) {
      this.object.rotation.y += 0.001;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();
  };

  cleanup = () => {
    window.removeEventListener("resize", this.onWindowResize);
    this.renderer.setAnimationLoop(null);
  };

  onWindowResize = () => {
    this.camera.aspect = this.node.clientWidth / this.node.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.node.clientWidth, this.node.clientHeight);
  };

  render() {
    return (
      <div
        css={{ width: "100%", height: "100%" }}
        ref={(el) => (this.node = el)}
      />
    );
  }
}

export default Example;
