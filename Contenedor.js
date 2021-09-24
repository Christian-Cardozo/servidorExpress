const fs = require("fs");
const encoding = "utf-8";

class Contenedor {

    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
        this.maxId = 0
    }

    async save(item) {

        const array = await this.read();

        if (array.length > 0) {
            this.maxId = Math.max.apply(Math, array.map(x => x.id))
        }

        item.id = this.maxId + 1;
        array.push(item)

        await this.update(array)

        console.log(`Guardado correctamente id: ${item.id}`)
        return item.id;
    }

    async getById(id) {
        const array = await this.read()
        return array.find(x => x.id == id) || null
    }

    async getAll() {
        const array = await this.read()
        return array || null;
    }

    async deleteById(id) {
        let array = await this.read()

        array = array.filter(x => x.id != id)
        await this.update(array)
        console.log(`Eliminado correctamente id: ${id}`)
    }

    async deleteAll() {
        await this.update()
        console.log(`Registros eliminados correctamente `)
    }

    async update(data = []) {

        let jsonObj = JSON.stringify(data)
        await fs.promises.writeFile(this.rutaArchivo, jsonObj)
    }

    async read() {
        try {
            const json = await fs.promises.readFile(this.rutaArchivo)            
            const array = JSON.parse(json);
            return array;

        } catch (error) {
            console.error(error)
            return []
        }
    }
}

module.exports = Contenedor; 
