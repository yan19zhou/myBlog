using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 继承
{
    class Teacher:Person
    {
        private string _work;

        public string Work { get => _work; set => _work = value; }
        public Teacher(string name,int age,char gender,string work):base(name,age,gender)
        {
            this.Work = work;
        }
        public void SayHello()
        {
            Console.WriteLine("my name is {0},i am {1} years old, i'm {2},i'm a {3}", this.Name, this.Age, this.Gender, this.Work);
        }
    }
}
