namespace WebTest.Models
{
    /// <summary>
    /// 预约时间段信息
    /// </summary>
    public class BookingTimeInfo
    {
        /// <summary>
        /// 工作时间oid
        /// </summary>
        public int workTimeSoltOid { get; set; }

        /// <summary>
        /// 类型数
        /// </summary>
        public int typeCount { get; set; }

        /// <summary>
        /// 开始时间
        /// </summary>
        public string startTime { get; set; }

        /// <summary>
        /// 结束时间
        /// </summary>
        public string endTime { get; set; }

        /// <summary>
        /// 登记点id
        /// </summary>
        public int registrationAreaOid { get; set; }

        /// <summary>
        /// 预约类型id
        /// </summary>
        public int bookingTypeOid { get; set; }

        /// <summary>
        /// 预约数
        /// </summary>
        public int bookCount { get; set; }

        /// <summary>
        /// 工作时间
        /// </summary>
        public string workTimeSoltName { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public int orderOfView { get; set; }
    }
}