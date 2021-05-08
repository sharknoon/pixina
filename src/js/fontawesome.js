///////////////////////////////////////////
//             FontAwesome               //
///////////////////////////////////////////

import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";

// Icons

import {
    faFacebookF,
    faTelegramPlane,
    faTwitter,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCertificate,
    faCheckCircle,
    faCubes,
    faCut,
    faEnvelope,
    faImage as fasImage,
    faSparkles,
    faStar as fasStar,
    faTh as fasTh,
} from "@fortawesome/pro-solid-svg-icons";
import {
    faInfoCircle as farInfoCircle,
    faSquare,
    faStar as farStar,
    faTh as farTh,
} from "@fortawesome/pro-regular-svg-icons";
import {
    faArrowToBottom,
    faBookOpen,
    faCompass,
    faHistory,
    faImage as falImage,
    faImages,
    faInfoCircle as falInfoCircle,
    faPrint,
    faShareAlt,
    faStar as falStar,
    faTimes,
    faWrench,
} from "@fortawesome/pro-light-svg-icons";

library.add(
    faArrowToBottom,
    faBookOpen,
    faCertificate,
    faCheckCircle,
    faCompass,
    faCubes,
    faCut,
    faEnvelope,
    faFacebookF,
    faHistory,
    falImage,
    faImages,
    falInfoCircle,
    falStar,
    faPrint,
    farInfoCircle,
    farStar,
    farTh,
    fasImage,
    faShareAlt,
    faSparkles,
    faSquare,
    fasStar,
    fasTh,
    faTelegramPlane,
    faTimes,
    faTwitter,
    faWhatsapp,
    faWrench,
);

Vue.component('font-awesome-icon', FontAwesomeIcon)