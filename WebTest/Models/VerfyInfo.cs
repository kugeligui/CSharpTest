namespace WebTest.Models
{
    /// <summary>
    /// 验证信息
    /// </summary>
    public class VerfyInfo
    {
        /// <summary>
        /// 登记点id
        /// </summary>
        public int registrationAreaOid { get; set; }

        /// <summary>
        /// 登记点名称
        /// </summary>
        public string registrationAreaName { get; set; }

        /// <summary>
        /// 预约类型
        /// </summary>
        public int bookingType { get; set; }

        /// <summary>
        /// 预约类型名
        /// </summary>
        public string bookingTypeName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string bussName { get; set; }

        /// <summary>
        /// 业务号
        /// </summary>
        public string itemNo { get; set; }

        /// <summary>
        /// 业务号
        /// </summary>
        public string szItemNo { get; set; }

        /// <summary>
        /// 预约日期
        /// </summary>
        public string bookingDateLabel { get; set; }

        /// <summary>
        /// 预约日期
        /// </summary>
        public string bookingDateStr { get; set; }

        /// <summary>
        /// 预约时间id
        /// </summary>
        public int workTimeSoltOid { get; set; }

        /// <summary>
        /// 预约时间
        /// </summary>
        public string workTimeSoltName { get; set; }

        /// <summary>
        /// 权属证明类型
        /// </summary>
        public string proveType { get; set; }

        /// <summary>
        /// 权属证明类型名称
        /// </summary>
        public string proveTypeName { get; set; }

        /// <summary>
        /// 权属证明编号
        /// </summary>
        public string proveCode { get; set; }

        /// <summary>
        /// 房地产名称
        /// </summary>
        public string houseName { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string personName { get; set; }

        /// <summary>
        /// 证件类型
        /// </summary>
        public int certificateType { get; set; }

        /// <summary>
        /// 证件类型名称
        /// </summary>
        public string certificateTypeName { get; set; }

        /// <summary>
        /// 证件号
        /// </summary>
        public string certificateNo { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string phoneNumber { get; set; }

        /// <summary>
        /// 预约区域id
        /// </summary>
        public int bookingSzAreaOid { get; set; }

        /// <summary>
        /// 预约区域名
        /// </summary>
        public string szAreaName { get; set; }
    }
}