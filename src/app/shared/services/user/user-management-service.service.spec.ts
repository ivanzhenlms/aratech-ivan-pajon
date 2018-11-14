import { TestBed, inject } from '@angular/core/testing';
import { UserManagementService } from './user-management-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserManagementServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([UserManagementService], (service: UserManagementService) => {
    expect(service).toBeTruthy();
  }));
});
