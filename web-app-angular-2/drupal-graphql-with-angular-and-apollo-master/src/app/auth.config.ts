import { environment } from './../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  loginUrl: `${environment.contenta_url}/oauth/authorize`,

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200/',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'YOUR_CLIENT_ID',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'content_admin',
  requireHttps: false,  
  oidc: false,
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true,
}