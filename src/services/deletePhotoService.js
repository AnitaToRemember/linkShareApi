// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');

// Importamos los errores.
const { deleteFileError } = require('./errorService');

const deletePhotoService = async (imgName) => {
    try {
        // Ruta absoluta al archivo que queremos eliminar.
        const imgPath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR,
            imgName
        );

        // Comprobamos si la imagen existe con la ayuda del método "access".
        try {
            await fs.access(imgPath);
        } catch {
            // Si el método anterior lanza un error quiere decir que la imagen no existe.
            // En ese caso finalizamos la función.
            return;
        }

        // Eliminamos erl archivo de la carpeta de subida de archivos.
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};

module.exports = deletePhotoService;
