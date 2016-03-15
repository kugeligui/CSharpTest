namespace WebTest.Models
{
    /// <summary>
    /// 预约日期信息
    /// </summary>
    public class BookingDateInfo
    {
        /// <summary>
        /// 工作日
        /// </summary>
        public string workDay { get; set; }

        /// <summary>
        /// 是否工作
        /// </summary>
        public string isWork { get; set; }

        /// <summary>
        /// 工作日id
        /// </summary>
        public int workDayOid { get; set; }

        /// <summary>
        /// 星期名
        /// </summary>
        public string weekName { get; set; }
    }
}