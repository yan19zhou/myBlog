using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 方法
{
    class Program
    {
        static void Main(string[] args)
        {
            // 获取最大值
            //int max = GetMax(60, 20);
            //  Console.WriteLine(max);
            //  Console.ReadKey();

            // 第2题
            // Console.WriteLine("please input a num:");
            // string s = Console.ReadLine();
            //int i = getNum(s);
            // Console.WriteLine(i);
            // Console.ReadKey();

            // 第3题
            //int[] arr = { 5, 6, 4, 10, 22 };
            //int sum = GetArraySum(arr);
            //Console.WriteLine(sum);
            //Console.ReadKey();

            //

            string s = Console.ReadLine();
            GetString(s);


        }
        /// <summary>
        /// get num for max one
        /// </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public static int GetMax(int a, int b)
        {
            return a >= b ? a : b;
        }

        private static int GetSum(int a, int b)
        {
            return a + b;
        }
        /// <summary>
        /// 第3题获取输入数组的和
        /// </summary>
        /// <param name="arr">传入的值</param>
        /// <returns>sum</returns>
        #region
        public static int GetArraySum(int[] arr)
        {
            int sum = 0;
            for (int i = 0; i < arr.Length; i++)
            {
                sum += arr[i];
            }
            return sum;
        }
        #endregion
        /// <summary>
        /// 第2题获取输入的值是数字则返回，如果不是则重新输入
        /// </summary>
        /// <param name="input">获取的输入值</param>
        /// <returns>如果可以转换成数字则返回</returns>
        /// 
        #region
        public static int getNum(string input)
        {
            while (true)
            {
                try
                {
                    int num = Convert.ToInt32(input);
                    return num;
                }
                catch
                {
                    Console.WriteLine("must input a num ,please input it again");
                    input = Console.ReadLine();
                }

            }
        }
        #endregion
        public static void GetString(string s)
        {
            bool b = isYN(s);
            while (!b)
            {
                s = Console.ReadLine();
                b = isYN(s);
                Console.WriteLine("input it again");
            }
            Console.WriteLine("visiable the right:" + s);
            Console.ReadKey();
        }
        public static bool isYN(string s)
        {
            if (s == 'y'.ToString() || s == 'n'.ToString())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
