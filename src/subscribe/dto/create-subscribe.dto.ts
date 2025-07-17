import { IsEmail, IsNotEmpty} from 'class-validator';

export class CreateSubscribeDto {
  @IsEmail({}, {message: 'El email debe ser válido'})
  @IsNotEmpty({message: 'El email no puede estar vacío'})
  email: string;
}
