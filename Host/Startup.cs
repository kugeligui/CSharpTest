using IdentityServer3.Core.Configuration;
using Owin;

namespace Host
{
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var options = new IdentityServerOptions
            {
                Factory = new IdentityServerServiceFactory()
                            .UseInMemoryClients(Clients.Get())
                            .UseInMemoryScopes(Scopes.Get())
                            .UseInMemoryUsers(Users.Get()),
                RequireSsl = false
            };

            app.UseIdentityServer(options);
        }
    }
}
