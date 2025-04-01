
import React, { useRef, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, Mesh, Group, AnimationMixer } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

interface VapeModelProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

export function VapeModel(props: VapeModelProps) {
  const groupRef = useRef<Group>(null);
  const vapeRef = useRef<Mesh>(null);
  const podRef = useRef<Mesh>(null);
  const { viewport, camera } = useThree();
  const data = useScroll();
  
  // Load the vape model from the FBX file
  const fbx = useLoader(FBXLoader, "/vape/source/Vape_013.fbx");
  
  // Load textures
  const baseColorTexture = useLoader(TextureLoader, "/vape/textures/Vape_013_BaseColor.png");
  const normalTexture = useLoader(TextureLoader, "/vape/textures/Vape_013_NormalOL.png");
  const metalnessTexture = useLoader(TextureLoader, "/vape/textures/Vape_013_Metallic.png");
  const roughnessTexture = useLoader(TextureLoader, "/vape/textures/Vape_013_Roughness.png");
  const emissiveTexture = useLoader(TextureLoader, "/vape/textures/Vape_013_Emissive.png");
  const aoTexture = useLoader(TextureLoader, "/vape/textures/Vape_013_AO.png");
  
  // Setup the model
  useEffect(() => {
    if (fbx) {
      // Clone the model to avoid modifying the original
      const model = fbx.clone();
      
      // Scale and position the model
      model.scale.set(0.01, 0.01, 0.01);
      
      // Apply textures to appropriate parts
      model.traverse((child) => {
        if (child instanceof Mesh && child.isMesh) {
          // Apply textures to the material
          if (child.material) {
            child.material.map = baseColorTexture;
            child.material.normalMap = normalTexture;
            child.material.metalnessMap = metalnessTexture;
            child.material.roughnessMap = roughnessTexture;
            child.material.emissiveMap = emissiveTexture;
            child.material.aoMap = aoTexture;
            child.material.needsUpdate = true;
            
            // If this is the pod part, assign to podRef
            if (child.name.toLowerCase().includes('pod')) {
              podRef.current = child;
            }
            // If this is the main vape body, assign to vapeRef
            else if (child.name.toLowerCase().includes('body')) {
              vapeRef.current = child;
            }
          }
        }
      });
      
      // Add the model to our group
      if (groupRef.current) {
        // Clear previous children
        while (groupRef.current.children.length) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
        groupRef.current.add(model);
      }
    }
  }, [fbx, baseColorTexture, normalTexture, metalnessTexture, roughnessTexture, emissiveTexture, aoTexture]);
  
  // Animate the model based on scroll position
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Basic rotation
      groupRef.current.rotation.y += delta * 0.3;
      
      // Get scroll progress (0 to 1)
      const scrollProgress = data.offset;
      
      // Animate parts based on scroll
      if (podRef.current && vapeRef.current) {
        // When scrolling down, "load" the pod into the vape
        // Start pod animation when scroll is at 10% (0.1)
        if (scrollProgress > 0.1) {
          // Calculate how far along the animation we are (between 0.1 and 0.3 of scroll)
          const podAnimProgress = Math.min(1, (scrollProgress - 0.1) / 0.2);
          
          // Move the pod down into the vape
          podRef.current.position.y = (1 - podAnimProgress) * 0.5;
        } else {
          // Reset pod position when scrolling back up
          podRef.current.position.y = 0.5;
        }
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={props.position} 
      scale={props.scale}
      castShadow 
      receiveShadow
    />
  );
}
