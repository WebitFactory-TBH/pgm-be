import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const configService: ConfigService = app.get(ConfigService)
  const port = configService.get('APP_PORT')

  // const isDevelopment = process.env.NODE_ENV !== 'production'

  // TODO - use improved helmet config (needs cors)
  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Pagamento API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(port)
}
bootstrap()
