using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 递归
{
    class Program
    {
        public static int i = 0;
        static void Main(string[] args)
        {
            Recursion();
            Console.ReadKey();
        }
        /// <summary>
        /// 递归即是方法自己调用自己，但是要设定一个条件使之跳出递归，否则会无限循环
        /// </summary>
        public static void Recursion()
        {
            
            Console.WriteLine("try a recursion...");
            Console.WriteLine("try a recursion again...");
            i++;
            if (i >= 5)
            {
                return;
            }
            Recursion();
        }
    }
}
