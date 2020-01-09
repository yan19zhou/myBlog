using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 结构
{   
    // 声明结构
    public struct Person
    {
        public string _name;
        public int _age;
        public Gender _gender;
    }
    // 定义Gender枚举类型
    public enum Gender
    {
        male,
        female
    }
    class Program
    {
        static void Main(string[] args)
        {
            // 给结构赋值
            Person person;
            person._name = "lisa";
            person._age = 25;
            person._gender = Gender.female;
            Console.WriteLine(person._name);
            Console.ReadKey();
        }
    }
}
