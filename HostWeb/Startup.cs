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
                Factory = new IdentityServerServiceFactory()
                            .UseInMemoryClients(Clients.Get())
                            .UseInMemoryScopes(Scopes.Get()),
                //.UseInMemoryUsers(Users.Get()),
                RequireSsl = false,
                EventsOptions = new EventsOptions
                {
                    RaiseSuccessEvents = true,
                    RaiseErrorEvents = true,
                    RaiseFailureEvents = true,
                    RaiseInformationEvents = true
                }
            };

            var userService = new LocalRegistrationUserService();
            options.Factory.UserService = new Registration<IUserService>(resolver => userService);

            app.UseIdentityServer(options);
        }
    }
}
