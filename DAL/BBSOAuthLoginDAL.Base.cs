using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
namespace SZHome.OAuth2.DAL
{
    /// <summary>
    /// 数据表BBSOAuthLogin的数据操作类
    /// </summary>
    public partial class BBSOAuthLoginDAL
    {
        #region ConstVariables
        private const string C_TABLE_NAME = "BBSOAuthLogin";
        private const string C_SP_BBSOAUTHLOGIN_FIELDS = "[Id],[ClientId],[UserId],[DeviceId],[AccessToken],[ExpiresIn],[Scopes],[CreateTime],[Status]";
        private const string C_SP_BBSOAUTHLOGIN_INSERT = "INSERT INTO [BBSOAuthLogin]([ClientId],[UserId],[DeviceId],[AccessToken],[ExpiresIn],[Scopes],[CreateTime],[Status]) VALUES(@ClientId,@UserId,@DeviceId,@AccessToken,@ExpiresIn,@Scopes,@CreateTime,@Status);SET @Id = SCOPE_IDENTITY();";
        private const string C_SP_BBSOAUTHLOGIN_UPDATE = "UPDATE [BBSOAuthLogin] SET [ClientId]=@ClientId,[UserId]=@UserId,[DeviceId]=@DeviceId,[AccessToken]=@AccessToken,[ExpiresIn]=@ExpiresIn,[Scopes]=@Scopes,[CreateTime]=@CreateTime,[Status]=@Status WHERE [Id] = @Id";
        private const string C_SP_BBSOAUTHLOGIN_DELETE = "DELETE [BBSOAuthLogin] WHERE [Id] = @Id";
        private const string C_SP_BBSOAUTHLOGIN_GET = "SELECT [Id],[ClientId],[UserId],[DeviceId],[AccessToken],[ExpiresIn],[Scopes],[CreateTime],[Status] FROM [BBSOAuthLogin] WHERE [Id] = @Id";
        #endregion

        private static string ConnectionString
        {
            get
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings["BBSMain"].ConnectionString;
            }
        }

        /// <summary>
        /// 默认构造函数
        /// </summary>
        private BBSOAuthLoginDAL() { }

