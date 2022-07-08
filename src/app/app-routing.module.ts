import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from "./pages";

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: "reload",
        paramsInheritanceStrategy: 'always',
        initialNavigation: 'enabled',
        urlUpdateStrategy: 'deferred'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
