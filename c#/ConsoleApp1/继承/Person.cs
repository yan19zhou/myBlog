using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 继承
{
    partial class Person
    {
        private string _name;
        public string Name { get => _name; set => _name = value; }
        private int _age;
        public int Age { get => _age; set => _age = value; }
        private char _gender;
        public char Gender { get => _gender; set => _gender = value; }

        public Person(string name,int age,char gender)
        {
            this.Name = name;
            this.Age = age;
            this.Gender = gender;
        }
        public Person(string name):this(name,0,' ')
        {
            
        }
        public void Eat()
        {
            Console.WriteLine("Eat food");
        }

    }
}
