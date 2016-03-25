using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Enums
    {
        private static IDictionary<Business, IDictionary<Service, string>> _itemNo;

        /// <summary>
        /// 项目号
        /// </summary>
        public static IDictionary<Business, IDictionary<Service, string>> ItemNo
        {
            get
            {
                if (_itemNo == null)
                {
                    Dictionary<Business, IDictionary<Service, string>> dict = new Dictionary<Business, IDictionary<Service, string>>();
                    Dictionary<Service, string> dict1 = new Dictionary<Service, string>();
                    dict1[Service.领取不动产权证书及登记证明] = "FZ20150730";
                    dict[Business.领证业务类] = dict1;

                    Dictionary<Service, string> dict2 = new Dictionary<Service, string>();
                    dict2[Service.房地产现楼抵押权登记] = "30004200169555062213440300";
                    dict2[Service.一般抵押权转移登记] = "30004200669555062213440300";
                    dict2[Service.一般抵押权变更登记] = "30004200569555062213440300";
                    dict2[Service.最高额抵押权确定登记] = "30041100469555062213440300";
                    dict2[Service.最高额抵押权转移登记] = "30004200869555062213440300";
                    dict2[Service.最高额抵押权变更登记] = "30004200769555062213440300";
                    dict[Business.房地产抵押业务类] = dict2;

                    Dictionary<Service, string> dict3 = new Dictionary<Service, string>();
                    dict3[Service.抵押权注销登记] = "30156000169555062213440300";
                    dict[Business.房地产注销抵押业务类] = dict3;

                    Dictionary<Service, string> dict4 = new Dictionary<Service, string>();
                    dict4[Service.二手商品房转移登记] = "30128300369555062213440300";
                    dict[Business.二手商品房转移业务类] = dict4;

                    Dictionary<Service, string> dict5 = new Dictionary<Service, string>();
                    dict5[Service.房地产预售合同备案] = "30128500269555062213440300";
                    dict[Business.预售合同备案业务类] = dict5;

                    Dictionary<Service, string> dict6 = new Dictionary<Service, string>();
                    dict6[Service.一手商品房转移登记] = "30162600169555062213440300";
                    dict[Business.一手商品房转移业务类] = dict6;

                    Dictionary<Service, string> dict7 = new Dictionary<Service, string>();
                    dict7[Service.预售房地产抵押登记] = "30004200369555062213440300";
                    dict[Business.预售房地产抵押业务类] = dict7;

                    Dictionary<Service, string> dict8 = new Dictionary<Service, string>();
                    dict8[Service.房地产变更登记] = "30162300169555062213440300";
                    dict8[Service.安居房换证登记] = "30162300369555062213440300";
                    dict8[Service.工业楼宇分割登记] = "30162301069555062213440300";
                    dict8[Service.土地使用权初始登记] = "30005200169555062213440300";
                    dict8[Service.房地产初始登记] = "30162400169555062213440300";
                    dict8[Service.两规处理房地产权登记] = "30162400269555062213440300";
                    dict8[Service.房地产登记历史遗留问题处理] = "30162400469555062213440300";
                    dict8[Service.拆迁赔偿房转移登记] = "30162600369555062213440300";
                    dict8[Service.集资房转移登记] = "30162600569555062213440300";
                    dict8[Service.政策性住房转移登记] = "30162600469555062213440300";
                    dict8[Service.工业楼宇二级转移登记] = "30162600669555062213440300";
                    dict8[Service.继承的房地产登记] = "30128300469555062213440300";
                    dict8[Service.交换的房地产登记] = "30128300569555062213440300";
                    dict8[Service.赠与的房地产登记] = "30128300669555062213440300";
                    dict8[Service.依生效法律文书办理的房地产转移登记] = "30128300769555062213440300";
                    dict8[Service.财产分割登记] = "30128300869555062213440300";
                    dict8[Service.土地使用权转移登记] = "30128300969555062213440300";
                    dict8[Service.工业楼宇三级转移登记] = "30128301069555062213440300";
                    dict8[Service.房地产注销登记] = "30128900169555062213440300";
                    dict8[Service.更正登记] = "30162700169555062213440300";
                    dict8[Service.预告登记] = "30128400169555062213440300";
                    dict8[Service.注销预告登记] = "30128400369555062213440300";
                    dict8[Service.地役权登记] = "30156500169555062213440300";
                    dict8[Service.注销地役权登记] = "30156500369555062213440300";
                    dict8[Service.异议登记] = "30001400169555062213440300";
                    dict8[Service.注销异议登记] = "30001400469555062213440300";
                    dict8[Service.房地产证灭失补发登记] = "30128800169555062213440300";
                    dict8[Service.房地产预售合同备案解除] = "30128500169555062213440300";
                    dict8[Service.海上构筑物初始登记] = "30068700169555062213440300";
                    dict8[Service.海上构筑物转移登记] = "30069400169555062213440300";
                    dict8[Service.海上构筑物变更登记] = "30068600169555062213440300";
                    dict8[Service.海上构筑物注销登记] = "30069300169555062213440300";
                    dict8[Service.海上构筑物更正登记] = "30068900169555062213440300";
                    dict8[Service.海上构筑物抵押登记] = "30068800169555062213440300";
                    dict8[Service.海上构筑物预告登记] = "30069100169555062213440300";
                    dict8[Service.海上构筑物异议登记] = "30069000169555062213440300";
                    dict8[Service.海上构筑物证书灭失补发登记] = "30069200169555062213440300";
                    dict[Business.领证业务类] = dict8;

                    _itemNo = dict;
                }
                return _itemNo;
            }
        }

     

        /// <summary>
        /// 业务
        /// </summary>
        public enum Business
        {
            领证业务类,
            房地产抵押业务类,
            房地产注销抵押业务类,
            二手商品房转移业务类,
            预售合同备案业务类,
            一手商品房转移业务类,
            预售房地产抵押业务类,
            初始_变更及其它业务类
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

        /// <summary>
        /// 服务
        /// </summary>
        public enum Service
        {
            //领证业务类
            领取不动产权证书及登记证明,

            //房地产抵押业务类
            房地产现楼抵押权登记,
            一般抵押权转移登记,
            一般抵押权变更登记,
            最高额抵押权确定登记,
            最高额抵押权转移登记,
            最高额抵押权变更登记,

            //房地产注销抵押业务类
            抵押权注销登记,

            //二手商品房转移业务类
            /// <summary>
            /// （二手房买卖）
            /// </summary>
            二手商品房转移登记,

            //预售合同备案业务类
            房地产预售合同备案,

            //一手商品房转移业务类
            /// <summary>
            /// （一手房买卖）
            /// </summary>
            一手商品房转移登记,

            //预售房地产抵押业务类
            /// <summary>
            /// （楼花抵押）
            /// </summary>
            预售房地产抵押登记,

            //初始、变更及其它业务类
            房地产变更登记,
            安居房换证登记,
            工业楼宇分割登记,
            土地使用权初始登记,
            房地产初始登记,
            /// <summary>
            /// “两规”处理房地产权登记
            /// </summary>
            两规处理房地产权登记,
            房地产登记历史遗留问题处理,
            拆迁赔偿房转移登记,
            集资房转移登记,
            政策性住房转移登记,
            工业楼宇二级转移登记,
            继承的房地产登记,
            交换的房地产登记,
            赠与的房地产登记,
            /// <summary>
            /// 依生效法律文书办理的房地产转移登记（法院强制过户）
            /// </summary>
            依生效法律文书办理的房地产转移登记,
            财产分割登记,
            土地使用权转移登记,
            工业楼宇三级转移登记,
            房地产注销登记,
            更正登记,
            预告登记,
            注销预告登记,
            地役权登记,
            注销地役权登记,
            异议登记,
            注销异议登记,
            房地产证灭失补发登记,
            房地产预售合同备案解除,
            海上构筑物初始登记,
            海上构筑物转移登记,
            海上构筑物变更登记,
            海上构筑物注销登记,
            海上构筑物更正登记,
            海上构筑物抵押登记,
            海上构筑物预告登记,
            海上构筑物异议登记,
            海上构筑物证书灭失补发登记
        }

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
    }
}
