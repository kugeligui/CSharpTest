using System.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;

namespace SZHome.OAuth2.DAL
{
    public partial class fdccommentusersDAL
    {
        /// <summary>
        /// 执行登录验证存储过程，返回验证状态
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        /// <param name="ipaddress">IP地址</param>
        /// <param name="lastcookieusername">最后一次登录名字</param>
        /// <returns></returns>
        /// <remarks></remarks>
        public static int ValidateUser(string username, string password, string ipaddress, string lastcookieusername)
        {
            List<SqlParameter> @params = new List<SqlParameter>();
            @params.Add(SqlHelper.CreateParam("@username", SqlDbType.VarChar, 50, ParameterDirection.Input, username));
            @params.Add(SqlHelper.CreateParam("@password", SqlDbType.VarChar, 32, ParameterDirection.Input, password));
            @params.Add(SqlHelper.CreateParam("@ipaddress", SqlDbType.VarChar, 30, ParameterDirection.Input, ipaddress));
            @params.Add(SqlHelper.CreateParam("@lastcookieusername", SqlDbType.VarChar, 50, ParameterDirection.Input, lastcookieusername));
            SqlParameter paramLogin = SqlHelper.CreateParam("@enable", SqlDbType.Int, 0, ParameterDirection.Output, null);
            SqlParameter paramUserId = SqlHelper.CreateParam("@userid", SqlDbType.Int, 0, ParameterDirection.Output, null);
            @params.Add(paramLogin);
            @params.Add(paramUserId);

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.StoredProcedure, "usp_bbslogin", @params);
            return Convert.ToInt32(paramLogin.Value);
        }

        /// <summary>
        /// 根据用户名获取用户实体
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <returns></returns>
        public static Entity.fdccommentusersEntity GetByUserName(string userName)
        {
            string sql = "SELECT * FROM [fdccommentusers] WHERE [username]=@username AND [available]=1";

            List<SqlParameter> paras = new List<SqlParameter>();
            paras.Add(SqlHelper.CreateParam("@username", SqlDbType.NVarChar, 20, ParameterDirection.Input, userName));
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, sql, paras))
            {
                if (reader.Read())
                {
                    return ConvertToEntityFromDataReader(reader);
                }
            }
            return null;
        }
    }
}
