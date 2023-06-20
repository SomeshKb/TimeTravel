import { OrbitControls } from "../OrbitControlCustom/OrbitControlCustom";

export class OrbitControlsGizmo {
    constructor(orbitControls: OrbitControls, options: any);
    lock: boolean;
    lockX: boolean;
    lockY: boolean;
    update: () => void;
    dispose: () => void;
    domElement: HTMLCanvasElement;
}
