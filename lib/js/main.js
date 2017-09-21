window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import AdvertisementService from "./AdvertisementService";
import AdvertisementListManager from "./AdvertisementListManager";

const advertisementService = new AdvertisementService("/apiv1/advertisements/");

const advertisementListManager = new AdvertisementListManager(".advertisements-list", advertisementService);
advertisementListManager.init();
