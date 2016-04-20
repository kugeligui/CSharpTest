using System.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
using SZHome.OAuth2.Entity;

namespace SZHome.OAuth2.DAL
{
    public partial class BBSOAuthLoginDAL
    {
        /// <summary>
        /// 根据客户端id、用户id获取实体
        /// </summary>
        /// <param name="clientId">客户端id</param>
        /// <param name="userId">用户id</param>
        /// <returns></returns>
        public static BBSOAuthLoginEntity GetByClientIdUserId(string clientId, int userId)
        {
            Entity.BBSOAuthLoginEntity entity = null;
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@ClientId", SqlDbType.VarChar, 50, ParameterDirection.Input, clientId));
            commandParms.Add(SqlHelper.CreateParam("@UserId", SqlDbType.Int, 0, ParameterDirection.Input, userId));

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, string.Format("Select * FROM {0} Where ClientId=@ClientId AND UserId=@UserId", C_TABLE_NAME), commandParms))
            {
                if (reader.Read())
                {
                    entity = ConvertToEntityFromDataReader(reader);
                }
            }
            return entity;
        }
    }
}
