using IdentityServer3.Core.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SZHome.OAuth2.HostWeb
{
    public class UserServiceCache : ICache<IEnumerable<Claim>>
    {
        public async Task<IEnumerable<Claim>> GetAsync(string key)
        {
            return await Task.FromResult<IEnumerable<Claim>>(null);
        }

        public Task SetAsync(string key, IEnumerable<Claim> item)
        {
            return Task.FromResult(0);
        }
    }
}