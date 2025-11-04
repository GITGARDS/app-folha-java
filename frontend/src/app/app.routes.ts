import { Routes } from "@angular/router";
import { EmpresaFindallComponent } from "./components/cadastro/empresa/empresa-findall/empresa-findall.component";
import { FuncionarioFindallComponent } from "./components/cadastro/funcionario/funcionario-findall/funcionario-findall.component";
import { ProdesFindallComponent } from "./components/cadastro/prodes/prodes-findall/prodes-findall.component";
import { About } from "./components/layout/about/about";
import { HomeComponent } from "./components/layout/home/home.component";
import { NavigationComponent } from "./components/layout/navigation/navigation.component";
import { AddressFormComponent } from "./components/schematic/address-form/address-form.component";

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
        component: HomeComponent,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'empresa',
        component: EmpresaFindallComponent,
      },
      {
        path: 'funcionario',
        component: FuncionarioFindallComponent,
      },
      {
        path: 'prodes',
        component: ProdesFindallComponent,
      },
      {
        path: 'address-form',
        component: AddressFormComponent,
      },
    ],
  },
];
