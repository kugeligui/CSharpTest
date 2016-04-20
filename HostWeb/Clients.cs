using IdentityServer3.Core.Models;
using System.Collections.Generic;

namespace HostWeb
{
    static class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                //// no human involved
                //new Client
                //{
                //    ClientName = "Silicon-only Client",
                //    ClientId = "ddzf",
                //    Enabled = true,
                //    AccessTokenType = AccessTokenType.Reference,

                //    Flow = Flows.ClientCredentials,

                //    ClientSecrets = new List<Secret>
                //    {
                //        new Secret("F621F470-9731-4A25-80EF-67A6F7C5F4B8".Sha256())
                //    },

                //    AllowedScopes = new List<string>
                //    {
                //        "api1"
                //    }
                //},
    
                //// human is involved
                //new Client
                //{
                //    ClientName = "咚咚抢客",
                //    ClientId = "ddqk",
                //    Enabled = true,
                //    AccessTokenType = AccessTokenType.Reference,
                //    Flow = Flows.ResourceOwner,
                //    ClientSecrets = new List<Secret>{new Secret("F621F470-9731-4A25-80EF-67A6F7C5F4B8".Sha256())},
                //    AllowedScopes = new List<string>{"api1"}
                //}

                // human is involved
                new Client
                {
                    ClientName = "测试",
                    ClientId = "clientTest",
                    Enabled = true,
                    AccessTokenType = AccessTokenType.Reference,
                    Flow = Flows.Implicit,
                    ClientSecrets = new List<Secret>{new Secret("F621F470".Sha256())}
                }
            };
        }
    }
}
