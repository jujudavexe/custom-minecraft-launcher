import * as msal from '@azure/msal-node';
import axios from 'axios';
import 'dotenv/config'

const CLIENT_ID = process.env.CLIEND_ID;
const REDIRECT_URI = 'http://localhost:3000/auth';
const TENANT_ID = 'process.env.TENANT_ID';
const AUTHORITY = `https://login.microsoftonline.com/${TENANT_ID}`;

const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: AUTHORITY,
        redirectUri: REDIRECT_URI,
    },
};

const pca = new msal.PublicClientApplication(msalConfig);

export async function authenticate() {
    try {
        const authResponse = await pca.acquireTokenByDeviceCode({
            deviceCodeCallback: (response) => console.log(response.message),
            scopes: ['XboxLive.signin', 'offline_access'],
        });

        const accessToken = authResponse.accessToken;

        // Récupérer le XBL token
        const xblResponse = await axios.post('https://user.auth.xboxlive.com/user/authenticate', {
            Properties: {
                AuthMethod: 'RPS',
                SiteName: 'user.auth.xboxlive.com',
                RpsTicket: `d=${accessToken}`
            },
            RelyingParty: 'http://auth.xboxlive.com',
            TokenType: 'JWT'
        });

        const xblToken = xblResponse.data.Token;
        const uhs = xblResponse.data.DisplayClaims.xui[0].uhs;

        // Récupérer le XSTS token
        const xstsResponse = await axios.post('https://xsts.auth.xboxlive.com/xsts/authorize', {
            Properties: {
                SandboxId: 'RETAIL',
                UserTokens: [xblToken]
            },
            RelyingParty: 'rp://api.minecraftservices.com/',
            TokenType: 'JWT'
        });

        const xstsToken = xstsResponse.data.Token;

        // Récupérer le token Minecraft
        const mcResponse = await axios.post('https://api.minecraftservices.com/authentication/login_with_xbox', {
            identityToken: `XBL3.0 x=${uhs};${xstsToken}`
        });

        const mcAccessToken = mcResponse.data.access_token;

        return mcAccessToken;
    } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);
        throw error;
    }
}