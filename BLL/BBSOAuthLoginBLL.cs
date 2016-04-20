using System;
using System.Collections.Generic;
using SZHome.OAuth2.DAL;
using SZHome.OAuth2.Entity;

namespace SZHome.OAuth2.BLL
{
    /// <summary>
    /// 数据表BBSOAuthLogin的业务逻辑类
    /// </summary>
    public class BBSOAuthLoginBLL
    {
        public static void Insert(string clientId, int userId, IEnumerable<string> scopes, string accessToken, int accessTokenLifetime)
        {
            BBSOAuthLoginEntity entity = BBSOAuthLoginDAL.GetByClientIdUserId(clientId, userId);
            bool isAdd = false;
            if (entity == null)
            {
                entity = new BBSOAuthLoginEntity();
                isAdd = true;
            }
            entity.AccessToken = accessToken;
            entity.ClientId = clientId;
            DateTime now = DateTime.Now;
            entity.CreateTime = now;
            entity.ExpiresIn = now.AddMinutes(accessTokenLifetime);
            entity.UserId = userId;
            string scopesStr = "";
            if (scopes != null)
            {
                scopesStr = string.Join(",", scopes);
            }
            entity.Scopes = scopesStr;

            if (isAdd)
            {
                BBSOAuthLoginDAL.Insert(entity);
            }
            else
            {
                BBSOAuthLoginDAL.Update(entity);
            }
        }
    }
}
