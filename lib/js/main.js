window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import AdvertisementService from "./AdvertisementService";
import TagService from "./TagService";
import AdvertisementListManager from "./AdvertisementListManager";
import TagListManager from "./TagListManager";

// const authenticationService = new AuthenticationService("/api/authenticate");
const advertisementService = new AdvertisementService("/api/anuncios/");
const tagService = new TagService("/apiv1/tags/");

const advertisementListManager = new AdvertisementListManager(".advertisements-list", advertisementService);
advertisementListManager.init();

const tagListManager = new TagListManager(".tags-list", tagService);
tagListManager.init();
