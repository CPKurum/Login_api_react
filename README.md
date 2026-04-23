## Avance
### Usuario normal
registrarse
iniciar sesión
ver libros
buscar libros
ver detalle
pedir préstamo
devolver libro
ver historial
### Administrador
gestionar usuarios
añadir libros
editar libros
eliminar libros
ver préstamos
gestionar devoluciones

# Register
## Descripción
Permite a un usuario crear una cuenta en la plataforma.

### Comportamiento actual

- El usuario envía email y contraseña y los demás datos necesarios.
- El backend crea el usuario en la base de datos.
- Se recibe un token de autenticación y se guarda, si el usuario fue creado correctamente.
- Actualmente el usuario permanece en la misma página después del registro.(END)

### Pendiente

- Redirigir automáticamente a la página principal después del registro.
- Guardar el token en el cliente (localStorage o cookie).
- Actualizar el estado de autenticación en React.
### Endpoint (Link)
/register  (luego de /auth/? debería?)

# Login
## Descripción
Permite a un usuario ingresar a la plataforma con su usuario y contraseña

### Comportamiento actual

- 