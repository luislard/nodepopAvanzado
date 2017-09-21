import UIManager from './UIManager';

export default class AdvertisementListManager extends UIManager {

    constructor(elementSelector, advertisementService) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.advertisementService = advertisementService;
    }

    init() {
        this.loadAdvertisements();
    }

    loadAdvertisements() {
        this.advertisementService.list(result => {
            let advertisements = result.rows;
            // Comprobamos si hay advertisements
            if (advertisements.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                // Componemos el HTML con todas las advertisements
                
                this.renderAdvertisements(advertisements);
                // Quitamos el mensaje de cargando y mostramos la lista de advertisements
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();
            // Hacemos log del error en la consola
            console.error("Error al cargar las advertisements", error);
        });
    }

    renderAdvertisements(advertisements) {
        let html = "";
        for (let advertisement of advertisements) {
            html += this.renderAdvertisement(advertisement);
        }
        // Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    renderAdvertisement(advertisement) {
        let photo = advertisement.photo;
        let srcset = "";
        if (photo == "") {
            photo = "img/disk-150px.png";
        }
        return `<article class="advertisement col-md-4" data-id="${advertisement._id}">
                    <div class="thumbnail">
                        <img src="/images/${advertisement.photo}" alt="${advertisement.name}" class="img-responsive">
                        <div class="caption">
                            <h4 class="pull-right">${advertisement.price}</h4>
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
    }

    deleteAdvertisement(advertisementId) {
        this.setLoading();
        this.advertisementService.delete(advertisementId, success => {
            this.loadAdvertisements();
        }, error => {
            this.setError();
        })
    }

}