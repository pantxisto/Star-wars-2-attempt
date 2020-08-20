import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { ShipsComponent } from './ships.component';
import { ShipsService } from './services/ships.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipsComponent],
      imports: [HttpClientModule],
      providers: [
        ShipsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: {} },
          },
        },
      ],
    });
  }));

  it('should create', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should asign fetched data on fetchNext call', async(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let shipsService = fixture.debugElement.injector.get(ShipsService);
    const fakeResponse = {
      results: [],
      next: null,
      previous: null,
      count: 0,
    };
    spyOn(shipsService, 'GetStarships').and.returnValue(of(fakeResponse));
    component.fetchNext('FetchNext');
    fixture.detectChanges();
    expect(component.lastResponse).toBe(fakeResponse);
    expect(component.starships).toBe(fakeResponse.results);
    expect(component.disableButton).toBe(true);
    expect(component.fetching).toBe(false);
  }));

  it('should asign fetched data on init if no response is provided', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.lastResponse).toEqual({});
    expect(component.starships).toEqual([]);
    expect(component.disableButton).toEqual(true);
    expect(component.error).toEqual(true);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert')).toBeTruthy();
  });

  it('should asign fetched data on init if response is provided', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        snapshot: {
          data: {
            response: {
              results: [],
              next: null,
              previous: null,
              count: 0,
            },
          },
        },
      },
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.lastResponse).toEqual({
      results: [],
      next: null,
      previous: null,
      count: 0,
    });
    expect(component.starships).toEqual([]);
    expect(component.disableButton).toEqual(true);
    expect(component.error).toEqual(undefined);
  });
});

// describe('ShipsComponentResponse', () => {
//   let component: ShipsComponent;
//   let fixture: ComponentFixture<ShipsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ShipsComponent],
//       imports: [HttpClientModule],
//       providers: [
//         ShipsService,
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               data: {
//                 response: {
//                   results: [],
//                   next: null,
//                   previous: null,
//                   count: 0,
//                 },
//               },
//             },
//           },
//         },
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ShipsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should asign fetched data on init if response is provided', () => {
//     expect(component.lastResponse).toEqual({
//       results: [],
//       next: null,
//       previous: null,
//       count: 0,
//     });
//     expect(component.starships).toEqual([]);
//     expect(component.disableButton).toEqual(true);
//     expect(component.error).toEqual(undefined);
//   });
// });
