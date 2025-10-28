import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pastel color generator based on time t (in ms)
function pastelColor(t) {
    let speed = 0.00005;
    let hue = (t * speed * 360) % 360;
    let saturation = 70 + 10 * Math.sin(t * speed * 2 * Math.PI);
    let lightness = 75 + 10 * Math.sin(t * speed * 1.5 * Math.PI);
    return new THREE.Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
}

function NodeGraph({ nodeCount = 80, k = 8, delta_v = 0.001 }) {
    const group = useRef();

    // Initalize Nodes & Velocities
    const nodes = useMemo(() => {
        return Array.from({ length: nodeCount }, () =>
            new THREE.Vector3(
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 7,
                (Math.random() - 0.5) * 10
            )
        );
    }, [nodeCount]);

    const velocities = useMemo(() => {
        return Array.from({ length: nodeCount }, () =>
            new THREE.Vector3(
                (Math.random() - 0.5) * delta_v,
                (Math.random() - 0.5) * delta_v,
                (Math.random() - 0.5) * delta_v
            )
        );
    }, [nodeCount]);

    // Build graph
    const connections = useMemo(() => {
        const edges = [];
        for (let i = 0; i < nodes.length; i++) {
            const dists = nodes.map((n, j) => ({
                idx: j,
                dist: i === j ? Infinity : nodes[i].distanceTo(n),
            }));
            dists.sort((a, b) => a.dist - b.dist);
            for (let n = 0; n < k; n++) {
                const neighborIdx = dists[n].idx;
                if (i < neighborIdx) edges.push([i, neighborIdx]);
            }
        }
        return edges;
    }, [nodes, k]);

    const lineRefs = useRef([]);

    // Move Nodes, Update Color, Redraw Lines
    useFrame(() => {
        const now = Date.now();
        const color = pastelColor(now); // New Color

        const BOUNDS = [10, 5, 6]; // 3D bounding box for graph, prevents moving over elements
        const SOFT = [1.5, 1.5, 1.5];

        nodes.forEach((node, i) => {
            node.add(velocities[i]);
            // Soft boundary: slow and steer when close to edge
            ['x', 'y', 'z'].forEach((axis, j) => {
                if (node[axis] < -BOUNDS[j] + SOFT[j]) {
                    // Steer back toward center
                    velocities[i][axis] += 0.01 * ((-BOUNDS[j] + SOFT[j]) - node[axis]);
                    // Slow down
                    velocities[i][axis] *= 0.95;
                } else if (node[axis] > BOUNDS[j] - SOFT[j]) {
                    velocities[i][axis] -= 0.01 * (node[axis] - (BOUNDS[j] - SOFT[j]));
                    velocities[i][axis] *= 0.95;
                }
            });
            // Change Velocity for random noise
            if (Math.random() < 0.01) {
                velocities[i].x += (Math.random() - 0.5) * delta_v;
                velocities[i].y += (Math.random() - 0.5) * delta_v;
                velocities[i].z += (Math.random() - 0.5) * delta_v;
                // Clamp Velocity
                velocities[i].x = Math.max(-0.03, Math.min(0.01, velocities[i].x));
                velocities[i].y = Math.max(-0.03, Math.min(0.01, velocities[i].y));
                velocities[i].z = Math.max(-0.03, Math.min(0.01, velocities[i].z));
            }

        });

        // Update Position and Color
        group.current.children.forEach((child, i) => {
            if (child.isMesh) {
                child.position.copy(nodes[i]);
                child.material.color.copy(color);
            }
        });

        // Update lines
        lineRefs.current.forEach(({ ref, aIdx, bIdx }) => {
            const positions = ref.geometry.attributes.position.array;
            positions[0] = nodes[aIdx].x;
            positions[1] = nodes[aIdx].y;
            positions[2] = nodes[aIdx].z;
            positions[3] = nodes[bIdx].x;
            positions[4] = nodes[bIdx].y;
            positions[5] = nodes[bIdx].z;
            ref.geometry.attributes.position.needsUpdate = true;
            ref.material.color.copy(color);
        });
    });

    return (
        <group ref={group}>
            {/* Spheres */}
            {nodes.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshBasicMaterial color={"white"} />
                </mesh>
            ))}

            {/* Lines */}
            {connections.map(([aIdx, bIdx], idx) => {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    nodes[aIdx],
                    nodes[bIdx],
                ]);
                const material = new THREE.LineBasicMaterial({
                    color: "white",
                    opacity: 0.6,
                    transparent: true,
                });
                const ref = new THREE.Line(geometry, material);
                lineRefs.current.push({ ref, aIdx, bIdx });
                return <primitive key={idx} object={ref} />;
            })}
        </group>
    );
}

export default function GraphBackground() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10] }}
            style={{ pointerEvents: "none" }}  // 👈 Add this line
        >
            <ambientLight intensity={0.3} />
            <NodeGraph />
        </Canvas>
    );
}

