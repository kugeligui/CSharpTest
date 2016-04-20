using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IdentityServer3.Core;
using IdentityServer3.Core.Extensions;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.Default;

namespace HostWeb
{
    public class UserService : UserServiceBase
    {
        //public class CustomUser
        //{
        //    public string Subject { get; set; }
        //    public string Username { get; set; }
        //    public string Password { get; set; }
        //    public List<Claim> Claims { get; set; }
        //}

        /// <summary>
        /// 验证用户
        /// </summary>
        /// <param name="context">验证内容</param>
        /// <returns></returns>
        public override Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            //这里从数据库中

            //获取应用号
            string clientId = context.SignInMessage.ClientId;
            if (context.UserName == "test" && context.Password == "test")
            {
                context.AuthenticateResult = new AuthenticateResult("test", "测试账号");
            }
            return Task.FromResult(0);
        }

        public override Task PostAuthenticateAsync(PostAuthenticationContext context)
        {
            //获取应用号
            string clientId = context.SignInMessage.ClientId;

            //context.

            //var user = Users.SingleOrDefault(x => x.Username == context.UserName && x.Password == context.Password);
            //if (user != null)
            //{
            //    context.AuthenticateResult = new AuthenticateResult(user.Subject, user.Username);
            //}

            return Task.FromResult(0);
        }


        public override Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            // issue the claims for the user
            //var user = Users.SingleOrDefault(x => x.Subject == context.Subject.GetSubjectId());
            //if (user != null)
            //{
            //    context.IssuedClaims = user.Claims.Where(x => context.RequestedClaimTypes.Contains(x.Type));
            //}

            return Task.FromResult(0);
        }
    }
}
