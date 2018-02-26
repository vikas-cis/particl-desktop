import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'ng2-logger';

import { CategoryService } from 'app/core/market/api/category/category.service';
import { Category } from 'app/core/market/api/category/category.model';
import { TemplateService } from 'app/core/market/api/template/template.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {

  log: any = Log.create('add-item.component');
  private destroyed: boolean = false;

  title: FormControl = new FormControl();
  shortDesc: FormControl = new FormControl();
  longDesc: FormControl = new FormControl();
  categories: FormControl = new FormControl();
  price: FormControl = new FormControl();
  domesticShippingPrice: FormControl = new FormControl();
  internationalShippingPrice: FormControl = new FormControl();

  _rootCategoryList: Category = new Category({});

  constructor(
    private router: Router,
    private category: CategoryService,
    private template: TemplateService
  ) { }

  ngOnInit() {
    this.subToCategories();
  }

  subToCategories() {
    this.category.list()
    .takeWhile(() => !this.destroyed)
    .subscribe(
      list => this.updateCategories(list));
  }

  updateCategories(list: Category) {
    this.log.d('Updating category list');
    this._rootCategoryList = list;
  }

  backToSell() {
    this.router.navigate(['/market/sell']);
  }

  ngOnDestroy() {
    this.destroyed = true;
  }
// template add 1 "title" "short" "long" 80 "SALE" "PARTICL" 5 5 5 "Pasdfdfd"
  save() {
    this.template.add(
      this.title.value,
      'test', // this.shortDesc.value,
      this.longDesc.value,
      75, // TODO: replace
      'SALE',
      'PARTICL',
      +this.price.value,
      +this.domesticShippingPrice.value,
      1, // this.internationalShippingPrice.value
      'Paaaa'
    ).subscribe(
      (template) => { this.log.d('template=' + template); }
    );
  }

  saveAndPublish() {
    this.log.d('saveAndPublish');
  }
}
