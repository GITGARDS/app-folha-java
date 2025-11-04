import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
  ],
})
export class NavigationComponent {
  lista = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'About', route: 'about', icon: 'info' },
    { name: 'Empresa', route: 'empresa', icon: 'apartment' },
    { name: 'Funcionario', route: 'funcionario', icon: 'badge' },
    // { name: 'Funcionario2', route: 'funcionario2', icon: 'badge' },
    { name: 'Proventos/Descontos', route: 'prodes', icon: 'drag_indicator' },
    // { name: 'Address Form', route: 'address-form', icon: 'post' },
  ];

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
}
