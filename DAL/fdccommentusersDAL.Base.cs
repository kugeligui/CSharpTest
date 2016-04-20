using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
namespace SZHome.OAuth2.DAL
{
    /// <summary>
    /// 数据表fdccommentusers的数据操作类
    /// </summary>
    public partial class fdccommentusersDAL
    {
        #region ConstVariables
        private const string C_TABLE_NAME = "fdccommentusers";
        private const string C_SP_FDCCOMMENTUSERS_FIELDS = "[id],[username],[email],[UserType],[available],[ip],[date],[truename],[gender],[phone],[mobile],[gbhome],[address],[logintime],[lastip],[lastdate],[Sign],[Sign2],[Signable],[SignURL],[FTS],[HTS],[SFTS],[SHTS],[JHS],[ZJF],[addpoint],[addpoint_remark],[imagetype],[gbflag],[IsEmailValidated],[DefaultGoPage],[psw]";
        private const string C_SP_FDCCOMMENTUSERS_INSERT = "INSERT INTO [fdccommentusers]([username],[email],[UserType],[available],[ip],[date],[truename],[gender],[phone],[mobile],[gbhome],[address],[logintime],[lastip],[lastdate],[Sign],[Sign2],[Signable],[SignURL],[FTS],[HTS],[SFTS],[SHTS],[JHS],[ZJF],[addpoint],[addpoint_remark],[imagetype],[gbflag],[IsEmailValidated],[DefaultGoPage],[psw]) VALUES(@username,@email,@UserType,@available,@ip,@date,@truename,@gender,@phone,@mobile,@gbhome,@address,@logintime,@lastip,@lastdate,@Sign,@Sign2,@Signable,@SignURL,@FTS,@HTS,@SFTS,@SHTS,@JHS,@ZJF,@addpoint,@addpoint_remark,@imagetype,@gbflag,@IsEmailValidated,@DefaultGoPage,@psw);SET @id = SCOPE_IDENTITY();";
        private const string C_SP_FDCCOMMENTUSERS_UPDATE = "UPDATE [fdccommentusers] SET [username]=@username,[email]=@email,[UserType]=@UserType,[available]=@available,[ip]=@ip,[date]=@date,[truename]=@truename,[gender]=@gender,[phone]=@phone,[mobile]=@mobile,[gbhome]=@gbhome,[address]=@address,[logintime]=@logintime,[lastip]=@lastip,[lastdate]=@lastdate,[Sign]=@Sign,[Sign2]=@Sign2,[Signable]=@Signable,[SignURL]=@SignURL,[FTS]=@FTS,[HTS]=@HTS,[SFTS]=@SFTS,[SHTS]=@SHTS,[JHS]=@JHS,[ZJF]=@ZJF,[addpoint]=@addpoint,[addpoint_remark]=@addpoint_remark,[imagetype]=@imagetype,[gbflag]=@gbflag,[IsEmailValidated]=@IsEmailValidated,[DefaultGoPage]=@DefaultGoPage,[psw]=@psw WHERE [id] = @id";
        private const string C_SP_FDCCOMMENTUSERS_DELETE = "DELETE [fdccommentusers] WHERE [id] = @id";
        private const string C_SP_FDCCOMMENTUSERS_GET = "SELECT [id],[username],[email],[UserType],[available],[ip],[date],[truename],[gender],[phone],[mobile],[gbhome],[address],[logintime],[lastip],[lastdate],[Sign],[Sign2],[Signable],[SignURL],[FTS],[HTS],[SFTS],[SHTS],[JHS],[ZJF],[addpoint],[addpoint_remark],[imagetype],[gbflag],[IsEmailValidated],[DefaultGoPage],[psw] FROM [fdccommentusers] WHERE [id] = @id";
        #endregion

        private static string ConnectionString
        {
            get
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings["BBSUser"].ConnectionString;
            }
        }

        /// <summary>
        /// 默认构造函数
        /// </summary>
        private fdccommentusersDAL() { }

