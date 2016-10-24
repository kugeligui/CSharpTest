using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace TileConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            string imageFile = @"D:\data\ditu\PNG\00总图.png";
            //假设一个单位像素是1m            
            LatLng startPoint = new LatLng(0, 0);   //图片左上角对应的经纬度
            int perPixelMeter = 1;  //单位像素为物理距离1米
            string outFolder = @"D:\data\ditu\";

            //单位像素对应地图的举例
            Size tileSize = new Size(256, 256); //瓦片大小
            Image image = Image.FromFile(imageFile);
            Size imageSize = image.Size;
            Size LtileSize = new Size(imageSize.Width * perPixelMeter, imageSize.Height * perPixelMeter);    //瓦片所包含的实际宽高
            Point cutCenter = new Point(0, 0);
            int x0 = cutCenter.X;
            int y0 = cutCenter.Y;

            int minZoom = 15;    //缩放级别
            int maxZoom = 16;
            for (int zoom = minZoom; zoom <= maxZoom; zoom++)
            {
                int zoomMeter = GetMeterZoom(zoom);
                int resolution = zoomMeter * perPixelMeter;
                //地图/图片比
                int scale = imageSize.Width % zoomMeter;
                int colCount = LtileSize.Width % zoomMeter;
                int rowCount = LtileSize.Height % zoomMeter;
                //从列到行生成图片
                for (int colNum = 0; colNum < colCount; colNum++)
                {
                    for (int rowNum = 0; rowNum < rowCount; rowNum++)
                    {
                        string saveFilePath = outFolder + string.Format(@"{0}\{1}\{2}.png", zoom, colNum, rowNum);
                        int spaceX = colNum * scale * tileSize.Width;
                        int spaceY = rowNum * scale * tileSize.Height;
                        //要切图的原图
                        CaptureImage(ScaleImage(image, scale), saveFilePath, tileSize.Width, tileSize.Height, spaceX, spaceY);
                    }
                }
                //如果当前比例小于图片
                //int col = Math.Floor((x0 - x) / (tileSize.Width * perPixelMeter));
                //int row = Math.Floor((y0 - y) / (tileSize.Height * perPixelMeter));
                //if (zoomMeter >)
            }
        }

        /// <summary>
        /// 根据缩放比例获取尺寸
        /// </summary>
        /// <param name="zoom">缩放级别</param>
        /// <returns></returns>
        private static int GetMeterZoom(int zoom)
        {
            switch (zoom)
            {
                case 1:
                    return 5000 * 1000;
                case 2:
                    return 3000 * 1000;
                case 3:
                    return 1000 * 1000;
                case 4:
                    return 500 * 1000;
                case 5:
                    return 200 * 1000;
                case 6:
                    return 100 * 1000;
                case 7:
                    return 50 * 1000;
                case 8:
                    return 30 * 1000;
                case 9:
                    return 10 * 1000;
                case 10:
                    return 5 * 1000;
                case 11:
                    return 3 * 1000;
                case 12:
                    return 2 * 1000;
                case 13:
                    return 1000;
                case 14:
                    return 500;
                case 15:
                    return 200;
                case 16:
                    return 100;
                case 17:
                    return 50;
                case 18:
                    return 30;
                case 19:
                    return 10;
                case 20:
                    return 5;
                default: return 1000;
            }
        }

        /// <summary>
        /// 获取缩小后的图片
        /// </summary>
        /// <param name="bm">要缩小的图片</param>
        /// <param name="scale">要缩小的比例</param>
        /// <returns></returns>
        private static Image ScaleImage(Image bm, double scale)
        {
            int nowWidth = (int)Math.Ceiling(bm.Width / scale);
            int nowHeight = (int)Math.Ceiling(bm.Height / scale);
            Image newbm = new Bitmap(nowWidth, nowHeight);//新建一个放大后大小的图片
            if (scale >= 1 && scale <= 1.1)
            {
                newbm = bm;
            }
            else
            {
                Graphics g = Graphics.FromImage(newbm);
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.SmoothingMode = SmoothingMode.HighQuality;
                g.CompositingQuality = CompositingQuality.HighQuality;
                g.DrawImage(bm, new Rectangle(0, 0, nowWidth, nowHeight), new Rectangle(0, 0, bm.Width, bm.Height), GraphicsUnit.Pixel);
                g.Dispose();
            }
            return newbm;
        }

        ///   <summary>   
        ///   从图片中截取部分生成新图   
        ///   </summary>   
        ///   <param   name= "sourceImage">原始图片 </param>   
        ///   <param   name= "saveFilePath">生成新图 </param>   
        ///   <param   name= "width">截取图片宽度 </param>   
        ///   <param   name= "height">截取图片高度 </param>   
        ///   <param   name= "spaceX">截图图片X坐标 </param>   
        ///   <param   name= "spaceY">截取图片Y坐标 </param>   
        public static void CaptureImage(Image sourceImage, string saveFilePath, int width, int height, int spaceX, int spaceY)
        {
            //载入底图
            int x = 0;   //截取X坐标   
            int y = 0;   //截取Y坐标   
                         //原图宽与生成图片宽   之差       
                         //当小于0(即原图宽小于要生成的图)时，新图宽度为较小者   即原图宽度   X坐标则为0     
                         //当大于0(即原图宽大于要生成的图)时，新图宽度为设置值   即width         X坐标则为   sX与spaceX之间较小者   
                         //Y方向同理
            int sX = sourceImage.Width - width;
            int sY = sourceImage.Height - height;
            if (sX > 0)
            {
                x = sX > spaceX ? spaceX : sX;
            }
            else
            {
                width = sourceImage.Width;
            }
            if (sY > 0)
            {
                y = sY > spaceY ? spaceY : sY;
            }
            else
            {
                height = sourceImage.Height;
            }

            //创建新图位图   
            Bitmap bitmap = new Bitmap(width, height);
            //创建作图区域   
            Graphics graphic = Graphics.FromImage(bitmap);
            //截取原图相应区域写入作图区   
            graphic.DrawImage(sourceImage, 0, 0, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);
            //从作图区生成新图   
            Image saveImage = Image.FromHbitmap(bitmap.GetHbitmap());
            string path = Path.GetDirectoryName(saveFilePath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            //保存图象   
            saveImage.Save(saveFilePath, ImageFormat.Png);
            //释放资源   
            saveImage.Dispose();
            bitmap.Dispose();
            graphic.Dispose();
        }
    }
}
