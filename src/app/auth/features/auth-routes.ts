import { Routes } from "@angular/router";

export default[

    {
        path: 'sign-in',
        loadComponent:()=>import('./sign-in/sign-in.component'),
    },
    {
        path: 'sign-up',
        loadComponent:()=>import('./sign-up/sign-up.component'),
    },
    {
        path: 'ejemplo1',
        loadComponent:()=>import('../../formulario/ejemplo1/ejemplo1.component'),
    }
]as Routes

