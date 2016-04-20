using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IdentityServer3.Core.Models;
using System.Threading.Tasks;

namespace SZHome.OAuth2.HostWeb
{
    public class ConsentStore : IConsentStore
    {
        public Task<IEnumerable<Consent>> LoadAllAsync(string subject)
        {
            throw new NotImplementedException();
        }

        public Task<Consent> LoadAsync(string subject, string client)
        {
            throw new NotImplementedException();
        }

        public Task RevokeAsync(string subject, string client)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Consent consent)
        {
            throw new NotImplementedException();
        }
    }
}