using Common;
using Gma.QrCodeNet.Encoding;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace ConsoleTest
{
    class Program
    {
        /// <summary>
        /// 区域
        /// </summary>
        public enum Area
        {
            罗湖区 = 1,
            福田区 = 2,
            南山区 = 3,
            宝安区 = 4,
            龙岗区 = 5,
            盐田区 = 6,
            光明新区 = 7,
            坪山新区 = 8,
            龙华新区 = 9,
            大鹏新区 = 10
        }

        /// <summary>
        /// 请求操作
        /// </summary>
        public enum RequstType
        {
            获取办证登记点,
            获取预约日期,
            获取预约时间,
            获取预约信息
        }

        private static Dictionary<int, string> _address = null;

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

        static void Main(string[] args)
        {
            //string value = HtmlContentHelper.GetJsValueByKey("var messgeFlag = 'Y';//跳转标识     不能为空    用于判断成功还是失败", "messgeFlag");

            //return;

            //遍历区域
            foreach (Area area in Enum.GetValues(typeof(Area)))
            {
                Console.WriteLine(area.ToString());
                IEnumerable<Registration> registrationList = GetRegistration(area);
                if (registrationList != null)
                {
                    //遍历获取到的登记点（返回的是集合）
                    foreach (var reg in registrationList)
                    {
                        //遍历获取到的登记点信息
                        foreach (var registeration in reg.labelList)
                        {
                            int registrationId = registeration.value;
                            Console.WriteLine("办理登记点：" + registeration.label);
                            Console.WriteLine("登记点地址：" + (RegisterAddress.ContainsKey(registrationId) ? RegisterAddress[registrationId] : ""));

                            string bookInfo = GetBookingInfoListByRegistrationAreaOid(registrationId);
                            IEnumerable<BookingDateInfo> bookingDateList = GetWorkDateListByRegistrationAreaOid(registrationId);
                            IEnumerable<BookingTimeInfo> bookingTimeList = GetWorkTimeListByRegistrationAreaOid(registrationId);
                            Console.Write("预约时段\t");
                            foreach (var date in bookingDateList)
                            {
                                Console.Write(date.workDay.Substring(5, 5).Replace("-", "月") + "\t");
                            }
                            Console.WriteLine();
                            foreach (var time in bookingTimeList)
                            {
                                Console.Write(time.workTimeSoltName + "\t");
                                foreach (var date in bookingDateList)
                                {
                                    string timeStr = date.workDay.Substring(0, 10) + "_" + time.workTimeSoltName;
                                    int position = bookInfo.IndexOf(timeStr);
                                    int bookCount = 0;
                                    if (position != -1)
                                    {
                                        int start = bookInfo.IndexOf("\"", position - 9) + 1;
                                        int end = bookInfo.IndexOf("\"", position - 7);
                                        bookCount = Convert.ToInt32(bookInfo.Substring(start, end - start));
                                    }
                                    if (DateTime.Now > DateTime.Parse(date.workDay.Substring(0, 10) + " " + time.workTimeSoltName.Substring(0, 5)))
                                    {
                                        Console.Write("已结束\t");
                                    }
                                    else
                                    {
                                        Console.Write(string.Format("({0}/{1})\t", bookCount, time.bookCount));
                                    }
                                }
                                Console.WriteLine();
                            }
                        }
                        Console.WriteLine();
                    }
                }
                Console.WriteLine();
            }
            Console.ReadKey();
        }

        /// <summary>
        /// 获取办证登记点
        /// </summary>
        /// <param name="area">区域</param>
        private static IEnumerable<Registration> GetRegistration(Area area)
        {
            return GetRequst<IEnumerable<Registration>>(RequstType.获取办证登记点, area.GetHashCode(), 1, "30128300369555062213440300");
        }

        /// <summary>
        /// 获取预约日期
        /// </summary>
        /// <param name="registrationId">办证登记点id</param>
        private static IEnumerable<BookingDateInfo> GetWorkDateListByRegistrationAreaOid(int registrationId)
        {
            return GetRequst<IEnumerable<BookingDateInfo>>(RequstType.获取预约日期, registrationId);
        }

        /// <summary>
        /// 获取预约时间
        /// </summary>
        /// <param name="registrationId">办证登记点id</param>
        private static IEnumerable<BookingTimeInfo> GetWorkTimeListByRegistrationAreaOid(int registrationId)
        {
            return GetRequst<IEnumerable<BookingTimeInfo>>(RequstType.获取预约时间, registrationId, 1);
        }

        /// <summary>
        /// 获取预约时间
        /// </summary>
        /// <param name="registrationId">办证登记点id</param>
        private static string GetBookingInfoListByRegistrationAreaOid(int registrationId)
        {
            return GetRequst(RequstType.获取预约信息, registrationId, 1);
        }

        private static double GetTimestamp(DateTime time)
        {
            return (time - DateTime.Parse("1970-1-1")).TotalSeconds;
        }

        /// <summary>
        /// 获取json数据
        /// </summary>
        /// <param name="inputString"></param>
        /// <returns></returns>
        private static string GetJsonString(string inputString)
        {
            string chn = SZHomeDLL.StringHelper.ConvertUnicodeToChn(inputString);    //UNICIDE转中文
            string json = Regex.Match(chn, @"\[.+\]").Value;    //提取内容
            return json;
        }

        /// <summary>
        /// 获取请求
        /// </summary>
        /// <typeparam name="T">相应内容</typeparam>
        /// <param name="type">请求类型</param>
        /// <param name="paras">参数值param0、param1、param2...</param>
        /// <returns></returns>
        private static T GetRequst<T>(RequstType type, params object[] paras) where T : class
        {
            return JsonConvert.DeserializeObject<T>(GetJsonString(GetRequst(type, paras)));
        }

        /// <summary>
        /// 获取请求
        /// </summary>
        /// <typeparam name="T">相应内容</typeparam>
        /// <param name="type">请求类型</param>
        /// <param name="paras">参数值param0、param1、param2...</param>
        /// <returns></returns>
        private static string GetRequst(RequstType type, params object[] paras)
        {
            string url = "";
            string scriptName = "";
            string methodName = "";
            switch (type)
            {
                case RequstType.获取办证登记点:
                    {
                        url = "http://onlinebook.szreorc.com:8888/onlinebook/dwr/exec/bookWebActionDwr.bookingSzAreaChange.dwr";
                        scriptName = "bookWebActionDwr";
                        methodName = "bookingSzAreaChange";
                        break;
                    }
                case RequstType.获取预约日期:
                    {
                        url = "http://onlinebook.szreorc.com:8888/onlinebook/dwr/exec/bookingInformationDwr.countAllBookingAmount.dwr";
                        scriptName = "workDayDwr";
                        methodName = "listWorkDayByRegistrationAreaOid";
                        break;
                    }
                case RequstType.获取预约时间:
                    {
                        url = "http://onlinebook.szreorc.com:8888/onlinebook/dwr/exec/workTimeSoltDwr.listWorkTimeSoltByRegistrationAreaOid.dwr";
                        scriptName = "workTimeSoltDwr";
                        methodName = "listWorkTimeSoltByRegistrationAreaOid";
                        break;
                    }
                case RequstType.获取预约信息:
                    {
                        url = "http://onlinebook.szreorc.com:8888/onlinebook/dwr/exec/bookingInformationDwr.countAllBookingAmount.dwr";
                        scriptName = "bookingInformationDwr";
                        methodName = "countAllBookingAmount";
                        break;
                    }
            }
            HttpWebRequest request = WebRequest.CreateHttp(url);
            request.Method = "POST";
            request.Accept = "*/*";
            request.Headers.Add(HttpRequestHeader.AcceptEncoding, "gzip, deflate");
            request.Headers.Add(HttpRequestHeader.AcceptLanguage, "zh-CN,zh;q=0.8");
            request.Headers.Add(HttpRequestHeader.KeepAlive, "TRUE");
            request.ContentType = "text/plain";
            request.Headers.Add(HttpRequestHeader.Cookie, "JSESSIONID=2A801C7E269971E91B1E8B51B441CBEE");
            request.Headers.Add("DNT", "1");
            request.Host = "onlinebook.szreorc.com:8888";
            request.Headers.Add("Origin", "http://onlinebook.szreorc.com:8888");
            request.Referer = "http://onlinebook.szreorc.com:8888/onlinebook/goCreateBookWeb.do?method=goCreateBookWeb&itemNo=30128300369555062213440300&szItemNo=30128300369555062213440300";
            request.UserAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36";
            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict["callCount"] = 1;
            dict["c0-scriptName"] = scriptName;
            dict["c0-methodName"] = methodName;
            dict["c0-id"] = "5743_" + GetTimestamp(DateTime.Now);
            if (paras != null)
            {
                for (int i = 0; i < paras.Length; i++)
                {
                    dict["c0-param" + i] = paras[i];
                }
            }
            dict["xml"] = "true";
            try
            {
                string paraStr = null;
                foreach (var item in dict)
                {
                    if (item.Value != null)
                    {
                        paraStr += string.Format("{0}={1}\n", item.Key, HttpUtility.UrlEncode(item.Value.ToString()));
                    }
                }
                //将字符串转换为字节数组
                byte[] bs = Encoding.UTF8.GetBytes(paraStr);
                using (Stream reqStream = request.GetRequestStream())
                {
                    reqStream.Write(bs, 0, bs.Length);
                }
                //获取和处理响应内容
                WebResponse response = request.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                return reader.ReadToEnd();
            }
            catch
            {
                return null;
            }
        }
    }

    /// <summary>
    /// 办证登记点
    /// </summary>
    public class Registration
    {
        public int registrationAreaOid { get; set; }

        public IEnumerable<RegistrationInfo> labelList { get; set; }
    }

    /// <summary>
    /// 登记点信息
    /// </summary>
    public class RegistrationInfo
    {
        /// <summary>
        /// 注册区域
        /// </summary>
        public int value { get; set; }

        /// <summary>
        /// 标记
        /// </summary>
        public string label { get; set; }
    }

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
