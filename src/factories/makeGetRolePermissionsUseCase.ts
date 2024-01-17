import { GetRolePermissionsUseCase } from '../application/useCases/GetRolePermissionsUseCase';

export function makeGetRolePermissionsUseCase() {
  return new GetRolePermissionsUseCase();
}