        /// <summary>
        /// 向数据表中插入一条新记录
        /// </summary>
        /// <param name="entity">Entity.BBSOAuthLoginEntity实体类</param>
        /// <remarks>如果表存在自增长字段，插入记录成功后自增长字段值会更新至实体</remarks>
        public static void Insert(Entity.BBSOAuthLoginEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            SqlParameter id_Id = SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Output, null);
            commandParms.Add(id_Id);
            commandParms.Add(SqlHelper.CreateParam("@ClientId", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.ClientId));
            commandParms.Add(SqlHelper.CreateParam("@UserId", SqlDbType.Int, 0, ParameterDirection.Input, entity.UserId));
            commandParms.Add(SqlHelper.CreateParam("@DeviceId", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.DeviceId));
            commandParms.Add(SqlHelper.CreateParam("@AccessToken", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.AccessToken));
            commandParms.Add(SqlHelper.CreateParam("@ExpiresIn", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.ExpiresIn));
            commandParms.Add(SqlHelper.CreateParam("@Scopes", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.Scopes));
            commandParms.Add(SqlHelper.CreateParam("@CreateTime", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.CreateTime));
            commandParms.Add(SqlHelper.CreateParam("@Status", SqlDbType.Int, 0, ParameterDirection.Input, entity.Status));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_BBSOAUTHLOGIN_INSERT, commandParms);
            entity.Id = Convert.ToInt32(id_Id.Value);
        }

        /// <summary>
        /// 获取数据库一条记录实体(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        /// <returns>Entity.BBSOAuthLoginEntity实体类</returns>
        public static Entity.BBSOAuthLoginEntity GetById(int id)
        {
            Entity.BBSOAuthLoginEntity entity = null;
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, id));

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, C_SP_BBSOAUTHLOGIN_GET, commandParms))
            {
                if (reader.Read())
                {
                    entity = ConvertToEntityFromDataReader(reader);
                }
            }

            return entity;
        }

        /// <summary>
        /// 更新数据库中一条记录(根据主键条件)
        /// </summary>
        /// <param name="entity">Entity.BBSOAuthLoginEntity实体类</param>
        public static void Update(Entity.BBSOAuthLoginEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();

            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, entity.Id));
            commandParms.Add(SqlHelper.CreateParam("@ClientId", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.ClientId));
            commandParms.Add(SqlHelper.CreateParam("@UserId", SqlDbType.Int, 0, ParameterDirection.Input, entity.UserId));
            commandParms.Add(SqlHelper.CreateParam("@DeviceId", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.DeviceId));
            commandParms.Add(SqlHelper.CreateParam("@AccessToken", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.AccessToken));
            commandParms.Add(SqlHelper.CreateParam("@ExpiresIn", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.ExpiresIn));
            commandParms.Add(SqlHelper.CreateParam("@Scopes", SqlDbType.VarChar, 50, ParameterDirection.Input, entity.Scopes));
            commandParms.Add(SqlHelper.CreateParam("@CreateTime", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.CreateTime));
            commandParms.Add(SqlHelper.CreateParam("@Status", SqlDbType.Int, 0, ParameterDirection.Input, entity.Status));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_BBSOAUTHLOGIN_UPDATE, commandParms);
        }

        /// <summary>
        /// 删除数据库中一条记录(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        public static void Delete(int id)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@Id", SqlDbType.Int, 0, ParameterDirection.Input, id));
            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_BBSOAUTHLOGIN_DELETE, commandParms);
        }

        /// <summary>
        /// 按条件查询数据表,返回DataTable类型数据
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="dataFields">需返回字段(不能为空,为"*"则返回所有字段)</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        /// <returns>DataTable</returns>
        public static DataTable SearchDT(string whereClause, string dataFields, string orderBy, int startRowIndex, int maximumRows)
        {
            if (dataFields.Trim() == "*")
            {
                dataFields = C_SP_BBSOAUTHLOGIN_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, startRowIndex, maximumRows);
        }


        /// <summary>
        /// 按条件查询数据表,返回 Entity.BBSOAuthLoginEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        public static List<Entity.BBSOAuthLoginEntity> Search(string whereClause, string orderBy, int startRowIndex, int maximumRows)
        {
            List<Entity.BBSOAuthLoginEntity> list = new List<Entity.BBSOAuthLoginEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_BBSOAUTHLOGIN_FIELDS, whereClause, orderBy, startRowIndex, maximumRows))
            {
                while (reader.Read())
                {
                    list.Add(ConvertToEntityFromDataReader(reader));
                }
            }
            return list;
        }

        /// <summary>
        /// 按条件查询数据表,返回DataTable类型数据
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="dataFields">需返回字段(不能为空,为"*"则返回所有字段)</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        /// <returns>DataTable</returns>
        public static DataTable SearchDT(string whereClause, string dataFields, string orderBy, int rowsToReturn)
        {
            if (dataFields.Trim() == "*")
            {
                dataFields = C_SP_BBSOAUTHLOGIN_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, rowsToReturn);
        }

        /// <summary>
        /// 按条件查询数据表,返回 Entity.BBSOAuthLoginEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        public static List<Entity.BBSOAuthLoginEntity> Search(string whereClause, string orderBy, int rowsToReturn)
        {
            List<Entity.BBSOAuthLoginEntity> list = new List<Entity.BBSOAuthLoginEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_BBSOAUTHLOGIN_FIELDS, whereClause, orderBy, rowsToReturn))
            {
                while (reader.Read())
                {
                    list.Add(ConvertToEntityFromDataReader(reader));
                }
            }
            return list;
        }

        /// <summary>
        /// 按条件获取记录数量
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <returns>int整型数据</returns>
        public static int SearchCount(string whereClause)
        {
            return SqlListHepler.SearchCount(ConnectionString, C_TABLE_NAME, whereClause);
        }

        /// <summary>
        /// 转换DataRow类型数据记录为实体
        /// </summary>
        private static Entity.BBSOAuthLoginEntity ConvertToEntityFromDataRow(DataRow row)
        {
            Entity.BBSOAuthLoginEntity entity = new Entity.BBSOAuthLoginEntity();
            entity.Id = Convert.ToInt32(row["Id"]);
            entity.ClientId = row["ClientId"].ToString();
            entity.UserId = Convert.ToInt32(row["UserId"]);
            if (Convert.IsDBNull(row["DeviceId"])) entity.DeviceId = null; else entity.DeviceId = row["DeviceId"].ToString();
            if (Convert.IsDBNull(row["AccessToken"])) entity.AccessToken = null; else entity.AccessToken = row["AccessToken"].ToString();
            entity.ExpiresIn = Convert.ToDateTime(row["ExpiresIn"]);
            entity.Scopes = row["Scopes"].ToString();
            entity.CreateTime = Convert.ToDateTime(row["CreateTime"]);
            entity.Status = Convert.ToInt32(row["Status"]);

            return entity;
        }

        /// <summary>
        /// 转换SqlDataReader类型数据记录为实体
        /// </summary>
        private static Entity.BBSOAuthLoginEntity ConvertToEntityFromDataReader(SqlDataReader reader)
        {
            Entity.BBSOAuthLoginEntity entity = new Entity.BBSOAuthLoginEntity();
            entity.Id = Convert.ToInt32(reader["Id"]);
            entity.ClientId = reader["ClientId"].ToString();
            entity.UserId = Convert.ToInt32(reader["UserId"]);
            if (Convert.IsDBNull(reader["DeviceId"])) entity.DeviceId = null; else entity.DeviceId = reader["DeviceId"].ToString();
            if (Convert.IsDBNull(reader["AccessToken"])) entity.AccessToken = null; else entity.AccessToken = reader["AccessToken"].ToString();
            entity.ExpiresIn = Convert.ToDateTime(reader["ExpiresIn"]);
            entity.Scopes = reader["Scopes"].ToString();
            entity.CreateTime = Convert.ToDateTime(reader["CreateTime"]);
            entity.Status = Convert.ToInt32(reader["Status"]);

            return entity;
        }

    }
}
