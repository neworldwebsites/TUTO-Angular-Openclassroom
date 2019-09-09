import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth-service";
import { Injectable } from '@angular/core';

// Injecter un service à travers 1 autre service
@Injectable()

export class AuthGuard implements CanActivate{

	constructor(private authService: AuthService,
							private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {

		if (this.authService.isAuth) {
			return true;
		} else {
			this.router.navigate(['/auth']);
		}

	}
}