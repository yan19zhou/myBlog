using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 方法_练习
{
    class 联系1
    {
        static void Main(string[] args)
        {
            #region 获取数组中最长的字符串
            //string[] str = { "普京","汤姆克鲁斯","哈姆雷特","让.菲尔普斯","奥德普诺夫斯基" };
            //string s = GetLonger(str);
            //Console.WriteLine(s);
            //Console.ReadKey();
            #endregion

            #region double类型保留两位小数
            //double d = 3.1415926535;

            //d = double.Parse(d.ToString("0.00"));
            //Console.WriteLine(d);
            //Console.ReadKey();
            #endregion
            #region 判断质数
            //Console.WriteLine("输入数字：");
            //string s = Console.ReadLine();
            //int n = Convert.ToInt32(s);
            //bool b =  IsPrimeNumber(n);
            //Console.WriteLine(b);
            //Console.ReadKey();
            #endregion

            #region 面积和周长
            //Console.WriteLine("input a num");
            //double d = Convert.ToDouble(Console.ReadLine());
            //double Dlong;
            //double S = GetCircle(d,out Dlong);
            //Console.WriteLine("面积为：{0}，周长为{1}", S, Dlong);
            //Console.ReadKey();
            #endregion

            #region 冒泡排序
            //int[] arr = { 45, 56, 60, 22, 48, 2, 180, 55, 96 };
            //Sort(arr);
            //for (int i = 0; i < arr.Length; i++)
            //{
            //    Console.WriteLine(arr[i]);
            //}
            //Console.ReadKey();
            #endregion

            string[] arr = { "语文","数学","英语","化学" };
            string str = Contact(arr);
            Console.WriteLine(str);
            Console.ReadKey();
        }


        /// <summary>
        /// 获取数组中最长的字符串
        /// </summary>
        /// <param name="arr">传入的数组</param>
        /// <returns>返回的对应元素</returns>
        public static string GetLonger(string[] arr)
        {
            string str = arr[0];

            for (int i = 0; i < arr.Length; i++)
            {
                if (str.Length < arr[i].Length)
                {
                    str = arr[i];
                }
            }
            return str;
        }
        /// <summary>
        /// 判断一个数是否为质数
        /// </summary>
        /// <param name="n">传入的数</param>
        /// <returns>返回bool</returns>
        public static bool IsPrimeNumber(int n)
        {
            for (int i = 2; i < n; i++)
            {
                if (n % i == 0)
                {
                    return false;
                }
            }
            return true;
        }

        /// <summary>
        /// 计算圆的面积和周长
        /// </summary>
        /// <param name="r"></param>
        /// <param name="Dlong"></param>
        /// <returns></returns>
        public static double GetCircle(double r, out double Dlong)
        {
            Dlong = 2 * 3.14 * r;
            return 3.14 * r * r;
        }

        /// <summary>
        /// 通过冒泡排序，对一个数组进行升序排列
        /// </summary>
        /// <param name="arr"></param>
        public static void Sort(int[] arr)
        {
            for (int i = 0; i < arr.Length - 1; i++)
            {
                for (int j = 0; j < arr.Length - 1 - i; j++)
                {
                    if (arr[j] > arr[j + 1])
                    {
                        int temp;
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }

        public static string Contact(params string [] arr)
        {
           string str = "";
            for(int i =0; i < arr.Length; i++)
            {
                if(i== arr.Length - 1)
                {
                    str += arr[i];
                }
                else
                {
                    str += arr[i] + '|';
                }
            }
            return str;
        }
    }
}
