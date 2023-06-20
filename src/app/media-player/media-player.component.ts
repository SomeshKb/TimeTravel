import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Vector3, Euler } from 'three';
import { SceneService } from '../scene.service';
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

type ACTION = {
  ACTION_NAME : string,
  ACTOR : string,
  TIME: Date,
  LOCATION: string,
}

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  @ViewChild('container')
  set container(container: ElementRef) {
    if (!this.sceneService.scene) {
      this.sceneService.initialize(container.nativeElement);
    }
  }
  modelData = [
    {
      "id": "kuka",
      "name": "Kuka Robot",
      "position": { "x": 2.5391923523937576, "y": 0, "z": 0 },
      "scale": { "x": 0.01, "y": 0.01, "z": 0.01 },
      "rotation": { "x": -1.5707963267948963, "y": 0, "z": 0 }
    },
    {
      "id": "plane",
      "name": "Plane",
      "position": { "x": 0.012838000420733131, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "rotation": { "x": 1.5707963267948966, "y": 0, "z": 0 }
    },
    {
      "id": "kuka",
      "name": "Kuka Robot",
      "position": { "x": -2.0360265965806397, "y": 0, "z": 0 },
      "scale": { "x": 0.01, "y": 0.01, "z": 0.01 },
      "rotation": { "x": -1.5707963267948963, "y": 0, "z": 0 }
    }
  ]

  constructor(@Inject(SceneService) private sceneService: SceneService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.generateModel();
    document.body.appendChild( VRButton.createButton( this.sceneService.renderer) );
    this.sceneService.renderer.xr.enabled = true;
  }

  generateModel() {
    this.modelData.map(x => {
      switch (x.id) {
        case "kuka": {
          this.sceneService.createModels("assets/kuka.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Kuka Robot", "kuka").then(model => {
            // this.models.push(model as Object3D);
            this.sceneService.transformControls.detach();
            // this.sceneService.gridHelper.remove();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        case "plane": {
          const model = this.sceneService.createPlane(new Vector3(x.position.x, x.position.y, x.position.z), new Euler(x.rotation.x, x.rotation.y, x.rotation.z), new Vector3(x.scale.x, x.scale.y, x.scale.z));
          // this.models.push(this.model as Object3D);
          this.sceneService.transformControls.detach();
          // this.sceneService.gridHelper.remove();
          this.sceneService.orbitControls.enabled = true;
          console.log(this.sceneService.scene)
          break;
        }

        default: break;
      }
    })
  }

}
