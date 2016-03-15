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
        public static string GetValueById(string html, string id)
        {
            Regex regex = new Regex("<[^>]+id=\"" + id + "\"[^>]*>([^<]+)</td>");
            Match match = regex.Match(html);
            if (match.Success)
            {
                return match.Groups[1].Value.Replace("&nbsp;", "");
            }
            else {
                return null;
            }
        }
    }
}
