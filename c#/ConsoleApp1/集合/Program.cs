using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 集合
{
    class Program
    {
        static void Main(string[] args)
        {
            ///  集合

            //  数组集合
            ArrayList list = new ArrayList();
            //方法： Remove RemoveAt  RemoveRange Insert InsertRange Clear Reverse Sort

            // 键值对集合
            //方法：ContainsKey是否包含键x

            //Hashtable hashtable = new Hashtable();
            //hashtable.Add(1, "111");
            //hashtable.Add(2, "222");
            //foreach(var item in hashtable.Keys)
            //{
            //    Console.WriteLine("{0}------------{1}", item, hashtable[item]);
            //}

            // path 操作路径的字符串
            // 方法：Path.GetFullPath("");

            // File类 操作文件
            //方法： Create Delete Copy Move

            //byte[] vs = File.ReadAllBytes(@"C:\Users\Administrator\Desktop\tx.txt");
            //// 将字节数组中的每一个元素都按照我们制定的编码格式解码成字符串
            //string str = Encoding.Default.GetString(vs);
            //Console.WriteLine(str);
            //string st = "文化苦旅    余秋雨";
            //byte[] vd = Encoding.Default.GetBytes(st);
            //File.WriteAllBytes(@"C:\Users\Administrator\Desktop\tx.txt", vd);

            // list泛型集合
            //List<string> str = new List<string>();
            //str.AddRange(new string [] { "bili","xinhe","liucha"});
            //string[] ss = str.ToArray();// 集合转换成数组
            //for(int i = 0; i < ss.Length; i++)
            //{
            //    Console.WriteLine(ss[i]);
            //}
            //string[] str = new string[] { "bili", "xinhe", "liucha" };
            //List<string> ss = str.ToList();
            //ss.Add("AA");
            //ss.AddRange(new List<string> { "ddd", "ffff" });
            //foreach (string item in ss)
            //{
            //    Console.WriteLine(item);
            //}
            // 把一个int类型的集合中奇数和偶数分别放到两个集合，然后再拼成一个集合，奇数在左边，偶数在右边
            //List<int> arr = new List<int> { 48,35,42,45,33,24,11};
            //List<int> uneven = new List<int>();
            //List<int> even = new List<int>();
            //foreach(int item in arr)
            //{
            //    if (item % 2 == 0)
            //    {
            //        even.Add(item);
            //    }
            //    else
            //    {
            //        uneven.Add(item);
            //    }
            //}
            //uneven.AddRange(even);
            //foreach(int i in uneven)
            //{
            //    Console.Write(i+" ");
            //}
            // 提示用户输入一个字符串，再分解字符串到一个char数组
            //Console.WriteLine("Please input a string");
            //string str = Console.ReadLine();
            //char[] cArr = new char[str.Length];
            //int i=0;
            //foreach(char item in str)
            //{
            //    cArr[i] = item;
            //    i++;
            //}
            //for(int j = 0; j < cArr.Length; j++)
            //{
            //    Console.Write(cArr[j] + " ");
            //}
            // welcome to china 中每个字母出现的次数 不区分大小写
            //string str = "Welcome To China";
            //Hashtable t = new Hashtable();
            //foreach (char item in str)
            //{
            //    if (item != ' ')
            //    {
            //        string item1 = item.ToString().ToLower();

            //        if (!t.ContainsKey(item1))
            //        {
            //            t.Add(item1, 1);
            //        }
            //        else
            //        {
            //            t[item1] = (int)t[item1] + 1;
            //        }
            //    }
            //}

            //foreach (var i in t.Keys)
            //{
            //    Console.WriteLine("{0}:{1}", i, t[i]);
            //}
            Console.ReadKey();
        }
    }
}
