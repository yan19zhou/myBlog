一、什么是接口

接口是面向对象JavaScript程序员的工具箱中最有用的工具之一。在设计模式中提出的可重用的面向对象设计的原则之一就是“针对接口编程而不是实现编程”，
即我们所说的面向接口编程，这个概念的重要性可见一斑。但问题在于，在JavaScript的世界中，没有内置的创建或实现接口的方法，
也没有可以判断一个对象是否实现了与另一个对象相同的一套方法，这使得对象之间很难互换使用，好在JavaScript拥有出色的灵活性，
这使得模拟传统面向对象的接口，添加这些特性并非难事。接口提供了一种用以说明一个对象应该具有哪些方法的手段，尽管它可以表明这些方法的含义，
但是却不包含具体实现。有了这个工具，就能按对象提供的特性对它们进行分组。例如，假如A和B以及接口I，即便A对象和B对象有极大的差异，只要他们都实现了I接口，
那么在A.I(B)方法中就可以互换使用A和B，如B.I(A)。还可以使用接口开发不同的类的共同性。如果把原本要求以一个特定的类为参数的函数改为要求以一个特定的接口为参数的函数，
那么所有实现了该接口的对象都可以作为参数传递给它，这样一来，彼此不相关的对象也可以被相同地对待。

二、接口的利与弊

既定的接口具有自我描述性，并能够促进代码的重用性，接口可以提供一种信息，告诉外部一个类需要实现哪些方法。还有助于稳定不同类之间的通信方式，
减少了继承两个对象的过程中出现的问题。这对于调试也是有帮助的，在JavaScript这种弱类型语言中，类型不匹配很难追踪，使用接口时，如果出现了问题，
会有更明确的错误提示信息。当然接口并非完全没有缺点，如果大量使用接口会一定程度上弱化其作为弱类型语言的灵活性，另一方面，JavaScript并没有对接口的内置的支持，
只是对传统的面向对象的接口进行模拟，这会使本身较为灵活的JavaScript变得更加难以驾驭。此外，任何实现接口的方式都会对性能造成影响，某种程度上归咎于额外的方法调用开销。
接口使用的最大的问题在于，JavaScript不像是其他的强类型语言，如果不遵守接口的约定，就会编译失败，其灵活性可以有效地避开上述问题，如果是在协同开发的环境下，
其接口很有可能被破坏而不会产生任何错误，也就是不可控性。

在面向对象的语言中，使用接口的方式大体相似。接口中包含的信息说明了类需要实现的方法以及这些方法的签名。类的定义必须明确地声明它们实现了这些接口，
否则是不会编译通过的。显然在JavaScript中我们不能如法炮制，因为不存在interface和implement关键字，也不会在运行时对接口是否遵循约定进行检查，
但是我们可以通过辅助方法和显式地检查模仿出其大部分特性。

三、在JavaScript中模仿接口

在JavaScript中模仿接口主要有三种方式：通过注释、属性检查和鸭式辩型法，以上三种方式有效结合，就会产生类似接口的效果。

注释是一种比较直观地把与接口相关的关键字(如interface、implement等)与JavaScript代码一同放在注释中来模拟接口，这是最简单的方法，但是效果最差。代码如下：

    //以注释的形式模仿描述接口 
     
    /* 
     
    interface Composite{  
        function add(child);  
        function remove(child);  
        function getName(index);  
    }  
    interface FormItem{  
        function save();  
    }      
    */   
     
    //以注释的形式模仿使用接口关键字 
     
    var CompositeForm =function(id , method,action) { //implements Composite , FormItem  
        // do something  
    } 
     
    //模拟实现具体的接口方法 此处实现Composite接口 
     
    CompositeForm.prototype.Add=function(){  
        // do something  
    }   
     
    CompositeForm.prototype.remove=function(){  
        // do something  
    }  
     
    CompositeForm.prototype.getName=function(){  
        // do something  
    }   
     
    //模拟实现具体的接口方法 此处实现FormItem接口  
    Composite.prototype.save=function(){  
        // do something  
    }  

