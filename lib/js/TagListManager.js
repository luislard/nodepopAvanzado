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
        
        let queryString = window.location.search;

        this.tagService.list(result => {
            let tags = result.rows;
            // Comprobamos si hay tags
            if (tags.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                // Componemos el HTML con todas las tags
                
                this.renderAdvertisements(tags);
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

    renderAdvertisements(tags) {
        let html = "";
        for (let advertisement of tags) {
            html += this.renderAdvertisement(advertisement);
        }
        // Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    renderAdvertisement(advertisement) {
        let photo = advertisement.photo;
        let srcset = "";
        let html = "";
        let sale = "";
        if (photo == "") {
            photo = "img/disk-150px.png";
        }
        if (advertisement.isSale){
            sale += "On Sale";
        }else{
            sale += "Looking for";
        }
        html += `<article class="advertisement col-md-4" data-id="${advertisement._id}">
                    <div class="thumbnail">
                        <img src="/images/${advertisement.photo}" alt="${advertisement.name}" class="img-responsive">
                        <div class="caption">
                            <h4 class="pull-right">${advertisement.price}</h4>
                            <div class="sale">${sale}</div>
                            <h4><a href="#">${advertisement.name}</a></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div class="ratings">
                            <p>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            (15 reviews)
                            </p>
                        </div>
                        <div class="space-ten"></div>
                        <div class="btn-ground text-center">
                            <button type="button" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> Add To Cart</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#product_view"><i class="fa fa-search"></i> Quick View</button>
                        </div>
                        <div class="space-ten"></div>
                    </div>
                </article>`;

                return html;
    }

    deleteAdvertisement(advertisementId) {
        this.setLoading();
        this.tagService.delete(advertisementId, success => {
            this.loadAdvertisements();
        }, error => {
            this.setError();
        })
    }

}