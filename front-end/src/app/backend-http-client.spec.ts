import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BackendHttpClient } from './backend-http-client';

describe('BackendHttpClient', () => {

  let service: BackendHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(BackendHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