这种方式其实并不是很好，因为这种模仿还只停留在文档规范的范畴，开发人员是否会严格遵守该约定有待考量，对接口的遵守完全依靠开发人员的自觉性。
另外，这种方式并不会去检查某个函数是否真正地实现了我们约定的“接口”。尽管如此，这种方式也有优点，它易于实现而不需要额外的类或者函数，可以提高代码的可重用性，
因为类实现的接口都有注释说明。这种方式不会影响到文件占用的空间或执行速度，因为注释的代码可以在部署的时候轻松剔除。但是由于不会提供错误消息，它对测试和调试没什么帮助。
下面的一种方式会对是否实现接口进行检查，代码如下：

    //以注释的形式模仿使用接口关键字 
     
    var CompositeForm =function(id , method,action) { //implements Composite , FormItem  
        // do something  
        this.implementsinterfaces=['Composite','FormItem']; //显式地把接口放在implementsinterfaces中 
     
    }   
     
    //检查接口是否实现  
    function implements(Object){  
        for(var i=0 ;i< arguments.length;i++){  
            var interfaceName=arguments[i];  
            var interfaceFound=false;  
            for(var j=0;j<Object.implementsinterfaces.length;j++){  
                if(Object.implementsinterfaces[j]==interfaceName){  
                    interfaceFound=true;  
                    break;  
                }  
            }  
            if(!interfaceFound){  
                return false;  
            }else{  
                return true;  
            } 
        } 
     
    } 
     
    function AddForm(formInstance){  
        if(!implements(formInstance,'Composite','FormItem')){  
            throw new Error('Object does not implements required interface!');  
        }  
    }  

上述代码是在方式一的基础上进行完善，在这个例子中，CompositeForm宣称自己实现了Composite和FormItem这两个接口，其做法是把这两个接口的名称加入一个implementsinterfaces的数组。
显式地声明自己支持什么接口。任何一个要求其参数属性为特定类型的函数都可以对这个属性进行检查，并在所需要的接口未在声明之中时抛出错误。这种方式相对于上一种方式，
多了一个强制性的类型检查。但是这种方法的缺点在于它并未保证类真正地实现了自称实现的接口，只是知道它声明自己实现了这些接口。其实类是否声明自己支持哪些接口并不重要，
只要它具有这些接口中的方法就行。鸭式辩型(像鸭子一样走路并且嘎嘎叫的就是鸭子)正是基于这样的认识，它把对象实现的方法集作为判断它是不是某个类的实例的唯一标准。
这种技术在检查一个类是否实现了某个接口时也可以大显身手。这种方法的背后观点很简单：如果对象具有与接口定义的方法同名的所有方法，那么就可以认为它实现了这个接口。
可以使用一个辅助函数来确保对象具有所有必需的方法，代码如下：

    //interface 
    var Composite =new Interface('Composite',['add','remove','getName']);  
    var FormItem=new Interface('FormItem',['save']);   
    //class  
    var Composite=function(id,method,action){      
     
    }     
    //Common Method  
    function AddForm(formInstance){  
        ensureImplements(formInstance,Composite,FormItem);  
        //如果该函数没有实现指定的接口，这个函数将会报错  
    }  

与另外两种方式不同，这种方式无需注释，其余的各个方面都是可以强制实施的。EnsureImplements函数需要至少两个参数。第一个参数是想要检查的对象，其余的参数是被检查对象的接口。
该函数检查器第一个参数代表的对象是否实现了那些接口所声明的方法，如果漏掉了任何一个，就会抛错，其中会包含被遗漏的方法的有效信息。这种方式不具备自我描述性，
需要一个辅助类和辅助函数来帮助实现接口检查，而且它只关心方法名称，并不检查参数的名称、数目或类型。

四、Interface类

在下面的代码中，对Interface类的所有方法的参数都进行了严格的控制，如果参数没有验证通过，那么就会抛出异常。加入这种检查的目的就是，如果在执行过程中没有抛出异常，
那么就可以肯定接口得到了正确的声明和实现。

    var Interface = function(name ,methods){  
        if(arguments.length!=2){  
            throw new Error('2 arguments required!');  
        }  
        this.name=name;  
        this.methods=[];  
        for(var i=0;len=methods.length;i<len;i++){  
            if(typeof(methods[i]!=='String')){  
                throw new Error('method name must be String!');  
            }  
            this.methods.push(methods[i]);  
        }  
    }    
     
    Interface.ensureImplements=function(object){  
        if(arguments.length<2){  
            throw new Error('2 arguments required at least!');  
        }  
        for(var i=0;len=arguments.length;i<len;i++){  
            var interface=arguments[i];  
            if(interface.constructor!==Interface){  
                throw new Error('instance must be Interface!');  
            }  
            for(var j=0;methodLength=interface.methods.length;j<methodLength;j++){  
                var method=interface.methods[j];  
                if(!object[method]||typeof(object[method])=='function')){  
                    throw new Error('object does not implements method!');  
                }      
            }  
        }  
    }  

