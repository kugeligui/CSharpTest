using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SZHome.OAuth2.HostWeb
{
    public class CustomRequestValidator : DefaultCustomRequestValidator
    {

        public new Task<AuthorizeRequestValidationResult> ValidateAuthorizeRequestAsync(ValidatedAuthorizeRequest request)
        {
            return base.ValidateAuthorizeRequestAsync(request);
        }

        public new Task<TokenRequestValidationResult> ValidateTokenRequestAsync(ValidatedTokenRequest request)
        {
            return base.ValidateTokenRequestAsync(request);
        }
    }
}