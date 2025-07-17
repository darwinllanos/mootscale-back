import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscribe } from './entities/subscribe.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
  ) {}

  async handleSubscribe(email: string): Promise<string> {
    const exist = await this.subscribeRepository.findOne({ where: { email } });
    if (exist) {
      throw new ConflictException('Ya estas suscrito en nuestra Base de Datos');
    }

    const newSubscribe = this.subscribeRepository.create({ email });
    await this.subscribeRepository.save(newSubscribe);

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Gracias por suscribirte',
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #0ba0dc; text-align: center;">¡Bienvenido a Mootscale!</h2>
      <p style="font-size: 16px; color: #0ba0dc;">
        Hola 👋<br><br>
        ¡Gracias por suscribirte a nuestro boletín! A partir de ahora recibirás contenido exclusivo, novedades y promociones especiales.
      </p>
      <img src="https://1drv.ms/i/c/cb9ffb8a5f0b4deb/IQSakuI_1lEtQbACpfQL9O_dAamxM2UyzbRxGMAXYKVvZAE?width=736&height=404" alt="Mootscale Descuentos motos a escala" style="display: block; margin: 20px auto; width: 600px; height: auto;">
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://mootscale.vercel.app" target="_blank" style="padding: 12px 24px; background-color: #0ba0dc; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Visítanos ahora
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">
        Si tienes alguna pregunta, no dudes en responder a este correo. Estamos aquí para ayudarte 😊<br><br>
        — MOOTSCALE, Inspirate cada dia!
      </p>
    </div>
  `,
      });
    } catch (error) {
      console.error('Error al guardar la suscripción:', error);
      throw new InternalServerErrorException('Error al guardar la suscripción');
    }

    return 'Te has suscrito con exito. Revisa tu correo.';
  }
}