using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 继承
{
    class Program
    {
        static void Main(string[] args)
        {
            //Student st = new Student("zhanli", "24");
            //st.GetID();
            //父类--子类 || 基类--派生类
            //子类能继承父类的属性和方法，不能继承父类的私有字段。能看到，但是不能用。
	           // 子类没有继承父类的构造函数，但是创建子类对象的时候默认调用父类的无参构造函数，创建父类对象，让子类可以调用父类的成员
            //    所有如果父类重写了一个有参数的构造函数，那么子类就掉不到父类成员了，就会报错，解决方法：
	           // 1.父类再写一个无参构造函数

            //    2.子类构造函数调用父类的：base();

            //            继承的特效：
	           // 1.但根性：子类只能继承一个父类

            //    2.传递性：祖父-- > 父-- > 子


            //    new关键字：
	           // 1.创建对象

            //    2.隐藏从父类继承过来的同名成员，这样子类就调用不到父类的同名成员了

            //Teacher te = new Teacher("zhangli", 23, '女', "教师");
            //te.SayHello();

            //1.子类可以赋值给父类(如果有一个方法需要传一个父类对象，我们可以传第一个子类对象)
            //2.如果一个父类中装的是子类对象，则可以把这个父类强转为子类对象
            // 使用is as 进行转换

            //使用is转换

            Parent p = new Son();
            //if(p is Son)
            //{
            //    ((Son)p).sayHello01();
            //}
            //else
            //{
            //    Console.WriteLine("fail");
            //}

            // 使用as转换
            //Son ss = p as Son;
            //ss.sayHello01();
           

            //复习汇总：

            
        }
    }

    class Parent
    {
        public void sayHello()
        {
            Console.WriteLine("Hello from Parent");
        }
    }

    class Son:Parent
    {
        public void sayHello01()
        {
            Console.WriteLine("Hello from Son");
        }
    }
}
