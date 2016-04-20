using System.Threading.Tasks;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.Default;
using SZHome.OAuth2.BLL;
using SZHomeDLL;

namespace SZHome.OAuth2.HostWeb
{
    public class UserService : UserServiceBase
    {
        public override Task AuthenticateExternalAsync(ExternalAuthenticationContext context)
        {
            return base.AuthenticateExternalAsync(context);
        }

        public override Task IsActiveAsync(IsActiveContext context)
        {
            return base.IsActiveAsync(context);
        }

        public override Task PreAuthenticateAsync(PreAuthenticationContext context)
        {
            return base.PreAuthenticateAsync(context);
        }

        public override Task SignOutAsync(SignOutContext context)
        {
            return base.SignOutAsync(context);
        }

        /// <summary>
        /// 验证用户
        /// </summary>
        /// <param name="context">验证内容</param>
        /// <returns></returns>
        public override Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            string username = context.UserName;
            string password = context.Password;
            var validate = BBSUserBLL.ValidateUser(username, password, HttpContextHelper.GetClientIP());
            if (validate == SZHome.OAuth2.Common.Enums.UserLoginStatus.登录成功)
            {
                var user = BBSUserBLL.GetByUserName(username);
                context.AuthenticateResult = new AuthenticateResult(user.id.ToString(), username);
            }
            else
            {
                context.AuthenticateResult = new AuthenticateResult(validate.ToString());
            }
            return Task.FromResult(0);
        }

        public override Task PostAuthenticateAsync(PostAuthenticationContext context)
        {
            //获取应用号
            string clientId = context.SignInMessage.ClientId;

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
