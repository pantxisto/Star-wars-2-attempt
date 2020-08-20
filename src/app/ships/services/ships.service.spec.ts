import { TestBed, tick, async } from '@angular/core/testing';

import { ShipsService } from './ships.service';
import { HttpClientModule } from '@angular/common/http';

describe('ShipsService', () => {
  let service: ShipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ShipsService],
    });
    service = TestBed.inject(ShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get lastResponse', () => {
    spyOn(service, 'getLastResponse').and.returnValue({ results: [1] });
    service.getLastResponse();
    expect(service.getLastResponse()).toEqual({ results: [1] });
  });

  it('should get lastResponse', () => {
    spyOn(service, 'getLastResponse').and.returnValue({ results: [1] });
    service.getLastResponse();
    expect(service.getLastResponse()).toEqual({ results: [1] });
  });

  it('should get ship', () => {
    expect(service.getShip(5)).toEqual({});
  });

  it('should fetch Starship by id', async(() => {
    service.GetStarship(12).subscribe((data) => {
      expect(data.name).toEqual('X-wing');
    });
  }));
});
