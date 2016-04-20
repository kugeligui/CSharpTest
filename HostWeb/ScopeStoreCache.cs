using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SZHome.OAuth2.HostWeb
{
    public class ScopeStoreCache : ICache<IEnumerable<Scope>>
    {
        public async Task<IEnumerable<Scope>> GetAsync(string key)
        {
            return await Task.FromResult<IEnumerable<Scope>>(null);
        }

        public Task SetAsync(string key, IEnumerable<Scope> item)
        {
            return Task.FromResult(0);
        }
    }
}