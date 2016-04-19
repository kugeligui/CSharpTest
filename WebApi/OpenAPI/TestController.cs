﻿using System.Security.Claims;
using System.Web.Http;

namespace WebApi.OpenAPI
{
    public class TestController : ApiController
    {
        [Route("test")]
        public IHttpActionResult Get()
        {
            var caller = User as ClaimsPrincipal;
            var subjectClaim = caller.FindFirst("sub");
            if (subjectClaim != null)
            {
                return Json(new
                {
                    message = "OK user",
                    client = caller.FindFirst("client_id").Value,
                    subject = subjectClaim.Value
                });
            }
            else
            {
                return Json(new
                {
                    message = "OK computer",
                    client = caller.FindFirst("client_id").Value
                });
            }
        }
    }
}
