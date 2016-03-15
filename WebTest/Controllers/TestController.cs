using Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using SZHomeDLL;
using WebTest.Models;

namespace WebTest.Controllers
{
    public class TestController : Controller
    {
        private static Dictionary<int, string> _address = null;

        /// <summary>
        /// 登记点地址
        /// </summary>
        private static Dictionary<int, string> RegisterAddress
        {
            get
            {
                if (_address == null)
                {
                    Dictionary<int, string> dict = new Dictionary<int, string>();
                    dict[1] = "深圳市罗湖区北环大道1022号金湖文化中心三楼";
                    dict[-1000] = "宝安区九区广场大厦(宝民一路)7层";
                    dict[-1001] = "深圳市罗湖区北环大道1022号金湖文化中心二楼";
                    dict[4] = "宝安区西乡街道流塘路288号（宝安日报对面）";
                    dict[3] = "龙华新区龙华街道龙环二路181号";
                    dict[2] = "龙岗区吉祥路城市花园二期1栋（818路汽车总站对面）";
                    dict[5] = "布吉街道吉政路19号,6,光明新区别墅路13号商会大厦1楼（西侧）";
                    dict[7] = "坪山新区坑梓街道办红岭路27号或大鹏新区葵涌葵政西路22号";
                    _address = dict;
                }
                return _address;
            }
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 获取登记点
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetRegistration()
        {
            int araeId = ConvertHelper.StringToInt(Request["area"]);
            IEnumerable<Registration> regis = RequestHelper.GetRequst<IEnumerable<Registration>>(RequestHelper.RequstType.获取办证登记点, araeId, 1, "30128300369555062213440300");
            ResultJson json = new ResultJson();
            json.Data = regis;
            json.StatusCode = 0;
            json.Message = "success";
            return Json(json);
        }

        /// <summary>
        /// 获取预约信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetBookingInfo()
        {
            int registrationId = ConvertHelper.StringToInt(Request["registrationId"]);
            IEnumerable<BookingDateInfo> bookingDateList = RequestHelper.GetRequst<IEnumerable<BookingDateInfo>>(RequestHelper.RequstType.获取预约日期, registrationId);
            IEnumerable<BookingTimeInfo> bookingTimeList = RequestHelper.GetRequst<IEnumerable<BookingTimeInfo>>(RequestHelper.RequstType.获取预约时间, registrationId, 1);
            Dictionary<string, object> dict = new Dictionary<string, object>();
            string bookInfoStr = RequestHelper.GetRequst(RequestHelper.RequstType.获取预约信息, registrationId, 1);
            //Dictionary<string, > bookingInfo = new Dictionary<string, Dictionary<int, BookingInfo>>();
            List<IEnumerable<BookingInfo>> bookingInfoList = new List<IEnumerable<BookingInfo>>();
            foreach (var time in bookingTimeList)
            {
                List<BookingInfo> timeInfoList = new List<BookingInfo>();
                foreach (var date in bookingDateList)
                {
                    string timeStr = date.workDay.Substring(0, 10) + "_" + time.workTimeSoltName;
                    int position = bookInfoStr.IndexOf(timeStr);
                    int bookCount = 0;
                    if (position != -1)
                    {
                        int start = bookInfoStr.IndexOf("\"", position - 9) + 1;
                        int end = bookInfoStr.IndexOf("\"", position - 7);
                        bookCount = Convert.ToInt32(bookInfoStr.Substring(start, end - start));
                    }
                    BookingInfo bookInfo = new BookingInfo();
                    bookInfo.bookCount = time.bookCount;
                    bookInfo.bookedCount = bookCount;
                    bookInfo.bookingDate = date.workDay.Substring(0, 10);
                    bookInfo.bookingTime = time.workTimeSoltName;
                    bookInfo.isEnd = DateTime.Now > DateTime.Parse(date.workDay.Substring(0, 10) + " " + time.workTimeSoltName.Substring(0, 5));
                    timeInfoList.Add(bookInfo);
                }
                bookingInfoList.Add(timeInfoList);
            }
            dict["bookingDateInfo"] = bookingDateList;
            dict["bookingTimeInfo"] = bookingTimeList;
            dict["bookingInfo"] = bookingInfoList;
            dict["bookingAddress"] = RegisterAddress.ContainsKey(registrationId) ? RegisterAddress[registrationId] : "";
            ResultJson json = new ResultJson();
            //json.Data = JsonConvert.SerializeObject(dict);
            json.Data = dict;
            json.StatusCode = 0;
            json.Message = "success";
            return Json(json);
        }

        /// <summary>
        /// 提交预约信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Verify()
        {
            //string szItemNo = Request["szItemNo"];
            //int bookingType = ConvertHelper.StringToInt(Request["bookingType"]);
            ////bookingTypeName
            //string bookingDateStr = Request["bookingDateStr"];
            ////bookingDateLabel
            //int workTimeSoltOid = ConvertHelper.StringToInt(Request["workTimeSoltOid"]);
            //string workTimeSoltName = Request["workTimeSoltName"];
            //int bookingSzAreaOid = ConvertHelper.StringToInt(Request["bookingSzAreaOid"]);
            //string houseName = Request["houseName"];
            //string proveType = Request["proveType"];
            //string proveCode = Request["proveCode"];    //权属证明编号
            //string personName = Request["personName"];
            //string phoneNumber = Request["phoneNumber"];
            //int certificateType = ConvertHelper.StringToInt(Request["certificateType"]);
            //string certificateNo = Request["certificateNo"];
            //int registrationAreaOid = ConvertHelper.StringToInt(Request["registrationAreaOid"]);
            //string calendar = Request["calendar"];


            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict["szItemNo"] = Request["szItemNo"];
            dict["bookingType"] = ConvertHelper.StringToInt(Request["bookingType"]);
            //bookingTypeName
            dict["bookingDateStr"] = Request["bookingDateStr"];
            //bookingDateLabel
            dict["workTimeSoltOid"] = ConvertHelper.StringToInt(Request["workTimeSoltOid"]);
            dict["workTimeSoltName"] = Request["workTimeSoltName"];
            dict["bookingSzAreaOid"] = ConvertHelper.StringToInt(Request["bookingSzAreaOid"]);
            dict["houseName"] = Request["houseName"];
            dict["proveType"] = Request["proveType"];
            dict["proveCode"] = Request["proveCode"];    //权属证明编号
            dict["personName"] = Request["personName"];
            dict["phoneNumber"] = Request["phoneNumber"];
            dict["certificateType"] = ConvertHelper.StringToInt(Request["certificateType"]);
            dict["certificateNo"] = Request["certificateNo"];
            dict["registrationAreaOid"] = ConvertHelper.StringToInt(Request["registrationAreaOid"]);
            dict["calendar"] = Request["calendar"];
            string html = RequestHelper.GetRequst("http://onlinebook.szreorc.com:8888/onlinebook/goAffirmBookWeb.do?method=goAffirmBookWeb", dict, "JSESSIONID=035812EABA53A60FB95D45AAFCCB00E9; _gscu_1501990096=579368486nh8bs47");
            string certificateTypeName = HtmlContentHelper.GetValueById(html, "certificateTypeName");
            return View();
        }
    }
}