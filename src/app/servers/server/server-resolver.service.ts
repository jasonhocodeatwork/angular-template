import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

//server-resolver.service.ts
interface Serverdetail {
    id: number, name: string, status: string
}

@Injectable()
export class ServerResolver implements Resolve<Serverdetail> {

    constructor(private ss: ServersService) {}

    // always render the component as needed
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Serverdetail | Observable<Serverdetail> | Promise<Serverdetail> {
        return this.ss.getServer(+route.params['id'])
    }
}