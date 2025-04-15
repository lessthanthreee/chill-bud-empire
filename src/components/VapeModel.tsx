
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface VapeModelProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

export function VapeModel(props: VapeModelProps) {
  const meshRef = useRef<Mesh>(null);
  
  // Rotate the model on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Main vape body */}
      <mesh 
        ref={meshRef} 
        position={props.position} 
        scale={props.scale}
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
        <meshStandardMaterial 
          color="#2E8B57" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Vape mouthpiece */}
      <mesh
        position={[0, 1.7, 0]}
        scale={props.scale}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.4, 0.5, 32]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      {/* Vape base/battery */}
      <mesh
        position={[0, -1.3, 0]}
        scale={props.scale}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.55, 0.55, 0.4, 32]} />
        <meshStandardMaterial
          color="#444444"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Vape window/indicator */}
      <mesh
        position={[0, 0, 0.52]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.15, 1.5, 0.15]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.2}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}
