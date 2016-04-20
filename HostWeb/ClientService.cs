using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IdentityServer3.Core.Models;
using System.Threading.Tasks;

namespace SZHome.OAuth2.HostWeb
{
    public class ClientService : IClientStore
    {
        private static IEnumerable<Client> _clients;

        public static IEnumerable<Client> Clients
        {
            get
            {
                if (_clients == null)
                {
                    List<Client> clients = new List<Client>();
                    clients.Add(new Client
                    {
                        ClientName = "测试",
                        ClientId = "clientTest",
                        Enabled = true,
                        AccessTokenType = AccessTokenType.Reference,
                        Flow = Flows.ResourceOwner,
                        ClientSecrets = new List<Secret> { new Secret("F621F470".Sha256()) },
                        AllowedScopes = new List<string>() { "get_user_info" }
                    });

                    clients.Add(new Client
                    {
                        ClientName = "咚咚找房",
                        ClientId = "ddzf",
                        Enabled = true,
                        AccessTokenType = AccessTokenType.Reference,
                        Flow = Flows.ResourceOwner,
                        ClientSecrets = new List<Secret> { new Secret("F621F470".Sha256()) },
                        AllowedScopes = new List<string>() { "get_user_info" }
                    });

                    _clients = clients;
                }
                return _clients;
            }
        }

        /// <summary>
        /// 根据id查找客户端
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        public Task<Client> FindClientByIdAsync(string clientId)
        {
            var list = Clients.Where(m => m.ClientId == clientId);
            Client client = null;
            if (list.Count() > 0)
            {
                client = list.First();
            }
            return Task.FromResult(client);
        }
    }
}