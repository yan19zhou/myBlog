##### 基础概念
    1.C# 是大小写敏感的。
    2.所有的语句和表达式必须以分号（;）结尾。
    3.程序的执行从 Main 方法开始。
    4.与 Java 不同的是，文件名可以不同于类的名称。
    5.console.writeLine()控制台打印
##### 继承
    public shape{
        //基类
    }
    public extends ： shape{
        // 派生类 派生类继承基类的变量和方法
    }
##### 多态 
    一个接口实现多种功能
##### 静态多态：
    函数重载，函数名相同，返回不同或参数数量不同，传入不同的参数时执行不同的函数，返回不同的结果；
##### 动态多态性
    抽象类 abstract  虚方法 virtual 派生类中方法重写 override
    抽象方法和虚方法的区别
    abstract public int area(); // 抽象方法中不能写代码
    public virtual int getArea(){ //....}  虚方法中可以写代码
    
    namespace InheritanceApplication
    {
        class Shape
        {
            public int width, height;
            public Shape (int w ,int h)
            {
                width = w;
                height = h;
            }
            public virtual int getArea()
            {
                Console.WriteLine("基类面积");
                return 0;
            }
        }
        class Rectangle : Shape
        {
        public Rectangle(int w, int h) : base(w, h)
            {

            }
            public override int getArea()
            {

                return width * height;
            }
        }
        class Triangle:Shape
        {
            public Triangle (int w, int h) : base(w, h)
            {

            }
            public override int getArea()
            {
                return width * height / 2;
            }
        }
        class Caller {
            public void getCaller(Shape sh)
            {
                int a = sh.getArea();
                Console.WriteLine("面积：{0}", a);
            }
        }

        class printData
        {
            static void Main(string[] args)
            {
                Rectangle r = new Rectangle(10, 20);
                Triangle t = new Triangle(5, 6);
                Caller c = new Caller();
                c.getCaller(r);
                c.getCaller(t);
                Console.ReadLine();
            }
        }
    }

#### 运算符重载
重载运算符是具有特殊名称的函数，是通过关键字 operator 后跟运算符的符号来定义的

    public static Box operator+ (Box b, Box c)
            {
            Box box = new Box();
            box.length = b.length + c.length;
            box.breadth = b.breadth + c.breadth;
            box.height = b.height + c.height;
            return box;
            }

可被重载的运算符：

    +, -, !, ~, ++, --	这些一元运算符只有一个操作数，且可以被重载。
    +, -, *, /, %	这些二元运算符带有两个操作数，且可以被重载。
    ==, !=, <, >, <=, >=	这些比较运算符可以被重载。

##### 接口
修饰符：interface ，接口类只负责成员的声明，成员的定义是派生类的责任；
    using System;

    interface IMyInterface
    {
            // 接口成员
        void MethodToImplement();
    }

    class InterfaceImplementer : IMyInterface
    {
        static void Main()
        {
            InterfaceImplementer iImp = new InterfaceImplementer();
            iImp.MethodToImplement();
        }

        public void MethodToImplement()
        {
            Console.WriteLine("MethodToImplement() called.");
        }
    }

##### 命名空间
    嵌套命名空间
        namespace namespace_name1 
    {
    // 代码声明
    namespace namespace_name2 
    {
        // 代码声明
    }
    }
    使用using指令，在使用的时候就可以不用加上命名空间名称

