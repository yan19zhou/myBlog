using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 高级参数
{
    class Program56
    {
        /// <summary>
        /// out ref params 三个高级参数
        /// </summary>
        /// <param name="args"></param>
        /// 
        static void Main(string[] args)
        {
            // 实现int.TryParse
            #region
            //string s = Console.ReadLine();
            //int num;
            //bool b = TryParse(s,out num );
            //Console.WriteLine(b);
            //Console.WriteLine(num);
            //Console.ReadKey();
            #endregion
            // ref
            //int salary = 5000;
            //add(ref salary);
            //Console.WriteLine(salary);
            //Console.ReadKey();

            // params
           // double[] arr = { 5.8, 460, 678, 12.5 };
            double d = PSum(814,135.54,549.24,11.11);
            Console.WriteLine(d);
            Console.ReadKey();
        }

        /// <summary>
        /// 实现int.TryParse
        /// </summary>
        /// <param name="s">传入需要转换的值</param>
        /// <param name="num">多余返回的值</param>
        /// <returns>返回的bool类型值</returns>
        public static bool TryParse(string s, out int num)
        {
            try
            {
                num = Convert.ToInt32(s);
                return true;
            }
            catch
            {
                num = 0;
                return false;
            }
        }
        /// <summary>
        /// ref参数的应用 可以把变量带到方法中改变
        /// </summary>
        /// <param name="i">传入的参数</param>
        public static void add(ref int i)
        {
            i += 500;
        }

        /// <summary>
        /// params可以把实参列表中和params形参数组类型相同的实参当成数组元素来处理
        /// params参数必须为方法最后一个参数
        /// </summary>
        /// <param name="score">传入数组</param>
        /// <returns>返回的成绩总和</returns>
        public static double PSum(params double [] score)
        {
            double sum = 0;
            for(int i = 0; i < score.Length; i++)
            {
                sum += score[i];
            }
            return sum;
        }

        //

    }
}
