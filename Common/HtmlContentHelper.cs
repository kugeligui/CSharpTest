using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Common
{
    public class HtmlContentHelper
    {
        /// <summary>
        /// 根据id获取值
        /// </summary>
        /// <param name="html">html代码</param>
        /// <param name="id">控件id</param>
        /// <returns></returns>
        public static string GetTdTextById(string html, string id)
        {
            Regex regex = new Regex("<[^>]+id=\"" + id + "\"[^>]*>([^<]+)</td>", RegexOptions.IgnoreCase);
            Match match = regex.Match(html);
            if (match.Success)
            {
                return match.Groups[1].Value.Replace("&nbsp;", "");
            }
            else {
                return null;
            }
        }

        /// <summary>
        /// 根据id获取值
        /// </summary>
        /// <param name="html">html代码</param>
        /// <param name="name">控件名</param>
        /// <returns></returns>
        public static string GetValueByName(string html, string name)
        {
            Regex regex = new Regex("<[^>]+name=\"" + name + "\"[^>]*value=\"([^>]*)\">", RegexOptions.IgnoreCase);
            Match match = regex.Match(html);
            if (match.Success)
            {
                return match.Groups[1].Value.Replace("&nbsp;", "");
            }
            else {
                return null;
            }
        }

        /// <summary>
        /// 根据id获取值
        /// </summary>
        /// <param name="html">html代码</param>
        /// <param name="name">控件id</param>
        /// <returns></returns>
        public static string GetValueById(string html, string id)
        {
            Regex regex = new Regex("<[^>]+id=\"" + id + "\"[^>]*value=\"([^>]*)\">", RegexOptions.IgnoreCase);
            Match match = regex.Match(html);
            if (match.Success)
            {
                return match.Groups[1].Value.Replace("&nbsp;", "");
            }
            else {
                return null;
            }
        }

        /// <summary>
        /// 获取js的变量值
        /// </summary>
        /// <param name="html">html代码</param>
        /// <param name="key">变量名</param>
        /// <returns></returns>
        public static string GetJsValueByKey(string html, string key)
        {
            Regex regex = new Regex("var +" + key + " *= *('[^']+'|\"[^ \"]+\")", RegexOptions.IgnoreCase);
            Match match = regex.Match(html);
            if (match.Success)
            {
                return match.Groups[1].Value.Replace("&nbsp;", "").Replace("'", "").Replace("\"", "").Replace("&emsp;", "").Replace("&emsp;", "&ensp;");
            }
            else {
                return null;
            }
        }
    }
}
