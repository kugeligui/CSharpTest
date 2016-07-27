using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TFWConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("请依次输入图片的x,y像素：");
            string xy = Console.ReadLine();
            string[] cols = xy.Split(',', ' ');
            int x = Convert.ToInt32(cols[0]);
            int y = Convert.ToInt32(cols[1]);
            Console.Write("请依次输入距离的x,y：");
            string xyc = Console.ReadLine();
            string[] cols2 = xyc.Split(',', ' ');
            int xc = Convert.ToInt32(cols[0]);
            int yc = Convert.ToInt32(cols[1]);

            int B,D;
        }
    }
}
