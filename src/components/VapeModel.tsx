
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

// We'll use a simple cylinder as a fallback if the model fails to load
export function VapeModel(props: any) {
  const meshRef = useRef<Mesh>(null);
  
  // Rotate the model on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
        <meshStandardMaterial 
          color="#32CD32" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
