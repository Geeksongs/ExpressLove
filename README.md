# 轻松搞定表白女朋友APP
# Express Love to your Girl Friend

## 1.背景(Backgroud):
本软件的主要目的是用来表白女朋友，让女朋友开心，目前网络上基于Android平台的表白软件较少，因此本人将其开源。主要集成了腾讯X5内核，Web与安卓原生混合开发。可以随时更换软件背景动态等，支持高度定制以及二次开发。欢迎各位技术同仁下载.欢迎大家修改做出更好的效果，同时也十分欢迎大家star和提问(issues)，github唯一指定链接，唯一官方指定链接！：
https://github.com/Geeksongs/ExpressLove

实现过程介绍：
https://www.cnblogs.com/geeksongs/p/10723048.html


An Android software used to express love to his girlfriend, currently there are fewer love software based on the Android platform on the Internet, so I open source of it. It mainly integrates Tencent X5 kernel, web and Android native mixed development. Software background dynamics can be changed at any time, supporting high customization and secondary development. Welcome all technical colleagues to download.

## 2.软件的效果如下(Demo Video):

![image](https://github.com/Geeksongs/ExpressLove/blob/master/yanshi.gif)


## 3.更换表白背景的方法:

刚才的第一个动图的背景是以文件index.html为背景的APP,这里还给出了两套背景，大家可以根据自己的喜好进行更换，第一/二/三套背景分别位于assets文件夹下，如下图所示:

![image](https://github.com/Geeksongs/ExpressLove/blob/master/file.png)

第二套背景的名称为index2.html，效果如下所示：

![image](https://github.com/Geeksongs/ExpressLove/blob/master/2.gif)

我们可以在Main3Activity.java处对想要显示的背景进行更改，Main3Activity.java的代码如下

```java

public class Main3Activity extends AppCompatActivity {
    private WebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getSupportActionBar().hide();
        new Handler().postDelayed(new Runnable(){ 
            public void run() {
                String url="weixin://";
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            } }, 40000);//原来是5000
        webView = (WebView) findViewById(R.id.webView2);
        //需要加载的网页的url
        webView.loadUrl("file:///android_asset/index2.html");
        //这里写的是assets文件夹下html文件的名称，需要带上后面的后缀名，前面的路径是安卓系统自己规定的android_asset就是表示的在assets文件夹下的意思。
    }
}
```
我们只需要将最后一行代码 webView.loadUrl("file:///android_asset/index.html")当中的index.html更改为index2.html就可以换成第二套背景了，换其他背景的方法也是同样的方法。
当然你也可以根据自己的想法对我的APP做出相应的调整，非常欢迎pull request,如果pull request了，将会得到神秘奖励哟！
