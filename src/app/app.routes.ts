import { Routes, Route } from '@angular/router';

export const routes: Route[] = [
    {path: 'verity', loadChildren: () => import('./pages/verity/routes').then(mod => mod.VERITY_ROUTES) }
];
