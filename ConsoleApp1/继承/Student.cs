using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 继承
{
    class Student:Person
    {
        private string _id;
        public string Id { get => _id; set => _id = value; }
        public Student(string name,string id):base(name)
        {
            this.Name = name;
            this.Id = id;
        }
        public void GetID()
        {
            Console.WriteLine("{0} ID is {1}",this.Name,this.Id);
        }
    }
}
