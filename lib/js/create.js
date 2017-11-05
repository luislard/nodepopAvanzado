window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import AdvertisementService from "./AdvertisementService";
import TagService from "./TagService";
import TagListManager from "./TagListManager";

// const authenticationService = new AuthenticationService("/api/authenticate");
const advertisementService = new AdvertisementService("/api/anuncios/");
const tagService = new TagService("/apiv1/tags/");

const tagListManager = new TagListManager(".tags-list", tagService);
tagListManager.init();
