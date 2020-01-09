1. region endregion定义折叠行# region
<!--  可以被折叠的代码 -->
# endregion
2. 快捷键
/// 用来解释类或方法
ctrl + k + d 快速对齐
ctrl + k + c 注释所选代码
ctrl + k + u 取消注释所选代码
ctrl + j 弹出代码提示
shift + end； shift + home选中当前行代码
f6 生成解决方案
f7查看代码
f5启动调试
f9切换断点
ctrl + shift + f9 删除全部断点
f10逐过程
ctrl + f10运行到光标处
f11逐语句

3. 占位符Console.WriteLine("输出第一个数字{0},输出第二个数字{1}，输出第三个数字{2}“,num1,num2,num3)
        // 多输出没效果，也不报错，少输出报异常

        4. 转义符： 由 '\'+特殊字符，组成的具有特殊意义的字符，
        如： 换行符：\ n， windows操作系统：\ r\ n 英文半角双引号：\ "
        tab符：\ t\ b： 退格键， 放在字符串的两边无效 @： 1. 取消\ 在字符串中的转义作用， 2. 将字符串按照原格式输出。

        5. 控制台输入， 数组定义及字符串分割， 占位符练习

        //Console.WriteLine("please write your name,age,sex");
        //String info = Console.ReadLine();
        //String[] arr = info.Split(' ');
        //Console.WriteLine("my name is {0},  {1} years old,I am a {2}", arr[0], arr[1], arr[2]);
        //Console.ReadKey();

6. 类型转换，
		 类型兼容 double int
         从小转大 --隐式转换
         从大转小 --显式转换

            //int n1 = 30;
            //int n2 = 7;
            //double d = n1*1.0 / n2; // 1.0用于将int类型转换为double类型
            //int f = (int)d; //把double类型转换成int类型
            //Console.WriteLine("{0:0.00}",d);// 占位符意思是保留两位小数点
            //Console.ReadKey();
           
          如果类型兼容可以用隐式或者显式类型转换，如果不兼容可以用convert类型工厂来进行转换，如string转int或double

            //string s = "122";
            //double d = Convert.ToDouble(s);
            //Console.WriteLine(d);
            //Console.ReadKey();
		  double类型保留两位小数：
			double d = "3.1415926";
			double.Parse(d.toString("0.00"));
			
7.运算符：一元运算符：++ -- : 前++ -- 先执行++ -- 再参与表达式运算，后++ -- 先执行表达式运算，再进行自己的++ --运算符
			ps：一元运算符的优先级高于+- * / 等二元运算符

          关系运算符：> < >= <= !=
		  逻辑运算符：&& || ！
		  复合赋值运算符：*= += -= /=

8.异常捕获： 异常：语法没有错误，程序在执行过程中发生错误

--------------------------------------------------------------------

9.常量：const 变量类型 变量名;
10.枚举：
	声明定义：[public] enum 枚举名{val1,val2,val3....} ps：在命名空间下面，类的上面声明 
	使用：枚举名 g = 枚举名.val1;
	example：
		public enum Gender{female,male};
		Gender gender = Gender.female;
	ps:enum类型可以跟int类型相互转换，枚举类型和int类型是兼容的。所有的类型都可以通过toString()转换成string类型。
		example：
				public enum QQstate{onLine,OffLine,QMe,Leave}
				int a = (int)QQstate.onLine;
				Console.writeLine(a); // 0

		string类型转换为枚举类型,通过Enum.parse来转换
		string a = "0";
		QQstate s = (QQstate)Enum.Parse(typeof(QQstate),a);
		
11.结构：
		可以一次性声明多个不同类型变量
		语法：[public] struct 结构名{
			[public] 字段类型 字段名; // 字段名前面要加_;
		}
		// 声明结构
			public struct Person
			{
				public string _name;
				public int _age;
				public Gender _gender;
			}
		使用：
		结构名 变量名;
		变量名.字段；
		// 给结构赋值
            Person person;
            person._name = "lisa";
            person._age = 25;
            person._gender = Gender.female;
			
12. 数组：
		定义： int[] arr1 = new int[10];
			   int[] arr2 = {1,2,3,4,5,6,7}
					
13.函数/方法： [public]  static 返回类型 方法名(){}
				方法要执行必须要在main()函数中调用，调用语法：类名.方法名();
				
14.高级参数
	out参数：表示方法多余返回的值
	example：public static void Test(int [] arr,out int max,out int min,out int sum ){
					// 方法中给out参数的值赋值
				}
	ref参数：能将一个变量带入参数内进行改变，然后将改变后的值带出
	example： int salary = 5000;
				Test(ref salary);
				public static void Test(ref int a){
					
				}
			ps:要求在方法外必须为其赋值，方法内可以不赋值；
	
	params：可变参数，将实参列表中跟数组参数类型一样的参数都当成数组的元素去处理；
			params可变参数数组必须是形参列表的最后一个


15.方法重载：方法的名称相同，参数不同
			方法的重载和返回值没有关系
			
16.方法的递归：自己调用自己，但是要有条件使之在条件之下脱离递归

17.类
	属性：保护字段，对字段的取值和赋值进行限定；
		  属性的本质就是两个方法：get(),set();

18.字段 属性；
		字段用来存放数据，字段必须是私有的，命名前面带_。属性用来操作字段，属性一般是共有的
		赋值时，通过属性给字段赋值
		example：
		private int _age;
		public int age{
			set{_age = value;} // 只有set称为只写属性
			get {return _age;} // 只有get称为只读属性
		}
		通过this.age调用属性
19：访问修饰符：
		public  ：公共的，哪里都可以访问
		private ：私有，

20.静态和非静态的区别：非静态类中：可以出现静态和非静态成员-- 非静态成员通过实例调用：实例.非静态成员(), 静态成员通过类名调用：类名.静态成员(); 
						静态类中 ：只可以出现静态成员， 静态成员通过类名调用：类名.静态成员();
					总结：静态成员必须通过类名调用，实例成员必须通过对象调用；
						  静态函数中只能访问静态成员，不能访问实例成员；
						  静态类中只能声明静态成员，不能声明实例成员；
						  静态类不能被实例化；
						  实例函数中既可以使用静态成员，也可以使用实例成员；

					使用：1.工具类可以封装成静态类；
						  2.静态类在整个项目中资源共享；	（内存中存储区域：堆 栈 静态存储区）
						  只有在程序结束，静态类才会释放资源；
						  
21.构造函数
	1.每个类自带一个无参构造函数
	2.实例化的时候会自动执行构造函数
	3.构造函数可重载
	4.构造函数无返回值
	
22：this
		// 当前类的对象
	    public Person(string name ,int age,char gender,int score)
        {
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.score = score;
        }

        //int n1 = 30;
        //int n2 = 7;
        //double d = n1*1.0 / n2; // 1.0用于将int类型转换为double类型
        //int f = (int)d; //把double类型转换成int类型
        //Console.WriteLine("{0:0.00}",d);// 占位符意思是保留两位小数点
        //Console.ReadKey();

        如果类型兼容可以用隐式或者显式类型转换， 如果不兼容可以用convert类型工厂来进行转换， 如string转int或double

        //string s = "122";
        //double d = Convert.ToDouble(s);
        //Console.WriteLine(d);
        //Console.ReadKey();
        double类型保留两位小数： double d = "3.1415926"; double.Parse(d.toString("0.00"));


        7. 运算符： 一元运算符：++ --: 前++ --先执行++ --再参与表达式运算， 后++ --先执行表达式运算， 再进行自己的++ --运算符 ps： 一元运算符的优先级高于 + - * / 等二元运算符

        关系运算符： > < >= <= !=
        逻辑运算符： && || ！
        复合赋值运算符： *= += -= /=

        8. 异常捕获： 异常： 语法没有错误， 程序在执行过程中发生错误

        -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

        9. 常量：
        const 变量类型 变量名; 10. 枚举： 声明定义：[public] enum 枚举名 { val1, val2, val3.... }
        ps： 在命名空间下面， 类的上面声明 使用： 枚举名 g = 枚举名.val1; example： public enum Gender { female, male }; Gender gender = Gender.female; ps: enum类型可以跟int类型相互转换， 枚举类型和int类型是兼容的。 所有的类型都可以通过toString() 转换成string类型。 example： public enum QQstate { onLine, OffLine, QMe, Leave }
        int a = (int) QQstate.onLine; Console.writeLine(a); // 0

        string类型转换为枚举类型, 通过Enum.parse来转换 string a = "0"; QQstate s = (QQstate) Enum.Parse(typeof(QQstate), a);

        11. 结构： 可以一次性声明多个不同类型变量 语法：[public] struct 结构名 {
            [public] 字段类型 字段名; // 字段名前面要加_;
        }
        // 声明结构
        public struct Person {
            public string _name;
            public int _age;
            public Gender _gender;
        }
        使用： 结构名 变量名; 变量名.字段；
        // 给结构赋值
        Person person; person._name = "lisa"; person._age = 25; person._gender = Gender.female;

        12. 数组： 定义： int[] arr1 = new int[10]; int[] arr2 = { 1, 2, 3, 4, 5, 6, 7 }

        13. 函数 / 方法：[public] static 返回类型 方法名() {}
        方法要执行必须要在main() 函数中调用， 调用语法： 类名.方法名();

        14. 高级参数 out参数： 表示方法多余返回的值 example： public static void Test(int[] arr, out int max, out int min, out int sum) {
            // 方法中给out参数的值赋值
        }
        ref参数： 能将一个变量带入参数内进行改变， 然后将改变后的值带出 example： int salary = 5000; Test(ref salary); public static void Test(ref int a) {

        }
        ps: 要求在方法外必须为其赋值， 方法内可以不赋值；

        params： 可变参数， 将实参列表中跟数组参数类型一样的参数都当成数组的元素去处理； params可变参数数组必须是形参列表的最后一个


        15. 方法重载： 方法的名称相同， 参数不同 方法的重载和返回值没有关系

        16. 方法的递归： 自己调用自己， 但是要有条件使之在条件之下脱离递归

        17. 类 属性： 保护字段， 对字段的取值和赋值进行限定； 属性的本质就是两个方法： get(), set();

        18. 字段 属性； 字段用来存放数据， 字段必须是私有的， 命名前面带_。 属性用来操作字段， 属性一般是共有的 赋值时， 通过属性给字段赋值 example： private int _age; public int age {
            set { _age = value; } // 只有set称为只写属性
            get { return _age; } // 只有get称为只读属性
        }
        通过this.age调用属性 19： 访问修饰符： public： 公共的， 哪里都可以访问 private： 私有，

        20. 静态和非静态的区别： 非静态类中： 可以出现静态和非静态成员--非静态成员通过实例调用： 实例.非静态成员(), 静态成员通过类名调用： 类名.静态成员(); 静态类中： 只可以出现静态成员， 静态成员通过类名调用： 类名.静态成员(); 总结： 静态成员必须通过类名调用， 实例成员必须通过对象调用； 静态函数中只能访问静态成员， 不能访问实例成员； 静态类中只能声明静态成员， 不能声明实例成员； 静态类不能被实例化； 实例函数中既可以使用静态成员， 也可以使用实例成员；

        使用： 1. 工具类可以封装成静态类； 2. 静态类在整个项目中资源共享；（ 内存中存储区域： 堆 栈 静态存储区） 只有在程序结束， 静态类才会释放资源；

        21. 构造函数 1. 每个类自带一个无参构造函数 2. 实例化的时候会自动执行构造函数 3. 构造函数可重载 4. 构造函数无返回值

        22： this
        // 当前类的对象
        public Person(string name, int age, char gender, int score) {
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.score = score;
        }

        public Person(string name, int age, char gender): this(name, age, gender, 0) // 调用当前类的构造函数
        {

        }

        23. 析构函数~Student() {
            Console.writeLine("析构函数");
        }
        1. 析构函数程序结束才执行。 帮助我们释放资源。


        23. 命名空间： 1. 类属于命名空间， 如果当前使用类没有引用命名空间， 则需要引用， 1. 鼠标点击错误提示处， 2. alt + shift + F10快速提示 2. 引用其他项目的类： 1. 在项目中引用需要引用的项目。 2. 在类中引用命名空间

        24. 值类型和引用类型 区别： 1. 存储的地方不一样： 值类型存储在内存的栈中。 引用类型存储在内存的堆中， 数据存在堆中， 数据地址存在栈中。 值类型： int double decimal bool struct enum char 引用类型： string 自定义类 2. 在传递的时候传递方式不一样。 值类型称之为值传递， 引用类型被称之为引用传递

        25. 字符串 1. 字符串的不可变性： 当给字符串重新赋值时， 老值并没有被销毁， 而是在堆中开辟一块新的内存用来存放新值； 程序结束后GC扫描内存， 如果内存没有被指向则清除 2. 字符串方法： ToCharArray(); Contains(); // 判断某个字符串中是否包含自定字符；
        TrimStart(); // 去掉字符串前面空格；
        TrimEnd(); // 去掉字符串后面空格；
        string.IsNullOrEmpty(); // 判断一个字符串是否为空或者为null

        26. 继承 父类--子类 || 基类--派生类 子类能继承父类的属性和方法， 不能继承父类的私有字段。 能看到， 但是不能用。 子类没有继承父类的构造函数， 但是创建子类对象的时候默认调用父类的无参构造函数， 创建父类对象， 让子类可以调用父类的成员 所有如果父类重写了一个有参数的构造函数， 那么子类就掉不到父类成员了， 就会报错， 解决方法： 1. 父类再写一个无参构造函数 2. 子类构造函数调用父类的： base();

        继承的特效： 1. 但根性： 子类只能继承一个父类 2. 传递性： 祖父 -->
        父-- > 子

        new关键字： 1. 创建对象 2. 隐藏从父类继承过来的同名成员， 这样子类就调用不到父类的同名成员了

        27. 里氏转换： 1. 子类可以赋值给父类(如果有一个方法需要传一个父类对象， 我们可以传第一个子类对象) 2. 如果一个父类中装的是子类对象， 则可以把这个父类强转为子类对象

        28. 集合
        ///  数组集合
        ArrayList list = new ArrayList();
        // Remove RemoveAt  RemoveRange Insert InsertRange Clear Reverse Sort

        // 键值对集合
        //ContainsKey是否包含键x

        //Hashtable hashtable = new Hashtable();
        //hashtable.Add(1, "111");
        //hashtable.Add(2, "222");
        //foreach(var item in hashtable.Keys)
        //{
        //    Console.WriteLine("{0}------------{1}", item, hashtable[item]);
        //}
        // path 操作路径的字符串
        // Path.GetFullPath("");

        // File类 操作文件
        // Create Delete Copy Move
        byte[] vs = File.ReadAllBytes(@ "C:\Users\Administrator\Desktop\tx.txt");
        // 将字节数组中的每一个元素都按照我们制定的编码格式解码成字符串
        string str = Encoding.Default.GetString(vs); Console.WriteLine(str); string st = "文化苦旅    余秋雨"; byte[] vd = Encoding.Default.GetBytes(st); File.WriteAllBytes(@ "C:\Users\Administrator\Desktop\tx.txt", vd); Console.ReadKey();
        // list 泛型
        List < string > strList = new List < string > ();
        //ADD
        strList.Add("bilibili");
        //集合和数组相互转换
        string[] strArr = new string[] { "bilibili" }; List < string > list = strArr.toList(); string[] arr = strList.toArray(); 29. 装箱和拆箱 1. 装箱： 讲值类型转换成引用类型 2. 拆箱： 将引用类型转换成值类型