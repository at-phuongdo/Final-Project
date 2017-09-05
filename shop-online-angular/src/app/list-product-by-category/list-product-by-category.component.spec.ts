import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductByCategoryComponent } from './list-product-by-category.component';

describe('ListProductByCategoryComponent', () => {
  let component: ListProductByCategoryComponent;
  let fixture: ComponentFixture<ListProductByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
