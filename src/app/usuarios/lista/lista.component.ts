import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';

import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit ,OnDestroy{

  usuarios: Usuario[] = [];
  usuarioSus: Subscription;
  loading : boolean = false;
  error: any;
  

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    // this.userSv.getUser().subscribe(users => {
    //   console.log(users);
    //   this.usuarios= users;
    // });
    this.usuarioSus = this.store.select('usuarios')
                          .subscribe(state => {
                             this.usuarios = state.users;
                             this.loading =state.loadeding;
                             this.error = state.error;
                          });

    this.store.dispatch(cargarUsuarios());

    
  }
  ngOnDestroy(){
    this.usuarioSus.unsubscribe();
  }

}
