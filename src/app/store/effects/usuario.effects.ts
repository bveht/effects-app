import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError} from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

import * as usuarioActions from '../actions';

import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioEffects {
    constructor(private actions$: Actions,private usuarioSv:UsuarioService) {}

    cargarUsuario$ = createEffect(
        () =>  this.actions$.pipe(
            ofType(usuarioActions.cargarUsuario),
            mergeMap(
                ({id}) => this.usuarioSv.getUserById(id)
                .pipe(
                   map(user=> usuarioActions.cargarUsuarioSuccess({usuario:user})),
                   catchError( err => of(usuarioActions.cargarUsuarioError({payload:err})))
                )
            )
        )
    );

}