using System.Collections.Generic;
using WebTest.DAL;
using WebTest.Entity;

namespace WebTest.BLL
{
    /// <summary>
    /// 数据表tmpuser的业务逻辑类
    /// </summary>
    public class tmpuserBLL
    {
        public static List<tmpuserEntity> GetList(int start, int size)
        {
            return tmpuserDAL.Search(null, "id", start, size);
        }
    }
}
