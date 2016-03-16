using Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;
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
            //HttpCookie cookie = Request.Cookies["JSESSIONID"];
            //if (cookie == null)
            //{
            //    cookie = new HttpCookie("JSESSIONID", Guid.NewGuid().ToString("N"));
            //    cookie.Expires = DateTime.Now.AddDays(1);
            //    Response.Cookies.Add(cookie);
            //}
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
                    bookInfo.bookingDateLabel = date.workDay;
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
            //获取验证码
            HttpCookie cookie = Request.Cookies["JSESSIONID"];
            string sessionId = "";
            string vCodeBase64 = "";
            if (cookie == null)
            {
                vCodeBase64 = RequestHelper.GetVerificationCode("http://onlinebook.szreorc.com:8888/onlinebook/createBookWeb.do?method=getVerificationcode&vcdemander=userregister&time=" + DateTime.Now.ToString(), null, ref sessionId);
                cookie = new HttpCookie("JSESSIONID", sessionId);
                cookie.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Add(cookie);
            }
            else
            {
                sessionId = cookie.Value;
                vCodeBase64 = RequestHelper.GetVerificationCode("http://onlinebook.szreorc.com:8888/onlinebook/createBookWeb.do?method=getVerificationcode&vcdemander=userregister&time=" + DateTime.Now.ToString(), sessionId, ref sessionId);
            }

            Dictionary<string, object> paraDict = new Dictionary<string, object>();
            paraDict["szItemNo"] = Request["szItemNo"];
            paraDict["bookingType"] = ConvertHelper.StringToInt(Request["bookingType"]);
            paraDict["bussName"] = Request["bussName"];
            paraDict["bookingTypeName"] = Request["bookingTypeName"];
            paraDict["bookingDateStr"] = Request["bookingDateStr"];
            paraDict["bookingDateLabel"] = Request["bookingDateLabel"];
            paraDict["workTimeSoltOid"] = ConvertHelper.StringToInt(Request["workTimeSoltOid"]);
            paraDict["workTimeSoltName"] = Request["workTimeSoltName"];
            paraDict["bookingSzAreaOid"] = ConvertHelper.StringToInt(Request["bookingSzAreaOid"]);
            paraDict["houseName"] = Request["houseName"];
            paraDict["proveType"] = Request["proveType"];
            paraDict["proveCode"] = Request["proveCode"];    //权属证明编号
            paraDict["personName"] = Request["personName"];
            paraDict["phoneNumber"] = Request["phoneNumber"];
            paraDict["certificateType"] = ConvertHelper.StringToInt(Request["certificateType"]);
            paraDict["certificateNo"] = Request["certificateNo"];
            paraDict["registrationAreaOid"] = ConvertHelper.StringToInt(Request["registrationAreaOid"]);
            paraDict["calendar"] = Request["calendar"];

            string html = RequestHelper.GetRequst("http://onlinebook.szreorc.com:8888/onlinebook/goAffirmBookWeb.do?method=goAffirmBookWeb", paraDict, null);

            VerfyInfo verfyInfo = new VerfyInfo();
            verfyInfo.registrationAreaOid = ConvertHelper.StringToInt(HtmlContentHelper.GetValueByName(html, "registrationAreaOid"));
            verfyInfo.registrationAreaName = HtmlContentHelper.GetValueByName(html, "registrationAreaName");
            verfyInfo.bookingType = ConvertHelper.StringToInt(HtmlContentHelper.GetValueByName(html, "bookingType"));
            verfyInfo.bookingTypeName = HtmlContentHelper.GetValueByName(html, "bookingTypeName");
            verfyInfo.bussName = HtmlContentHelper.GetValueByName(html, "bussName");
            verfyInfo.itemNo = HtmlContentHelper.GetValueByName(html, "itemNo");
            verfyInfo.szItemNo = HtmlContentHelper.GetValueByName(html, "szItemNo");
            verfyInfo.bookingDateStr = HtmlContentHelper.GetValueByName(html, "bookingDateStr");
            verfyInfo.bookingDateLabel = HtmlContentHelper.GetValueByName(html, "bookingDateLabel");
            verfyInfo.workTimeSoltOid = ConvertHelper.StringToInt(HtmlContentHelper.GetValueByName(html, "workTimeSoltOid"));
            verfyInfo.workTimeSoltName = HtmlContentHelper.GetValueByName(html, "workTimeSoltName");
            verfyInfo.proveType = HtmlContentHelper.GetValueByName(html, "proveType");
            verfyInfo.proveTypeName = HtmlContentHelper.GetValueByName(html, "proveTypeName");
            verfyInfo.proveCode = HtmlContentHelper.GetValueByName(html, "proveCode");
            verfyInfo.houseName = HtmlContentHelper.GetValueByName(html, "houseName");
            verfyInfo.personName = HtmlContentHelper.GetValueByName(html, "personName");
            verfyInfo.certificateType = ConvertHelper.StringToInt(HtmlContentHelper.GetValueByName(html, "certificateType"));
            verfyInfo.certificateTypeName = HtmlContentHelper.GetValueByName(html, "certificateTypeName");
            verfyInfo.certificateNo = HtmlContentHelper.GetValueByName(html, "certificateNo");
            verfyInfo.phoneNumber = HtmlContentHelper.GetValueByName(html, "phoneNumber");
            verfyInfo.bookingSzAreaOid = ConvertHelper.StringToInt(HtmlContentHelper.GetValueByName(html, "bookingSzAreaOid"));
            verfyInfo.szAreaName = HtmlContentHelper.GetValueByName(html, "szAreaName");
            ViewBag.vCodeBase64 = vCodeBase64;
            ViewBag.JSESSIONID = sessionId;
            return View(verfyInfo);
        }

        /// <summary>
        /// 获取验证码
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetVerifyCode()
        {
            HttpCookie cookie = Request.Cookies["JSESSIONID"];
            string sessionId = "";
            string vCodeBase64 = "";
            if (cookie == null)
            {
                vCodeBase64 = RequestHelper.GetVerificationCode("http://onlinebook.szreorc.com:8888/onlinebook/createBookWeb.do?method=getVerificationcode&vcdemander=userregister&time=" + Guid.NewGuid().ToString("N"), null, ref sessionId);
                cookie = new HttpCookie("JSESSIONID", sessionId);
                cookie.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Add(cookie);
            }
            else
            {
                sessionId = cookie.Value;
                vCodeBase64 = RequestHelper.GetVerificationCode("http://onlinebook.szreorc.com:8888/onlinebook/createBookWeb.do?method=getVerificationcode&vcdemander=userregister&time=" + Guid.NewGuid().ToString("N"), sessionId, ref sessionId);
            }
            ResultJson json = new ResultJson();
            json.StatusCode = 0;
            json.Data = vCodeBase64;
            return Json(json);
        }

        /// <summary>
        /// 创建预约
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CreateBooking()
        {
            Dictionary<string, object> paraDict = new Dictionary<string, object>();
            paraDict["bookingInformationOid"] = Request["bookingInformationOid"];
            paraDict["bookingCode"] = Request["bookingCode"];
            paraDict["registrationAreaOid"] = ConvertHelper.StringToInt(Request["registrationAreaOid"]);
            paraDict["registrationAreaName"] = Request["registrationAreaName"];
            paraDict["bookingType"] = ConvertHelper.StringToInt(Request["bookingType"]);
            paraDict["bookingTypeName"] = Request["bookingTypeName"];
            paraDict["bussName"] = Request["bussName"];
            paraDict["itemNo"] = Request["itemNo"];
            paraDict["szItemNo"] = Request["szItemNo"];
            paraDict["bookingDateLabel"] = Request["bookingDateLabel"];
            paraDict["bookingDateStr"] = Request["bookingDateStr"];
            paraDict["workTimeSoltOid"] = ConvertHelper.StringToInt(Request["workTimeSoltOid"]);
            paraDict["workTimeSoltName"] = Request["workTimeSoltName"];
            paraDict["proveType"] = Request["proveType"];
            paraDict["proveTypeName"] = Request["proveTypeName"];
            paraDict["proveCode"] = Request["proveCode"];    //权属证明编号
            paraDict["houseName"] = Request["houseName"];
            paraDict["personName"] = Request["personName"];
            paraDict["certificateType"] = ConvertHelper.StringToInt(Request["certificateType"]);
            paraDict["certificateTypeName"] = Request["certificateTypeName"];
            paraDict["certificateNo"] = Request["certificateNo"];
            paraDict["phoneNumber"] = Request["phoneNumber"];
            paraDict["bookingSzAreaOid"] = ConvertHelper.StringToInt(Request["bookingSzAreaOid"]);
            paraDict["szAreaName"] = Request["szAreaName"];
            paraDict["verificationcodereg"] = Request["verificationcodereg"];

            HttpCookie cookie = Request.Cookies["JSESSIONID"];
            string sessionId = "";
            if (cookie != null)
            {
                sessionId = cookie.Value;
            }
            Dictionary<string, string> cookieDict = new Dictionary<string, string>();
            cookieDict["JSESSIONID"] = sessionId;
            string html = RequestHelper.GetRequst("http://onlinebook.szreorc.com:8888/onlinebook/createBookWeb.do?method=createBookWeb", paraDict, cookieDict);
            string messgeFlag = HtmlContentHelper.GetJsValueByKey(html, "messgeFlag");
            ResultJson json = new ResultJson();
            string message = HtmlContentHelper.GetJsValueByKey(html, "messge");
            if (messgeFlag == "Y")
            {
                //成功，解析预约号
                Regex regex = new Regex("([^>]+)已预约了(.+),预约流水号是<font color='red'>(.+)</font>,预约时间段是(.{11}),(.{11})（请在开始前10分钟到结束前10分钟内到现场取号）,预约登记点是(.+),地址是(.+),请您带齐身份证明和必备材料按时前往办理。业务咨询电话：([^\"]+)");
                Match match = regex.Match(message);
                if (match.Success)
                {
                    GroupCollection groups = match.Groups;
                    BookingSuccessInfo successInfo = new BookingSuccessInfo();
                    successInfo.UserName = groups[1].Value;
                    successInfo.BookingTypeName = groups[2].Value;
                    successInfo.SerialNumber = groups[3].Value;
                    string dateStr = groups[4].Value;
                    string timeStr = groups[5].Value;
                    successInfo.BookingDateStr = dateStr;
                    successInfo.BookingTimeStr = timeStr;
                    successInfo.StartTime = DateTime.Parse(dateStr + " " + timeStr.Substring(0, 5));
                    successInfo.EndTime = DateTime.Parse(dateStr + " " + timeStr.Substring(6, 5));
                    successInfo.BookingRegistration = groups[6].Value;
                    successInfo.RegistrationAddress = groups[7].Value;
                    successInfo.RegistrationPhone = groups[8].Value;
                    json.StatusCode = 0;
                    json.Data = successInfo;
                }
                else
                {
                    json.StatusCode = 0;
                    json.Message = message;
                }
            }
            else
            {
                json.StatusCode = -1;
                json.Message = message;
            }
            return Json(json);
        }

        /// <summary>
        /// 添加取消预约号
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CancelBooking()
        {
            Dictionary<string, object> paraDict = new Dictionary<string, object>();
            //预约号
            string bookingCode = Request["bookingCode"];
            if (bookingCode.Length > 6)
            {
                bookingCode = bookingCode.Substring(bookingCode.Length - 6, 6);
            }
            //证件号
            string certificateNo = Request["certificateNo"];
            string phoneNumber = Request["phoneNumber"];

            string queryHtml = RequestHelper.GetRequst("http://onlinebook.szreorc.com:8888/onlinebook/goCancelBookWeb.do?method=goCancelBookWeb&bookingCode=" + bookingCode + "&certificateNo=" + certificateNo + "&phoneNumber=" + phoneNumber, null, null);
            //获取预约号
            Match match = Regex.Match(queryHtml, @"bookWebCancel\('-?\d+'\)", RegexOptions.IgnoreCase);
            ResultJson json = new ResultJson();
            if (match.Success)
            {
                string bookingInformationOid = match.Groups[0].Value;
                paraDict["bookingInformationOid"] = bookingInformationOid;
                RequestHelper.GetRequst("http://onlinebook.szreorc.com:8888/onlinebook/cancelBookWeb.do?method=cancelBookWeb", paraDict, null);
                json.StatusCode = 0;
                json.Message = "取消预约成功";
            }
            else
            {
                json.StatusCode = -1;
                json.Message = "对不起，没有查询到数据！";
            }
            return Json(json);
        }
    }
}