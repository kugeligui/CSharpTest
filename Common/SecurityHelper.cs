using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SZHomeDLL;

namespace SZHome.OAuth2.Common
{
    public class SecurityHelper
    {
        /// <summary>
        /// 加密用户密码（MD5）
        /// </summary>
        /// <param name="pwd">密码明文</param>
        /// <returns>MD5加密后的密文</returns>
        /// <remarks></remarks>
        public static string EncryptUserPassword(string pwd)
        {
            return CryptoHelper.EncryptMD5(pwd + "yI_tu");
        }
    }
}
