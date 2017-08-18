import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import 'rxjs/add/operator/first';

@Injectable()
export class IntroResolver {

    constructor(private api: ApiService) { }
    resolve(route: ActivatedRouteSnapshot) {
        return this.api.get('api/showcase/grid')
            .map(json => {
                return json;
            }).first();
    }
}
