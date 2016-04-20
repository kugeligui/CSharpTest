using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Validation;
using System.Threading.Tasks;

namespace SZHome.OAuth2.HostWeb
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
            //这里验证
            return Task.FromResult(result);
        }
    }
}