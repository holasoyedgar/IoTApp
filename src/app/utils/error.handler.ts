import {
    Injectable
} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ErrorHandler {
    errors = [{
            server_message: 'COMMON.NAME_REQUIRED',
            client_message: 'Se requiere el nombre'
        },
        {
            server_message: 'COMMON.EMPTY_FIELD',
            client_message: 'Campo vacío'
        },
        {
            server_message: 'COMMON.ID_DOES_NOT_MATCH',
            client_message: 'El id no coincide'
        },
        {
            server_message: 'AUTH.AUTH_TOKEN_MUST_BE_SENT',
            client_message: 'El token debe ser enviado'
        },
        {
            server_message: 'AUTH.AUTH_ENTITY_DOES_NOT_FOUND',
            client_message: 'La entidad no existe'
        },
        {
            server_message: 'AUTH.AUTH_ENTITY_DOES_NOT_FOUND',
            client_message: 'La entidad no existe'
        },
        {
            server_message: 'AUTH.AUTH_ID_MUST_BE_SENT',
            client_message: 'El id debe ser enviado'
        },
        {
            server_message: 'USER.USER_DOES_NOT_EXIST',
            client_message: 'El usuario no existe'
        },
        {
            server_message: 'AUTH.AUTH_USER_OR_PASSWORD_INVALID',
            client_message: 'El usuario y la contraseña no coinciden'
        },
        {
            server_message: 'AUTH.AUTH_CANNOT_LOGOUT',
            client_message: 'El usuario no puede cerrar sesión'
        },
        {
            server_message: 'AUTH.AUTH_TOKEN_NOT_FOUND',
            client_message: 'No se encontró el token'
        },
        {
            server_message: 'DEVICES.ARDUINO_KEY_IS_WRONG',
            client_message: 'La clave de Arduino es correcta'
        },
        {
            server_message: 'DEVICES.ARDUINO_PIN_IS_ALREADY_USED',
            client_message: 'El pin de Arduino ya está ocupado'
        }
    ];

    errorHandler(message) {
        for (const error of this.errors) {
            if (error.server_message === message) {
                return error.client_message;
            }
        }
        return 'Hubo un error interno';
    }
}
