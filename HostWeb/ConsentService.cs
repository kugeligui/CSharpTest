using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.Default;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace SZHome.OAuth2.HostWeb
{
    public class ConsentService : DefaultConsentService
    {
        public ConsentService(IConsentStore store) : base(store)
        {

        }

        public override Task<bool> RequiresConsentAsync(Client client, ClaimsPrincipal subject, IEnumerable<string> scopes)
        {
            return Task.FromResult(true);
        }
    }
}