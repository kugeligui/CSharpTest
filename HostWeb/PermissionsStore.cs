using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer3.Core.Models;
using System.Threading.Tasks;

namespace HostWeb
{
    public class PermissionsStore : IPermissionsStore
    {
        /// <summary>
        /// 获取用户的所有权限
        /// </summary>
        /// <param name="subject">用户标志</param>
        /// <returns></returns>
        public Task<IEnumerable<Consent>> LoadAllAsync(string subject)
        {
            return Task.FromResult(new List<Consent>().AsEnumerable());
        }

        /// <summary>
        /// 撤销用户的所有权限
        /// </summary>
        /// <param name="subject">用户</param>
        /// <param name="client">应用id</param>
        /// <returns></returns>
        public Task RevokeAsync(string subject, string client)
        {
            throw new NotImplementedException();
        }
    }
}