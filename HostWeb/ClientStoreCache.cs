using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using System.Threading.Tasks;

namespace SZHome.OAuth2.HostWeb
{
    public class ClientStoreCache : ICache<Client>
    {
        public async Task<Client> GetAsync(string key)
        {
            return await Task.FromResult<Client>(null);
        }

        public Task SetAsync(string key, Client item)
        {
            return Task.FromResult(0);
        }
    }
}