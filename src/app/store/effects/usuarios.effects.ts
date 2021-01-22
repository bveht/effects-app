import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, map, catchError} from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

import * as usuariosActions from '../actions';

import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuariosEffects {
    constructor(private actions$: Actions,private usuarioSv:UsuarioService) {}

    cargarUsuarios$ = createEffect(
        () =>  this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(
                () => this.usuarioSv.getUsers()
                .pipe(
                   map(users=> usuariosActions.cargarUsuariosSuccess({usuarios:users})),
                   catchError( err => of(usuariosActions.cargarUsuariosError({payload:err})))
                )
            )
        )
    );

}