namespace WebTest.Models
{
    public class BookingInfo
    {
        /// <summary>
        /// 日期标签
        /// </summary>
        public string bookingDateLabel { get; set; }

        /// <summary>
        /// 日期
        /// </summary>
        public string bookingDate { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public string bookingTime { get; set; }

        /// <summary>
        /// 可预约数
        /// </summary>
        public int bookCount { get; set; }

        /// <summary>
        /// 已预约数
        /// </summary>
        public int bookedCount { get; set; }

        /// <summary>
        /// 是否已结束预约
        /// </summary>
        public bool isEnd { get; set; }
    }
}