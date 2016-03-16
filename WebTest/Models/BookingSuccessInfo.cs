using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebTest.Models
{
    public class BookingSuccessInfo
    {
        /// <summary>
        /// 姓名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 预约业务类型
        /// </summary>
        public string BookingTypeName { get; set; }

        /// <summary>
        /// 流水号
        /// </summary>
        public string SerialNumber { get; set; }

        /// <summary>
        /// 预约日期
        /// </summary>
        public string BookingDateStr { get; set; }

        /// <summary>
        /// 预约时间
        /// </summary>
        public string BookingTimeStr { get; set; }

        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime EndTime { get; set; }

        /// <summary>
        /// 预约登记点
        /// </summary>
        public string BookingRegistration { get; set; }

        /// <summary>
        /// 登记点地址
        /// </summary>
        public string RegistrationAddress { get; set; }

        /// <summary>
        /// 登记点电话
        /// </summary>
        public string RegistrationPhone { get; set; }
    }
}