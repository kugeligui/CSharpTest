using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IdentityServer3.Core.Models;
using System.Threading.Tasks;
using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Validation;

namespace HostWeb
{
    public class TokenResponseService : ICustomTokenResponseGenerator
    {
        /// <summary>
        /// 生存accessToken（验证通过才会进入这里）
        /// </summary>
        /// <param name="request">验证token的请求</param>
        /// <param name="response">生成token的响应</param>
        /// <returns></returns>
        public Task<TokenResponse> GenerateAsync(ValidatedTokenRequest request, TokenResponse response)
        {
            //这里写入数据库



            //request.user
            //throw new NotImplementedException();
            return Task.FromResult<TokenResponse>(response);
        }
    }
}