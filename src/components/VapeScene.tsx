
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment, Stage, ScrollControls, useScroll } from "@react-three/drei";
import { VapeModel } from "./VapeModel";

export default function VapeScene() {
  return (
    <div className="h-64 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={3} damping={0.25} distance={1}>
          <Suspense fallback={null}>
            <PresentationControls
              global
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
            >
              <Stage environment="city" intensity={0.6} shadows>
                <VapeModel position={[0, -1, 0]} scale={0.8} />
              </Stage>
            </PresentationControls>
            <Environment preset="city" />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
