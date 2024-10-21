import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProviderRegister } from 'src/app/core/models/provider-register';
import { ProviderService } from '../../services/provider.service';
import { Service } from 'src/app/core/models/service';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/registration/services/auth.service';

@Component({
  selector: 'svs-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  providerForm!: FormGroup;
  providerModel!: ProviderRegister;
  role!: Role;
  private subs = new Subscription();
  servicesList: Service[] = [];
  filteredServices: Service[] = [];
  serviceId!: string | undefined;
  roles: string = '';
  cateroryList: any;
  servicesSelected: any;

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.checkForm();
    this.getServices();
    this.providerService.categories$.subscribe((res) => {
      this.cateroryList = res;
    });
  }

  onClickSservice(event: any) {
    this.serviceId = event.target.value;
    console.log(this.serviceId);
  }

  submitProvider() {
    console.log(this.serviceId);
    this.role = new Role();
    this.role.userID = `${localStorage.getItem('userId')}`;
    console.log(this.role.userID);
    this.role.role = 'Provider';

    this.providerModel = new ProviderRegister(this.providerForm.value);

    this.subs.add(
      this.subs.add(
        this.providerService
          .addProvider(this.serviceId, this.providerModel)
          .subscribe({
            next: (response) => {
              this.toastr.success(
                'A new service has been successfully registered. The -+- DelveHub -+- team wishes you success :)',
                'DelveHub ^_^'
              );
            },
            error: (error) => {},
            // complete: () => {
            //   this.roles = `${localStorage.getItem('roles')}`;
            //   if (!this.roles.includes('Provider')) {
            //     this.authService.addRole(this.role).subscribe((res) => {
            //       this.toastr.info('You have become a service provider');
            //     });
            //   }
            // },
          })
      )
    );
  }

  checkForm() {
    this.providerForm = this.fb.group({
      userId: [`${localStorage.getItem('userId')}`],
      aliasName: ['', Validators.required],
      skills: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: ['', Validators.required],
      durationTime: ['', Validators.required],
      serviceMode: ['', Validators.required],
      phone: ['', Validators.required],
      telegram: ['', Validators.required],
    });
  }

  getServices() {
    this.subs.add(
      this.providerService.getServicesList().subscribe((res) => {
        this.servicesList = res;
        this.filteredServices = this.servicesList.filter(
          (x) => x.categoryId == this.cateroryList.id
        );
      })
    );
  }

  categoriesList$ = this.providerService.categories$;

  onClickCategory(event: any) {
    var id = event.target.value;
    this.filteredServices = this.servicesList.filter((x) => x.categoryId == id);
    console.log();
    this.serviceId = this.filteredServices[0].id;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
