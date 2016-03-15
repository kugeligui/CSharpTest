using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Common
{
    public class RequestHelper
    {
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

        /// <summary>
        /// 获取请求
        /// </summary>
        /// <typeparam name="T">相应内容</typeparam>
        /// <param name="type">请求类型</param>
        /// <param name="paras">参数值param0、param1、param2...</param>
        /// <returns></returns>
        public static T GetRequst<T>(RequstType type, params object[] paras) where T : class
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
        public static string GetRequst(RequstType type, params object[] paras)
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

        /// <summary>
        /// 获取请求
        /// </summary>        
        /// <param name="requestUrl">请求地址</param>
        /// <param name="paras">参数键值对</param>
        /// <returns></returns>
        public static string GetRequst(string requestUrl, IDictionary<string, object> paras, IDictionary<string, string> cookies)
        {
            HttpWebRequest request = WebRequest.CreateHttp(requestUrl);
            request.Method = "POST";
            request.Accept = "*/*";
            request.Headers.Add(HttpRequestHeader.AcceptEncoding, "gzip, deflate");
            request.Headers.Add(HttpRequestHeader.AcceptLanguage, "zh-CN,zh;q=0.8");
            request.Headers.Add(HttpRequestHeader.KeepAlive, "TRUE");
            request.ContentType = "application/x-www-form-urlencoded";
            if (cookies != null)
            {
                string cookieStr = "";
                foreach (var item in cookies)
                {
                    cookieStr += string.Format("{0}={1};", item.Key, item.Value);
                }
                if (!string.IsNullOrWhiteSpace(cookieStr))
                {
                    cookieStr = cookieStr.Remove(cookieStr.Length - 1, 1);
                }
                request.Headers.Add(HttpRequestHeader.Cookie, cookieStr);
            }
            request.Headers.Add("DNT", "1");
            request.Host = "onlinebook.szreorc.com:8888";
            request.Headers.Add("Origin", "http://onlinebook.szreorc.com:8888");
            request.Referer = "http://onlinebook.szreorc.com:8888/onlinebook/goCreateBookWeb.do?method=goCreateBookWeb&itemNo=30128300369555062213440300&szItemNo=30128300369555062213440300";
            request.UserAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36";
            string paraStr = "";
            if (paras != null)
            {
                foreach (var para in paras)
                {
                    if (para.Value == null)
                    {
                        paraStr += string.Format("{0}=&", para.Key);
                    }
                    else {
                        paraStr += string.Format("{0}={1}&", para.Key, HttpUtility.UrlEncode(para.Value.ToString(), Encoding.Default));
                    }
                    //if (!string.IsNullOrWhiteSpace(paraStr))
                    //{
                    //    paraStr = paraStr.Remove(paraStr.Length - 1, 1);
                    //}
                }
            }
            try
            {
                if (!string.IsNullOrWhiteSpace(paraStr))
                {
                    //将字符串转换为字节数组
                    byte[] bs = Encoding.UTF8.GetBytes(paraStr);
                    using (Stream reqStream = request.GetRequestStream())
                    {
                        reqStream.Write(bs, 0, bs.Length);
                    }
                }
                //获取和处理响应内容
                WebResponse response = request.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.Default);
                return reader.ReadToEnd();
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// 获取验证码
        /// </summary>
        /// <returns></returns>
        public static string GetVerificationCode(string imageUrl, string sessionId, ref string setSessionId)
        {
            HttpWebRequest request = WebRequest.CreateHttp(imageUrl);
            if (!string.IsNullOrWhiteSpace(sessionId))
            {
                request.Headers.Add(HttpRequestHeader.Cookie, "JSESSIONID=" + sessionId);
            }
            WebResponse response = request.GetResponse();
            setSessionId = sessionId;
            string setCookie = response.Headers["Set-Cookie"];
            if (!string.IsNullOrWhiteSpace(setCookie))
            {
                Match match = Regex.Match(setCookie, "JSESSIONID=([^;]+)");
                if (match.Success)
                {
                    setSessionId = match.Groups[1].Value;
                }
            }
            Stream responseStream = response.GetResponseStream();
            MemoryStream mStream = new MemoryStream();
            responseStream.CopyTo(mStream);
            byte[] bytes = new byte[mStream.Length];
            mStream.Position = 0;
            mStream.Read(bytes, 0, bytes.Length);
            return Convert.ToBase64String(bytes);
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
        /// 获取时间戳
        /// </summary>
        /// <param name="time">时间</param>
        /// <returns></returns>
        private static double GetTimestamp(DateTime time)
        {
            return (time - DateTime.Parse("1970-1-1")).TotalSeconds;
        }
    }
}
