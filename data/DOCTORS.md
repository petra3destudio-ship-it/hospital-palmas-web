# Agregar médicos al directorio

El directorio se administra editando `data/doctors.json`. No requiere base de datos. Los cambios se ven al guardar y publicar los archivos del sitio; no hay un panel de administración.

1. Guarde la fotografía en `assets/img/doctors/` (cree la carpeta si hace falta). Use WebP, JPG o PNG, preferentemente de 600 × 480 píxeles, con el rostro centrado.
2. Agregue un objeto por médico al arreglo JSON, separado por comas. Esta es una plantilla; sustituya todos sus datos antes de publicarla:

```json
[
  {
    "published": false,
    "name": "NOMBRE COMPLETO DEL MÉDICO",
    "specialty": "ESPECIALIDAD",
    "license": "CÉDULA PROFESIONAL",
    "specialtyLicense": "",
    "photo": "./assets/img/doctors/nombre-apellido.webp",
    "assistantName": "NOMBRE DEL ASISTENTE",
    "assistantWhatsapp": ""
  }
]
```

3. En `assistantWhatsapp`, escriba el número internacional completo como texto, con código de país (52 para México). Puede incluir `+` y espacios. El botón abre WhatsApp con un mensaje que identifica al médico; el asistente confirma fecha y disponibilidad.
4. Cambie `published` a `true` cuando la ficha esté lista. Nombre, especialidad y cédula profesional son obligatorios. Mantenga las cédulas entre comillas para conservar ceros iniciales. La cédula de especialidad y el nombre del asistente son opcionales.

Una ficha sin teléfono válido muestra «Consultar disponibilidad» y dirige al contacto del hospital. Si falta la fotografía o no carga, aparece un distintivo HP. Las fichas con `published: false` o sin los campos obligatorios no aparecen. Un arreglo vacío (`[]`) muestra el aviso de «Próximamente».

Revise el sitio mediante un servidor HTTP local (consulte el README), ya que abrir el HTML con doble clic puede impedir la carga del JSON. Nunca agregue datos privados al archivo: su contenido será público, incluso en fichas con `published: false`.
