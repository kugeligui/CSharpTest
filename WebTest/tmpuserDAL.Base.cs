using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using YiTu.DBUtility;
namespace WebTest.DAL
{
    /// <summary>
    /// 数据表tmpuser的数据操作类
    /// </summary>
    public partial class tmpuserDAL
    {
        #region ConstVariables
        private const string C_TABLE_NAME = "tmpuser";
        private const string C_SP_TMPUSER_FIELDS = "[ReceiverID],[ReceiverType],[id]";
        private const string C_SP_TMPUSER_INSERT = "INSERT INTO [tmpuser]([ReceiverID],[ReceiverType],[id]) VALUES(@ReceiverID,@ReceiverType,@id);";
        #endregion

        private static string ConnectionString
        {
            get
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings["SZHome_MarketClub"].ConnectionString;
            }
        }

        /// <summary>
        /// 默认构造函数
        /// </summary>
        private tmpuserDAL() { }

        /// <summary>
        /// 向数据表中插入一条新记录
        /// </summary>
        /// <param name="entity">Entity.tmpuserEntity实体类</param>
        /// <remarks>如果表存在自增长字段，插入记录成功后自增长字段值会更新至实体</remarks>
        public static void Insert(Entity.tmpuserEntity entity)
        {
            List<SqlParameter> commandParms = new List<SqlParameter>();
            commandParms.Add(SqlHelper.CreateParam("@ReceiverID", SqlDbType.Int, 0, ParameterDirection.Input, entity.ReceiverID));
            commandParms.Add(SqlHelper.CreateParam("@ReceiverType", SqlDbType.TinyInt, 0, ParameterDirection.Input, entity.ReceiverType));
            commandParms.Add(SqlHelper.CreateParam("@id", SqlDbType.Int, 0, ParameterDirection.Input, entity.id));

            SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, C_SP_TMPUSER_INSERT, commandParms);
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
                dataFields = C_SP_TMPUSER_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, startRowIndex, maximumRows);
        }


        /// <summary>
        /// 按条件查询数据表,返回 Entity.tmpuserEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(不能为空)，不须带"Order By"关键字</param>
        /// <param name="startRowIndex">记录开始索引，从0开始</param>
        /// <param name="maximumRows">返回记录数量</param>
        public static List<Entity.tmpuserEntity> Search(string whereClause, string orderBy, int startRowIndex, int maximumRows)
        {
            List<Entity.tmpuserEntity> list = new List<Entity.tmpuserEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_TMPUSER_FIELDS, whereClause, orderBy, startRowIndex, maximumRows))
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
                dataFields = C_SP_TMPUSER_FIELDS;
            }
            return SqlListHepler.Search(ConnectionString, C_TABLE_NAME, dataFields, whereClause, orderBy, rowsToReturn);
        }

        /// <summary>
        /// 按条件查询数据表,返回 Entity.tmpuserEntity 数据集
        /// </summary>
        /// <param name="whereClause">SQL条件语句(可为空)，不须带"Where"关键字</param>
        /// <param name="orderBy">SQL排序语句(可为空)，不须带"Order By"关键字</param>
        /// <param name="rowsToReturn">返回记录数量</param>
        public static List<Entity.tmpuserEntity> Search(string whereClause, string orderBy, int rowsToReturn)
        {
            List<Entity.tmpuserEntity> list = new List<Entity.tmpuserEntity>();
            using (SqlDataReader reader = SqlListHepler.SearchDataReader(ConnectionString, C_TABLE_NAME, C_SP_TMPUSER_FIELDS, whereClause, orderBy, rowsToReturn))
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
        private static Entity.tmpuserEntity ConvertToEntityFromDataRow(DataRow row)
        {
            Entity.tmpuserEntity entity = new Entity.tmpuserEntity();
            entity.ReceiverID = Convert.ToInt32(row["ReceiverID"]);
            entity.ReceiverType = Convert.ToInt16(row["ReceiverType"]);
            entity.id = Convert.ToInt32(row["id"]);

            return entity;
        }

        /// <summary>
        /// 转换SqlDataReader类型数据记录为实体
        /// </summary>
        private static Entity.tmpuserEntity ConvertToEntityFromDataReader(SqlDataReader reader)
        {
            Entity.tmpuserEntity entity = new Entity.tmpuserEntity();
            entity.ReceiverID = Convert.ToInt32(reader["ReceiverID"]);
            entity.ReceiverType = Convert.ToInt16(reader["ReceiverType"]);
            entity.id = Convert.ToInt32(reader["id"]);

            return entity;
        }

    }
}
