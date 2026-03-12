import { Observable } from "rxjs";

import { Competition } from "./competition";
import { Season } from "./season";

export interface DataServiceInterface {

  seasons: Observable<Season[]>;

  competitions: Observable<Competition[]>;

}
