using IdentityServer3.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IdentityServer3.Core.Models;
using System.Threading.Tasks;

namespace HostWeb
{
    public class ScopeStore : IScopeStore
    {
        private static IEnumerable<Scope> _scopes;
        public static IEnumerable<Scope> Scopes
        {
            get
            {
                if (_scopes == null)
                {
                    List<Scope> scopes = new List<Scope>();
                    scopes.Add(new Scope()
                    {
                        Name = "api1",
                        DisplayName = "测试"
                    });
                    _scopes = scopes;
                }
                return _scopes;
            }
        }

        /// <summary>
        /// 根据权限名查找权限
        /// </summary>
        /// <param name="scopeNames">权限名集合</param>
        /// <returns></returns>
        public Task<IEnumerable<Scope>> FindScopesAsync(IEnumerable<string> scopeNames)
        {
            return Task.FromResult(Scopes.Where(m => scopeNames.Contains(m.Name)));
        }

        /// <summary>
        /// 获取权限
        /// </summary>
        /// <param name="publicOnly">是否仅查看公开的权限</param>
        /// <returns></returns>
        public Task<IEnumerable<Scope>> GetScopesAsync(bool publicOnly = true)
        {
            return Task.FromResult(Scopes.Where(m => !publicOnly || m.IncludeAllClaimsForUser == publicOnly));
        }
    }
}