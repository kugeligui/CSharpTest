using System;
namespace SZHome.OAuth2.Entity
{
    /// <summary>
    /// 数据表BBSOAuthLogin的实体类
    /// </summary>
    [Serializable]
    public class BBSOAuthLoginEntity
    {
        #region Private Parameters
        private int _Id;
        private string _ClientId;
        private int _UserId;
        private string _DeviceId;
        private string _AccessToken;
        private DateTime _ExpiresIn;
        private string _Scopes;
        private DateTime _CreateTime;
        private int _Status;
        #endregion

        #region Public Properties

        public int Id
        {
            get { return this._Id; }
            set { this._Id = value; }
        }

        public string ClientId
        {
            get { return this._ClientId; }
            set { this._ClientId = value; }
        }

        public int UserId
        {
            get { return this._UserId; }
            set { this._UserId = value; }
        }

        public string DeviceId
        {
            get { return this._DeviceId; }
            set { this._DeviceId = value; }
        }

        public string AccessToken
        {
            get { return this._AccessToken; }
            set { this._AccessToken = value; }
        }

        public DateTime ExpiresIn
        {
            get { return this._ExpiresIn; }
            set { this._ExpiresIn = value; }
        }

        public string Scopes
        {
            get { return this._Scopes; }
            set { this._Scopes = value; }
        }

        public DateTime CreateTime
        {
            get { return this._CreateTime; }
            set { this._CreateTime = value; }
        }

        public int Status
        {
            get { return this._Status; }
            set { this._Status = value; }
        }

        #endregion
    }
}
