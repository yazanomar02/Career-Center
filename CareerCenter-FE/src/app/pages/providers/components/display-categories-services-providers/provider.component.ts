import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { Service } from '../../../../core/models/service';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../../../core/models/provider';


@Component({
  selector: 'svs-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy{
 
  servicesList: Service[] = [];
  providersList!: Provider[];
  filteredServices: Service[] = [];
  filteredproviders: Provider[] = [];
  backupProvider: Provider[] = [];
  private subs = new Subscription();
  username!: string;
  private _listFilter: string = '';
  /**
   *
   */
  constructor(private providerService: ProviderService,
              ) {}

  ngOnInit(): void {
    this.username = `${localStorage.getItem('userName')}`;
   this.getServices();
   this.GetProviders();

  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  get ListFilter(): string {
    return this._listFilter;
  }
  set ListFilter(value:string) {
    console.log(value)
    this._listFilter = value;
    this.filteredproviders = this.performFilter(value);
  }

  performFilter(value: string){
    value = value.toLocaleLowerCase();
    return this.backupProvider.filter((provider : Provider) => 
          provider.aliasName?.toLocaleLowerCase().includes(value));  
  }

  categoriesList$ = this.providerService.categories$.pipe(
    tap(res => console.log(res))
  );

  getServices() {
    this.subs.add( this.providerService.getServicesList().subscribe(res => {
      this.servicesList = res;
      this.filteredServices = this.servicesList;
    }));
  }

  GetProviders() {
    this.subs.add( this.providerService.getProvidersList().subscribe(res => {
      this.providersList = res;
      this.filteredproviders = this.providersList;
      this.backupProvider = this.filteredproviders;
      console.log(res);
    }));
  }

  onClickCategory(id: string | undefined) {
    if(id == '0') {this.filteredServices = this.servicesList;}
    else { this.filteredServices = this.servicesList.filter(s => s.categoryId == id)}
  }

  onClickService(id: string | undefined) {
    this.filteredproviders = this.providersList.filter(p => p.serviceId== id)
    this.backupProvider = this.filteredproviders;
  }
 
  
}
