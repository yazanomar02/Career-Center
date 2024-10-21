import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ListenEventService {
    private currentRoute!: string | undefined;
    private previousRoute!: string | undefined;
    private url: string = 'http://localhost:4200/';
    private check : boolean | undefined= false;
    /**
     *
     */
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
    onCheckRoute(): boolean | undefined {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(() => {
            console.log("subscribe")
            this.currentRoute = this.activatedRoute.snapshot.routeConfig?.path;

            const previousRoute = this.router.getCurrentNavigation()?.previousNavigation;
            if (previousRoute) {
              this.previousRoute = previousRoute.finalUrl?.toString();
            }
            this.check = this.currentRoute?.includes(this.url) && this.previousRoute?.includes(this.url);
        });

        
        return this.check;
    }
}