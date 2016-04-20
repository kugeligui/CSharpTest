using System.Collections.Generic;
using System.Security.Claims;
using System.Web.Http;
using SZHome.OAuth2.BLL;

namespace SZHome.OAuth2.HostWeb.OpenAPI
{
    public class UserController : ApiController
    {
        //[Route("test")]
        //public IHttpActionResult Get()
        //{
        //    var caller = User as ClaimsPrincipal;
        //    var subjectClaim = caller.FindFirst("sub");
        //    if (subjectClaim != null)
        //    {
        //        return Json(new
        //        {
        //            message = "请求成功",
        //            client = caller.FindFirst("client_id").Value,
        //            user = subjectClaim.Value,
        //            exp = caller.FindFirst("exp").Value
        //        });
        //    }
        //    else
        //    {
        //        return Json(new
        //        {
        //            message = "OK computer",
        //            client = caller.FindFirst("client_id").Value
        //        });
        //    }
        //}

        [Route("get_user_info")]
        public IHttpActionResult GetUserInfo()
        {
            var caller = User as ClaimsPrincipal;
            var clientId = caller.FindFirst("client_id").Value;
            var subjectClaim = caller.FindFirst("sub");
            if (subjectClaim != null)
            {
                var userIds = subjectClaim.Value;
                int userId = 0;
                if (int.TryParse(userIds, out userId))
                {
                    var user = BBSUserBLL.GetById(userId);
                    if (user != null)
                    {
                        Dictionary<string, object> dict = new Dictionary<string, object>();
                        dict["userId"] = user.id;
                        dict["userName"] = user.username;
                        dict["sign"] = user.Sign;
                        dict["userface"] = Common.CommonHelper.GetUserFaceUrl100(userId);
                        return Json(dict);
                    }
                }
            }
            return Json(new
            {
                message = "user not found"
            });
        }
    }
}
