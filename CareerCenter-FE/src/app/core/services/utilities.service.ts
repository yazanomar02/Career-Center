import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {
    private excludedPages : string[] = ['','selection-page'];

    isExcludedPage(currentPage: string): boolean {
        return this.excludedPages.includes(currentPage);
    }

    sortRoles(roles: string): string {
        const rolesArray = roles.replace(/["\[\]]/g,'').split(',');

        const rolePriority = ['Admin', 'HR', 'Provider', 'User'];
        const sortedRoles = rolesArray.sort((a, b) => rolePriority.indexOf(a) - rolePriority.indexOf(b));

        return sortedRoles[0] || '';
    }

    extractPageName(url: string): string{
        const segments = url.split('/');
        return segments[segments.length - 1];
    }

    existsInRoles(value: string): boolean{
        const ls : string = `${localStorage.getItem('roles')}`;
        return ls.includes(value);
    }
}