using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 方法_练习
{
    class Program
    {
        //static void Main(string[] args)
        //{
        //    Console.WriteLine("please input the first number ");
        //    string s1 = Console.ReadLine();
        //    Console.WriteLine("please input the second number ");
        //    string s2 = Console.ReadLine();
        //    int num1 = ConvertNum(s1);
        //    int num2 = ConvertNum(s2);
        //    Judge(ref num1, ref num2);
        //   int sum = GetSum(num1, num2);
        //    Console.WriteLine(sum);
        //    Console.ReadKey();
        //}
        // 1.提示输入两个数字

        //2.判断输入是否为数字，否则重新输入
        public static int ConvertNum(string s)
        {
            int num = 0;
            while (true)// 需要用来重复输入的功能则用循环
            {
                try
                {
                    //如果输入的是数字，正常转换
                    num = Convert.ToInt32(s);
                    return num;
                }
                catch
                {
                    // 如果输入非数字则重新提醒输入，并赋值给局部变量s

                    Console.WriteLine("must be a number,please input it again");
                    s = Console.ReadLine();
                }
            }
        }
        //3.判断第一个数字是否比第二个小
        public static void Judge(ref int n1, ref int n2)
        {
            while (true)
            {
                if (n1 < n2)
                {
                    // 符合条件则直接返回
                    return;
                }
                else
                {
                    // 不符合条件则重新输入
                    Console.WriteLine("the first one must less than the second one,please input the first again");
                    n1 = ConvertNum(Console.ReadLine());
                    Console.WriteLine("the second one");
                    n2 = ConvertNum(Console.ReadLine());

                }
            }

        }
        //4.计算第一个数字和第二个数字之间所有整数的和
        public static int GetSum(int n1,int n2)
        {

            int sum = 0;
            for (int i = n1; i < n2; i++)
            {
                sum += i;
            }
            return sum;
        }
    }
}