        /// <summary>
        /// 向数据表中插入一条新记录
        /// </summary>
        /// <param name="entity">Entity.fdccommentusersEntity实体类</param>
        /// <remarks>如果表存在自增长字段，插入记录成功后自增长字段值会更新至实体</remarks>
        public static void Insert(Entity.fdccommentusersEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            SqlParameter id_id = SqlHelper.CreateParam("@id", SqlDbType.Int, 0, ParameterDirection.Output, null);
            commandParms.Add(id_id);
            commandParms.Add(SqlHelper.CreateParam("@username", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.username));
            commandParms.Add(SqlHelper.CreateParam("@email", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.email));
            commandParms.Add(SqlHelper.CreateParam("@UserType", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.UserType));
            commandParms.Add(SqlHelper.CreateParam("@available", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.available));
            commandParms.Add(SqlHelper.CreateParam("@ip", SqlDbType.NVarChar, 15, ParameterDirection.Input, entity.ip));
            commandParms.Add(SqlHelper.CreateParam("@date", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.date));
            commandParms.Add(SqlHelper.CreateParam("@truename", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.truename));
            commandParms.Add(SqlHelper.CreateParam("@gender", SqlDbType.Char, 2, ParameterDirection.Input, entity.gender));
            commandParms.Add(SqlHelper.CreateParam("@phone", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.phone));
            commandParms.Add(SqlHelper.CreateParam("@mobile", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.mobile));
            commandParms.Add(SqlHelper.CreateParam("@gbhome", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.gbhome));
            commandParms.Add(SqlHelper.CreateParam("@address", SqlDbType.NVarChar, 200, ParameterDirection.Input, entity.address));
            commandParms.Add(SqlHelper.CreateParam("@logintime", SqlDbType.Int, 0, ParameterDirection.Input, entity.logintime));
            commandParms.Add(SqlHelper.CreateParam("@lastip", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.lastip));
            commandParms.Add(SqlHelper.CreateParam("@lastdate", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.lastdate));
            commandParms.Add(SqlHelper.CreateParam("@Sign", SqlDbType.NVarChar, 1000, ParameterDirection.Input, entity.Sign));
            commandParms.Add(SqlHelper.CreateParam("@Sign2", SqlDbType.NVarChar, 1000, ParameterDirection.Input, entity.Sign2));
            commandParms.Add(SqlHelper.CreateParam("@Signable", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.Signable));
            commandParms.Add(SqlHelper.CreateParam("@SignURL", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.SignURL));
            commandParms.Add(SqlHelper.CreateParam("@FTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.FTS));
            commandParms.Add(SqlHelper.CreateParam("@HTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.HTS));
            commandParms.Add(SqlHelper.CreateParam("@SFTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.SFTS));
            commandParms.Add(SqlHelper.CreateParam("@SHTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.SHTS));
            commandParms.Add(SqlHelper.CreateParam("@JHS", SqlDbType.Int, 0, ParameterDirection.Input, entity.JHS));
            commandParms.Add(SqlHelper.CreateParam("@ZJF", SqlDbType.Int, 0, ParameterDirection.Input, entity.ZJF));
            commandParms.Add(SqlHelper.CreateParam("@addpoint", SqlDbType.Int, 0, ParameterDirection.Input, entity.addpoint));
            commandParms.Add(SqlHelper.CreateParam("@addpoint_remark", SqlDbType.NVarChar, 400, ParameterDirection.Input, entity.addpoint_remark));
            commandParms.Add(SqlHelper.CreateParam("@imagetype", SqlDbType.Int, 0, ParameterDirection.Input, entity.imagetype));
            commandParms.Add(SqlHelper.CreateParam("@gbflag", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.gbflag));
            commandParms.Add(SqlHelper.CreateParam("@IsEmailValidated", SqlDbType.Bit, 0, ParameterDirection.Input, entity.IsEmailValidated));
            commandParms.Add(SqlHelper.CreateParam("@DefaultGoPage", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.DefaultGoPage));
            commandParms.Add(SqlHelper.CreateParam("@psw", SqlDbType.VarChar, 32, ParameterDirection.Input, entity.psw));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_FDCCOMMENTUSERS_INSERT, commandParms);
            entity.id = Convert.ToInt32(id_id.Value);
        }

        /// <summary>
        /// 获取数据库一条记录实体(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        /// <returns>Entity.fdccommentusersEntity实体类</returns>
        public static Entity.fdccommentusersEntity GetById(int id)
        {
            Entity.fdccommentusersEntity entity = null;
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@id", SqlDbType.Int, 0, ParameterDirection.Input, id));

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectionString, CommandType.Text, C_SP_FDCCOMMENTUSERS_GET, commandParms))
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
        /// <param name="entity">Entity.fdccommentusersEntity实体类</param>
        public static void Update(Entity.fdccommentusersEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();

            commandParms.Add(SqlHelper.CreateParam("@id", SqlDbType.Int, 0, ParameterDirection.Input, entity.id));
            commandParms.Add(SqlHelper.CreateParam("@username", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.username));
            commandParms.Add(SqlHelper.CreateParam("@email", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.email));
            commandParms.Add(SqlHelper.CreateParam("@UserType", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.UserType));
            commandParms.Add(SqlHelper.CreateParam("@available", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.available));
            commandParms.Add(SqlHelper.CreateParam("@ip", SqlDbType.NVarChar, 15, ParameterDirection.Input, entity.ip));
            commandParms.Add(SqlHelper.CreateParam("@date", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.date));
            commandParms.Add(SqlHelper.CreateParam("@truename", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.truename));
            commandParms.Add(SqlHelper.CreateParam("@gender", SqlDbType.Char, 2, ParameterDirection.Input, entity.gender));
            commandParms.Add(SqlHelper.CreateParam("@phone", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.phone));
            commandParms.Add(SqlHelper.CreateParam("@mobile", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.mobile));
            commandParms.Add(SqlHelper.CreateParam("@gbhome", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.gbhome));
            commandParms.Add(SqlHelper.CreateParam("@address", SqlDbType.NVarChar, 200, ParameterDirection.Input, entity.address));
            commandParms.Add(SqlHelper.CreateParam("@logintime", SqlDbType.Int, 0, ParameterDirection.Input, entity.logintime));
            commandParms.Add(SqlHelper.CreateParam("@lastip", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.lastip));
            commandParms.Add(SqlHelper.CreateParam("@lastdate", SqlDbType.DateTime, 0, ParameterDirection.Input, entity.lastdate));
            commandParms.Add(SqlHelper.CreateParam("@Sign", SqlDbType.NVarChar, 1000, ParameterDirection.Input, entity.Sign));
            commandParms.Add(SqlHelper.CreateParam("@Sign2", SqlDbType.NVarChar, 1000, ParameterDirection.Input, entity.Sign2));
            commandParms.Add(SqlHelper.CreateParam("@Signable", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.Signable));
            commandParms.Add(SqlHelper.CreateParam("@SignURL", SqlDbType.NVarChar, 50, ParameterDirection.Input, entity.SignURL));
            commandParms.Add(SqlHelper.CreateParam("@FTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.FTS));
            commandParms.Add(SqlHelper.CreateParam("@HTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.HTS));
            commandParms.Add(SqlHelper.CreateParam("@SFTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.SFTS));
            commandParms.Add(SqlHelper.CreateParam("@SHTS", SqlDbType.Int, 0, ParameterDirection.Input, entity.SHTS));
            commandParms.Add(SqlHelper.CreateParam("@JHS", SqlDbType.Int, 0, ParameterDirection.Input, entity.JHS));
            commandParms.Add(SqlHelper.CreateParam("@ZJF", SqlDbType.Int, 0, ParameterDirection.Input, entity.ZJF));
            commandParms.Add(SqlHelper.CreateParam("@addpoint", SqlDbType.Int, 0, ParameterDirection.Input, entity.addpoint));
            commandParms.Add(SqlHelper.CreateParam("@addpoint_remark", SqlDbType.NVarChar, 400, ParameterDirection.Input, entity.addpoint_remark));
            commandParms.Add(SqlHelper.CreateParam("@imagetype", SqlDbType.Int, 0, ParameterDirection.Input, entity.imagetype));
            commandParms.Add(SqlHelper.CreateParam("@gbflag", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.gbflag));
            commandParms.Add(SqlHelper.CreateParam("@IsEmailValidated", SqlDbType.Bit, 0, ParameterDirection.Input, entity.IsEmailValidated));
            commandParms.Add(SqlHelper.CreateParam("@DefaultGoPage", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.DefaultGoPage));
            commandParms.Add(SqlHelper.CreateParam("@psw", SqlDbType.VarChar, 32, ParameterDirection.Input, entity.psw));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_FDCCOMMENTUSERS_UPDATE, commandParms);
        }

        /// <summary>
        /// 删除数据库中一条记录(根据主键条件)
        /// </summary>
        /// <param name="id">主键字段id</param>
        public static void Delete(int id)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@id", SqlDbType.Int, 0, ParameterDirection.Input, id));
            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_FDCCOMMENTUSERS_DELETE, commandParms);
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
                dataFields = C_SP_FDCCOMMENTUSERS_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, startRowIndex, maximumRows);
        }


        /// <summary>
        /// 按条件查询数据表,返回 Entity.fdccommentusersEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        public static List<Entity.fdccommentusersEntity> Search(string whereClause, string orderBy, int startRowIndex, int maximumRows)
        {
            List<Entity.fdccommentusersEntity> list = new List<Entity.fdccommentusersEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_FDCCOMMENTUSERS_FIELDS, whereClause, orderBy, startRowIndex, maximumRows))
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
                dataFields = C_SP_FDCCOMMENTUSERS_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, rowsToReturn);
        }

        /// <summary>
        /// 按条件查询数据表,返回 Entity.fdccommentusersEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        public static List<Entity.fdccommentusersEntity> Search(string whereClause, string orderBy, int rowsToReturn)
        {
            List<Entity.fdccommentusersEntity> list = new List<Entity.fdccommentusersEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_FDCCOMMENTUSERS_FIELDS, whereClause, orderBy, rowsToReturn))
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
        private static Entity.fdccommentusersEntity ConvertToEntityFromDataRow(DataRow row)
        {
            Entity.fdccommentusersEntity entity = new Entity.fdccommentusersEntity();
            entity.id = Convert.ToInt32(row["id"]);
            entity.username = row["username"].ToString();
            if (Convert.IsDBNull(row["email"])) entity.email = null; else entity.email = row["email"].ToString();
            if (Convert.IsDBNull(row["UserType"])) entity.UserType = null; else entity.UserType = Convert.ToInt16(row["UserType"]);
            if (Convert.IsDBNull(row["available"])) entity.available = null; else entity.available = Convert.ToInt16(row["available"]);
            if (Convert.IsDBNull(row["ip"])) entity.ip = null; else entity.ip = row["ip"].ToString();
            if (Convert.IsDBNull(row["date"])) entity.date = null; else entity.date = Convert.ToDateTime(row["date"]);
            if (Convert.IsDBNull(row["truename"])) entity.truename = null; else entity.truename = row["truename"].ToString();
            if (Convert.IsDBNull(row["gender"])) entity.gender = null; else entity.gender = row["gender"].ToString();
            if (Convert.IsDBNull(row["phone"])) entity.phone = null; else entity.phone = row["phone"].ToString();
            if (Convert.IsDBNull(row["mobile"])) entity.mobile = null; else entity.mobile = row["mobile"].ToString();
            if (Convert.IsDBNull(row["gbhome"])) entity.gbhome = null; else entity.gbhome = row["gbhome"].ToString();
            if (Convert.IsDBNull(row["address"])) entity.address = null; else entity.address = row["address"].ToString();
            if (Convert.IsDBNull(row["logintime"])) entity.logintime = null; else entity.logintime = Convert.ToInt32(row["logintime"]);
            if (Convert.IsDBNull(row["lastip"])) entity.lastip = null; else entity.lastip = row["lastip"].ToString();
            if (Convert.IsDBNull(row["lastdate"])) entity.lastdate = null; else entity.lastdate = Convert.ToDateTime(row["lastdate"]);
            if (Convert.IsDBNull(row["Sign"])) entity.Sign = null; else entity.Sign = row["Sign"].ToString();
            if (Convert.IsDBNull(row["Sign2"])) entity.Sign2 = null; else entity.Sign2 = row["Sign2"].ToString();
            entity.Signable = Convert.ToInt16(row["Signable"]);
            if (Convert.IsDBNull(row["SignURL"])) entity.SignURL = null; else entity.SignURL = row["SignURL"].ToString();
            entity.FTS = Convert.ToInt32(row["FTS"]);
            entity.HTS = Convert.ToInt32(row["HTS"]);
            entity.SFTS = Convert.ToInt32(row["SFTS"]);
            entity.SHTS = Convert.ToInt32(row["SHTS"]);
            entity.JHS = Convert.ToInt32(row["JHS"]);
            entity.ZJF = Convert.ToInt32(row["ZJF"]);
            entity.addpoint = Convert.ToInt32(row["addpoint"]);
            if (Convert.IsDBNull(row["addpoint_remark"])) entity.addpoint_remark = null; else entity.addpoint_remark = row["addpoint_remark"].ToString();
            if (Convert.IsDBNull(row["imagetype"])) entity.imagetype = null; else entity.imagetype = Convert.ToInt32(row["imagetype"]);
            if (Convert.IsDBNull(row["gbflag"])) entity.gbflag = null; else entity.gbflag = Convert.ToInt16(row["gbflag"]);
            if (Convert.IsDBNull(row["IsEmailValidated"])) entity.IsEmailValidated = null; else entity.IsEmailValidated = Convert.ToBoolean(row["IsEmailValidated"]);
            if (Convert.IsDBNull(row["DefaultGoPage"])) entity.DefaultGoPage = null; else entity.DefaultGoPage = Convert.ToInt16(row["DefaultGoPage"]);
            if (Convert.IsDBNull(row["psw"])) entity.psw = null; else entity.psw = row["psw"].ToString();

            return entity;
        }

        /// <summary>
        /// 转换SqlDataReader类型数据记录为实体
        /// </summary>
        private static Entity.fdccommentusersEntity ConvertToEntityFromDataReader(SqlDataReader reader)
        {
            Entity.fdccommentusersEntity entity = new Entity.fdccommentusersEntity();
            entity.id = Convert.ToInt32(reader["id"]);
            entity.username = reader["username"].ToString();
            if (Convert.IsDBNull(reader["email"])) entity.email = null; else entity.email = reader["email"].ToString();
            if (Convert.IsDBNull(reader["UserType"])) entity.UserType = null; else entity.UserType = Convert.ToInt16(reader["UserType"]);
            if (Convert.IsDBNull(reader["available"])) entity.available = null; else entity.available = Convert.ToInt16(reader["available"]);
            if (Convert.IsDBNull(reader["ip"])) entity.ip = null; else entity.ip = reader["ip"].ToString();
            if (Convert.IsDBNull(reader["date"])) entity.date = null; else entity.date = Convert.ToDateTime(reader["date"]);
            if (Convert.IsDBNull(reader["truename"])) entity.truename = null; else entity.truename = reader["truename"].ToString();
            if (Convert.IsDBNull(reader["gender"])) entity.gender = null; else entity.gender = reader["gender"].ToString();
            if (Convert.IsDBNull(reader["phone"])) entity.phone = null; else entity.phone = reader["phone"].ToString();
            if (Convert.IsDBNull(reader["mobile"])) entity.mobile = null; else entity.mobile = reader["mobile"].ToString();
            if (Convert.IsDBNull(reader["gbhome"])) entity.gbhome = null; else entity.gbhome = reader["gbhome"].ToString();
            if (Convert.IsDBNull(reader["address"])) entity.address = null; else entity.address = reader["address"].ToString();
            if (Convert.IsDBNull(reader["logintime"])) entity.logintime = null; else entity.logintime = Convert.ToInt32(reader["logintime"]);
            if (Convert.IsDBNull(reader["lastip"])) entity.lastip = null; else entity.lastip = reader["lastip"].ToString();
            if (Convert.IsDBNull(reader["lastdate"])) entity.lastdate = null; else entity.lastdate = Convert.ToDateTime(reader["lastdate"]);
            if (Convert.IsDBNull(reader["Sign"])) entity.Sign = null; else entity.Sign = reader["Sign"].ToString();
            if (Convert.IsDBNull(reader["Sign2"])) entity.Sign2 = null; else entity.Sign2 = reader["Sign2"].ToString();
            entity.Signable = Convert.ToInt16(reader["Signable"]);
            if (Convert.IsDBNull(reader["SignURL"])) entity.SignURL = null; else entity.SignURL = reader["SignURL"].ToString();
            entity.FTS = Convert.ToInt32(reader["FTS"]);
            entity.HTS = Convert.ToInt32(reader["HTS"]);
            entity.SFTS = Convert.ToInt32(reader["SFTS"]);
            entity.SHTS = Convert.ToInt32(reader["SHTS"]);
            entity.JHS = Convert.ToInt32(reader["JHS"]);
            entity.ZJF = Convert.ToInt32(reader["ZJF"]);
            entity.addpoint = Convert.ToInt32(reader["addpoint"]);
            if (Convert.IsDBNull(reader["addpoint_remark"])) entity.addpoint_remark = null; else entity.addpoint_remark = reader["addpoint_remark"].ToString();
            if (Convert.IsDBNull(reader["imagetype"])) entity.imagetype = null; else entity.imagetype = Convert.ToInt32(reader["imagetype"]);
            if (Convert.IsDBNull(reader["gbflag"])) entity.gbflag = null; else entity.gbflag = Convert.ToInt16(reader["gbflag"]);
            if (Convert.IsDBNull(reader["IsEmailValidated"])) entity.IsEmailValidated = null; else entity.IsEmailValidated = Convert.ToBoolean(reader["IsEmailValidated"]);
            if (Convert.IsDBNull(reader["DefaultGoPage"])) entity.DefaultGoPage = null; else entity.DefaultGoPage = Convert.ToInt16(reader["DefaultGoPage"]);
            if (Convert.IsDBNull(reader["psw"])) entity.psw = null; else entity.psw = reader["psw"].ToString();

            return entity;
        }

    }
}
