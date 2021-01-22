
import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import {cargarUsuarios,cargarUsuariosError,cargarUsuariosSuccess} from '../actions';

export interface UsuariosState {
    users:Usuario[],
    loaded:boolean,
    loadeding:boolean,
    error:any,

};

const usuariosInitialState: UsuariosState = {
    users  : [],
    loaded : false,
    loadeding : false,
    error : null
        
};

const _usuariosReducer = createReducer(usuariosInitialState,

    on(cargarUsuarios, state => ({ ...state, loadeding: true})),
    on(cargarUsuariosSuccess,(state,{usuarios}) => ({ 
        ...state,
        loadeding:false,
        loaded:true,
        users:[...usuarios]
    })),
    on(cargarUsuariosError,(state,{payload}) => ({ 
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

export function usuariosReducer(state, action) {
    return _usuariosReducer(state, action);
}