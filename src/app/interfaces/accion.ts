export interface Accion {
    accion: string; //edit, delete o add
    seccion?: string; //lavado, reparacion o usuario
    campo?: string; //Empresa-lavador ....
    flag?: boolean;
    terminal?: string; //Valparaíso, Santiago San Anto....
}
