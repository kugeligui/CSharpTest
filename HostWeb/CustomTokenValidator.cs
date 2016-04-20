using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace HostWeb
{
    public class CustomTokenValidator : DefaultCustomTokenValidator
    {
        public CustomTokenValidator(IUserService users, IClientStore clients) : base(users, clients)
        {

        }

        /// <summary>
        /// 验证accessToken
        /// </summary>
        /// <param name="result">token验证结果</param>
        /// <returns></returns>
        public override Task<TokenValidationResult> ValidateAccessTokenAsync(TokenValidationResult result)
        {
            return Task.FromResult(result);
        }
    }
}