import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import FontAwesomeIcon from "@/lib/FontAwesomeIcon.jsx";

library.add(fas, faUserSecret, faInstagram, faTwitter);

export { FontAwesomeIcon };