using IdentityServer3.Core.Services;
using System;
using IdentityServer3.Core.Validation;
using System.Threading.Tasks;

namespace SZHome.OAuth2.HostWeb
{
    public class GrantValidator : ICustomGrantValidator
    {
        public string GrantType
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public Task<CustomGrantValidationResult> ValidateAsync(ValidatedTokenRequest request)
        {
            throw new NotImplementedException();
        }
    }
}