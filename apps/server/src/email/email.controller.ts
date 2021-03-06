import {
  Controller,
  Response,
  Query,
  Body,
  Request,
  Post,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmailService } from './email.service';
import { UsersService } from '../users/users.service';
import { ResetPasswordDto } from '../shared/dto/resetPasswordDto.dto';
import { resetPasswordEmailDto } from '../shared/dto/resetPasswordEmailDto.dto';

require('dotenv').config();
@ApiTags('Email Methods')
@Controller('email')
export class EmailController {
  constructor(
    private emailService: EmailService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Send Confirmation Email' })
  @ApiResponse({
    status: 200,
    description: 'Send Confirmation Email Successfully',
  })
  @Get('/sendConfirmEmail/:userId')
  async sendConfirmationEmail(@Param() params, @Response() res) {
    try {
      // 1. Use findById to find the user
      const user = await this.usersService.getUser(params.userId);
      // 2. Send out an email
      if (user && user.email) {
        const CONFIRM_URL = `${process.env.CONFIRM_ROOT_URL}${user._id}`;
        //Insert Email Templates
        const resp = await this.emailService.sendTemplateEmail(
          'confirm',
          { displayName: user.displayName, CONFIRM_URL },
          user.email,
        );
        if (resp.success) return res.status(HttpStatus.OK).json(resp);
        throw new Error(resp.response.message);
      } else throw new Error('User not found');
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message || err.toString() });
    }
  }

  @ApiOperation({
    summary: 'Send Confirmation Email Callback - Activate User Email',
  })
  @ApiResponse({
    status: 200,
    description: '{success: true, message: result.response.message}',
  })
  @Get('/activateEmail')
  async activateEmail(@Query() query, @Request() req, @Response() res) {
    // 1. Check if there is "userId" query in the URL
    if (!req.query.userId) {
      // 2. If not, return the request with code 400(BadRequest)
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          'Something went wrong. Please try again or contact the web admin!',
      });
    }
    try {
      const resp = await this.usersService.activateUserEmail(query.userId);
      if (resp.success) {
      await this.emailService.sendTemplateEmail(
          'welcome',
          { displayName: resp.response.user.displayName },
          resp.response.user.email,
        );
        res
          .status(HttpStatus.OK)
          .redirect(`${process.env.CLIENT_SIDE_URL}/profile`);
      } else {
        throw resp;
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).redirect('/');
    }
  }

  @ApiOperation({ summary: 'Sending out Reset Password Email' })
  @ApiResponse({
    status: 200,
    description:
      '{ success: true,  message: "Please check your email for link to reset password!"}',
  })
  @Post('/resetPassword')
  async sendResetPasswordEmail(
    @Response() res,
    @Body() resetPasswordEmailDto: resetPasswordEmailDto,
  ) {
    if (
      resetPasswordEmailDto.email &&
      resetPasswordEmailDto.email.match(/.+@.+\..+/)
    ) {
      const user = await this.usersService.getUserByEmail(
        resetPasswordEmailDto.email,
      );
      if (user) {
        try {
          const RESET_PASSWORD_URL = `${process.env.RESET_PASSWORD_ROOT_URL}`;
          const et = await this.emailService.getEmailTemplate(
            'reset_password',
            {
              displayName: user.displayName,
              RESET_PASSWORD_URL,
            },
          );
          if (et) {
            /* await this.emailService
              .sendEmail({
                from: `Huyen from Mern Temp <${process.env.EMAIL_ADDRESS_FROM}>`,
                to: [user.email],
                subject: et.response.template.subject,
                body: et.response.template.message,
              })
              .then((resp) => {
                res.status(HttpStatus.OK).json({
                  success: true,
                  message:
                    'Please check your email for link to reset password!',
                });
              })
              .catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).json({
                  success: false,
                  message: 'Something went wrong. Please try again later!',
                });
              });
              */
          }
        } catch (err) {
          res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Something went wrong. Please try again later!',
          });
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "You haven't signed up yet. Please sign up!",
        });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid Email Address. Please try again!',
      });
    }
  }

  /**
   * Reset User password
   */
  @ApiOperation({ summary: 'Reset Password ' })
  @ApiResponse({
    status: 200,
    description: '{success: true, message: resp.response.message}',
  })
  @Post('/resetPassword/password')
  async resetPassword(
    @Param() params,
    @Request() req,
    @Response() res,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    if (resetPasswordDto.password) {
      let resp;
      resp = await this.usersService.resetPassword(
        resetPasswordDto.password,
        resetPasswordDto.email,
      );
      if (resp.success) {
        res
          .status(HttpStatus.OK)
          .json({ success: true, message: resp.response.message });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: resp.response.message });
      return;
    }
    res
      .status(400)
      .json({ success: false, message: 'Invalid Password. Please try again!' });
  }
}
