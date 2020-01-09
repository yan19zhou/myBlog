using System;
using OOB;
namespace 练习_构造函数
{
    class Total
    {
        private double _distance;

        public double Distance { get => _distance; }
        public double Price {
            get {
                if (_distance < 0)
                {
                    _distance = 0;}
                else if(_distance<=100){
                    return _distance * 1;
                }
                else
                {
                    return _distance * 0.88;
                }
                return _price;

            } }

        public Total(double distance)
        {
            this._distance = distance;
        }
        private double _price;
        public void GetToatal()
        {
            
            Console.WriteLine(this.Price) ;
        }

    }
}
