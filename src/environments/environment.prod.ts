import { auth0_client_id_prod, auth0_domain } from "auth_config";

export const environment = {
  production: true,
  auth: {    
    domain: auth0_domain,
    client_id: auth0_client_id_prod,
  }
};
