using System;

namespace SZHome.OAuth2.Common
{
    public class CommonHelper
    {
        /// <summary>
        /// 根据用户ID获取100像素的图片URL
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        public static string GetUserFaceUrl100(int userId)
        {
            int i = userId / 10000;
            int j = (i + 1) * 10000;
            DateTime dt = DateTime.Now;
            string date = dt.Year.ToString() + dt.Month + dt.Day + dt.Hour + dt.Minute + dt.Second + dt.Millisecond;//解决头像缓存问题
            return string.Format("http://i0.szhomeimg.com/uploadfiles/sign/100/{0}/{1}.jpg?t={2}", j.ToString(), userId.ToString(), date);
        }

        /// <summary>
        /// 根据用户ID获取50像素的图片URL
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        public static string GetUserFaceUrl50(int userId)
        {
            int i = default(int);
            int j = default(int);
            string extension = string.Empty;

            i = userId / 10000;
            j = (i + 1) * 10000;
            DateTime dt = DateTime.Now;
            string date = dt.Year.ToString() + dt.Month + dt.Day + dt.Hour + dt.Minute + dt.Second + dt.Millisecond;//解决头像缓存问题
            string url = string.Format("http://i0.szhomeimg.com/uploadfiles/sign/50/{0}/{1}.jpg?t={2}", j.ToString(), userId.ToString(), date);
            return url;
        }
    }
}
