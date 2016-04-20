using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Services;
using Owin;

namespace HostWeb
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
                    RaiseInformationEvents = true
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

            //IdentityServer3.Core.Services.IUserService

            //options.Factory.CustomTokenValidator=new Registration<ICustomTokenValidator>()


            //var clientService = new ClientValidateService();
            //options.Factory.CustomTokenResponseGenerator = new Registration<ICustomTokenResponseGenerator>(m => tokenService);

            app.UseIdentityServer(options);
        }
    }
}
