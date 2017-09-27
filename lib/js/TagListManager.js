import UIManager from './UIManager';



export default class TagListManager extends UIManager {

    constructor(elementSelector, tagService) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.tagService = tagService;
    }

    init() {
        this.loadTags();
    }

    loadTags() {
        
        this.tagService.list(result => {
            let tags = result.rows;
            // Comprobamos si hay tags
            if (tags.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                // Componemos el HTML con todas las tags
                
                this.renderTags(tags);
                // Quitamos el mensaje de cargando y mostramos la lista de tags
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();
            // Hacemos log del error en la consola
            console.error("Error al cargar las tags", error);
        });
    }

    renderTags(tags) {
        let html = "";
        for (let tag of tags) {
            html += this.renderTag(tag);
        }
        // Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    renderTag(tag) {
        let html = "";
        html += `<ul>`;
        html +=     `<li class="" data-id="${tag._id}">${tag.name}</li>`;
        html += `</ul>`;

        return html;
    }

    deleteTag(tagId) {
        this.setLoading();
        this.tagService.delete(tagId, success => {
            this.loadTags();
        }, error => {
            this.setError();
        })
    }

}