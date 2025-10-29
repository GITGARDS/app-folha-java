import { Routes } from "@angular/router";
import { FuncionarioFindallComponent } from "./components/funcionario/funcionario-findall/funcionario-findall.component";
import { About } from "./components/layout/about/about";
import { Home } from "./components/layout/home/home";
import { NavigationComponent } from "./components/layout/navigation/navigation.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'navigation',
  },
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'funcionario',
        component: FuncionarioFindallComponent,
      },
    ],
  },
];