其实多数情况下，接口并不是经常被使用的，严格的类型检查并不总是明智的。但是在设计复杂的系统的时候，接口的作用就体现出来了，这看似降低了灵活性，却同时也降低了耦合性，
提高了代码的重用性。这在大型系统中是比较有优势的。在下面的例子中，声明了一个displayRoute方法，要求其参数具有三个特定的方法，
通过Interface对象和ensureImplements方法来保证这三个方法的实现，否则将会抛出错误。

    //声明一个接口，描述该接口包含的方法  
    var DynamicMap=new Interface{'DynamicMap',['centerOnPoint','zoom','draw']};    
     
    //声明一个displayRoute方法  
    function displayRoute(mapInstance){  
        //检验该方法的map  
        //检验该方法的mapInsstance是否实现了DynamicMap接口，如果未实现则会抛出  
        Interface.ensureImplements(mapInstance,DynamicMap); 
        //如果实现了则正常执行  
        mapInstance.centerOnPoint(12,22);  
        mapInstance.zoom(5);  
        mapInstance.draw();  
    }  

下面的例子会将一些数据以网页的形式展现出来，这个类的构造器以一个TestResult的实例作为参数。该类会对TestResult对象所包含的数据进行格式化(Format)后输出，代码如下：

    var ResultFormatter=function(resultObject){  
         //对resultObject进行检查，保证是TestResult的实例  
         if(!(resultObject instanceof TestResult)){  
             throw new Error('arguments error!');  
         }  
         this.resultObject=resultObject;  
    }        
    ResultFormatter.prototype.renderResult=function(){  
         var dateOfTest=this.resultObject.getData();  
         var resultArray=this.resultObject.getResults();  
         var resultContainer=document.createElement('div');  
         var resultHeader=document.createElement('h3');  
         resultHeader.innerHTML='Test Result from '+dateOfTest.toUTCString();  
         resultContainer.appendChild(resultHeader);  
         var resultList=document.createElement('ul');  
         resultContainer.appendChild(resultList);   
     
         for(var i=0;len=resultArray.length;i<len;i++){  
             var listItem=document.createElement('li');  
             listItem.innerHTML=resultArray[i];  
             resultList.appendChild('listItem');  
         }  
         return resultContainer;  
    }  

该类的构造器会对参数进行检查，以确保其的确为TestResult的类的实例。如果参数达不到要求，构造器将会抛出一个错误。有了这样的保证，在编写renderResult方法的时候，
就可以认定有getData和getResult两个方法。但是，构造函数中，只对参数的类型进行了检查，实际上这并不能保证所需要的方法都得到了实现。TestResult类会被修改，
致使其失去这两个方法，但是构造器中的检查依旧会通过，只是renderResult方法不再有效。

此外，构造器中的这个检查施加了一些不必要的限制。它不允许使用其他的类的实例作为参数，否则会直接抛错，但是问题来了，如果有另一个类也包含并实现了getData和getResult方法，
它本来可以被ResultFormatter使用，却因为这个限制而无用武之地。

解决问题的办法就是删除构造器中的校验，并使用接口代替。我们采用这个方案对代码进行优化：

    //接口的声明  
    var resultSet =new Interface('ResultSet',['getData','getResult']);        
    //修改后的方案  
    var ResultFormatter =function(resultObject){  
         Interface.ensureImplements(resultObject,resultSet);  
         this.resultObject=resultObject;  
    }  

上述代码中，renderResult方法保持不变，而构造器却采用的ensureImplements方法，而不是typeof运算符。现在的这个构造器可以接受任何符合接口的类的实例了。

五、依赖于接口的设计模式

<1>工厂模式：对象工厂所创建的具体对象会因具体情况而不同。使用接口可以确保所创建的这些对象可以互换使用，也就是说对象工厂可以保证其生产出来的对象都实现了必需的方法;

<2>组合模式：如果不使用接口就不可能使用这个模式，其中心思想是可以将对象群体与其组成对象同等对待。这是通过接口来做到的。如果不进行鸭式辩型或类型检查，
那么组合模式就会失去大部分意义;

<3>装饰者模式：装饰者通过透明地为另一个对象提供包装而发挥作用。这是通过实现与另外那个对象完全一致的接口实现的。对于外界而言，一个装饰者和它所包装的对象看不出有什么区别，
所以使用Interface来确保所创建的装饰者实现了必需的方法;

<4>命令模式：代码中所有的命令对象都有实现同一批方法(如run、ecxute、do等)通过使用接口，未执行这些命令对象而创建的类可以不必知道这些对象具体是什么，
只要知道他们都正确地实现了接口即可。借此可以创建出模块化程度很高的、耦合度很低的API。




























