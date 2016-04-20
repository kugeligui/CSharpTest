using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.Default;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace HostWeb
{
    public class ClientPermissionsService : DefaultClientPermissionsService
    {
        public ClientPermissionsService(IPermissionsStore permissionsStore, IClientStore clientStore, IScopeStore scopeStore, ILocalizationService localizationService) : base(permissionsStore, clientStore, scopeStore, localizationService)
        {

        }

        /// <summary>
        /// 回收客户端权限
        /// </summary>
        /// <param name="subject">用户id</param>
        /// <param name="clientId">客户端id</param>
        /// <returns></returns>
        public override Task RevokeClientPermissionsAsync(string subject, string clientId)
        {
            return base.RevokeClientPermissionsAsync(subject, clientId);
        }
    }
}