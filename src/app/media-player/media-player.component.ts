import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Vector3, Euler } from 'three';
import { SceneService } from '../scene.service';
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { data } from './data';
import { Subscription, Observable } from 'rxjs';

type ACTION = {
  ACTION_NAME: string,
  ACTOR: string,
  TIME: Date,
  LOCATION: string,
}

@Component({
  selector: 'media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('container')
  container!: ElementRef;
  modelData = data;
  eventsSubscription: Subscription | undefined;

  selected : boolean = false;

  @Input() events: Observable<void> = new Observable() ;

  constructor(@Inject(SceneService) private sceneService: SceneService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
    this.sceneService.initialize(this.container.nativeElement);
    this.generateModel();
    document.body.appendChild( VRButton.createButton( this.sceneService.renderer) );
    this.sceneService.renderer.xr.enabled = true;
    this.selected = true
    });
  }

  ngAfterViewInit(): void {
  }

  generateModel() {
    this.modelData.map(x => {
      switch (x.id) {
        case "kuka": {
          this.sceneService.createModels("assets/kuka.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Kuka Robot", "kuka").then(model => {
            this.sceneService.transformControls.detach();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        case "plane": {
          const model = this.sceneService.createPlane(new Vector3(x.position.x, x.position.y, x.position.z), new Euler(x.rotation.x, x.rotation.y, x.rotation.z), new Vector3(x.scale.x, x.scale.y, x.scale.z));
          this.sceneService.transformControls.detach();
          this.sceneService.orbitControls.enabled = true;
          console.log(this.sceneService.scene)
        } break;

        case "conveyor": {
          this.sceneService.createModels("assets/conveyor.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Conveyor", "conveyor", new Euler(x.rotation.x, x.rotation.y, x.rotation.z, 'XYZ')).then(model => {
            this.sceneService.transformControls.detach();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        case "conveyor2": {
          this.sceneService.createModels("assets/conveyor2.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Curved Conveyor", "conveyor2", new Euler(x.rotation.x, x.rotation.y, x.rotation.z, 'XYZ')).then(model => {
            this.sceneService.transformControls.detach();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        default: break;
      }
    })
  }

  ngOnDestroy() {
    this.eventsSubscription?.unsubscribe();
  }
}
