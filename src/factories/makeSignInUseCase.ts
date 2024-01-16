import { SignInUseCase } from '../application/useCases/SignInUseCase';

export function makeSignInUseCase() {
  return new SignInUseCase();
}
