using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game
{
    class Program

    {
        // 初始化数组
        static int[] maps = new int[100];
        // 存放AB的位置
        static int[] ABPos = new int[2];
        // 存放AB的名字
        static string[] palyerNames = new string[2];
        /// <summary>
        /// 1.打印标题
        /// 2.画图
        /// 3.运算下棋
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            //画游戏头
            DrawTitle();
            // 初始化地图
            initMaps();
            // 画地图
            DrawMap();
            // 输入玩家名字
            #region
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.WriteLine("请输入玩家A的名字");
            palyerNames[0] = Console.ReadLine();
            while (palyerNames[0] == "")
            {
                Console.ForegroundColor = ConsoleColor.DarkGreen;
                Console.WriteLine("玩家名字不能为空，请重新输入");
                palyerNames[0] = Console.ReadLine();
            }
            Console.WriteLine("A玩家名字为{0}",palyerNames[0]);
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.WriteLine("请输入玩家B的名字");
            palyerNames[1] = Console.ReadLine();
            while (palyerNames[1] == ""|| palyerNames[1]== palyerNames[0])
            {
                if(palyerNames[1] == "")
                {
                    Console.ForegroundColor = ConsoleColor.DarkGreen;
                    Console.WriteLine("玩家名字不能为空，请重新输入");
                    palyerNames[1] = Console.ReadLine();
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.DarkGreen;
                    Console.WriteLine("玩家B名字不能和A的名字相同，请重新输入");
                    palyerNames[1] = Console.ReadLine();
                }
            }
            #endregion
            Console.Clear();
            DrawTitle();
            Console.WriteLine("{0}的士兵用A表示",palyerNames[0]);
            Console.WriteLine("{0}的士兵用B表示", palyerNames[1]);
            DrawMap();

            // 当两个玩家都没有到达终点，游戏一直继续
            while(ABPos[0]<maps.Length && ABPos[1] < maps.Length)
            {

            }
            if(ABPos[0] >= maps.Length)
            {
                Console.WriteLine("{0}赢得了比赛",palyerNames[0]);
            }
            else 
            {
                Console.WriteLine("{0}赢得了比赛", palyerNames[1]);
            }

            Console.ReadKey();
        }
        /// <summary>
        /// 打印标题
        /// </summary>
        public static void DrawTitle()
        {
            Console.ForegroundColor = ConsoleColor.DarkBlue;
            Console.WriteLine("******************************");
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.WriteLine("******************************");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.WriteLine("**********飞行棋**************");
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine("******************************");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine("******************************");
        }
        /// <summary>
        /// 把特殊符号对应下标换成相应数字
        /// </summary>
        public static void initMaps()
        {
            int[] luckturn = { 6, 23, 40, 55, 69, 83 };//幸运转盘
            int[] landMine = { 5, 13, 17, 33, 38, 50, 64, 80, 94 };//地雷
            int[] pause = { 9, 27, 60, 93 };//暂停
            int[] tiemTunnel = { 20, 25, 45, 63, 72, 88, 90 };//时空隧道
            for (int i = 0; i < luckturn.Length; i++)
            {
                maps[luckturn[i]] = 1;
            }
            for (int i = 0; i < landMine.Length; i++)
            {
                maps[landMine[i]] = 2;
            }
            for (int i = 0; i < pause.Length; i++)
            {
                maps[pause[i]] = 3;
            }
            for (int i = 0; i < tiemTunnel.Length; i++)
            {
                maps[tiemTunnel[i]] = 4;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public static void DrawMap()
        {
            //0:☐,1:☆,2:❂,3:▲,4:卐 <>
            // 第一横行
            for (int i = 0; i < 30; i++)
            {
                ConvertSwitch(i);
               
            }
            Console.WriteLine();
            for (int i = 30; i < 35; i++)
            {
                for(int j = 0; j < 29; j++)
                {
                    Console.Write("  ");
                }
                ConvertSwitch(i);
                Console.WriteLine();
            }
            for(int i = 63; i >= 35; i--)
            {
                ConvertSwitch(i);
               
            }
            for(int i = 64; i < 69; i++)
            {
                
                ConvertSwitch(i);
                Console.WriteLine();
            }
            for(int i = 70; i < maps.Length; i++)
            {
                
                ConvertSwitch(i);
                
            }
            Console.WriteLine();
        }
        /// <summary>
        /// 把打印符号那一部分分离出来
        /// </summary>
        /// <param name="i"></param>
        public static void ConvertSwitch(int i)
        {
            if (ABPos[0] == ABPos[1] && ABPos[0] == i)
            {
                Console.ForegroundColor = ConsoleColor.DarkGreen;
                Console.Write("<>");
            }
            else if (ABPos[0] == i)
            {
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.Write("A");
            }
            else if (ABPos[1] == i)
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.Write("B");
            }
            else
            {
                switch (maps[i])
                {
                    case 1:
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.Write("☆");
                        break;
                    case 2:
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.Write("⊙");
                        break;
                    case 3:
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.Write("▲");
                        break;
                    case 4:
                        Console.ForegroundColor = ConsoleColor.DarkBlue;
                        Console.Write("卐");
                        break;
                    default:
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.Write("□");
                        break;

                }
            }

        }

    }
}

