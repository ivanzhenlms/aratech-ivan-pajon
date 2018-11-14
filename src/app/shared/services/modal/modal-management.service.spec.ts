import { TestBed, inject } from '@angular/core/testing';

import { ModalManagementService } from './modal-management.service';

describe('ModalManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalManagementService]
    });
  });

  it('should be created', inject([ModalManagementService], (service: ModalManagementService) => {
    expect(service).toBeTruthy();
  }));
});
