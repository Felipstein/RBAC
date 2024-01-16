import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

export function makeSignUpUseCase() {
  const salt = 10;

  return new SignUpUseCase(salt);
}
