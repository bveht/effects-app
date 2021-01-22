import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit,OnDestroy {
  usuario: Usuario;
  susUsuario:Subscription;

  constructor(private router:ActivatedRoute,
              private store:Store<AppState>) { }

  ngOnInit(): void {

    this.susUsuario = this.store.select('usuario').subscribe(
        ({user}) => this.usuario= user
    );  

    this.router.params.subscribe(
      ({id}) => {
         if(id !=='' || id !== null){
          this.store.dispatch(cargarUsuario({id:id}));
        }                
      }
    );
  }
  ngOnDestroy(){
    this.susUsuario.unsubscribe();
  }

}
