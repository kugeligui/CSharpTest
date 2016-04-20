using System;
namespace SZHome.OAuth2.Entity
{
    /// <summary>
    /// 数据表fdccommentusers的实体类
    /// </summary>
    [Serializable]
    public class fdccommentusersEntity
    {
        #region Private Parameters
        private int _id;
        private string _username;
        private string _email;
        private short? _UserType;
        private short? _available;
        private string _ip;
        private DateTime? _date;
        private string _truename;
        private string _gender;
        private string _phone;
        private string _mobile;
        private string _gbhome;
        private string _address;
        private int? _logintime;
        private string _lastip;
        private DateTime? _lastdate;
        private string _Sign;
        private string _Sign2;
        private short _Signable;
        private string _SignURL;
        private int _FTS;
        private int _HTS;
        private int _SFTS;
        private int _SHTS;
        private int _JHS;
        private int _ZJF;
        private int _addpoint;
        private string _addpoint_remark;
        private int? _imagetype;
        private short? _gbflag;
        private bool? _IsEmailValidated;
        private short? _DefaultGoPage;
        private string _psw;
        #endregion

        #region Public Properties

        public int id
        {
            get { return this._id; }
            set { this._id = value; }
        }

        public string username
        {
            get { return this._username; }
            set { this._username = value; }
        }

        public string email
        {
            get { return this._email; }
            set { this._email = value; }
        }

        public short? UserType
        {
            get { return this._UserType; }
            set { this._UserType = value; }
        }

        public short? available
        {
            get { return this._available; }
            set { this._available = value; }
        }

        public string ip
        {
            get { return this._ip; }
            set { this._ip = value; }
        }

        public DateTime? date
        {
            get { return this._date; }
            set { this._date = value; }
        }

        public string truename
        {
            get { return this._truename; }
            set { this._truename = value; }
        }

        public string gender
        {
            get { return this._gender; }
            set { this._gender = value; }
        }

        public string phone
        {
            get { return this._phone; }
            set { this._phone = value; }
        }

        public string mobile
        {
            get { return this._mobile; }
            set { this._mobile = value; }
        }

        public string gbhome
        {
            get { return this._gbhome; }
            set { this._gbhome = value; }
        }

        public string address
        {
            get { return this._address; }
            set { this._address = value; }
        }

        public int? logintime
        {
            get { return this._logintime; }
            set { this._logintime = value; }
        }

        public string lastip
        {
            get { return this._lastip; }
            set { this._lastip = value; }
        }

        public DateTime? lastdate
        {
            get { return this._lastdate; }
            set { this._lastdate = value; }
        }

        public string Sign
        {
            get { return this._Sign; }
            set { this._Sign = value; }
        }

        public string Sign2
        {
            get { return this._Sign2; }
            set { this._Sign2 = value; }
        }

        public short Signable
        {
            get { return this._Signable; }
            set { this._Signable = value; }
        }

        public string SignURL
        {
            get { return this._SignURL; }
            set { this._SignURL = value; }
        }

        public int FTS
        {
            get { return this._FTS; }
            set { this._FTS = value; }
        }

        public int HTS
        {
            get { return this._HTS; }
            set { this._HTS = value; }
        }

        public int SFTS
        {
            get { return this._SFTS; }
            set { this._SFTS = value; }
        }

        public int SHTS
        {
            get { return this._SHTS; }
            set { this._SHTS = value; }
        }

        public int JHS
        {
            get { return this._JHS; }
            set { this._JHS = value; }
        }

        public int ZJF
        {
            get { return this._ZJF; }
            set { this._ZJF = value; }
        }

        public int addpoint
        {
            get { return this._addpoint; }
            set { this._addpoint = value; }
        }

        public string addpoint_remark
        {
            get { return this._addpoint_remark; }
            set { this._addpoint_remark = value; }
        }

        public int? imagetype
        {
            get { return this._imagetype; }
            set { this._imagetype = value; }
        }

        public short? gbflag
        {
            get { return this._gbflag; }
            set { this._gbflag = value; }
        }

        public bool? IsEmailValidated
        {
            get { return this._IsEmailValidated; }
            set { this._IsEmailValidated = value; }
        }

        public short? DefaultGoPage
        {
            get { return this._DefaultGoPage; }
            set { this._DefaultGoPage = value; }
        }

        public string psw
        {
            get { return this._psw; }
            set { this._psw = value; }
        }

        #endregion
    }
}
