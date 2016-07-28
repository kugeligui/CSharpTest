namespace TileConsole
{
    public class LatLng
    {
        /// <summary>
        /// 经纬度
        /// </summary>
        /// <param name="lat">经度</param>
        /// <param name="lng">纬度</param>
        public LatLng(double lat, double lng)
        {
            Lat = lat;
            lng = lng;
        }

        /// <summary>
        /// 经度
        /// </summary>
        public double Lat { get; set; }

        /// <summary>
        /// 纬度
        /// </summary>
        public double Lng { get; set; }
    }
}
