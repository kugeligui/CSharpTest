using IdentityServer3.Core.Services.Default;

namespace HostWeb
{
    public class LocalizationService : DefaultLocalizationService
    {
        /// <summary>
        /// 获取字符串
        /// </summary>
        /// <param name="category">分类</param>
        /// <param name="id">identity</param>
        /// <returns></returns>
        public override string GetString(string category, string id)
        {
            return base.GetString(category, id);
        }
    }
}