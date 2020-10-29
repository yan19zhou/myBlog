using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    // 在命名空间下声明枚举
    //public enum Gender{female,male};
    public enum QState { onLine, offLine, Leave, Busy, QMe }
    class Program
    {
        static void Main(string[] args)
        {

            //1. 控制台输入，数组定义及字符串分割，占位符练习

            //Console.WriteLine("please write your name,age,sex");
            //String info = Console.ReadLine();
            //String[] arr = info.Split(' ');
            //Console.WriteLine("my name is {0},  {1} years old,I am a {2}", arr[0], arr[1], arr[2]);
            //Console.ReadKey();

            //2. 类型转换，类型兼容 double int
            // 从小转大 --隐式转换
            // 从大转小 --显式转换

            //int n1 = 30;
            //int n2 = 7;
            //double d = n1*1.0 / n2; // 1.0用于将int类型转换为double类型
            //int f = (int)d; //把double类型转换成int类型
            //Console.WriteLine("{0:0.00}",d);// 占位符意思是保留两位小数点
            //Console.ReadKey();

            // 如果类型兼容可以用隐式或者显式类型转换，如果不兼容可以用convert类型工厂来进行转换，如string转int或double

            //string s = "122";
            //double d = Convert.ToDouble(s);
            //Console.WriteLine(d);
            //Console.ReadKey();

            //Console.WriteLine("input student's name and score");
            //string score = Console.ReadLine();
            //string[] arr = score.Split(' ');

            //double chinese = Convert.ToDouble(arr[0]);
            //double english = Convert.ToDouble(arr[1]);
            //double math = Convert.ToDouble(arr[2]);
            //Console.WriteLine("chinese:{0}，english：{1}，math：{2}", chinese, english, math);
            //Console.ReadKey();
            //int i = 1;

            //while (i <= 5)
            //{
            //    int j = 1;
            //    while (j <= 4)
            //    {
            //        Console.WriteLine("i is {0} j is {1}",i,j);

            //        j++;
            //    }
            //    i++;
            //}
            //Console.ReadKey();

            Console.WriteLine("input your state in 1--online 2--offline 3--leave");
            string input = Console.ReadLine();
            switch (input)
            {
                case "0":
                    QState s1 = (QState)Enum.Parse(typeof(QState), input);
                    Console.WriteLine(s1);
                    break;
                case "1":
                    QState s2 = (QState)Enum.Parse(typeof(QState), input);
                    Console.WriteLine(s2);
                    break;
                case "2":
                    QState s3 = (QState)Enum.Parse(typeof(QState), input);
                    Console.WriteLine(s3);
                    break;
                case "3":
                    QState s4 = (QState)Enum.Parse(typeof(QState), input);
                    Console.WriteLine(s4);
                    break;
            }

            Console.ReadKey();
        }
    }
}
