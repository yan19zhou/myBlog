using System;

namespace OOB
{
  public  class Person
    {
        private string _name;
        private int _age;
        private char _gender;

        public Person(string name, int age, char gender, int score)
        {
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.score = score;
        }

        public Person(string name, int age, char gender) : this(name, age, gender, 0)
        {

        }

        public string name
        {
            set
            {

                _name = value;
            }
            get { return _name; }
        }

        public int age
        {
            set
            {
                if (value < 0 || value > 120)
                {
                    value = 0;
                }
                _age = value;
            }
            get { return _age; }
        }

        public char gender
        {
            set
            {
                if (value != '男' && value != '女')
                {
                    value = '男';
                }
                _gender = value;
            }
            get { return _gender; }
        }


        private int _score;
        public int score { get => _score; set => _score = value; }

        public void GetInfo()
        {

            Console.WriteLine("name:{0},age:{1},gender:{2}", this.name, this.age, this.gender);
        }
    }
}
