using SZHome.OAuth2.Common;
using SZHome.OAuth2.DAL;
using SZHome.OAuth2.Entity;
using static SZHome.OAuth2.Common.Enums;

namespace SZHome.OAuth2.BLL
{
    /// <summary>
    /// 数据表fdccommentusers的业务逻辑类
    /// </summary>
    public class BBSUserBLL
    {
        /// <summary>
        /// 验证用户
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        /// <param name="ipaddress">ip地址</param>
        /// <returns></returns>
        public static UserLoginStatus ValidateUser(string username, string password, string ipaddress)
        {
            return (UserLoginStatus)fdccommentusersDAL.ValidateUser(username, SecurityHelper.EncryptUserPassword(password), ipaddress, null);
        }

        /// <summary>
        /// 根据用户名获取实体
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <returns></returns>
        public static fdccommentusersEntity GetByUserName(string userName)
        {
            return fdccommentusersDAL.GetByUserName(userName);
        }

        /// <summary>
        /// 根据用户id获取实体
        /// </summary>
        /// <param name="id">用户id</param>
        /// <returns></returns>
        public static fdccommentusersEntity GetById(int id)
        {
            return fdccommentusersDAL.GetById(id);
        }
    }
}
