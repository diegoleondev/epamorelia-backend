# EPA Morelia

## Certificados SSL para desarrollo

Para ejecutar localmente con SSL, puedes generar certificados autofirmados con los siguientes comandos:

```bash
# Genera una clave privada
openssl genpkey -algorithm RSA -out key.pem

# Genera un certificado autofirmado
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

Estos comandos crearán una clave privada (key.pem) y un certificado autofirmado (cert.pem) que puedes usar para habilitar HTTPS en tu entorno de desarrollo.

## Node Version

- Node 20.9.0

> [!TIP]
> Puede usar el archivo `.nvmrc` para cambiar automáticamente la versión de Node.

## Scripts

- `npm start` - Inicia la aplicación en modo producción.
- `npm run dev` - Inicia la aplicación en modo desarrollo.
- `npm run build` - Compila la aplicación para producción.
