using IdentityServer3.AccessTokenValidation;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using Owin;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web.Http;

namespace SZHome.OAuth2.HostWeb
{
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var options = new IdentityServerOptions
            {
                Factory = new IdentityServerServiceFactory(),
                //.UseInMemoryClients(Clients.Get())
                //.UseInMemoryScopes(Scopes.Get()),
                //.UseInMemoryUsers(Users.Get()),
                RequireSsl = false,
                EventsOptions = new EventsOptions
                {
                    RaiseSuccessEvents = true,
                    RaiseErrorEvents = true,
                    RaiseFailureEvents = true,
                    RaiseInformationEvents = true,
                },
            };
            //IdentityServer3.Core.Services.ITokenService

            //应用
            var clientStore = new ClientService();
            options.Factory.ClientStore = new Registration<IClientStore>(client => clientStore);

            //用户
            var userService = new UserService();
            options.Factory.UserService = new Registration<IUserService>(user => userService);

            //角色存储
            ScopeStore scopeStore = new ScopeStore();
            options.Factory.ScopeStore = new Registration<IScopeStore>(store => scopeStore);

            //本地化服务
            LocalizationService localizationService = new LocalizationService();
            options.Factory.LocalizationService = new Registration<ILocalizationService>(l => localizationService);

            //access token生成验证
            var tokenResponseService = new TokenResponseService();
            options.Factory.CustomTokenResponseGenerator = new Registration<ICustomTokenResponseGenerator>(m => tokenResponseService);

            //验证token的服务
            CustomTokenValidator tokenValidator = new CustomTokenValidator(userService, clientStore);
            options.Factory.CustomTokenValidator = new Registration<ICustomTokenValidator>(v => tokenValidator);

            //权限存储
            PermissionsStore permissionsStore = new PermissionsStore();
            ClientPermissionsService clientPermissionsService = new ClientPermissionsService(permissionsStore, clientStore, scopeStore, localizationService);
            options.Factory.ClientPermissionsService = new Registration<IClientPermissionsService>(p => clientPermissionsService);

            //请求验证
            CustomRequestValidator requestValidator = new CustomRequestValidator();
            options.Factory.CustomRequestValidator = new Registration<ICustomRequestValidator>(m => requestValidator);

            var clientStoreCache = new ClientStoreCache();
            var scopeStoreCache = new ScopeStoreCache();
            var userServiceCache = new UserServiceCache();

            options.Factory.ConfigureClientStoreCache(new Registration<ICache<Client>>(clientStoreCache));
            options.Factory.ConfigureScopeStoreCache(new Registration<ICache<IEnumerable<Scope>>>(scopeStoreCache));
            options.Factory.ConfigureUserServiceCache(new Registration<ICache<IEnumerable<Claim>>>(userServiceCache));

            //options.Factory.v

            //认证服务
            //ConsentStore consentStore = new ConsentStore();
            //options.Factory.ConsentStore = new Registration<IConsentStore>(m => consentStore);
            //options.Factory.ConsentService = new Registration<IConsentService>(m => new ConsentService(consentStore));

            //options.Factory.ConfigureUserServiceCache(new Registration<ICache<IEnumerable<Claim>>());

            //options.Factory.CustomRequestValidator
            //IdentityServer3.Core.Services.ICache<
            //IdentityServer3.Core.Services.Default.DefaultCustomRequestValidator

            //options.Factory.CustomTokenValidator=new Registration<ICustomTokenValidator>()

            app.UseIdentityServer(options);

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "http://localhost:5000",
                ValidationMode = ValidationMode.ValidationEndpoint,
                RequiredScopes = new[] { "get_user_info" }
            });

            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            //// require authentication for all controllers
            config.Filters.Add(new AuthorizeAttribute());

            app.UseWebApi(config);
        }
    }
}
