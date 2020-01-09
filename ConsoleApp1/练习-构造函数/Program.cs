using System;
using System.IO;
using System.Text;
using OOB;
namespace 练习_构造函数
{
    class Program
    {
        static void Main(string[] args)
        {
            //Total t = new Total(150);
            //t.GetToatal();
            //Console.ReadKey();
            //  GetString();
            GetIndex();
        }
        static void GetString()
        {
            string path = @"C:\Users\Administrator\Desktop\tx.txt";
            string[] contents = File.ReadAllLines(path, Encoding.Default);
            string[] str;
            for (int i = 0; i < contents.Length; i++)
            {
                string[] temp = contents[i].Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                string item = temp[0] + '|' + temp[1];
                Console.WriteLine(item);
            }
            Console.ReadKey();
        }
        static void GetIndex()
        {
            string str = "efomelanfoinfalenklhoiheqnlfdasnfoew";
            int index = str.IndexOf('e');
            int count = 0;
            while (index != -1)
            {
                count++;
                index = str.IndexOf('e', index + 1);
                if(index!=-1)
                Console.WriteLine("the {0} index is {1}", count, index);
            }
            Console.ReadKey();
        }
    }
}
