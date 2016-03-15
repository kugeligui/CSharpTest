using System.Collections.Generic;

namespace WebTest.Models
{
    /// <summary>
    /// 办证登记点
    /// </summary>
    public class Registration
    {
        public int registrationAreaOid { get; set; }

        public IEnumerable<RegistrationInfo> labelList { get; set; }
    }
}