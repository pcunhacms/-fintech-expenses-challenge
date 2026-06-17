import { Injectable, BadRequestException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt'; 
import { UnauthorizedException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const userExists = await this.usersService.findByEmail(
            registerDto.email,
        );

        if (userExists) {
            throw new BadRequestException(
                'Email já cadastrado',
            );
        }

        const hashedPassword = await bcrypt.hash(
            registerDto.password,
            10,
        );

        const user = await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(
            loginDto.email,
        );

        if (!user) {
            throw new UnauthorizedException(
                'Email ou senha inválidos'
            );
        }

        const passwordMatch = await bcrypt.compare(
            loginDto.password,
            user.password
        );

        if (!passwordMatch){
            throw new UnauthorizedException(
                'Email ou senha inválidos',
            );
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
