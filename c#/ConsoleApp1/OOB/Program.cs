using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOB
{
    class Program
    {
        static void Main(string[] args)
        {
            Person person = new Person("张合",28,'女');
            person.GetInfo();
            Console.ReadKey();
        }
    }
}
