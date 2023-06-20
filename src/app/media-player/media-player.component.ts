import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Vector3, Euler } from 'three';
import { SceneService } from '../scene.service';
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { data } from './data';

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
export class MediaPlayerComponent implements OnInit, AfterViewInit{

  @ViewChild('container')
  set container(container: ElementRef) {
      this.sceneService.initialize(container.nativeElement);
  }

  
  modelData = data;

  constructor(@Inject(SceneService) private sceneService: SceneService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("TO")
    this.generateModel();
    document.body.appendChild( VRButton.createButton( this.sceneService.renderer) );
    this.sceneService.renderer.xr.enabled = true;
  }

  generateModel() {
    this.modelData.map(x => {

      console.log(x);
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
        } break;

        case "conveyor": {
          this.sceneService.createModels("assets/conveyor.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Conveyor", "conveyor", new Euler(x.rotation.x,x.rotation.y,x.rotation.z, 'XYZ')).then(model => {
            // this.models.push(model as Object3D);
            this.sceneService.transformControls.detach();
            // this.sceneService.gridHelper.remove();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        case "conveyor2": {
          this.sceneService.createModels("assets/conveyor2.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Curved Conveyor", "conveyor2", new Euler(x.rotation.x,x.rotation.y,x.rotation.z, 'XYZ')).then(model => {
            // this.models.push(model as Object3D);
            this.sceneService.transformControls.detach();
            // this.sceneService.gridHelper.remove();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        default: break;
      }
    })
  }

}
