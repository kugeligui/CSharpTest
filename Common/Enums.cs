using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SZHome.OAuth2.Common
{
    public class Enums
    {
        /// <summary>
        /// 用户登录验证结果枚举
        /// </summary>
        /// <remarks></remarks>
        public enum UserLoginStatus
        {
            登录成功 = 1,
            密码错误 = 2,
            用户已被禁用 = 3,
            用户不存在 = 4,
            该用户已被冻结 = 5,
            用户名格式错误 = 6,
            密码格式错误 = 7,
            用户名为空 = 8,
            密码为空 = 9,
            openid不存在 = 10,
            频繁输入错误密码锁定账户半小时 = 12
        }
    }
}
