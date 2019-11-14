1. region endregion定义折叠行
    #region
       <!--  可以被折叠的代码 -->
    #endregion
2.快捷键
   /// 用来解释类或方法
   ctrl +k +d 快速对齐
   ctrl+k+c 注释所选代码
   ctrl+k+u 取消注释所选代码
   ctrl+j 弹出代码提示
   shift+end；shift+home选中当前行代码
   f6 生成解决方案
   f7查看代码
   f5启动调试
   f9切换断点
   ctrl+shift+f9 删除全部断点
   f10逐过程
   ctrl+f10运行到光标处
   f11逐语句

3.占位符Console.WriteLine("输出第一个数字{0},输出第二个数字{1}，输出第三个数字{2}“,num1,num2,num3)
   // 多输出没效果，也不报错，少输出报异常

4.转义符：由'\'+特殊字符，组成的具有特殊意义的字符，
    如：换行符：\n，windows操作系统：\r\n
	英文半角双引号：\"
	tab符：\t
	\b：退格键，放在字符串的两边无效
	@：1.取消\在字符串中的转义作用，2.将字符串按照原格式输出。
 
5. 控制台输入，数组定义及字符串分割，占位符练习

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
			

7.运算符：一元运算符：++ -- 前++ -- 先执行++ -- 再参与表达式运算，后++ -- 先执行表达式运算，再进行自己的++ --运算符
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










































