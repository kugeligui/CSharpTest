using System;
namespace WebTest.Entity
{
    /// <summary>
    /// 数据表tmpuser的实体类
    /// </summary>
    [Serializable]
    public class tmpuserEntity
    {
        #region Private Parameters
        private int _ReceiverID;
        private short _ReceiverType;
        private int _id;
        #endregion

        #region Public Properties

        public int ReceiverID
        {
            get { return this._ReceiverID; }
            set { this._ReceiverID = value; }
        }

        public short ReceiverType
        {
            get { return this._ReceiverType; }
            set { this._ReceiverType = value; }
        }

        public int id
        {
            get { return this._id; }
            set { this._id = value; }
        }

        #endregion
    }
}
