
import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import {cargarUsuario,cargarUsuarioError,cargarUsuarioSuccess} from '../actions';

export interface UsuarioState {
    id: string,
    user:Usuario,
    loaded:boolean,
    loadeding:boolean,
    error:any,

};

const usuarioInitialState: UsuarioState = {
    id    :null,
    user  : null,
    loaded : false,
    loadeding : false,
    error : null
};

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuario, (state,{id}) => ({
         ...state,
         loadeding: true,
         id:id
    })),
    on(cargarUsuarioSuccess,(state,{usuario}) => ({ 
        ...state,
        loadeding:false,
        loaded:true,
        user:{...usuario}
    })),
    on(cargarUsuarioError,(state,{payload}) => ({ 
        ...state,
        loadeding:false,
        loaded:false,
        error:{
            url:payload.url,
            message:payload.message,
            status:payload.status
        }
    })),
);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}