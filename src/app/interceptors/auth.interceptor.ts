import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service.ts.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // La méthode  intercept()  sera appelée pour chaque requête et recevra cette requête comme argument, 
  // en plus d'un objet appelé  next
  // Dans la méthode :
  // créez des  headers  utilisables par Angular avec  new HttpHeaders() et  utilisez leur méthode  append()  pour y ajouter un header  Authorization  qui contient  Bearer TOKEN   – c'est souvent la forme requise pour ce type de header ;
  // créez une nouvelle requête en clonant la précédente et en y ajoutant les  headers  que vous venez de créer – les requêtes sont des objets immuables (qu'on ne peut pas modifier), donc on créera toujours une nouvelle requête qui contient les modifications requises ;
  // retournez  next.handle()  en y passant la nouvelle requête – c'est ce qui permet à la requête de continuer son chemin.
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders ()
      .append('Authorization', `Bearer ${this.authService .getToken()}`);
    const modifiedReq = req.clone({ headers });
    return next.handle(modifiedReq);
  }
}